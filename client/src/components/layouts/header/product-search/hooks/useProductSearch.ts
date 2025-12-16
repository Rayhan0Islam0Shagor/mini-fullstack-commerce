import { useState, useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useProducts } from '@/hooks/useProducts';
import type { Product } from '@/types/product.types';

interface UseProductSearchOptions {
  debounceMs?: number;
  limit?: number;
}

/**
 * Hook for product search using SWR
 * Uses the existing useProducts hook with debounced search term
 */
export function useProductSearch({
  debounceMs = 500,
  limit = 10,
}: UseProductSearchOptions = {}) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, debounceMs);

  // Use existing useProducts hook with SWR
  const { products, isLoading } = useProducts({
    searchTerm: debouncedQuery.trim() || undefined,
    limit,
    enabled: debouncedQuery.trim().length > 0,
  });

  // Only return items if there's a query (even if products exist from cache)
  const items: Product[] = useMemo(() => {
    // Don't show products if query is empty
    if (!debouncedQuery.trim()) {
      return [];
    }

    if (!products || products.length === 0) {
      return [];
    }

    return products;
  }, [products, debouncedQuery]);

  return {
    query,
    setQuery,
    items,
    isLoading,
  };
}
