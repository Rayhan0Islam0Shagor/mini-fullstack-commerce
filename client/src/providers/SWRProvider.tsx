'use client';

import { SWRConfig, type SWRConfiguration } from 'swr';
import { fetcher } from '@/lib/fetcher';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

interface SWRProviderProps {
  children: ReactNode;
  fallback?: Record<string, unknown>;
}

// Create a singleton cache provider that persists across route changes
const cacheProvider = (() => {
  const cache = new Map();
  return () => cache;
})();

/**
 * SWR Provider Component
 * Configures global SWR settings for the application
 * Supports both SSR (via fallback) and CSR
 */
export const SWRProvider = ({ children, fallback }: SWRProviderProps) => {
  const config = useMemo<SWRConfiguration>(
    () => ({
      fetcher,
      fallback: fallback || {},
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateIfStale: false, // Don't revalidate if data exists in cache
      revalidateOnMount: false, // Don't revalidate on mount - use fallback/cached data immediately
      dedupingInterval: 2000, // Dedupe requests within 2 seconds
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      keepPreviousData: true,
      // Use singleton cache provider to persist cache across route changes
      provider: cacheProvider,
    }),
    [fallback],
  );

  return <SWRConfig value={config}>{children}</SWRConfig>;
};
