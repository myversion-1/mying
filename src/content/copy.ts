import type { Lang } from "../components/language";
import { productsMultilingual, getLocalizedProduct, type ProductMultilingual, type ProductUsage, type VenueType, type TargetAudience } from "./products_multilingual";
import { getLocalizedServices, services as defaultServices } from "./services_multilingual";
import { getCopy } from "./locales";
import type { CopyContent } from "./types";
import type { MainCategory } from "./product-categories";

export type Product = {
  name: string;
  category: string; // Legacy category field (kept for backward compatibility)
  footprint: string;
  height: string;
  riders: string;
  status: "New" | "Used";
  year?: string;
  badge?: string;
  image?: string; // Path to image in /public folder (e.g., "/products/product-name.jpg")
  patentCount?: number; // Number of patents for this product (e.g., 2, 3, 5)
  // Multi-level category system
  mainCategory?: MainCategory;    // Main category: Family Rides, Thrill Rides, etc.
  subCategory?: string;           // Sub category ID: carousel, swing, train, etc.
  // Product type and series (similar to Arrowy's system)
  type?: "electric" | "mechanical" | "hybrid";  // Power source type
  series?: "Classic" | "Premium" | "Compact" | "Thrill" | "Family";  // Product series
  // Enhanced classification fields (multi-dimensional like Arrowy)
  usage?: ProductUsage;           // Usage type: Family Entertainment, Thrill Adventure, etc.
  venueType?: VenueType;          // Venue type: Indoor, Outdoor, Both
  targetAudience?: TargetAudience; // Target audience: Family, Adults, Kids, All Ages
  // Decision-making content fields
  positioning?: string;
  idealFor?: string[];
  notRecommendedFor?: string[];
  venueRequirements?: string;
  powerSupply?: string;
  safetyCompliance?: string[];
  deliveryInstallation?: string[];
  afterSales?: string[];
  videoLinks?: { youtube?: string; tiktok?: string };
  ctaText?: string;
};

// Get localized products based on language
export function getProducts(lang: Lang): Product[] {
  return productsMultilingual.map(p => getLocalizedProduct(p, lang));
}

// Export products array for backward compatibility (defaults to English)
export const products: Product[] = getProducts("en");

// Legacy products array removed - now using productsMultilingual from products_multilingual.ts
// Use getProducts(lang) to get localized products

// Get localized services based on language
export function getServices(lang: Lang) {
  return getLocalizedServices(lang);
}

// Export services array for backward compatibility (defaults to English)
export const services = defaultServices;

// Re-export type for backward compatibility
export type { CopyContent };

// Main copy function - now uses decoupled locale files
// All languages have been migrated to separate files
export function copy(lang: Lang): CopyContent {
  return getCopy(lang);
}

