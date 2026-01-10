/**
 * Cache utilities for API responses
 * Provides consistent caching strategies across the application
 */

export interface CacheOptions {
  maxAge?: number; // Cache duration in seconds (default: 3600 = 1 hour)
  staleWhileRevalidate?: number; // Stale-while-revalidate duration in seconds (default: 86400 = 24 hours)
  mustRevalidate?: boolean; // Force revalidation (default: false)
  private?: boolean; // Private cache (default: false, public)
}

/**
 * Generate Cache-Control header value
 */
export function generateCacheControl(options: CacheOptions = {}): string {
  const {
    maxAge = 3600, // 1 hour default
    staleWhileRevalidate = 86400, // 24 hours default
    mustRevalidate = false,
    private: isPrivate = false,
  } = options;

  const directives: string[] = [];

  if (isPrivate) {
    directives.push("private");
  } else {
    directives.push("public");
  }

  directives.push(`s-maxage=${maxAge}`);
  directives.push(`stale-while-revalidate=${staleWhileRevalidate}`);

  if (mustRevalidate) {
    directives.push("must-revalidate");
  }

  return directives.join(", ");
}

/**
 * Cache presets for common use cases
 */
export const CachePresets = {
  // Static data that rarely changes (products, services, etc.)
  static: (): string => generateCacheControl({
    maxAge: 3600, // 1 hour
    staleWhileRevalidate: 86400, // 24 hours
  }),

  // Dynamic data that changes frequently
  dynamic: (): string => generateCacheControl({
    maxAge: 60, // 1 minute
    staleWhileRevalidate: 300, // 5 minutes
    mustRevalidate: true,
  }),

  // Real-time data (should not be cached)
  noCache: (): string => "no-cache, no-store, must-revalidate",

  // Long-term cache (for assets)
  longTerm: (): string => generateCacheControl({
    maxAge: 31536000, // 1 year
    staleWhileRevalidate: 86400, // 24 hours
  }),

  // Short-term cache (for frequently changing data)
  shortTerm: (): string => generateCacheControl({
    maxAge: 300, // 5 minutes
    staleWhileRevalidate: 600, // 10 minutes
  }),
};










