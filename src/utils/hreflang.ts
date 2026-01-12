import type { Lang } from "../components/language";
import type { Metadata } from "next";

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
 * Generate hreflang alternates for a given route path
 * 
 * @param path - The route path (e.g., "/products/nuclear-energy-crisis")
 * @param includeXDefault - Whether to include x-default (defaults to true)
 * @returns Metadata alternates object for Next.js metadata
 * 
 * @example
 * ```typescript
 * const alternates = generateHreflangAlternates("/products/nuclear-energy-crisis");
 * // Returns: { languages: { "en-US": "...", "zh-CN": "...", ..., "x-default": "..." } }
 * ```
 */
export function generateHreflangAlternates(
  path: string,
  includeXDefault: boolean = true
): Metadata["alternates"] {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mying.vercel.app";

  // Remove leading slash if present for consistent URL building
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Build language alternates object
  const languages: Record<string, string> = {};

  // Add all language variants
  SUPPORTED_LANGUAGES.forEach((lang) => {
    const hreflangCode = HREFLANG_CODE_MAP[lang];
    // For English (default), use base URL without lang parameter
    // For other languages, use ?lang= parameter
    const url =
      lang === "en"
        ? `${baseUrl}/${cleanPath}`
        : `${baseUrl}/${cleanPath}?lang=${lang}`;
    languages[hreflangCode] = url;
  });

  // Add x-default pointing to English version
  if (includeXDefault) {
    languages["x-default"] = `${baseUrl}/${cleanPath}`;
  }

  return {
    languages,
  };
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

















