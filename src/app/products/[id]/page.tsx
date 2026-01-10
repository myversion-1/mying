"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug } from "../../../content/products_multilingual";
import { useLanguage } from "../../../components/language";
import { copy } from "../../../content/copy";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Badge } from "../../../components/ui/Badge";
import { ProductStructuredData } from "../../../components/ProductStructuredData";
import { ProductSpecs } from "../../../components/ProductSpecs";
import { CADDownloadForm } from "../../../components/CADDownloadForm";
import { QuickQuoteForm } from "../../../components/QuickQuoteForm";
import { ProductDecisionSupport } from "../../../components/ProductDecisionSupport";
import { StickyProductCTA } from "../../../components/StickyProductCTA";
import { TrustLayer } from "../../../components/TrustLayer";
import dynamic from "next/dynamic";
import Link from "next/link";

// Code splitting: Lazy load TechnicalCertification (not critical for LCP)
const TechnicalCertification = dynamic(
  () => import("../../../components/TechnicalCertification").then((mod) => ({ default: mod.TechnicalCertification })),
  {
    loading: () => (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
      </div>
    ),
    ssr: true, // Keep SSR for SEO
  }
);

type Props = {
  params: Promise<{ id: string }>;
};

/**
 * Enhanced product detail page component
 * Displays comprehensive product information with all content sections
 */
