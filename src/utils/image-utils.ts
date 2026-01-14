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





