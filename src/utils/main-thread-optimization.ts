/**
 * Main Thread Optimization Utilities
 * 
 * These utilities help prevent blocking the main thread by deferring
 * non-critical operations to idle time or next event loop.
 */

/**
 * Defer execution to next event loop using setTimeout
 * Useful for non-critical operations that can wait
 * 
 * @param callback - Function to execute
 * @param delay - Delay in milliseconds (default: 0)
 */
export function defer(callback: () => void, delay: number = 0): void {
  setTimeout(callback, delay);
}

/**
 * Execute callback during idle time using requestIdleCallback
 * Falls back to setTimeout if requestIdleCallback is not available
 * 
 * @param callback - Function to execute during idle time
 * @param timeout - Maximum time to wait before executing (default: 2000ms)
 */
export function onIdle(
  callback: () => void,
  timeout: number = 2000
): () => void {
  if ("requestIdleCallback" in window) {
    const idleCallbackId = requestIdleCallback(
      callback,
      { timeout }
    );
    return () => {
      cancelIdleCallback(idleCallbackId);
    };
  } else {
    // Fallback: use setTimeout with small delay
    const timeoutId = setTimeout(callback, 0);
    return () => {
      clearTimeout(timeoutId);
    };
  }
}

/**
 * Batch multiple operations and execute them during idle time
 * Prevents blocking the main thread with multiple synchronous operations
 * 
 * @param operations - Array of functions to execute
 * @param batchSize - Number of operations per batch (default: 5)
 */
export function batchOperations(
  operations: (() => void)[],
  batchSize: number = 5
): void {
  let currentIndex = 0;

  const processBatch = () => {
    const endIndex = Math.min(currentIndex + batchSize, operations.length);
    
    for (let i = currentIndex; i < endIndex; i++) {
      operations[i]();
    }
    
    currentIndex = endIndex;
    
    if (currentIndex < operations.length) {
      // Schedule next batch during idle time
      onIdle(processBatch);
    }
  };

  // Start processing first batch
  onIdle(processBatch);
}

/**
 * Debounce function execution
 * Prevents excessive function calls that could block the main thread
 * 
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function debounced(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Throttle function execution
 * Limits function execution rate to prevent main thread blocking
 * 
 * @param func - Function to throttle
 * @param limit - Minimum time between executions in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function throttled(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Check if main thread is busy
 * Returns true if the main thread appears to be blocked
 * 
 * @param threshold - Maximum allowed execution time in milliseconds (default: 50ms)
 */
export function isMainThreadBusy(threshold: number = 50): Promise<boolean> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    
    onIdle(() => {
      const elapsed = performance.now() - startTime;
      resolve(elapsed > threshold);
    }, threshold);
  });
}

/**
 * Execute heavy computation in chunks to avoid blocking main thread
 * 
 * @param items - Array of items to process
 * @param processor - Function to process each item
 * @param chunkSize - Number of items per chunk (default: 10)
 * @param delay - Delay between chunks in milliseconds (default: 0)
 */
export async function processInChunks<T, R>(
  items: T[],
  processor: (item: T) => R,
  chunkSize: number = 10,
  delay: number = 0
): Promise<R[]> {
  const results: R[] = [];
  
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const chunkResults = chunk.map(processor);
    results.push(...chunkResults);
    
    // Yield to main thread between chunks
    if (i + chunkSize < items.length && delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  
  return results;
}

