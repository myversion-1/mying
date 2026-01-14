/**
 * CSS Loading Optimization Utilities
 * 
 * Functions to optimize CSS loading and reduce critical path latency
 */

/**
 * Preload critical CSS files
 * Use this to preload CSS that's needed for above-the-fold content
 */
export function preloadCriticalCSS(href: string): React.ReactElement {
  return (
    <link
      rel="preload"
      href={href}
      as="style"
      onLoad={(e) => {
        // Convert preload to stylesheet when loaded
        const link = e.currentTarget as HTMLLinkElement;
        link.rel = 'stylesheet';
      }}
    />
  );
}

/**
 * Load non-critical CSS asynchronously
 * Use this for CSS that's not needed for initial render
 */
export function loadNonCriticalCSS(href: string): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print'; // Load as print stylesheet (non-blocking)
  link.onload = () => {
    // Switch to screen media after load
    link.media = 'all';
  };
  document.head.appendChild(link);
}

/**
 * Defer CSS loading until after page load
 * Use this for CSS that's only needed after user interaction
 */
export function deferCSS(href: string, delay: number = 0): void {
  if (typeof window === 'undefined') return;

  const loadCSS = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  if (delay > 0) {
    setTimeout(loadCSS, delay);
  } else {
    // Load after page load
    if (document.readyState === 'complete') {
      loadCSS();
    } else {
      window.addEventListener('load', loadCSS);
    }
  }
}

/**
 * Check if CSS file is already loaded
 */
export function isCSSLoaded(href: string): boolean {
  if (typeof window === 'undefined') return false;

  const links = document.querySelectorAll('link[rel="stylesheet"]');
  return Array.from(links).some(
    (link) => (link as HTMLLinkElement).href === href
  );
}

