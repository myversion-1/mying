/**
 * Performance monitoring utilities
 * Tracks Web Vitals and performance metrics
 */

export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  delta: number;
  rating: "good" | "needs-improvement" | "poor";
  navigationType?: string;
}

/**
 * Report Web Vitals to analytics
 * Can be extended to send to analytics services
 */
export function reportWebVitals(metric: WebVitalsMetric): void {
  // In development, log to console
  if (process.env.NODE_ENV === "development") {
    console.log("Web Vital:", metric);
  }

  // In production, send to analytics service
  if (process.env.NODE_ENV === "production") {
    // Example: Send to Vercel Analytics, Google Analytics, etc.
    // You can extend this to send to your analytics service
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", metric.name, {
        value: Math.round(metric.value),
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
      });
    }
  }
}

/**
 * Measure function execution time
 */
export function measurePerformance<T>(
  name: string,
  fn: () => T
): T {
  if (typeof window === "undefined") {
    return fn();
  }

  const start = performance.now();
  const result = fn();
  const end = performance.now();
  const duration = end - start;

  if (process.env.NODE_ENV === "development") {
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
  }

  return result;
}

/**
 * Measure async function execution time
 */
export async function measureAsyncPerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  if (typeof window === "undefined") {
    return fn();
  }

  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  const duration = end - start;

  if (process.env.NODE_ENV === "development") {
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
  }

  return result;
}



