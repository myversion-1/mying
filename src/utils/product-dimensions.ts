/**
 * Product Dimensions Parser
 * Extracts numeric values from product height and footprint strings
 */

/**
 * Extract height value in meters from a height string
 * Examples:
 * - "5.9 m" -> 5.9
 * - "11米" -> 11
 * - "12M" -> 12
 * - "15 ft" -> 4.57 (converted from feet to meters)
 */
export function parseHeight(heightStr: string): number | null {
  if (!heightStr || heightStr === "N/A") return null;

  // Remove common text and extract number
  const cleaned = heightStr.replace(/[高H](?:度)?[:\s]*/i, "").trim();
  
  // Try to extract number with optional decimal
  const numberMatch = cleaned.match(/(\d+\.?\d*)/);
  if (!numberMatch) return null;

  let value = parseFloat(numberMatch[1]);

  // Check if it's in feet and convert to meters
  if (cleaned.toLowerCase().includes("ft") || cleaned.toLowerCase().includes("feet")) {
    value = value * 0.3048; // Convert feet to meters
  }

  return value;
}

/**
 * Extract footprint dimensions from a footprint string
 * Returns the maximum dimension (length, width, or diameter)
 * Examples:
 * - "D12M*H5.9M" -> 12 (diameter)
 * - "L16M*W10.5M*H11M" -> 16 (length, the largest)
 * - "12M x 8M" -> 12
 */
export function parseFootprint(footprintStr: string): number | null {
  if (!footprintStr || footprintStr === "N/A") return null;

  // Extract all numbers from the string
  const numbers = footprintStr.match(/(\d+\.?\d*)/g);
  if (!numbers || numbers.length === 0) return null;

  // Convert all to numbers and find the maximum (largest dimension)
  const dimensions = numbers.map((n) => parseFloat(n));
  return Math.max(...dimensions);
}

/**
 * Check if a product fits within space constraints
 */
export function productFitsConstraints(
  productHeight: string,
  productFootprint: string,
  maxCeilingHeight: number | null,
  maxFootprint: number | null
): boolean {
  // If no constraints specified, product fits
  if (maxCeilingHeight === null && maxFootprint === null) return true;

  // Check height constraint
  if (maxCeilingHeight !== null) {
    const productHeightValue = parseHeight(productHeight);
    if (productHeightValue === null) {
      // If we can't parse the height, be conservative and exclude it
      return false;
    }
    if (productHeightValue > maxCeilingHeight) {
      return false;
    }
  }

  // Check footprint constraint
  if (maxFootprint !== null) {
    const productFootprintValue = parseFootprint(productFootprint);
    if (productFootprintValue === null) {
      // If we can't parse the footprint, be conservative and exclude it
      return false;
    }
    if (productFootprintValue > maxFootprint) {
      return false;
    }
  }

  return true;
}














