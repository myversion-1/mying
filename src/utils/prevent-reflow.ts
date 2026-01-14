/**
 * Prevent Forced Reflow Utilities
 * 
 * Functions to prevent forced reflows by batching DOM reads and writes
 */

/**
 * Batch DOM reads to prevent forced reflows
 * Use this when you need to read multiple geometric properties
 */
export function batchDOMReads<T>(reads: () => T): T {
  // Use requestAnimationFrame to batch reads
  // This ensures all reads happen before the next paint
  let result: T;
  requestAnimationFrame(() => {
    result = reads();
  });
  return result!;
}

/**
 * Cache geometric properties to avoid repeated queries
 * Use this for properties that don't change frequently
 */
export class GeometricCache {
  private cache = new Map<string, { value: any; timestamp: number }>();
  private readonly TTL = 100; // Cache for 100ms

  get(key: string, getter: () => any): any {
    const cached = this.cache.get(key);
    const now = Date.now();

    if (cached && (now - cached.timestamp) < this.TTL) {
      return cached.value;
    }

    const value = getter();
    this.cache.set(key, { value, timestamp: now });
    return value;
  }

  clear(): void {
    this.cache.clear();
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }
}

/**
 * Use requestAnimationFrame to batch DOM operations
 * Reads happen in one frame, writes in the next
 */
export function batchDOMOperations<T>(
  reads: () => T,
  writes: (readResult: T) => void
): void {
  // Read in current frame
  const readResult = reads();

  // Write in next frame
  requestAnimationFrame(() => {
    writes(readResult);
  });
}

/**
 * Throttle geometric property queries
 * Use this to limit how often you query DOM properties
 */
export function throttleGeometricQuery<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 16 // ~60fps
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  return function throttled(...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= delay) {
      lastCall = now;
      func(...args);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        func(...args);
      }, delay - timeSinceLastCall);
    }
  };
}

/**
 * Cache getBoundingClientRect results
 * Use this to avoid repeated calls to getBoundingClientRect
 */
const rectCache = new GeometricCache();

export function getCachedBoundingClientRect(
  element: Element,
  cacheKey?: string
): DOMRect {
  const key = cacheKey || `rect-${element.getAttribute('data-id') || 'default'}`;
  
  return rectCache.get(key, () => {
    return element.getBoundingClientRect();
  });
}

/**
 * Clear geometric cache (call on resize or layout changes)
 */
export function clearGeometricCache(): void {
  rectCache.clear();
}