export default function ProductPage({ params }: Props) {
  const resolvedParams = use(params);
  const { lang } = useLanguage();
  const c = copy(lang);
  const [showCADForm, setShowCADForm] = useState(false);
  
  // Get product data
  const product = getProductBySlug(resolvedParams.id, lang);

  if (!product) {
    notFound();
  }

  // Get base URL for structured data
  const baseUrl = typeof window !== "undefined" 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_SITE_URL || "https://mying.vercel.app";
  const productUrl = `${baseUrl}/products/${resolvedParams.id}`;

  return (
    <>
      {/* Structured Data for SEO */}
      <ProductStructuredData
        product={product}
        lang={lang}
        productUrl={productUrl}
        baseUrl={baseUrl}
      />
      
      <div className="mx-auto max-w-6xl px-4 py-8 pb-32 md:px-8 md:py-12 md:pb-28">
        {/* Desktop: Grid layout with sidebar */}
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Main Content */}
          <div className="space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: lang === "zh" ? "产品" : "Products", href: "/products" },
            { label: product.name, href: `/products/${resolvedParams.id}` },
          ]}
        />

        {/* Product Header - Optimized for mobile */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight">{product.name}</h1>
            <p className="mt-2 text-base md:text-lg lg:text-xl text-[var(--text-secondary)]">{product.category}</p>
            {product.badge && (
              <div className="mt-2">
                <Badge tone="positive">{product.badge}</Badge>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {product.patentCount && product.patentCount > 0 && (
              <Badge tone="patent">
                {product.patentCount}+ {lang === "zh" ? "专利" : "Patents"}
              </Badge>
            )}
            <Badge tone={product.status === "New" ? "positive" : "warning"}>
              {product.status}
            </Badge>
          </div>
        </div>

        {/* Product Image - Priority for LCP optimization */}
        {product.image && (
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority // Critical: Priority loading for LCP optimization
              quality={85} // Optimized quality for WebP/AVIF
            />
          </div>
        )}

        {/* Technical Certification & Patent */}
        <TechnicalCertification product={product} lang={lang} />

        {/* ① Product Positioning Statement */}
        {product.positioning && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
            <h2 className="mb-3 text-2xl font-semibold text-[var(--text-primary)]">
              {lang === "zh" ? "产品定位" : "Product Positioning"}
            </h2>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              {product.positioning}
            </p>
          </div>
        )}

        {/* B2B Decision Support Section */}
        <ProductDecisionSupport product={product} lang={lang} />

        {/* Specifications Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Technical Specifications - Structured Component */}
          <div className="space-y-4">
            <ProductSpecs product={product} lang={lang} variant="detail" />
            
            {/* CAD/BIM Download Button */}
            <button
              onClick={() => setShowCADForm(true)}
              className="w-full rounded-lg border border-[var(--accent-primary)]/50 bg-[var(--accent-primary-light)] px-4 py-3 text-sm font-semibold text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/20 transition flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {lang === "zh" ? "下载 CAD/BIM 模型文件" : "Download CAD/BIM Files"}
            </button>
          </div>

          {/* ③ Venue Requirements & Power Supply */}
          <div className="space-y-6">
            {product.venueRequirements && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
                <h3 className="mb-3 text-xl font-semibold text-[var(--text-primary)]">
                  {c.productDecision?.venueRequirements || (lang === "zh" ? "场地要求" : "Venue Requirements")}
                </h3>
                <p className="text-[var(--text-secondary)]">{product.venueRequirements}</p>
              </div>
            )}
            {product.powerSupply && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
                <h3 className="mb-3 text-xl font-semibold text-[var(--text-primary)]">
                  {c.productDecision?.powerSupply || (lang === "zh" ? "电源要求" : "Power Supply")}
                </h3>
                <p className="text-[var(--text-secondary)]">{product.powerSupply}</p>
              </div>
            )}
          </div>
        </div>

        {/* Not Recommended For - Only show if exists, as Ideal For is now in Decision Support */}
        {product.notRecommendedFor && product.notRecommendedFor.length > 0 && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
            <h3 className="mb-4 text-xl font-semibold text-[var(--text-primary)]">
              {c.productDecision?.notRecommendedFor || (lang === "zh" ? "不推荐场景" : "Not Recommended For")}
            </h3>
            <ul className="space-y-2">
              {product.notRecommendedFor.map((scenario, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[var(--text-secondary)]">
                  <span className="mt-1.5 text-[var(--text-tertiary)]">✗</span>
                  <span>{scenario}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ④ Safety & Compliance */}
        {product.safetyCompliance && product.safetyCompliance.length > 0 && (
          <div className="rounded-2xl border border-[var(--accent-secondary)]/20 bg-[var(--accent-primary-light)] p-6">
            <h2 className="mb-4 text-2xl font-semibold text-[var(--text-primary)]">
              {c.productDecision?.safetyCompliance || (lang === "zh" ? "安全与合规" : "Safety & Compliance")}
            </h2>
            <ul className="space-y-2">
              {product.safetyCompliance.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[var(--text-secondary)]">
                  <span className="mt-1 text-[var(--accent-secondary)]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ⑤ Delivery, Installation & After-Sales */}
        <div className="grid gap-6 md:grid-cols-2">
          {product.deliveryInstallation && product.deliveryInstallation.length > 0 && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text-primary)]">
                {c.productDecision?.deliveryInstallation || (lang === "zh" ? "交付与安装" : "Delivery & Installation")}
              </h3>
              <ul className="space-y-2">
                {product.deliveryInstallation.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[var(--text-secondary)]">
                    <span className="mt-1.5 text-[var(--accent-primary)]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {product.afterSales && product.afterSales.length > 0 && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text-primary)]">
                {c.productDecision?.afterSales || (lang === "zh" ? "售后服务" : "After-Sales Support")}
              </h3>
              <ul className="space-y-2">
                {product.afterSales.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[var(--text-secondary)]">
                    <span className="mt-1.5 text-[var(--accent-primary)]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ⑥ Video Links */}
        {product.videoLinks && (product.videoLinks.youtube || product.videoLinks.tiktok) && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
            <h2 className="mb-4 text-2xl font-semibold text-[var(--text-primary)]">
              {c.productDecision?.seeInAction || (lang === "zh" ? "观看视频" : "See It In Action")}
            </h2>
            <div className="flex flex-wrap gap-4">
              {product.videoLinks.youtube && (
                <a
                  href={product.videoLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-[var(--text-primary)] transition hover:border-[var(--accent-primary)] hover:bg-[var(--surface-hover)]"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  {lang === "zh" ? "YouTube 视频" : "Watch on YouTube"}
                </a>
              )}
              {product.videoLinks.tiktok && (
                <a
                  href={product.videoLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-[var(--text-primary)] transition hover:border-[var(--accent-primary)] hover:bg-[var(--surface-hover)]"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  {lang === "zh" ? "TikTok 视频" : "Watch on TikTok"}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Trust Layer - Before Final CTA to Reinforce Purchase Confidence */}
        <TrustLayer 
          variant="compact"
          showPartners={true}
          showCertifications={true}
          showFactoryPhotos={false}
          showProjectHighlights={true}
          maxPartners={6}
        />

        {/* ⑦ Call to Action - Single Primary Conversion */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 text-center">
          <p className="mb-6 text-xl font-semibold text-[var(--text-primary)]">
            {product.ctaText || (c.productDecision?.contactForQuote || (lang === "zh" ? "获取布局建议与报价" : "Contact for layout suggestion & quotation"))}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {/* Primary CTA: Single conversion action */}
            <Link
              href={`/quote?product=${encodeURIComponent(product.name)}`}
              className="rounded-lg bg-[var(--action-primary)] px-8 py-3 font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] min-w-[44px] touch-manipulation"
            >
              {lang === "zh" ? "获取报价" : "Request Quote"}
            </Link>
            {/* Secondary: Auxiliary action */}
            <Link
              href="/contact"
              className="rounded-lg border border-[var(--action-secondary-border)] bg-[var(--action-secondary)] px-8 py-3 font-semibold text-[var(--action-secondary-text)] transition-colors hover:bg-[var(--action-secondary-hover-bg)] min-h-[44px] min-w-[44px] touch-manipulation"
            >
              {lang === "zh" ? "联系我们" : "Contact Us"}
            </Link>
          </div>
          {/* Note: WhatsApp is available via the floating action button (FAB) */}
          <p className="mt-4 text-sm text-[var(--text-tertiary)]">
            {lang === "zh" 
              ? "💬 需要即时咨询？点击右下角的浮动按钮，选择 WhatsApp 咨询" 
              : "💬 Need instant consultation? Click the floating button in the bottom right corner and select WhatsApp Chat"}
          </p>
        </div>
        </div>

          {/* Desktop: Quick Quote Form Sidebar (sticky) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <QuickQuoteForm productName={product.name} />
            </div>
          </aside>
        </div>

        {/* Mobile: Quick Quote Form (shown after product header) */}
        <div className="mt-8 block lg:hidden">
          <QuickQuoteForm productName={product.name} />
        </div>
      </div>

      {/* CAD Download Form Modal */}
      {showCADForm && (
        <CADDownloadForm
          productName={product.name}
          onClose={() => setShowCADForm(false)}
        />
      )}

      {/* Sticky CTA Block - Fixed at bottom */}
      <StickyProductCTA productName={product.name} lang={lang} />
    </>
  );
}

