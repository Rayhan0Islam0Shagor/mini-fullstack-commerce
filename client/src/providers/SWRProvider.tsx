'use client';

import { SWRConfig } from 'swr';
import { fetcher } from '@/lib/fetcher';
import type { ReactNode } from 'react';

interface SWRProviderProps {
  children: ReactNode;
  fallback?: Record<string, unknown>;
}

/**
 * SWR Provider Component
 * Configures global SWR settings for the application
 * Supports both SSR (via fallback) and CSR
 */
export const SWRProvider = ({ children, fallback }: SWRProviderProps) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        fallback: fallback || {},
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        revalidateIfStale: true,
        dedupingInterval: 2000, // Dedupe requests within 2 seconds
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        keepPreviousData: true,
        // Cache configuration
        provider: () => new Map(),
      }}
    >
      {children}
    </SWRConfig>
  );
};
