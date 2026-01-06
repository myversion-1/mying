"use client";

import { Section } from "../../components/Section";
import { ProductGrid } from "../../components/ProductGrid";
import { getProducts, copy, type Product } from "../../content/copy";
import type { Lang } from "../../components/language";

interface ProductsContentClientProps {
  products: Product[];
  searchQuery: string;
  lang: Lang;
}

/**
 * Client Component for Products Content
 * Handles client-side interactivity (search, filtering)
 * Receives pre-rendered data from server component for optimal LCP
 */
export function ProductsContentClient({
  products,
  searchQuery,
  lang,
}: ProductsContentClientProps) {
  const c = copy(lang);

  return (
    <Section
      title={c.productsTitle}
      subtitle={c.productsSubtitle}
    >
      <ProductGrid items={products} initialSearchQuery={searchQuery} />
    </Section>
  );
}


