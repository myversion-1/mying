"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView, trackScrollDepth, trackPageExit } from "../lib/analytics";

/**
 * Analytics Provider Component
 * 
 * Handles automatic page view tracking and scroll depth monitoring.
 * Prepares the codebase for future heatmap and A/B testing integration.
 */
function AnalyticsProviderInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    
    trackPageView({
      pagePath: fullPath,
      pageTitle: document.title,
      referrer: document.referrer || undefined,
    });
  }, [pathname, searchParams]);

  // Track scroll depth
  useEffect(() => {
    let scrollDepthsTracked = new Set<number>();
    let startTime = Date.now();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

      // Track milestones: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !scrollDepthsTracked.has(milestone)) {
          scrollDepthsTracked.add(milestone);
          const timeToDepth = Date.now() - startTime;
          
          trackScrollDepth({
            depth: milestone,
            timeToDepth,
            page: pathname,
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Track page exit (time on page)
  useEffect(() => {
    const startTime = Date.now();
    let maxScrollDepth = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
      maxScrollDepth = Math.max(maxScrollDepth, scrollPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - startTime;
      
      trackPageExit({
        page: pathname,
        timeOnPage,
        scrollDepth: maxScrollDepth,
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
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

