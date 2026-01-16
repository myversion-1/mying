/**
 * Image utility functions for handling image paths with special characters
 * (e.g., Chinese filenames) in Next.js Image component
 */

/**
 * Encode image path to handle special characters (especially Chinese characters)
 * Next.js Image component requires properly encoded URLs for optimization
 *
 * @param imagePath - Image path (e.g., "/products/米盈游乐设备产品介绍 conv 0.jpeg")
 * @returns Encoded image path that can be safely used with Next.js Image component
 */
export function encodeImagePath(imagePath: string): string {
  if (!imagePath) return imagePath;

  // If path already starts with /, split it into base path and filename
  if (imagePath.startsWith('/')) {
    const parts = imagePath.split('/');
    const basePath = parts.slice(0, -1).join('/'); // Everything except the filename
    const filename = parts[parts.length - 1]; // The filename

    // Encode only the filename part, keep the base path as is
    const encodedFilename = encodeURIComponent(filename);

    // Reconstruct the path
    return `${basePath}/${encodedFilename}`;
  }

  // If no leading slash, encode the entire path
  return encodeURIComponent(imagePath);
}

/**
 * Decode image path (reverse of encodeImagePath)
 * Useful for displaying original filenames
 *
 * @param encodedPath - Encoded image path
 * @returns Decoded image path
 */
export function decodeImagePath(encodedPath: string): string {
  if (!encodedPath) return encodedPath;

  try {
    return decodeURIComponent(encodedPath);
  } catch (e) {
    // If decoding fails, return original path
    return encodedPath;
  }
}

/**
 * Check if image path contains non-ASCII characters (e.g., Chinese)
 *
 * @param imagePath - Image path to check
 * @returns true if path contains non-ASCII characters
 */
export function hasNonASCIICharacters(imagePath: string): boolean {
  if (!imagePath) return false;

  // Check if path contains any non-ASCII characters
  return /[^\x00-\x7F]/.test(imagePath);
}

/**
 * Generate a blur placeholder data URL for improved perceived performance
 * This creates a subtle gradient placeholder that loads instantly
 *
 * @param color - Base color for the blur placeholder (default: dark slate)
 * @returns Base64 encoded SVG data URL for blur placeholder
 */
export function generateBlurPlaceholder(color: string = '1e293b'): string {
  // Create a subtle gradient SVG placeholder
  const svg = `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#${color};stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:#${color};stop-opacity:0.5" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `.trim();

  // Convert to base64
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Generate a custom blur placeholder for product images
 * Uses a consistent color scheme for product images
 *
 * @returns Base64 encoded SVG data URL
 */
export function getProductImageBlurPlaceholder(): string {
  return generateBlurPlaceholder('0f172a'); // Dark slate color
}

/**
 * Optimized image loading props for Next.js Image component
 * Returns a set of props that improve performance and user experience
 *
 * @param options - Image loading options
 * @returns Props object to spread into Next.js Image component
 */
export function getOptimizedImageProps(options: {
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  width?: number;
  height?: number;
}) {
  const {
    priority = false,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    quality = 75,
    fill = false,
    width,
    height,
  } = options;

  return {
    sizes,
    quality,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    fetchPriority: priority ? 'high' : 'auto',
    placeholder: 'blur' as const,
    blurDataURL: getProductImageBlurPlaceholder(),
    ...(fill ? { fill: true } : { width, height }),
  };
}

/**
 * Determine if an image should be prioritized based on its position
 * Images in the first viewport (above fold) should have priority
 *
 * @param index - Index of the image in a list
 * @param itemsPerRow - Number of items per row (default: 3)
 * @returns true if image should be loaded with priority
 */
export function shouldPrioritizeImage(index: number, itemsPerRow: number = 3): boolean {
  // Prioritize first 6 images (2 rows on desktop, more on mobile)
  return index < itemsPerRow * 2;
}

















