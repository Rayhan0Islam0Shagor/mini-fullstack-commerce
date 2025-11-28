import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock?: number;
  [key: string]: unknown;
}

export interface ProductsResponse {
  data: Product[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

interface UseProductsOptions {
  category?: string;
  page?: number;
  limit?: number;
  enabled?: boolean;
}

/**
 * Reusable hook for fetching products
 * Supports filtering by category, pagination, and conditional fetching
 */
export const useProducts = (options?: UseProductsOptions) => {
  const { category, page, limit, enabled = true } = options || {};

  // Build query parameters
  const params = new URLSearchParams();
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
  const { data, error, isLoading, mutate } = useSWR<Product>(
    enabled && id ? `/product/${id}` : null,
    fetcher,
  );

  return {
    product: data,
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
  const { data, error, isLoading, mutate } = useSWR<Product[]>(
    enabled && categoryName ? `/product/category/${categoryName}` : null,
    fetcher,
  );

  return {
    products: data || [],
    isLoading,
    isError: error,
    error,
    mutate,
  };
};
