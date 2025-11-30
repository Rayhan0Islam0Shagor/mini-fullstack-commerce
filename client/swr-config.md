# SWR Setup Guide

Hey! So we're using SWR for all our data fetching in this Next.js project. It's already set up and ready to go, but here's everything you need to know to use it effectively.

## Quick Start

Everything is already configured in `app/layout.tsx` - the `SWRProvider` wraps the entire app, so you can just import and use the hooks anywhere. No extra setup needed.

## What We've Configured

I've set up SWR with some sensible defaults that work well for our use case:

- **Caching**: Data sticks around across page navigations (using a singleton cache)
- **Revalidation**: Automatically refreshes when you switch back to the tab or reconnect to the internet
- **Smart defaults**: Won't revalidate on mount if we already have data (prevents unnecessary requests)
- **Error retries**: Tries 3 times with 5 second gaps if something fails
- **Request deduplication**: If multiple components request the same data within 2 seconds, it only makes one request

The full config is in `providers/SWRProvider.tsx` if you want to tweak anything.

## How Our API Works

Our backend returns data in a specific format:

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [...],  // The actual products array
  "meta": {       // Optional pagination info
    "total": 100,
    "page": 1,
    "limit": 20,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

The fetcher functions (in `lib/fetcher.ts`) handle this automatically - they extract the `data` field and pass along the `meta` for pagination. You don't need to worry about this, just use the hooks.

## Available Hooks

### Products

#### `useProducts(options?)`

The main hook for fetching products. You can filter, search, sort, and paginate.

```tsx
import { useProducts } from '@/hooks/useProducts';

function MyComponent() {
  const { products, meta, isLoading, isError, error, mutate } = useProducts({
    searchTerm: 'laptop',
    sort: 'createdAt', // or '-createdAt' for newest first
    category: 'electronics',
    page: 1,
    limit: 20,
    enabled: true, // Set to false to disable fetching
  });

  // Handle loading and errors
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Oops: {error?.message}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>{product.title}</div>
      ))}
    </div>
  );
}
```

**What you get back:**

- `products` - Array of products (empty array if loading/error)
- `meta` - Pagination info (total, current page, hasNextPage, etc.)
- `isLoading` - Boolean, true while fetching
- `isError` - Boolean, true if there was an error
- `error` - The actual error object (has `message` and `status` properties)
- `mutate` - Function to manually refresh the data

#### `useProduct(id, enabled?)`

Get a single product by ID. Useful for product detail pages.

```tsx
import { useProduct } from '@/hooks/useProducts';

function ProductPage({ productId }: { productId: string | null }) {
  // Only fetch if we have an ID
  const { product, isLoading, isError } = useProduct(productId, !!productId);

  if (!productId) return <div>No product ID</div>;
  if (isLoading) return <div>Loading product...</div>;
  if (isError) return <div>Couldn't load product</div>;

  return <div>{product?.title}</div>;
}
```

The second parameter (`enabled`) lets you conditionally fetch. If it's `false`, no request is made. Super useful when the ID might not be available yet.

#### `useProductsByCategory(categoryName, enabled?)`

Get all products in a specific category. This one has slightly different revalidation settings - it always revalidates on mount and when data is stale, which makes sense for category pages where you want fresh data.

```tsx
import { useProductsByCategory } from '@/hooks/useProducts';

function CategoryPage({ category }: { category: string }) {
  const { products, isLoading } = useProductsByCategory(category, true);

  // ... rest of your component
}
```

#### `useInfiniteProducts(options?)`

This is the one for infinite scroll. It automatically accumulates products as you load more pages, and handles all the pagination logic for you.

```tsx
import { useInfiniteProducts } from '@/hooks/useProducts';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

function InfiniteProductsPage() {
  const {
    products, // All products accumulated so far
    isLoading,
    hasMore, // Whether there are more pages
    loadMore, // Function to load the next page
    reset, // Reset back to page 1
    isError,
    error,
  } = useInfiniteProducts({
    category: 'electronics',
    limit: 20,
  });

  // Set up the infinite scroll observer
  const { observerCallbackRef } = useInfiniteScroll({
    hasMore,
    isLoading,
    loadMore,
  });

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {/* This div triggers loading more when it comes into view */}
      {hasMore && (
        <div ref={observerCallbackRef} className="min-h-[200px]">
          {isLoading && <div>Loading more...</div>}
        </div>
      )}

      {!hasMore && <div>That's all folks!</div>}
    </div>
  );
}
```

**Cool features:**

- Automatically resets when you change filters (search, category, etc.)
- Prevents duplicate products (uses product IDs to dedupe)
- Accumulates all products across pages in one array
- Optimized revalidation settings (doesn't revalidate on focus/reconnect to avoid unnecessary requests)

### Categories

#### `useCategories(enabled?)`

Simple hook to get all categories.

```tsx
import { useCategories } from '@/hooks/useCategories';

function CategoryList() {
  const { categories, isLoading, isError } = useCategories();

  if (isLoading) return <div>Loading categories...</div>;
  if (isError) return <div>Error loading categories</div>;

  return (
    <ul>
      {categories.map((cat) => (
        <li key={cat._id}>{cat.name}</li>
      ))}
    </ul>
  );
}
```

## Server-Side Rendering (SSR)

If you want to pre-fetch data on the server for better SEO and initial load times, here's how:

### Basic SSR Setup

```tsx
// app/products/page.tsx (Server Component)
import { prefetchData } from '@/lib/swr-utils';
import { SWRProvider } from '@/providers/SWRProvider';
import { ProductsList } from '@/components/products/ProductsList';

export default async function ProductsPage() {
  // Pre-fetch the data on the server
  // IMPORTANT: Use the exact same URL/query params your hook will use!
  const fallback = await prefetchData(
    '/product?sort=createdAt&limit=20&page=1',
  );

  return (
    <SWRProvider fallback={fallback}>
      <ProductsList />
    </SWRProvider>
  );
}
```

```tsx
// components/products/ProductsList.tsx (Client Component)
'use client';

import { useInfiniteProducts } from '@/hooks/useProducts';

export function ProductsList() {
  // SWR will use the pre-fetched data from the fallback
  // No loading state on initial render!
  const { products, isLoading } = useInfiniteProducts({
    limit: 20,
  });

  // ... render your products
}
```

**Important gotcha**: The URL you pass to `prefetchData` must match exactly what the hook will request. If your hook adds `page=1` automatically, make sure your prefetch includes it too. Otherwise SWR won't find the cached data and will make a new request.

### Pre-fetching Multiple Endpoints

If you need data from multiple endpoints:

```tsx
import { prefetchMultiple } from '@/lib/swr-utils';

export default async function HomePage() {
  const fallback = await prefetchMultiple(['/product?limit=10', '/category']);

  return (
    <SWRProvider fallback={fallback}>
      <HomeContent />
    </SWRProvider>
  );
}
```

## Common Patterns

### Conditional Fetching

Sometimes you don't want to fetch until certain conditions are met:

```tsx
function ProductDetails({ productId }: { productId: string | null }) {
  // Won't fetch if productId is null
  const { product, isLoading } = useProduct(productId, !!productId);

  if (!productId) {
    return <div>Please select a product</div>;
  }

  // ... rest of component
}
```

### Manual Refresh

After creating/updating/deleting something, you might want to refresh the data:

```tsx
function ProductsPage() {
  const { products, mutate } = useProducts();

  const handleCreateProduct = async () => {
    await createProduct(newProduct);
    // Refresh the products list
    mutate();
  };

  return (
    <div>
      <button onClick={handleCreateProduct}>Add Product</button>
      {/* ... */}
    </div>
  );
}
```

### Filtering and Pagination

Here's a complete example with filters and pagination:

```tsx
'use client';

import { useProducts } from '@/hooks/useProducts';
import { useState } from 'react';

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');

  const { products, meta, isLoading } = useProducts({
    category: category || undefined, // Don't pass empty string
    page,
    limit: 10,
  });

  return (
    <div>
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setPage(1); // Reset to first page when filter changes
        }}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {products.map((product) => (
            <div key={product._id}>{product.title}</div>
          ))}

          {meta && (
            <div>
              <button
                disabled={!meta.hasPrevPage}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <span>
                Page {meta.page} of {Math.ceil(meta.total / meta.limit)}
              </span>
              <button
                disabled={!meta.hasNextPage}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
```

## Creating Your Own Hooks

If you need to fetch something that doesn't have a hook yet, you can create your own:

```tsx
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

interface MyCustomData {
  id: string;
  name: string;
}

export function useMyCustomData(id: string | null) {
  const { data, error, isLoading, mutate } = useSWR<MyCustomData>(
    id ? `/api/custom/${id}` : null, // null = don't fetch
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  return {
    data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}
```

## Environment Setup

Make sure you have `NEXT_PUBLIC_API_URL` set in your `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

If you don't set it, it defaults to `http://localhost:5000/api/v1`, which is probably fine for local development.

## How Caching Works

Here's what you need to know about how we've set up caching:

1. **Persistent across navigation**: The cache sticks around when you navigate between pages. This means if you visit a product page, then go back, it won't re-fetch (unless the data is stale).

2. **No revalidation on mount**: When a component mounts, if we already have data in the cache, we use it immediately without making a new request. This makes navigation feel instant.

3. **Smart revalidation**: Data refreshes when:

   - You switch back to the browser tab (focus)
   - Your internet reconnects
   - You manually call `mutate()`

4. **Request deduplication**: If 5 components all request the same data at the same time, only one request is made. The others wait for it.

5. **Previous data stays**: While fetching new data, the old data is still shown. No loading spinners unless it's the first load.

## Error Handling

All hooks return error information. Here's how to handle it:

```tsx
const { products, isError, error } = useProducts();

if (isError) {
  // error has:
  // - message: string (human-readable error message)
  // - status?: number (HTTP status code, if available)
  console.error('Failed to load products:', error?.message);
  console.error('Status code:', error?.status);

  // Show user-friendly error message
  return <div>Sorry, couldn't load products. Please try again.</div>;
}
```

## TypeScript

Everything is fully typed! Import the types you need:

```tsx
import type { Product } from '@/types/product.types';
import type { Category } from '@/hooks/useCategories';

// Use them in your components
function ProductCard({ product }: { product: Product }) {
  // TypeScript knows all the product properties
  return <div>{product.title}</div>;
}
```

## Things to Watch Out For

1. **SSR fallback keys must match exactly**: If your hook requests `/product?page=1&limit=20`, your `prefetchData` must use the exact same URL. Otherwise SWR won't find the cached data.

2. **Empty strings vs undefined**: When filtering, pass `undefined` instead of empty strings. `category: ''` and `category: undefined` are different to SWR.

3. **Infinite scroll resets automatically**: When you change filters in `useInfiniteProducts`, it automatically resets to page 1 and clears accumulated products. This is usually what you want, but be aware of it.

4. **Conditional fetching**: Use the `enabled` parameter to prevent requests when data isn't ready yet. Don't just check `if (id)` after the hook - that still makes a request with `null`.

5. **Cache persistence**: Remember that data persists across navigation. If you need fresh data every time, you might want to call `mutate()` on mount or adjust the revalidation settings.

## SSR Utilities

We have a few helper functions in `lib/swr-utils.ts`:

- `prefetchData(key)` - Pre-fetch a single endpoint
- `prefetchMultiple(keys)` - Pre-fetch multiple endpoints at once
- `serializeKey(key)` - Serialize complex keys (arrays, functions) for SSR
- `createFallback(key, data)` - Create a fallback object manually

You probably won't need these unless you're doing something custom, but they're there if you need them.

## Need Help?

- [SWR Docs](https://swr.vercel.app/) - Official documentation
- [SWR with Next.js](https://swr.vercel.app/docs/with-nextjs) - Next.js specific guide
- Check the actual hook implementations in `src/hooks/` if you want to see how things work under the hood

That's it! You should have everything you need to use SWR in this project. If something doesn't work as expected, check the hook implementations - they're pretty straightforward and well-commented.
