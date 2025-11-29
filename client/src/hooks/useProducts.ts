import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import {
  ProductResponse,
  ProductsResponse,
  UseProductsOptions,
} from '@/types/product.types';

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
