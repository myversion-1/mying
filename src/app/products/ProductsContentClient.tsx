"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Section } from "../../components/Section";
import { ProductGridSkeleton } from "../../components/Skeleton";
import { getProducts, copy, type Product } from "../../content/copy";
import type { Lang } from "../../components/language";

// Code splitting: Lazy load ProductGrid to reduce initial bundle size
// ProductGrid is a heavy component with filtering logic, so it's loaded on demand
const ProductGrid = dynamic(() => import("../../components/ProductGrid").then((mod) => ({ default: mod.ProductGrid })), {
  loading: () => <ProductGridSkeleton count={6} />,
  ssr: false, // Disable SSR for client-side interactivity components
});

interface ProductsContentClientProps {
  products: Product[];
  searchQuery: string;
  categoryFilter?: string; // Legacy support
  mainCategoryFilter?: string;
  subCategoryFilter?: string;
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
  categoryFilter,
  mainCategoryFilter,
  subCategoryFilter,
  lang,
}: ProductsContentClientProps) {
  const c = copy(lang);

  return (
    <Section
      title={c.productsTitle}
      subtitle={c.productsSubtitle}
    >
      <Suspense fallback={<ProductGridSkeleton count={6} />}>
        <ProductGrid 
          items={products} 
          initialSearchQuery={searchQuery}
          initialCategoryFilter={categoryFilter}
          initialMainCategoryFilter={mainCategoryFilter}
          initialSubCategoryFilter={subCategoryFilter}
        />
      </Suspense>
    </Section>
  );
}





