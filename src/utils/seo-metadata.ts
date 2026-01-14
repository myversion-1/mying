import type { Metadata } from "next";
import type { Lang } from "../components/language";
import {
  generateEnhancedHreflangAlternates,
  generateGeoMetaTags,
  getGeoInfo,
  getOpenGraphLocale,
  detectLanguageFromRequest,
} from "./geo-seo";

/**
 * Generate complete SEO metadata for a page
 * Includes hreflang tags, geographic targeting, and language-specific metadata
 * 
 * @param options - Configuration options
 * @returns Complete metadata object for Next.js
 */
export function generateSEOMetadata(options: {
  lang?: Lang;
  path?: string;
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  searchParams?: { lang?: string };
  headers?: Headers;
}): Metadata {
  const {
    lang: providedLang,
    path = "/",
    title,
    description,
    keywords,
    image,
    searchParams,
    headers,
  } = options;

  // Detect language from request if not provided
  const lang = providedLang || detectLanguageFromRequest(searchParams, headers);
  const geo = getGeoInfo(lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.miyingrides.com";

  // Build canonical URL
  const canonicalUrl = lang === "en"
    ? `${baseUrl}${path}`
    : `${baseUrl}${path}?lang=${lang}`;

  // Generate hreflang alternates
  const alternates = generateEnhancedHreflangAlternates(path, true);

  // Generate geographic meta tags
  const geoMetaTags = generateGeoMetaTags(lang);

  // Build metadata
  const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: title,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: canonicalUrl,
      ...alternates,
    },
    openGraph: {
      type: "website",
      locale: getOpenGraphLocale(lang),
      url: canonicalUrl,
      siteName: "Miying Amusement Equipment",
      title: title,
      description: description,
      images: image
        ? [
            {
              url: image.startsWith("http") ? image : `${baseUrl}${image}`,
              width: 1200,
              height: 630,
              alt: title || "Miying Amusement Equipment",
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: image ? [image.startsWith("http") ? image : `${baseUrl}${image}`] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      ...geoMetaTags,
      // Additional SEO signals
      "language": geo.htmlLang,
      "target-country": geo.country,
      "target-region": geo.region,
    } as Record<string, string>,
  };

  return metadata;
}

/**
 * Generate metadata for a page with language detection
 * This is a convenience function that automatically detects language from the request
 */
export async function generatePageMetadata(options: {
  path: string;
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  searchParams?: { lang?: string };
  headers?: Headers;
}): Promise<Metadata> {
  return generateSEOMetadata({
    ...options,
    lang: detectLanguageFromRequest(options.searchParams, options.headers),
  });
}

