/**
 * Modern User Agent Detection Utility
 * Uses navigator.userAgentData when available (Chrome 101+)
 * Falls back to feature detection when possible
 */

interface UserAgentData {
  brands?: Array<{ brand: string; version: string }>;
  mobile?: boolean;
  platform?: string;
}

/**
 * Get user agent information using modern API
 * @returns User agent data or null if not available
 */
export function getUserAgentData(): UserAgentData | null {
  // Check if navigator.userAgentData is available (Chrome 101+)
  if (typeof navigator !== 'undefined' && 'userAgentData' in navigator) {
    const uaData = (navigator as any).userAgentData;
    return {
      brands: uaData.brands,
      mobile: uaData.mobile,
      platform: uaData.platform,
    };
  }
  return null;
}

/**
 * Check if device is mobile using feature detection
 * More reliable than user agent string
 */
export function isMobileDevice(): boolean {
  // Use modern API if available
  const uaData = getUserAgentData();
  if (uaData?.mobile !== undefined) {
    return uaData.mobile;
  }

  // Fallback to CSS media query (most reliable)
  if (typeof window !== 'undefined') {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  return false;
}

/**
 * Check if device is touch-enabled
 * Uses feature detection instead of user agent
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

/**
 * Get browser information (if needed)
 * Prefers feature detection over user agent string
 */
export function getBrowserInfo(): {
  isMobile: boolean;
  isTouch: boolean;
  platform?: string;
} {
  return {
    isMobile: isMobileDevice(),
    isTouch: isTouchDevice(),
    platform: getUserAgentData()?.platform,
  };
}





