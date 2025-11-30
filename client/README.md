# Mini Commerce Client

A modern e-commerce frontend built with Next.js 16, React 19, TypeScript, and Tailwind CSS. This client application provides a seamless shopping experience with features like product browsing, category filtering, shopping cart, and responsive design.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Code Organization](#code-organization)
- [API Integration](#api-integration)
- [Environment Variables](#environment-variables)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **Product Browsing**: Browse products with pagination and infinite scroll
- **Category Filtering**: Filter products by category
- **Product Details**: Detailed product pages with related products
- **Shopping Cart**: Full-featured shopping cart with persistent state
- **Responsive Design**: Mobile-first responsive design
- **Hero Section**: Dynamic hero carousel with category navigation
- **Best Deals**: Featured product sections with category selection
- **New Arrivals**: Showcase of latest products
- **Image Optimization**: Automatic image optimization with Next.js Image component
- **Data Fetching**: SWR for efficient data fetching and caching
- **Type Safety**: Full TypeScript support throughout the application

## 🛠 Tech Stack

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[SWR](https://swr.vercel.app/)** - Data fetching and caching
- **[Motion](https://motion.dev/)** - Animation library (formerly Framer Motion)
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- **[React Multi Carousel](https://www.npmjs.com/package/react-multi-carousel)** - Carousel component
- **[Biome](https://biomejs.dev/)** - Fast linter and formatter

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **Backend API** running (see [backend README](../backend/README.md))

### Installation

1. **Navigate to the client directory**:

   ```bash
   cd client
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the `client` directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```

   > **Note**: The default API URL is `http://localhost:5000/api/v1`. Only set this if your backend is running on a different URL.

4. **Start the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**:

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm start
```

The production build will be optimized and ready for deployment.

## 📁 Project Structure

```
client/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── products/          # Product pages
│   │   │   ├── page.tsx       # Products listing
│   │   │   └── [id]/          # Dynamic product detail page
│   │   └── globals.css        # Global styles
│   │
│   ├── components/            # React components
│   │   ├── best-deals/        # Best deals section
│   │   ├── cart/              # Shopping cart components
│   │   │   ├── atoms/         # Atomic design: atoms
│   │   │   ├── molecules/     # Atomic design: molecules
│   │   │   └── cart-sidebar.tsx
│   │   ├── hero-section/      # Hero carousel section
│   │   ├── layouts/           # Layout components
│   │   │   ├── header/        # Header and navigation
│   │   │   └── footer/        # Footer component
│   │   ├── new-arrivals/      # New arrivals section
│   │   ├── products/          # Product-related components
│   │   └── ui/                # Reusable UI components
│   │
│   ├── contexts/              # React contexts
│   │   └── cart-context.tsx   # Shopping cart state management
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useProducts.ts     # Product data fetching hooks
│   │   ├── useCategories.ts   # Category data fetching hooks
│   │   ├── useCarousel.ts     # Carousel functionality
│   │   └── useInfiniteScroll.ts # Infinite scroll pagination
│   │
│   ├── lib/                   # Utility libraries
│   │   ├── fetcher.ts         # SWR fetcher functions
│   │   ├── swr-utils.ts       # SWR utilities
│   │   ├── cart.ts            # Cart utility functions
│   │   └── utils.ts           # General utilities
│   │
│   ├── providers/             # React providers
│   │   └── SWRProvider.tsx    # SWR configuration provider
│   │
│   └── types/                 # TypeScript type definitions
│       ├── product.types.ts    # Product-related types
│       ├── cart.types.ts       # Cart-related types
│       └── common.types.ts    # Common types
│
├── public/                    # Static assets
│   └── assets/               # Images, icons, etc.
│
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── biome.json                # Biome linter/formatter config
└── package.json              # Dependencies and scripts
```

## 💻 Development

### Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the application for production
- `npm start` - Start the production server (after building)
- `npm run lint` - Run Biome linter to check for issues
- `npm run format` - Format code using Biome

### Development Workflow

1. **Make changes** to your code
2. **The dev server** will automatically reload on file changes
3. **Check for linting errors**: `npm run lint`
4. **Format your code**: `npm run format`

### Code Style

- **Indentation**: 2 spaces
- **Linter**: Biome (configured in `biome.json`)
- **TypeScript**: Strict mode enabled
- **Imports**: Auto-organized by Biome

## 🏗 Code Organization

### Atomic Design Pattern

The cart components follow the **Atomic Design** methodology:

- **Atoms**: Smallest components (buttons, labels, icons)
- **Molecules**: Combinations of atoms (cart item row, quantity controls)
- **Organisms**: Complex components (cart sidebar, cart summary)

Example:

```
cart/
├── atoms/
│   ├── CartTitle.tsx
│   ├── QuantityButton.tsx
│   └── ...
├── molecules/
│   ├── CartItemRow.tsx
│   ├── QuantityControls.tsx
│   └── ...
└── cart-sidebar.tsx (organism)
```

### Custom Hooks

Custom hooks are used for data fetching and reusable logic:

- `useProducts()` - Fetch products with filtering and pagination
- `useProduct(id)` - Fetch a single product
- `useProductsByCategory(category)` - Fetch products by category
- `useInfiniteProducts()` - Infinite scroll pagination
- `useCategories()` - Fetch all categories
- `useCarousel()` - Carousel navigation logic
- `useInfiniteScroll()` - Infinite scroll detection

### Type Definitions

All TypeScript types are centralized in the `src/types/` directory:

- `product.types.ts` - Product, ProductResponse, ProductsResponse, etc.
- `cart.types.ts` - CartItem, CartContextType, etc.
- `common.types.ts` - Common shared types

## 🔌 API Integration

### Fetcher Functions

The application uses SWR for data fetching. The fetcher functions are located in `src/lib/fetcher.ts`:

- `fetcher<T>()` - Client-side fetcher for SWR
- `serverFetcher<T>()` - Server-side fetcher for SSR

### API Response Format

The backend API returns data in this format:

```typescript
{
  success: boolean;
  message: string;
  data: T;           // The actual data
  meta?: {           // Pagination metadata (optional)
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
  }
}
```

### Using Hooks

Example: Fetching products with filters

```typescript
import { useProducts } from '@/hooks/useProducts';

function ProductsPage() {
  const { products, isLoading, error, meta } = useProducts({
    category: 'electronics',
    sort: 'price',
    page: 1,
    limit: 20,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Infinite Scroll

Example: Using infinite scroll pagination

```typescript
import { useInfiniteProducts } from '@/hooks/useProducts';

function InfiniteProducts() {
  const { products, isLoading, hasMore, loadMore } = useInfiniteProducts({
    category: 'electronics',
    limit: 20,
  });

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {hasMore && (
        <button onClick={loadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
```

## 🔐 Environment Variables

| Variable              | Description          | Required | Default                        |
| --------------------- | -------------------- | -------- | ------------------------------ |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | No       | `http://localhost:5000/api/v1` |

### Setting Up Environment Variables

1. Create a `.env.local` file in the `client` directory
2. Add your environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```
3. Restart the development server

> **Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never expose sensitive data like API keys or secrets.

## 📝 Common Tasks

### Adding a New Component

1. Create the component file in the appropriate directory
2. Export it from an `index.ts` file if needed
3. Import and use it in your page or parent component

Example:

```typescript
// src/components/ui/Button.tsx
export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

### Adding a New Page

1. Create a new directory in `src/app/`
2. Add a `page.tsx` file
3. Export a default React component

Example:

```typescript
// src/app/about/page.tsx
export default function AboutPage() {
  return <div>About Us</div>;
}
```

### Adding a New API Hook

1. Create a hook in `src/hooks/`
2. Use SWR with the `fetcher` function
3. Export the hook

Example:

```typescript
// src/hooks/useCategories.ts
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export function useCategories() {
  const { data, error, isLoading } = useSWR('/category', fetcher);
  return {
    categories: data?.data || [],
    isLoading,
    error,
  };
}
```

### Styling with Tailwind CSS

The project uses Tailwind CSS 4. Use utility classes directly in your components:

```typescript
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-800">Title</h2>
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Click me
  </button>
</div>
```

### Build errors

**Problem**: `npm run build` fails

**Solutions**:

- Fix all TypeScript errors first
- Check for unused imports or variables
- Ensure all environment variables are set
- Clear `.next` directory and rebuild: `rm -rf .next && npm run build`

## 🎨 Styling Guidelines

- **Use Tailwind CSS** utility classes for styling
- **Follow mobile-first** approach (base styles for mobile, then `md:`, `lg:`, etc.)
- **Use CSS variables** for theme colors (defined in `globals.css`)
- **Keep components styled** - avoid inline styles when possible
- **Use consistent spacing** - follow Tailwind's spacing scale

### Environment Variables in Production

Make sure to set `NEXT_PUBLIC_API_URL` to your production API URL in your deployment platform's environment variables.
