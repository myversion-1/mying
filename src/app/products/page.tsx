"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { ProductGrid } from "../../components/ProductGrid";
import { StatsCard } from "../../components/StatsCard";
import { ProductGridSkeleton } from "../../components/Skeleton";
import { getProducts, copy } from "../../content/copy";
import { useLanguage } from "../../components/language";

function ProductsContent() {
  const { lang } = useLanguage();
  const c = copy(lang);
  const products = getProducts(lang);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  return (
    <Section
      title={c.productsTitle}
      subtitle={c.productsSubtitle}
    >
      <ProductGrid items={products} initialSearchQuery={searchQuery} />
    </Section>
  );
}

export default function ProductsPage() {
  const { lang } = useLanguage();
  const c = copy(lang);
  const products = getProducts(lang);

  // Patent statistics for product page
  const patentCount = lang === "zh" ? "15+" : "15+";
  const patentLabel = lang === "zh" ? "专利" : "Patents";
  const patentDescription = lang === "zh" ? "受保护的创新设计" : "Protected innovative designs";

  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
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

      {/* Patent Statistics Banner - Arrowy Style */}
      <div className="mx-auto max-w-6xl px-4 md:px-8">
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
          <div className="hidden text-sm text-white/70 md:block">
            {patentDescription}
          </div>
        </div>
      </div>

      <Suspense fallback={
        <Section
          title={c.productsTitle}
          subtitle={c.productsSubtitle}
        >
          <ProductGridSkeleton count={6} />
        </Section>
      }>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
