import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  isLoading: boolean;
  loadMore: () => void;
}

/**
 * Custom hook for infinite scroll functionality
 * Handles Intersection Observer setup and management
 */
export const useInfiniteScroll = ({
  hasMore,
  isLoading,
  loadMore,
}: UseInfiniteScrollOptions) => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const hasMoreRef = useRef(hasMore);
  const isLoadingRef = useRef(isLoading);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Keep refs in sync with state
  useEffect(() => {
    hasMoreRef.current = hasMore;
    isLoadingRef.current = isLoading;
  }, [hasMore, isLoading]);

  // Set up observer when element is available
  const setupObserver = useCallback(
    (element: HTMLDivElement) => {
      if (!element) return;

      // Clean up existing observer if any
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              entry.isIntersecting &&
              hasMoreRef.current &&
              !isLoadingRef.current
            ) {
              loadMore();
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '100px', // Trigger 100px before the element is visible
        },
      );

      observer.observe(element);
      observerRef.current = observer;

      // Check if element is already visible/intersecting
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight + 100; // 100px rootMargin

      // If element is already visible and we have more to load, trigger immediately
      if (isVisible && hasMoreRef.current && !isLoadingRef.current) {
        // Use setTimeout to avoid calling during render
        setTimeout(() => {
          if (hasMoreRef.current && !isLoadingRef.current) {
            loadMore();
          }
        }, 100);
      }
    },
    [loadMore],
  );

  // Use callback ref to set up observer when element is attached
  const observerCallbackRef = useCallback(
    (element: HTMLDivElement | null) => {
      observerTarget.current = element;

      if (element && hasMore) {
        // Wait a bit for layout to settle
        setTimeout(() => {
          setupObserver(element);
        }, 50);
      } else if (observerRef.current) {
        // Clean up if element is removed
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    },
    [hasMore, setupObserver],
  );

  // Clean up on unmount or when hasMore changes
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [hasMore]);

  return {
    observerCallbackRef,
  };
};

