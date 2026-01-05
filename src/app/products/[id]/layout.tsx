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

  // Build enhanced title with category keyword
  const title = `${product.name} - ${product.category} Manufacturer | Miying Amusement`;

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

  // Create description with technical specs naturally integrated
  let description: string;
  if (product.positioning) {
    // If positioning exists, integrate specs into it
    const specsText = specs.length >= 2 
      ? ` Features ${specs.slice(0, 2).join(" and ")}.`
      : specs.length === 1
      ? ` Features ${specs[0]}.`
      : "";
    description = `${product.positioning}${specsText}`;
  } else {
    // Build description from scratch with specs
    const specsText = specs.length >= 2
      ? ` Features ${specs.slice(0, 2).join(" and ")}.`
      : specs.length === 1
      ? ` Features ${specs[0]}.`
      : "";
    description = `Discover ${product.name}, a premium ${product.category.toLowerCase()} from Miying Amusement Equipment.${specsText} Professional manufacturer of amusement rides and theme park equipment.`;
  }

  // Ensure description doesn't exceed recommended length (155-160 chars for optimal SEO)
  if (description.length > 160) {
    description = description.substring(0, 157) + "...";
  }

  return {
    title: title,
    description: description,
    keywords: `${product.name}, ${product.category}, ${product.category.toLowerCase()} manufacturer, amusement ride, theme park equipment, Miying Amusement`,
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
    alternates: alternates,
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






