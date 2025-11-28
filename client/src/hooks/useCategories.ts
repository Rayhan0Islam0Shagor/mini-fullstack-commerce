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
  const { data, error, isLoading, mutate } = useSWR<Category[]>(
    enabled ? '/category' : null,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  return {
    categories: data || [],
    isLoading,
    isError: error,
    error,
    mutate,
  };
};
