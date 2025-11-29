'use client';
import { useInfiniteProducts } from '@/hooks/useProducts';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import ProductCard from '../new-arrivals/product-list/ProductCard';
import type { Product } from '@/types/product.types';

/**
 * Client Component - Uses SWR for data fetching with infinite scroll
 * Receives pre-fetched data via SWRProvider fallback for SSR
 */
export const ProductsList = () => {
  const { products, isLoading, isError, error, hasMore, loadMore, meta } =
    useInfiniteProducts({
      limit: 20,
    });

  // Infinite scroll observer setup
  const { observerCallbackRef } = useInfiniteScroll({
    hasMore,
    isLoading,
    loadMore,
  });

  // Determine if we're loading more (have products) vs initial load (no products)
  const isLoadingMore = isLoading && products.length > 0;

  // Calculate how many skeletons to show based on remaining products
  const calculateSkeletonCount = () => {
    if (!meta) {
      // If no meta data, show full page limit
      return 20;
    }

    const { total, limit: pageLimit } = meta;
    const remainingProducts = total - products.length;

    // Show skeletons for remaining products, but at least 4 and at most the page limit
    return Math.max(4, Math.min(pageLimit || 20, remainingProducts));
  };

  const skeletonCount = isLoadingMore ? calculateSkeletonCount() : 0;

  if (isError) {
    return (
      <div className="mt-6 text-red-500 text-center py-8">
        Error loading products: {error?.message || 'Unknown error'}
      </div>
    );
  }

  if (!products || products.length === 0) {
    if (isLoading) {
      return (
        <div className="grid mt-6 grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-300 p-4 bg-gray-100 animate-pulse h-[287px]"
            />
          ))}
        </div>
      );
    }

    return (
      <div className="mt-6 text-gray-500 text-center py-8">
        No products found
      </div>
    );
  }

  return (
    <>
      <div className="grid mt-6 grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {/* Show loading skeletons when loading more products */}
        {isLoadingMore && skeletonCount > 0 && (
          <>
            {[...Array(skeletonCount)].map((_, i) => (
              <div
                key={`loading-more-${i}`}
                className="border border-gray-300 p-4 bg-gray-100 animate-pulse h-[287px]"
              />
            ))}
          </>
        )}
      </div>

      {/* Loading indicator and intersection observer target */}
      {hasMore ? (
        <div ref={observerCallbackRef} className="mt-8 min-h-[200px]">
          {!isLoading && (
            <div className="text-center text-gray-400 py-4">
              Scroll for more products...
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8 mt-8">
          No more products to load
        </div>
      )}
    </>
  );
};
