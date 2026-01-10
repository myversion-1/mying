import { Metadata } from "next";
import { getProductBySlug } from "../../../content/products_multilingual";
import { generateHreflangAlternates } from "../../../utils/hreflang";
import type { Lang } from "../../../components/language";

interface ProductLayoutProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

/**
 * Generate metadata with hreflang tags for product pages
 * This layout handles SEO metadata since the page component is a client component
 */
export async function generateMetadata({
  params,
}: ProductLayoutProps): Promise<Metadata> {
  const { id } = await params;

  // Get product data (default to English for metadata)
  const product = getProductBySlug(id, "en");

  if (!product) {
    return {
      title: "Product Not Found | Miying Amusement Equipment",
    };
  }

  // Generate hreflang alternates for all 11 languages
  const alternates = generateHreflangAlternates(`/products/${id}`, true);

  // Build metadata
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mying.vercel.app";
  const productUrl = `${baseUrl}/products/${id}`;

  // Build high-intent B2B title: Product + Industry + Solution + Action
  // Format: "[Product Name] for [Industry] | Buy [Category] | Get Quote"
  const industryKeywords = product.mainCategory === "Family Rides" 
    ? "FECs & Theme Parks" 
    : product.mainCategory === "Thrill Rides"
    ? "Theme Parks & Amusement Parks"
    : "Entertainment Centers";
  
  const title = `Buy ${product.name} | ${product.category} for ${industryKeywords} | Get Quote`;

  // Build enhanced description with technical specifications
  // Include at least two technical specs for better keyword density
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

  // Create high-intent B2B description: Problem + Solution + Action
  // Format: "[Product] solves [problem] for [industry]. [Specs]. [Call to action]"
  let description: string;
  if (product.positioning) {
    // Use positioning as problem statement, add specs and CTA
    const specsText = specs.length >= 2 
      ? ` ${specs.slice(0, 2).join(", ")}.`
      : specs.length === 1
      ? ` ${specs[0]}.`
      : "";
    description = `${product.positioning}${specsText} Factory-tested, EN 13814 compliant. Request pricing & technical specifications.`;
  } else {
    // Build high-intent description from scratch
    const specsText = specs.length >= 2
      ? ` ${specs.slice(0, 2).join(", ")}.`
      : specs.length === 1
      ? ` ${specs[0]}.`
      : "";
    const problemStatement = product.mainCategory === "Family Rides"
      ? `Ideal for FECs and theme parks seeking reliable family entertainment.`
      : product.mainCategory === "Thrill Rides"
      ? `Perfect for theme parks requiring high-thrill attractions.`
      : `Professional ${product.category.toLowerCase()} for entertainment venues.`;
    description = `${product.name} - ${problemStatement}${specsText} Factory-tested safety, global delivery. Get instant quote & download specifications.`;
  }

  // Ensure description doesn't exceed recommended length (155-160 chars for optimal SEO)
  if (description.length > 160) {
    description = description.substring(0, 157) + "...";
  }

  return {
    title: title,
    description: description,
    keywords: `buy ${product.name}, ${product.name} price, ${product.category} manufacturer, ${product.category.toLowerCase()} for sale, ${product.mainCategory.toLowerCase()} supplier, theme park equipment, FEC rides, amusement ride quote, ${product.name} specifications`,
    openGraph: {
      title: title,
      description: description,
      url: productUrl,
      type: "website",
      images: product.image
        ? [{ url: `${baseUrl}${product.image}` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: product.image ? [`${baseUrl}${product.image}`] : undefined,
    },
    alternates: {
      canonical: productUrl, // Unique canonical URL for each product to prevent keyword cannibalization
      ...alternates, // Includes hreflang languages and x-default
    },
  };
}

/**
 * Layout component for product detail pages
 * Handles metadata generation with hreflang tags
 */
export default async function ProductLayout({
  params,
  children,
}: ProductLayoutProps) {
  // Layout just renders children - metadata is handled above
  return <>{children}</>;
}






