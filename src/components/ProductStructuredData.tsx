"use client";

import type { Product } from "../content/copy";

interface ProductStructuredDataProps {
  product: Product;
  lang: string;
  productUrl: string;
  baseUrl?: string;
}

/**
 * Structured data (JSON-LD) for product pages
 * Provides rich results data for Google Search
 * 
 * B2B Standard Compliance:
 * - ✅ Product Schema with all required fields
 * - ✅ BreadcrumbList Schema for navigation
 * - ✅ Technical parameters (footprint, height, capacity) in additionalProperty
 * - ✅ All URLs use absolute paths
 * - ✅ Manufacturer information included
 */
export function ProductStructuredData({
  product,
  lang,
  productUrl,
  baseUrl = typeof window !== "undefined" 
    ? window.location.origin 
    : "https://mying.vercel.app",
}: ProductStructuredDataProps) {

  // Build product schema (B2B Standard: Product Schema required)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.positioning || `${product.name} - ${product.category}`,
    category: product.category,
    image: product.image ? `${baseUrl}${product.image}` : undefined,
    brand: {
      "@type": "Brand",
      name: "Miying Amusement Equipment",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Miying Amusement Equipment",
      url: baseUrl,
    },
    offers: {
      "@type": "Offer",
      availability: product.status === "New" 
        ? "https://schema.org/InStock" 
        : "https://schema.org/PreOrder",
      priceCurrency: "USD",
      price: "0", // Contact for pricing
      url: productUrl,
      seller: {
        "@type": "Organization",
        name: "Miying Amusement Equipment",
      },
    },
    // Additional properties (B2B Standard: Technical parameters required)
    // Must include footprint, height, and capacity (riders) as per b2b-catalog-standards.mdc
    ...(product.footprint && {
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Footprint",
          value: product.footprint,
        },
        {
          "@type": "PropertyValue",
          name: "Height",
          value: product.height,
        },
        {
          "@type": "PropertyValue",
          name: "Riders", // Also known as Capacity
          value: product.riders,
        },
        ...(product.year
          ? [
              {
                "@type": "PropertyValue",
                name: "Year",
                value: product.year,
              },
            ]
          : []),
      ],
    }),
  };

  // Breadcrumb schema (B2B Standard: BreadcrumbList Schema required)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${baseUrl}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

