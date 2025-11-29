import { unstable_serialize } from 'swr';
import { serverFetcher } from './fetcher';

/**
 * Utility function to serialize SWR keys for SSR
 * Use this when pre-fetching data with complex keys (arrays, functions)
 */
export const serializeKey = (
  key: string | string[] | (() => string | null),
) => {
  if (typeof key === 'function') {
    const resolvedKey = key();
    return resolvedKey ? unstable_serialize([resolvedKey]) : null;
  }
  if (Array.isArray(key)) {
    return unstable_serialize(key);
  }
  return key;
};

/**
 * Pre-fetch data for SSR/SSG
 * Returns data in the format expected by SWR fallback
 */
export const prefetchData = async <T = unknown>(
  key: string,
  options?: RequestInit,
): Promise<Record<string, T>> => {
  try {
    const data = await serverFetcher<T>(key, options);

    return {
      [key]: data,
    };
  } catch (error) {
    console.error(`Error prefetching data for key: ${key}`, error);
    return {};
  }
};

/**
 * Pre-fetch multiple data sources for SSR/SSG
 */
export const prefetchMultiple = async (
  keys: string[],
): Promise<Record<string, unknown>> => {
  const promises = keys.map((key) => prefetchData(key));
  const results = await Promise.all(promises);
  return Object.assign({}, ...results);
};

/**
 * Create fallback object for SWR with serialized keys
 */
export const createFallback = <T = unknown>(
  key: string | string[],
  data: T,
): Record<string, T> => {
  const serializedKey = Array.isArray(key) ? unstable_serialize(key) : key;
  return {
    [serializedKey]: data,
  };
};
