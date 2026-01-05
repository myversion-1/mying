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
 */
export function ProductStructuredData({
  product,
  lang,
  productUrl,
  baseUrl = typeof window !== "undefined" 
    ? window.location.origin 
    : "https://mying.vercel.app",
}: ProductStructuredDataProps) {

  // Build product schema
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
    // Additional properties
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
          name: "Riders",
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

  // Breadcrumb schema
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

