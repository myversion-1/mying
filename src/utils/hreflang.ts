import type { Lang } from "../components/language";
import type { Metadata } from "next";
import { GEO_TARGETING, generateEnhancedHreflangAlternates } from "./geo-seo";

/**
 * Supported languages for hreflang tags
 * Matches the languages defined in src/components/language.tsx
 */
export const SUPPORTED_LANGUAGES: Lang[] = [
  "en",
  "zh",
  "ar",
  "ru",
  "ja",
  "ko",
  "th",
  "vi",
  "id",
  "hi",
  "es",
];

/**
 * Language code mapping for hreflang tags
 * Maps internal language codes to standard hreflang format
 * @deprecated Use GEO_TARGETING from geo-seo.ts instead for better geographic targeting
 */
export const HREFLANG_CODE_MAP: Record<Lang, string> = {
  en: "en-US",
  zh: "zh-CN",
  ar: "ar-SA",
  ru: "ru-RU",
  ja: "ja-JP",
  ko: "ko-KR",
  th: "th-TH",
  vi: "vi-VN",
  id: "id-ID",
  hi: "hi-IN",
  es: "es-ES",
};

/**
 * Get hreflang code for a language (using geographic targeting)
 */
export function getHreflangCode(lang: Lang): string {
  return GEO_TARGETING[lang].hreflang;
}

/**
 * Generate hreflang alternates for a given route path
 * 
 * Enhanced version that includes both language-only and language-region combinations
 * for better SEO targeting in Asian markets.
 * 
 * @param path - The route path (e.g., "/products/nuclear-energy-crisis")
 * @param includeXDefault - Whether to include x-default (defaults to true)
 * @returns Metadata alternates object for Next.js metadata
 * 
 * @example
 * ```typescript
 * const alternates = generateHreflangAlternates("/products/nuclear-energy-crisis");
 * // Returns: { languages: { "en-US": "...", "zh-CN": "...", "zh": "...", ..., "x-default": "..." } }
 * ```
 */
export function generateHreflangAlternates(
  path: string,
  includeXDefault: boolean = true
): Metadata["alternates"] {
  // Use the enhanced version from geo-seo.ts
  return generateEnhancedHreflangAlternates(path, includeXDefault);
}

/**
 * Generate product slug from product name
 * Creates URL-friendly slug from product name
 * 
 * @param name - Product name (can be English or Chinese)
 * @returns URL-friendly slug
 * 
 * @example
 * ```typescript
 * generateProductSlug("Nuclear energy crisis") // "nuclear-energy-crisis"
 * generateProductSlug("核能危机") // "核能危机" (keeps Chinese as-is)
 * ```
 */
export function generateProductSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}




















