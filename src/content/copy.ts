import type { Lang } from "../components/language";
import { productsMultilingual, getLocalizedProduct, type ProductMultilingual } from "./products_multilingual";
import { getLocalizedServices, services as defaultServices } from "./services_multilingual";
import { getCopy } from "./locales";
import type { CopyContent } from "./types";

export type Product = {
  name: string;
  category: string;
  footprint: string;
  height: string;
  riders: string;
  status: "New" | "Used";
  year?: string;
  badge?: string;
  image?: string; // Path to image in /public folder (e.g., "/products/product-name.jpg")
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

