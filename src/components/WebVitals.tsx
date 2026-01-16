"use client";

/**
 * Web Vitals Component
 * Tracks and reports Core Web Vitals metrics for performance monitoring
 */

import { useEffect } from "react";
import {
  onCLS,
  onFID,
  onFCP,
  onLCP,
  onTTFB,
  onINP,
  type Metric,
} from "web-vitals";
import { reportWebVitals } from "@/lib/performance";

interface WebVitalsProps {
  /** Enable debug mode to show console logs */
  debug?: boolean;
}

/**
 * WebVitals - Client-side performance monitoring component
 * Tracks Core Web Vitals: CLS, FID, FCP, LCP, TTFB, INP
 */
export function WebVitals({ debug = false }: WebVitalsProps) {
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    // Metric handler that reports to analytics
    const handleMetric = (metric: Metric) => {
      // Report to analytics service
      reportWebVitals({
        id: metric.id,
        name: metric.name,
        value: metric.value,
        delta: metric.delta,
        rating: metric.rating as "good" | "needs-improvement" | "poor",
        navigationType: metric.navigationType,
      });

      // Optional: Debug logging
      if (debug) {
        console.log("[Web Vitals]", {
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
        });
      }
    };

    // Track all Core Web Vitals
    try {
      onCLS(handleMetric);
      onFID(handleMetric);
      onFCP(handleMetric);
      onLCP(handleMetric);
      onTTFB(handleMetric);
      onINP(handleMetric);
    } catch (error) {
      console.error("Failed to track Web Vitals:", error);
    }
  }, [debug]);

  // This component doesn't render anything
  return null;
}

/**
 * WebVitalsDebugPanel - Development-only debug panel
 * Shows real-time Web Vitals metrics during development
 */
export function WebVitalsDebugPanel() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-lg p-4 text-xs font-mono max-w-xs">
      <div className="font-semibold mb-2 text-[var(--text-primary)]">
        Web Vitals Debug
      </div>
      <div className="text-[var(--text-secondary)]">
        Check browser console for detailed metrics
      </div>
      <div className="mt-2 pt-2 border-t border-[var(--border)] text-[var(--text-secondary)]">
        Metrics: CLS, FID, FCP, LCP, TTFB, INP
      </div>
    </div>
  );
}
