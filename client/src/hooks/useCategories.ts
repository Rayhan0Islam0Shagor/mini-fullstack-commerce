import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  [key: string]: unknown;
}

/**
 * Reusable hook for fetching categories
 */
export const useCategories = (enabled = true) => {
  const { data, error, isLoading, mutate } = useSWR<
    { success: boolean; message: string; data: Category[] } | Category[]
  >(enabled ? '/category' : null, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  // Handle both API response format and direct array format
  const categories =
    data && typeof data === 'object' && 'data' in data
      ? (data as { data: Category[] }).data
      : (data as Category[]) || [];

  return {
    categories,
    isLoading,
    isError: error,
    error,
    mutate,
  };
};
