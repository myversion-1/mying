import { Suspense } from "react";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { ProductGridSkeleton } from "../../components/Skeleton";
import { PatentBanner } from "../../components/PatentBanner";
import { copy } from "../../content/copy";
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
  const { products, metadata } = await fetchProductData(lang);

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
              lang={lang}
            />
          </div>
        </div>

        {/* Patent Statistics Banner */}
        <PatentBanner
          count={patentCount}
          label={patentLabel}
          description={patentDescription}
          lang={lang}
        />

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
