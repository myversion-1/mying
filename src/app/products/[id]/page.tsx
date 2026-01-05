"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug } from "../../../content/products_multilingual";
import { useLanguage } from "../../../components/language";
import { copy } from "../../../content/copy";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Badge } from "../../../components/ui/Badge";
import { ProductStructuredData } from "../../../components/ProductStructuredData";
import { TechnicalCertification } from "../../../components/TechnicalCertification";
import Link from "next/link";

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
      
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <div className="space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: lang === "zh" ? "产品" : "Products", href: "/products" },
            { label: product.name, href: `/products/${resolvedParams.id}` },
          ]}
        />

        {/* Product Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white">{product.name}</h1>
            <p className="mt-2 text-xl text-white/70">{product.category}</p>
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

        {/* Product Image */}
        {product.image && (
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized
            />
          </div>
        )}

        {/* Technical Certification & Patent */}
        <TechnicalCertification product={product} lang={lang} />

        {/* ① Product Positioning Statement */}
        {product.positioning && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-3 text-2xl font-semibold text-white">
              {lang === "zh" ? "产品定位" : "Product Positioning"}
            </h2>
            <p className="text-lg leading-relaxed text-white/80">
              {product.positioning}
            </p>
          </div>
        )}

        {/* Specifications Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              {lang === "zh" ? "规格参数" : "Specifications"}
            </h2>
            <dl className="space-y-3">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <dt className="text-sm text-white/60">
                  {c.productLabels?.footprint || (lang === "zh" ? "占地面积" : "Footprint")}
                </dt>
                <dd className="font-medium text-white">{product.footprint}</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <dt className="text-sm text-white/60">
                  {c.productLabels?.height || (lang === "zh" ? "高度" : "Height")}
                </dt>
                <dd className="font-medium text-white">{product.height}</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <dt className="text-sm text-white/60">
                  {c.productLabels?.riders || (lang === "zh" ? "载客量" : "Riders")}
                </dt>
                <dd className="font-medium text-white">{product.riders}</dd>
              </div>
              {product.year && (
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <dt className="text-sm text-white/60">
                    {c.productLabels?.year || (lang === "zh" ? "年份" : "Year")}
                  </dt>
                  <dd className="font-medium text-white">{product.year}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* ③ Venue Requirements & Power Supply */}
          <div className="space-y-6">
            {product.venueRequirements && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {c.productDecision?.venueRequirements || (lang === "zh" ? "场地要求" : "Venue Requirements")}
                </h3>
                <p className="text-white/80">{product.venueRequirements}</p>
              </div>
            )}
            {product.powerSupply && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {c.productDecision?.powerSupply || (lang === "zh" ? "电源要求" : "Power Supply")}
                </h3>
                <p className="text-white/80">{product.powerSupply}</p>
              </div>
            )}
          </div>
        </div>

        {/* ② Ideal For & Not Recommended For */}
        <div className="grid gap-6 md:grid-cols-2">
          {product.idealFor && product.idealFor.length > 0 && (
            <div className="rounded-2xl border border-[#7df6ff]/20 bg-[#7df6ff]/5 p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">
                {c.productDecision?.idealFor || (lang === "zh" ? "适用场景" : "Ideal For")}
              </h3>
              <ul className="space-y-2">
                {product.idealFor.map((scenario, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/80">
                    <span className="mt-1.5 text-[#7df6ff]">✓</span>
                    <span>{scenario}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {product.notRecommendedFor && product.notRecommendedFor.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">
                {c.productDecision?.notRecommendedFor || (lang === "zh" ? "不推荐场景" : "Not Recommended For")}
              </h3>
              <ul className="space-y-2">
                {product.notRecommendedFor.map((scenario, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/80">
                    <span className="mt-1.5 text-white/40">✗</span>
                    <span>{scenario}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ④ Safety & Compliance */}
        {product.safetyCompliance && product.safetyCompliance.length > 0 && (
          <div className="rounded-2xl border border-[#7df6ff]/20 bg-[#7df6ff]/5 p-6">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              {c.productDecision?.safetyCompliance || (lang === "zh" ? "安全与合规" : "Safety & Compliance")}
            </h2>
            <ul className="space-y-2">
              {product.safetyCompliance.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/80">
                  <span className="mt-1 text-[#7df6ff]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ⑤ Delivery, Installation & After-Sales */}
        <div className="grid gap-6 md:grid-cols-2">
          {product.deliveryInstallation && product.deliveryInstallation.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">
                {c.productDecision?.deliveryInstallation || (lang === "zh" ? "交付与安装" : "Delivery & Installation")}
              </h3>
              <ul className="space-y-2">
                {product.deliveryInstallation.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/80">
                    <span className="mt-1.5 text-[#00eaff]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {product.afterSales && product.afterSales.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">
                {c.productDecision?.afterSales || (lang === "zh" ? "售后服务" : "After-Sales Support")}
              </h3>
              <ul className="space-y-2">
                {product.afterSales.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/80">
                    <span className="mt-1.5 text-[#00eaff]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ⑥ Video Links */}
        {product.videoLinks && (product.videoLinks.youtube || product.videoLinks.tiktok) && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              {c.productDecision?.seeInAction || (lang === "zh" ? "观看视频" : "See It In Action")}
            </h2>
            <div className="flex flex-wrap gap-4">
              {product.videoLinks.youtube && (
                <a
                  href={product.videoLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white transition hover:border-[#7df6ff]/40 hover:bg-white/10"
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
                  className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white transition hover:border-[#7df6ff]/40 hover:bg-white/10"
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

        {/* ⑦ Call to Action */}
        <div className="rounded-2xl border border-[#00eaff]/30 bg-gradient-to-r from-[#00eaff]/10 to-[#7df6ff]/10 p-8 text-center">
          <p className="mb-6 text-xl font-semibold text-white">
            {product.ctaText || (c.productDecision?.contactForQuote || (lang === "zh" ? "获取布局建议与报价" : "Contact for layout suggestion & quotation"))}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/quote?product=${encodeURIComponent(product.name)}`}
              className="rounded-lg bg-[#00eaff] px-8 py-3 font-semibold text-[#0b1116] shadow-[0_0_20px_rgba(0,234,255,0.3)] transition hover:bg-[#7df6ff] hover:shadow-[0_0_28px_rgba(0,234,255,0.5)]"
            >
              {lang === "zh" ? "获取报价" : "Request Quote"}
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/20 bg-white/5 px-8 py-3 font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              {lang === "zh" ? "联系我们" : "Contact Us"}
            </Link>
            <a
              href="https://wa.me/8613112959561"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#25D366] bg-[#25D366]/20 px-8 py-3 font-semibold text-white transition hover:bg-[#25D366]/30"
            >
              {c.customerService?.whatsapp || (lang === "zh" ? "WhatsApp 咨询" : "WhatsApp Chat")}
            </a>
          </div>
          {c.productDecision?.whatsappResponse && (
            <p className="mt-4 text-sm text-white/60">
              {c.productDecision.whatsappResponse}
            </p>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

