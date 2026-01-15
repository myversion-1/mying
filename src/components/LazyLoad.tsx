"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

/**
 * LazyLoad Component
 * Uses Intersection Observer to delay loading content until it's about to enter viewport
 * This prevents blocking the main thread during initial render
 * 
 * @param children - Content to lazy load
 * @param fallback - Fallback content to show while loading
 * @param rootMargin - Margin around viewport to trigger loading (default: "100px")
 * @param threshold - Percentage of element visible to trigger (default: 0.1)
 */
interface LazyLoadProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

export function LazyLoad({
  children,
  fallback = <div className="h-64 animate-pulse rounded-2xl bg-[var(--surface-elevated)]" />,
  rootMargin = "100px",
  threshold = 0.1,
  className = "",
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Use requestIdleCallback to defer Intersection Observer setup
    // This prevents blocking the main thread during initial render
    const setupObserver = () => {
      // Check if Intersection Observer is supported
      if (!("IntersectionObserver" in window)) {
        // Fallback: load immediately if Intersection Observer is not supported
        setShouldLoad(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              // Use setTimeout to defer actual loading to next event loop
              // This ensures the main thread is not blocked
              setTimeout(() => {
                setShouldLoad(true);
              }, 0);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin,
          threshold,
        }
      );

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    };

    // Use requestIdleCallback if available, otherwise use setTimeout
    if ("requestIdleCallback" in window) {
      const idleCallbackId = requestIdleCallback(setupObserver, { timeout: 2000 });
      return () => {
        cancelIdleCallback(idleCallbackId);
      };
    } else {
      // Fallback for browsers without requestIdleCallback
      const timeoutId = setTimeout(setupObserver, 0);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [rootMargin, threshold]);

  return (
    <div ref={ref} className={className}>
      {shouldLoad ? children : isVisible ? fallback : <div className="min-h-[200px]" />}
    </div>
  );
}

/**
 * useLazyLoad Hook
 * Custom hook for lazy loading with Intersection Observer
 * Useful for components that need more control over loading behavior
 */
export function useLazyLoad(options?: {
  rootMargin?: string;
  threshold?: number;
  enabled?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { rootMargin = "100px", threshold = 0.1, enabled = true } = options || {};

  useEffect(() => {
    if (!enabled) {
      setShouldLoad(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Defer loading to next event loop to avoid blocking main thread
            setTimeout(() => {
              setShouldLoad(true);
            }, 0);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    // Use requestIdleCallback to defer observer setup
    const setupObserver = () => {
      observer.observe(element);
    };

    if ("requestIdleCallback" in window) {
      const idleCallbackId = requestIdleCallback(setupObserver, { timeout: 2000 });
      return () => {
        cancelIdleCallback(idleCallbackId);
        observer.disconnect();
      };
    } else {
      const timeoutId = setTimeout(setupObserver, 0);
      return () => {
        clearTimeout(timeoutId);
        observer.disconnect();
      };
    }
  }, [rootMargin, threshold, enabled]);

  return { ref, isVisible, shouldLoad };
}












