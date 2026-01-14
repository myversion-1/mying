"use client";

import { useEffect, Suspense, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView, trackScrollDepth, trackPageExit } from "../lib/analytics";
import { throttle, onIdle } from "../utils/main-thread-optimization";

/**
 * Analytics Provider Component
 * 
 * Handles automatic page view tracking and scroll depth monitoring.
 * Prepares the codebase for future heatmap and A/B testing integration.
 */
function AnalyticsProviderInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views - defer to idle time to reduce TBT
  useEffect(() => {
    const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    
    // Defer page view tracking to idle time to prevent blocking main thread
    onIdle(() => {
      trackPageView({
        pagePath: fullPath,
        pageTitle: document.title,
        referrer: document.referrer || undefined,
      });
    }, 1000); // Wait up to 1 second for idle time
  }, [pathname, searchParams]);

  // Track scroll depth - use throttling to reduce main thread blocking
  useEffect(() => {
    let scrollDepthsTracked = new Set<number>();
    let startTime = Date.now();
    let cachedScrollHeight = 0;
    let cachedWindowHeight = 0;

    // Cache scroll height to prevent forced reflow
    const updateCache = () => {
      cachedScrollHeight = document.documentElement.scrollHeight;
      cachedWindowHeight = window.innerHeight;
    };
    updateCache();
    window.addEventListener('resize', updateCache, { passive: true });

    // Throttle scroll handler to reduce TBT (max once per 500ms)
    const handleScroll = throttle(() => {
      // Use cached values to prevent forced reflow
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // Only update cache if scrollHeight might have changed (after a delay)
      if (cachedScrollHeight === 0) {
        cachedScrollHeight = document.documentElement.scrollHeight;
        cachedWindowHeight = window.innerHeight;
      }
      const scrollPercent = Math.round((scrollTop / (cachedScrollHeight - cachedWindowHeight)) * 100);

      // Track milestones: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !scrollDepthsTracked.has(milestone)) {
          scrollDepthsTracked.add(milestone);
          const timeToDepth = Date.now() - startTime;
          
          // Defer tracking to idle time
          onIdle(() => {
            trackScrollDepth({
              depth: milestone,
              timeToDepth,
              page: pathname,
            });
          }, 500);
        }
      });
    }, 500); // Throttle to max once per 500ms

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCache);
    };
  }, [pathname]);

  // Track page exit (time on page) - use throttling for scroll tracking
  useEffect(() => {
    const startTime = Date.now();
    let maxScrollDepth = 0;
    let cachedScrollHeight = 0;
    let cachedWindowHeight = 0;

    // Cache scroll height to prevent forced reflow
    const updateCache = () => {
      cachedScrollHeight = document.documentElement.scrollHeight;
      cachedWindowHeight = window.innerHeight;
    };
    updateCache();
    window.addEventListener('resize', updateCache, { passive: true });

    // Throttle scroll handler to reduce main thread blocking
    const handleScroll = throttle(() => {
      // Use cached values to prevent forced reflow
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (cachedScrollHeight === 0) {
        cachedScrollHeight = document.documentElement.scrollHeight;
        cachedWindowHeight = window.innerHeight;
      }
      const scrollPercent = Math.round((scrollTop / (cachedScrollHeight - cachedWindowHeight)) * 100);
      maxScrollDepth = Math.max(maxScrollDepth, scrollPercent);
    }, 200); // Throttle to max once per 200ms

    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - startTime;
      
      // Use sendBeacon for reliable tracking on page unload
      // This doesn't block the main thread
      if (navigator.sendBeacon) {
        const data = JSON.stringify({
          page: pathname,
          timeOnPage,
          scrollDepth: maxScrollDepth,
        });
        navigator.sendBeacon("/api/analytics/page-exit", data);
      } else {
        // Fallback: defer to idle time (though this may not execute on unload)
        onIdle(() => {
          trackPageExit({
            page: pathname,
            timeOnPage,
            scrollDepth: maxScrollDepth,
          });
        }, 0);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("resize", updateCache);
    };
  }, [pathname]);

  return <>{children}</>;
}

/**
 * Analytics Provider Component (wrapped in Suspense)
 * 
 * Handles automatic page view tracking and scroll depth monitoring.
 * Prepares the codebase for future heatmap and A/B testing integration.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <AnalyticsProviderInner>{children}</AnalyticsProviderInner>
    </Suspense>
  );
}

