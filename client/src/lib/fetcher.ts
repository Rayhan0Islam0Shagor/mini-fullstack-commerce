/**
 * Fetcher function for SWR
 * Handles API requests with proper error handling
 */
export const fetcher = async <T = unknown>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_URL ||
    'https://win-store-backend.vercel.app/api/v1';

  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = new Error(
      `An error occurred while fetching the data: ${response.statusText}`,
    ) as Error & { status: number };
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  // Handle API response format: { success, message, data, meta }
  // Return the full API response object to preserve meta for pagination
  if (data && typeof data === 'object' && 'data' in data && 'success' in data) {
    return data as T;
  }

  return data as T;
};

/**
 * Server-side fetcher for SSR/SSG
 * Supports ISR (Incremental Static Regeneration) with caching
 * Use this in Server Components for pre-fetching data
 */
export const serverFetcher = async <T = unknown>(
  url: string,
  options?: RequestInit & {
    revalidate?: number | false;
  },
): Promise<T> => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_URL ||
    'https://win-store-backend.vercel.app/api/v1';

  // Extract revalidate from options
  const { revalidate, ...fetchOptions } = options || {};

  // Use ISR caching if revalidate is provided, otherwise use default revalidation
  // This allows static generation with periodic revalidation
  const cacheConfig =
    revalidate === false
      ? { cache: 'no-store' as const }
      : { next: { revalidate: revalidate ?? 60 } };

  const response = await fetch(`${baseURL}${url}`, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions?.headers,
    },
    // Use ISR caching for static generation
    ...cacheConfig,
  } as RequestInit);

  if (!response.ok) {
    const error = new Error(
      `An error occurred while fetching the data: ${response.statusText}`,
    ) as Error & { status: number };
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  // Handle API response format: { success, message, data, meta }
  if (data && typeof data === 'object' && 'data' in data && 'success' in data) {
    return data as T;
  }

  return data as T;
};
