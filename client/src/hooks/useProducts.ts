import useSWR from 'swr';
import { useState, useCallback, useEffect, useRef } from 'react';
import { fetcher } from '@/lib/fetcher';
import {
  ProductResponse,
  ProductsResponse,
  UseProductsOptions,
} from '@/types/product.types';
import type { Product } from '@/types/product.types';

/**
 * Reusable hook for fetching products
 * Supports filtering by category, pagination, and conditional fetching
 */
export const useProducts = (options?: UseProductsOptions) => {
  const {
    searchTerm,
    sort,
    category,
    page,
    limit,
    enabled = true,
  } = options || {};

  const sortBy = sort || 'createdAt';

  // Build query parameters
  const params = new URLSearchParams();
  if (searchTerm) params.append('searchTerm', searchTerm);
  params.append('sort', sortBy);
  if (category) params.append('category', category);
  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());

  const queryString = params.toString();
  const url = `/product${queryString ? `?${queryString}` : ''}`;

  const { data, error, isLoading, mutate } = useSWR<ProductsResponse>(
    enabled ? url : null,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  return {
    products: data?.data || [],
    meta: data?.meta,
    isLoading,
    isError: error,
    error,
    mutate,
  };
};

/**
 * Hook for fetching a single product by ID
 */
export const useProduct = (id: string | null, enabled = true) => {
  const { data, error, isLoading, mutate } = useSWR<ProductResponse>(
    enabled && id ? `/product/${id}` : null,
    fetcher,
  );

  return {
    product: data?.data,
    isLoading,
    isError: error,
    error,
    mutate,
  };
};

/**
 * Hook for fetching products by category
 */
export const useProductsByCategory = (
  categoryName: string | null,
  enabled = true,
) => {
  const { data, error, isLoading, mutate } = useSWR<ProductsResponse>(
    enabled && categoryName ? `/product/category/${categoryName}` : null,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      revalidateIfStale: true,
    },
  );

  return {
    products: data?.data || [],
    meta: data?.meta,
    isLoading,
    isError: error,
    error,
    mutate,
  };
};

/**
 * Hook for infinite scroll pagination
 * Accumulates products across multiple pages
 */
export const useInfiniteProducts = (
  options?: Omit<UseProductsOptions, 'page'>,
) => {
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const isFirstMount = useRef(true);
  const prevFilters = useRef<{
    searchTerm?: string;
    sort?: string;
    category?: string;
  }>({});

  const {
    searchTerm,
    sort,
    category,
    limit = 20,
    enabled = true,
  } = options || {};

  const sortBy = sort || 'createdAt';

  // Build query parameters
  const params = new URLSearchParams();
  if (searchTerm) params.append('searchTerm', searchTerm);
  params.append('sort', sortBy);
  if (category) params.append('category', category);
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  const queryString = params.toString();
  const url = `/product${queryString ? `?${queryString}` : ''}`;

  const { data, error, isLoading, mutate } = useSWR<ProductsResponse>(
    enabled ? url : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true, // Always fetch on mount to ensure data loads
    },
  );

  // Update accumulated products when new data arrives
  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      if (page === 1) {
        // First page - replace all products
        setAllProducts(data.data);
      } else {
        // Subsequent pages - append products (avoid duplicates)
        setAllProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newProducts = data.data.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newProducts];
        });
      }

      // Update hasMore based on meta
      if (data.meta) {
        const nextPage = data.meta.hasNextPage ?? false;
        setHasMore(nextPage);
      } else {
        // If no meta, assume no more pages if we got fewer products than limit
        const hasMoreProducts = data.data.length >= limit;
        setHasMore(hasMoreProducts);
      }
    } else if (data && !data.data) {
      // If we got a response but no data, there are no more pages
      setHasMore(false);
    }
  }, [data, page, limit]);

  // Reset when filters change (but not on initial mount)
  useEffect(() => {
    const currentFilters = { searchTerm, sort, category };

    // Skip on first mount
    if (isFirstMount.current) {
      isFirstMount.current = false;
      prevFilters.current = currentFilters;
      return;
    }

    // Check if filters actually changed
    const filtersChanged =
      prevFilters.current.searchTerm !== searchTerm ||
      prevFilters.current.sort !== sort ||
      prevFilters.current.category !== category;

    if (filtersChanged) {
      setPage(1);
      setAllProducts([]);
      setHasMore(true);
      prevFilters.current = currentFilters;
    }
  }, [searchTerm, sort, category]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, hasMore]);

  const reset = useCallback(() => {
    setPage(1);
    setAllProducts([]);
    setHasMore(true);
  }, []);

  return {
    products: allProducts,
    meta: data?.meta,
    isLoading,
    isError: error,
    error,
    hasMore,
    loadMore,
    reset,
    mutate,
  };
};
