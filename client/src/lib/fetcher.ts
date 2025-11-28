/**
 * Fetcher function for SWR
 * Handles API requests with proper error handling
 */
export const fetcher = async <T = unknown>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

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
  if (data && typeof data === 'object' && 'data' in data) {
    return data.data as T;
  }

  return data as T;
};

/**
 * Server-side fetcher for SSR
 * Use this in getStaticProps or getServerSideProps
 */
export const serverFetcher = async <T = unknown>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    // Disable cache for server-side requests to get fresh data
    cache: 'no-store',
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
  if (data && typeof data === 'object' && 'data' in data) {
    return data.data as T;
  }

  return data as T;
};
