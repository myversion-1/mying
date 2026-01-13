"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug } from "../../../content/products_multilingual";
import { useLanguage } from "../../../components/language";
import { copy, getProducts } from "../../../content/copy";
import { productsMultilingual } from "../../../content/products_multilingual";
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
import { encodeImagePath, hasNonASCIICharacters } from "../../../utils/image-utils";

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
    : process.env.NEXT_PUBLIC_SITE_URL || "https://www.miyingrides.com";
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight">
              {product.name} - {product.category} | {lang === "zh" ? "游乐设备制造商" : "Amusement Rides Manufacturer"}
            </h1>
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
            {hasNonASCIICharacters(product.image) ? (
              // For images with Chinese characters, use native img tag to avoid Next.js Image optimizer issues
              <img
                src={encodeImagePath(product.image)}
                alt={`${product.name} - ${product.category} amusement ride manufactured by Miying, ISO certified theme park equipment supplier`}
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                suppressHydrationWarning
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="flex h-full items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
                        <div class="text-center">
                          <div class="mb-2 text-4xl opacity-30">🎠</div>
                          <div class="text-xs text-[var(--text-tertiary)]">No image available</div>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            ) : (
              <Image
                src={product.image}
                alt={`${product.name} - ${product.category} amusement ride manufactured by Miying, ISO certified theme park equipment supplier`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority // Critical: Priority loading for LCP optimization
                quality={70} // Reduced quality to reduce file size (from 85 to 70, further optimized)
              />
            )}
          </div>
        )}

        {/* Technical Certification & Patent */}
        <TechnicalCertification product={product} lang={lang} />

        {/* Product Overview - SEO Optimized Section */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
            {lang === "zh" ? "产品概述" : "Product Overview"}
          </h2>
          {product.positioning ? (
            <div className="prose prose-lg max-w-none text-[var(--text-secondary)]">
              <p className="text-lg leading-relaxed">
                {lang === "zh"
                  ? `作为领先的游乐设备制造商，我们提供${product.name}这款${product.category}，专为${product.idealFor?.join("、") || "各种娱乐场所"}设计。该设备由ISO认证的制造工厂生产，具有${product.riders}名乘客的容量，占地面积${product.footprint}，高度${product.height}。${product.name}经过工厂测试，符合国际安全标准（CE、ASTM、EN），是${product.mainCategory || product.category}类别的理想选择。`
                  : `As a leading amusement rides manufacturer, we offer ${product.name}, a ${product.category} designed for ${product.idealFor?.join(", ") || "various entertainment venues"}. Manufactured in our ISO certified facility, this ride features a capacity of ${product.riders} passengers, with a footprint of ${product.footprint} and height of ${product.height}. ${product.name} is factory-tested and meets international safety standards (CE, ASTM, EN), making it an ideal choice for ${product.mainCategory || product.category} applications.`}
              </p>
              {product.positioning && (
                <p className="mt-4 text-base leading-relaxed">
                  {product.positioning}
                </p>
              )}
            </div>
          ) : (
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              {lang === "zh"
                ? `作为领先的游乐设备制造商和主题公园设备供应商，我们提供${product.name}这款高质量的${product.category}，适合各种娱乐场所使用。该设备由ISO认证的制造工厂生产，具有出色的性能和可靠性，符合国际安全标准，是您项目的理想选择。`
                : `As a leading amusement rides manufacturer and theme park equipment supplier, we offer ${product.name}, a high-quality ${product.category} suitable for various entertainment venues. Manufactured in our ISO certified facility, this equipment features excellent performance and reliability, meets international safety standards, making it an ideal choice for your project.`}
            </p>
          )}
        </div>

        {/* B2B Decision Support Section */}
        <ProductDecisionSupport product={product} lang={lang} />

        {/* Technical Specifications - SEO Optimized Section */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
            {lang === "zh" ? "ISO认证游乐设备技术规格" : "ISO Certified Amusement Ride Technical Specifications"}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <ProductSpecs product={product} lang={lang} variant="detail" />
              
              {/* CAD/BIM Download Button */}
              <button
                onClick={() => setShowCADForm(true)}
                className="w-full rounded-lg border border-[var(--accent-primary)]/50 bg-[var(--accent-primary-light)] px-4 py-3 text-sm font-semibold text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/20 transition flex items-center justify-center gap-2 min-h-[44px] touch-manipulation"
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

        {/* Safety Features - SEO Optimized Section */}
        <div className="rounded-2xl border border-[var(--accent-secondary)]/20 bg-[var(--accent-primary-light)] p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
            {lang === "zh" ? "CE认证游乐设备安全特性" : "CE Certified Amusement Ride Safety Features"}
          </h2>
          {product.safetyCompliance && product.safetyCompliance.length > 0 ? (
            <ul className="mb-6 space-y-3">
              {product.safetyCompliance.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[var(--text-secondary)]">
                  <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mb-6 space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{lang === "zh" ? "紧急停止系统" : "Emergency stop systems"}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{lang === "zh" ? "符合人体工程学的约束系统" : "Ergonomic restraint systems"}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{lang === "zh" ? "多重安全传感器" : "Multiple safety sensors"}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{lang === "zh" ? "符合国际安全标准（CE、ASTM、EN）" : "Compliance with international safety standards (CE, ASTM, EN)"}</span>
              </li>
            </ul>
          )}
          <div className="rounded-lg border border-[var(--accent-primary)]/30 bg-[var(--surface-elevated)] p-4">
            <h3 className="mb-2 font-semibold text-[var(--text-primary)]">
              {lang === "zh" ? "合规认证" : "Compliance Certifications"}
            </h3>
            <div className="grid gap-2 text-sm text-[var(--text-secondary)] md:grid-cols-2">
              <div>• CE Marking</div>
              <div>• ASTM F24</div>
              <div>• EN 13814</div>
              <div>• ISO 9001</div>
            </div>
          </div>
        </div>

        {/* Customization Options - SEO Optimized Section */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
            {lang === "zh" ? "定制主题公园设备选项" : "Custom Theme Park Equipment Options"}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
              <h3 className="mb-2 font-semibold text-[var(--text-primary)]">
                {lang === "zh" ? "颜色方案" : "Color Schemes"}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {lang === "zh"
                  ? "多种颜色选择，匹配您的品牌主题和场地设计"
                  : "Multiple color options to match your brand theme and venue design"}
              </p>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
              <h3 className="mb-2 font-semibold text-[var(--text-primary)]">
                {lang === "zh" ? "主题定制" : "Theming Options"}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {lang === "zh"
                  ? "完全定制主题，匹配您的概念和品牌形象"
                  : "Fully custom theming to match your concept and brand identity"}
              </p>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
              <h3 className="mb-2 font-semibold text-[var(--text-primary)]">
                {lang === "zh" ? "容量变化" : "Capacity Variations"}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {lang === "zh"
                  ? "根据场地要求和客流量调整容量配置"
                  : "Adjustable capacity based on venue requirements and traffic flow"}
              </p>
            </div>
          </div>
        </div>

        {/* Applications - SEO Optimized Section */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
            {lang === "zh" ? "FEC和主题公园应用场景" : "FEC & Theme Park Applications"}
          </h2>
          <p className="mb-4 text-lg text-[var(--text-secondary)]">
            {lang === "zh" ? "适用于：" : "Ideal for:"}
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {product.idealFor && product.idealFor.length > 0 ? (
              product.idealFor.map((scenario, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
                  <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[var(--text-secondary)]">{scenario}</span>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
                  <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[var(--text-secondary)]">
                    {lang === "zh" ? "家庭娱乐中心 (FEC)" : "Family Entertainment Centers (FEC)"}
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
                  <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[var(--text-secondary)]">
                    {lang === "zh" ? "主题公园" : "Theme Parks"}
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
                  <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[var(--text-secondary)]">
                    {lang === "zh" ? "购物中心" : "Shopping Malls"}
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
                  <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[var(--text-secondary)]">
                    {lang === "zh" ? "旅游景点" : "Tourist Attractions"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Related Products - SEO Optimized Section */}
        {(() => {
          const allProducts = getProducts(lang);
          const relatedProducts = allProducts
            .filter(
              (p) =>
                p.name !== product.name &&
                (p.mainCategory === product.mainCategory ||
                  p.category === product.category ||
                  p.subCategory === product.subCategory)
            )
            .slice(0, 4);

          if (relatedProducts.length === 0) return null;

          return (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 md:p-8">
              <h2 className="mb-6 text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
                {lang === "zh" ? "相关产品" : "Related Products"}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct, index) => {
                  const relatedSlug = productsMultilingual
                    .find((p) => p.name.en === relatedProduct.name || p.name.zh === relatedProduct.name)
                    ?.name.en.toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-")
                    .replace(/^-|-$/g, "") || `product-${index}`;

                  return (
                    <Link
                      key={relatedProduct.name}
                      href={`/products/${relatedSlug}`}
                      className="group rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-4 transition hover:border-[var(--accent-primary)]/50 hover:bg-[var(--surface-hover)]"
                    >
                      {relatedProduct.image && (
                        <div className="relative mb-3 aspect-video overflow-hidden rounded-lg">
                          {hasNonASCIICharacters(relatedProduct.image) ? (
                            <img
                              src={encodeImagePath(relatedProduct.image)}
                              alt={`${relatedProduct.name} - ${relatedProduct.category} amusement ride by Miying manufacturer`}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              decoding="async"
                              suppressHydrationWarning
                            />
                          ) : (
                            <Image
                              src={relatedProduct.image}
                              alt={`${relatedProduct.name} - ${relatedProduct.category} amusement ride by Miying manufacturer`}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                          )}
                        </div>
                      )}
                      <h3 className="mb-1 font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">{relatedProduct.category}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })()}

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

