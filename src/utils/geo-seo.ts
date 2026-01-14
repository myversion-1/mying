import type { Lang } from "../components/language";
import type { Metadata } from "next";

/**
 * Geographic targeting configuration for SEO
 * Maps languages to their primary target countries/regions
 * This helps search engines understand which country/region each language version targets
 */
export const GEO_TARGETING: Record<Lang, {
  country: string;           // ISO 3166-1 alpha-2 country code
  countryName: string;       // Full country name
  region: string;            // Region name (for search engines)
  hreflang: string;         // Full hreflang code (e.g., "zh-CN")
  htmlLang: string;         // HTML lang attribute (e.g., "zh-CN")
  locale: string;           // Locale code for OpenGraph (e.g., "zh_CN")
}> = {
  en: {
    country: "US",
    countryName: "United States",
    region: "Global",
    hreflang: "en-US",
    htmlLang: "en",
    locale: "en_US",
  },
  zh: {
    country: "CN",
    countryName: "China",
    region: "Asia",
    hreflang: "zh-CN",
    htmlLang: "zh-CN",
    locale: "zh_CN",
  },
  ja: {
    country: "JP",
    countryName: "Japan",
    region: "Asia",
    hreflang: "ja-JP",
    htmlLang: "ja",
    locale: "ja_JP",
  },
  ko: {
    country: "KR",
    countryName: "South Korea",
    region: "Asia",
    hreflang: "ko-KR",
    htmlLang: "ko",
    locale: "ko_KR",
  },
  th: {
    country: "TH",
    countryName: "Thailand",
    region: "Asia",
    hreflang: "th-TH",
    htmlLang: "th",
    locale: "th_TH",
  },
  vi: {
    country: "VN",
    countryName: "Vietnam",
    region: "Asia",
    hreflang: "vi-VN",
    htmlLang: "vi",
    locale: "vi_VN",
  },
  id: {
    country: "ID",
    countryName: "Indonesia",
    region: "Asia",
    hreflang: "id-ID",
    htmlLang: "id",
    locale: "id_ID",
  },
  hi: {
    country: "IN",
    countryName: "India",
    region: "Asia",
    hreflang: "hi-IN",
    htmlLang: "hi",
    locale: "hi_IN",
  },
  ar: {
    country: "SA",
    countryName: "Saudi Arabia",
    region: "Middle East",
    hreflang: "ar-SA",
    htmlLang: "ar",
    locale: "ar_SA",
  },
  ru: {
    country: "RU",
    countryName: "Russia",
    region: "Europe/Asia",
    hreflang: "ru-RU",
    htmlLang: "ru",
    locale: "ru_RU",
  },
  es: {
    country: "ES",
    countryName: "Spain",
    region: "Europe",
    hreflang: "es-ES",
    htmlLang: "es",
    locale: "es_ES",
  },
};

/**
 * Get geographic targeting info for a language
 */
export function getGeoInfo(lang: Lang) {
  return GEO_TARGETING[lang];
}

/**
 * Generate geographic targeting meta tags for SEO
 * These help search engines understand which country/region the page targets
 * 
 * @param lang - The language code
 * @returns Additional meta tags for geographic targeting
 */
export function generateGeoMetaTags(
  lang: Lang
): Metadata["other"] {
  const geo = getGeoInfo(lang);
  
  return {
    "geo.region": geo.country,
    "geo.placename": geo.countryName,
    "geo.position": "", // Can be filled with coordinates if needed
    "ICBM": "", // Can be filled with coordinates if needed
    "DC.title": "", // Dublin Core title (optional)
    "DC.language": geo.htmlLang,
    "DC.coverage": geo.countryName,
    "distribution": geo.region,
    "target": geo.countryName,
    // Additional geographic signals
    "content-language": geo.htmlLang,
    "content-location": geo.country,
  };
}

/**
 * Generate enhanced hreflang alternates with geographic targeting
 * Includes both language-only and language-region combinations for better SEO
 * 
 * @param path - The route path (e.g., "/products/nuclear-energy-crisis")
 * @param includeXDefault - Whether to include x-default (defaults to true)
 * @returns Enhanced metadata alternates object
 */
export function generateEnhancedHreflangAlternates(
  path: string,
  includeXDefault: boolean = true
): Metadata["alternates"] {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.miyingrides.com";
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  const languages: Record<string, string> = {};
  
  // Add all language-region combinations
  Object.entries(GEO_TARGETING).forEach(([lang, geo]) => {
    const url = lang === "en"
      ? `${baseUrl}/${cleanPath}`
      : `${baseUrl}/${cleanPath}?lang=${lang}`;
    
    // Add language-region combination (e.g., "zh-CN")
    languages[geo.hreflang] = url;
    
    // Also add language-only for broader targeting (e.g., "zh")
    // This helps when the same language is used in multiple countries
    if (!languages[lang]) {
      languages[lang] = url;
    }
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
 * Get HTML lang attribute for a given language
 * This should be used in the <html> tag
 */
export function getHtmlLang(lang: Lang): string {
  return GEO_TARGETING[lang].htmlLang;
}

/**
 * Get HTML dir attribute for a given language
 * Returns "rtl" for Arabic, "ltr" for all others
 */
export function getHtmlDir(lang: Lang): "ltr" | "rtl" {
  return lang === "ar" ? "rtl" : "ltr";
}

/**
 * Get OpenGraph locale for a given language
 */
export function getOpenGraphLocale(lang: Lang): string {
  return GEO_TARGETING[lang].locale;
}

/**
 * Detect language from URL search params or headers
 * This is used for server-side language detection
 */
export function detectLanguageFromRequest(
  searchParams?: { lang?: string },
  headers?: Headers
): Lang {
  // Priority 1: URL search params
  if (searchParams?.lang) {
    const lang = searchParams.lang as Lang;
    if (lang in GEO_TARGETING) {
      return lang;
    }
  }
  
  // Priority 2: Accept-Language header
  if (headers) {
    const acceptLanguage = headers.get("accept-language");
    if (acceptLanguage) {
      // Parse Accept-Language header (e.g., "en-US,en;q=0.9,zh-CN;q=0.8")
      const languages = acceptLanguage
        .split(",")
        .map(lang => lang.split(";")[0].trim().toLowerCase());
      
      // Check for exact matches first
      for (const langHeader of languages) {
        // Check for language-region (e.g., "zh-cn")
        const langRegion = langHeader.split("-")[0] as Lang;
        if (langRegion in GEO_TARGETING) {
          return langRegion;
        }
      }
    }
  }
  
  // Default to English
  return "en";
}

