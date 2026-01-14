import { Suspense } from "react";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { ProductGrid } from "../../components/ProductGrid";
import { ProductGridSkeleton } from "../../components/Skeleton";
import { getProducts, copy } from "../../content/copy";
import type { Lang } from "../../components/language";
import { StructuredDataServer } from "../../components/StructuredDataServer";
import { ProductsContentClient } from "./ProductsContentClient";
import { fetchProductData } from "../../utils/product-data-fetcher";

/**
 * ISR Configuration
 * Revalidate every 60 seconds for optimal performance and LCP improvement
 * This enables Incremental Static Regeneration (ISR)
 */
export const revalidate = 60;

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    lang?: string;
    category?: string; // Legacy support
    mainCategory?: string;
    subCategory?: string;
  }>;
}

/**
 * Optimized Products Page with ISR
 * 
 * Performance Optimizations:
 * - ISR with 60s revalidation for fast page loads
 * - Server-side rendering for better LCP
 * - Parallel data fetching structure (ready for future async operations)
 * - Static generation at build time with incremental updates
 */
export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const lang = (params.lang as Lang) || "en";
  const searchQuery = params.search || "";
  const categoryFilter = params.category || ""; // Legacy support
  const mainCategoryFilter = params.mainCategory || "";
  const subCategoryFilter = params.subCategory || "";
  const c = copy(lang);

  // Optimized parallel data fetching using Promise.all()
  // Fetches products, metadata, and certification status in parallel
  // This reduces total data fetching time and improves LCP
  const { products, metadata, certifications } = await fetchProductData(lang);

  // Patent statistics (from parallel fetched metadata)
  const patentCount = metadata.patentCount > 0 ? `${metadata.patentCount}+` : "15+";
  const patentLabel = lang === "zh" ? "专利" : "Patents";
  const patentDescription = lang === "zh" ? "受保护的创新设计" : "Protected innovative designs";

  return (
    <>
      {/* Structured Data for SEO - Server Component */}
      <StructuredDataServer 
        type="products" 
        lang={lang}
        products={products.slice(0, 10).map(p => ({
          name: p.name,
          category: p.category,
          image: p.image,
          description: p.positioning,
        }))}
      />
      
      <div className="space-y-12">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <div className="my-10">
            <PageHero
              headline={c.productsTitle}
              subhead={c.productsSubtitle}
              ctaPrimaryHref="/contact"
              ctaSecondaryHref="/visit"
              badge={c.pageBadges.catalog}
            />
          </div>
        </div>

        {/* Patent Statistics Banner */}
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <div className="flex items-center justify-center gap-8 rounded-2xl border border-[#7df6ff]/20 bg-gradient-to-r from-[#7df6ff]/10 to-[#00eaff]/10 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7df6ff]/20 text-[#7df6ff]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold text-[#00eaff]">{patentCount}</div>
                <div className="text-lg font-semibold text-white">{patentLabel}</div>
              </div>
            </div>
            <div className="hidden h-12 w-px bg-white/20 md:block" />
            <div className="hidden text-sm text-[var(--dark-bg-text-secondary)] md:block">
              {patentDescription}
            </div>
          </div>
        </div>

        {/* Products Grid - Client Component for interactivity */}
        <Suspense fallback={
          <Section
            title={c.productsTitle}
            subtitle={c.productsSubtitle}
          >
            <ProductGridSkeleton count={6} />
          </Section>
        }>
          <ProductsContentClient 
            products={products} 
            searchQuery={searchQuery}
            categoryFilter={categoryFilter}
            mainCategoryFilter={mainCategoryFilter}
            subCategoryFilter={subCategoryFilter}
            lang={lang}
          />
        </Suspense>
      </div>
    </>
  );
}
