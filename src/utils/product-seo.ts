import type { Product } from "../content/copy";
import type { Lang } from "../components/language";
import { SUPPORTED_LANGUAGES, HREFLANG_CODE_MAP } from "./hreflang";

/**
 * Generate next-seo configuration for product pages
 * Extracts metadata from multilingual product data
 */
export function generateProductSEOConfig(
  product: Product,
  productId: string,
  lang: Lang,
  baseUrl: string = "https://mying.vercel.app"
) {
  const productUrl = `${baseUrl}/products/${productId}`;

  // Build title with category keyword
  const title = `${product.name} - ${product.category} Manufacturer | Miying Amusement`;

  // Build description with technical specifications
  const specs: string[] = [];
  if (product.footprint) {
    specs.push(`footprint of ${product.footprint}`);
  }
  if (product.height) {
    specs.push(`height of ${product.height}`);
  }
  if (product.riders) {
    specs.push(`capacity for ${product.riders} riders`);
  }
  if (product.year) {
    specs.push(`year ${product.year}`);
  }

  let description: string;
  if (product.positioning) {
    const specsText = specs.length >= 2 
      ? ` Features ${specs.slice(0, 2).join(" and ")}.`
      : specs.length === 1
      ? ` Features ${specs[0]}.`
      : "";
    description = `${product.positioning}${specsText}`;
  } else {
    const specsText = specs.length >= 2
      ? ` Features ${specs.slice(0, 2).join(" and ")}.`
      : specs.length === 1
      ? ` Features ${specs[0]}.`
      : "";
    description = `Discover ${product.name}, a premium ${product.category.toLowerCase()} from Miying Amusement Equipment.${specsText} Professional manufacturer of amusement rides and theme park equipment.`;
  }

  // Ensure description doesn't exceed recommended length
  if (description.length > 160) {
    description = description.substring(0, 157) + "...";
  }

  // Generate language alternates
  const languageAlternates = SUPPORTED_LANGUAGES.map((l) => ({
    hrefLang: HREFLANG_CODE_MAP[l],
    href: l === "en" 
      ? productUrl 
      : `${productUrl}?lang=${l}`,
  }));

  // Add x-default
  languageAlternates.push({
    hrefLang: "x-default",
    href: productUrl,
  });

  return {
    title,
    description,
    canonical: productUrl,
    openGraph: {
      url: productUrl,
      title,
      description,
      type: "website",
      images: product.image
        ? [
            {
              url: `${baseUrl}${product.image}`,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : [],
      siteName: "Miying Amusement Equipment",
    },
    twitter: {
      cardType: "summary_large_image",
      title,
      description,
      image: product.image ? `${baseUrl}${product.image}` : undefined,
    },
    languageAlternates,
    additionalMetaTags: [
      {
        name: "keywords",
        content: `${product.name}, ${product.category}, ${product.category.toLowerCase()} manufacturer, amusement ride, theme park equipment, Miying Amusement`,
      },
    ],
  };
}










