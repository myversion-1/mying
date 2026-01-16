"use client";

import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { copy, getServices, getProducts } from "../content/copy";
import { homePageStats } from "../content/homePageStats";
import { ShoppingCart, MessageSquare, FileCheck, Wrench, ChevronRight } from "lucide-react";
import { testimonials, getLocalizedTestimonial } from "../content/testimonials";
import { useLanguage } from "../components/language";
// Removed useIsMobile and useIsDesktop to prevent hydration mismatches
// Device detection is now done only on client-side after mount

// Code split heavy components to reduce initial bundle size
// Use intersection observer pattern for better performance
// All loading states have fixed dimensions to prevent layout shift (CLS)
const ProductGrid = dynamic(() => import("../components/ProductGrid").then((mod) => ({ default: mod.ProductGrid })), {
  loading: () => (
    <div 
      className="h-[600px] w-full animate-pulse rounded-2xl bg-[var(--surface-elevated)]" 
      style={{ 
        containIntrinsicSize: 'auto 600px',
        minHeight: '600px',
        width: '100%'
      }}
      aria-label="Loading products"
    />
  ),
  ssr: false, // Disable SSR for better performance - load on client only
});

const ContactForm = dynamic(() => import("../components/ContactForm").then((mod) => ({ default: mod.ContactForm })), {
  loading: () => (
    <div 
      className="h-[600px] w-full rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#0a1628] to-[#0c1014] p-6 dark:border-white/10 dark:bg-white/5 animate-pulse flex items-center justify-center" 
      style={{ 
        containIntrinsicSize: 'auto 600px',
        minHeight: '600px',
        width: '100%'
      }}
      aria-label="Loading contact form"
    >
      <span className="text-[var(--text-secondary)] text-sm">Loading form...</span>
    </div>
  ),
  ssr: false, // Contact form doesn't need SSR
});

const VerificationGate = dynamic(() => import("../components/VerificationGate").then((mod) => ({ default: mod.VerificationGate })), {
  loading: () => (
    <div 
      className="h-[400px] w-full animate-pulse rounded-2xl bg-[var(--surface-elevated)]" 
      style={{ 
        containIntrinsicSize: 'auto 400px',
        minHeight: '400px',
        width: '100%'
      }}
      aria-label="Loading verification"
    />
  ),
  ssr: false,
});

// StatsGrid is above the fold - enable SSR for better FCP/LCP
// Note: columns prop should be consistent between server and client to prevent hydration mismatch
const StatsGrid = dynamic(() => import("../components/StatsGrid").then((mod) => ({ default: mod.StatsGrid })), {
  loading: () => (
    <div 
      className="h-[200px] w-full animate-pulse rounded-2xl bg-[var(--surface-elevated)]" 
      style={{ 
        containIntrinsicSize: 'auto 200px',
        minHeight: '200px',
        width: '100%'
      }}
      aria-label="Loading statistics"
    />
  ),
  ssr: true, // Enable SSR for above-the-fold content to improve FCP/LCP
});

const TestimonialsGrid = dynamic(() => import("../components/TestimonialsGrid").then((mod) => ({ default: mod.TestimonialsGrid })), {
  loading: () => (
    <div 
      className="h-[500px] w-full animate-pulse rounded-2xl bg-[var(--surface-elevated)]" 
      style={{ 
        containIntrinsicSize: 'auto 500px',
        minHeight: '500px',
        width: '100%'
      }}
      aria-label="Loading testimonials"
    />
  ),
  ssr: false, // Disable SSR to reduce initial bundle
});

const TrustLayer = dynamic(() => import("../components/TrustLayer").then((mod) => ({ default: mod.TrustLayer })), {
  loading: () => (
    <div 
      className="h-[600px] w-full animate-pulse rounded-2xl bg-[var(--surface-elevated)]" 
      style={{ 
        containIntrinsicSize: 'auto 600px',
        minHeight: '600px',
        width: '100%'
      }}
      aria-label="Loading trust layer"
    />
  ),
  ssr: false, // Disable SSR to reduce initial bundle - load images on client
});

const ProductCard = dynamic(() => import("../components/ProductCard").then((mod) => ({ default: mod.ProductCard })), {
  ssr: false, // Disable SSR for better performance
});

export default function Home() {
  const { lang } = useLanguage();
  const router = useRouter();
  const c = copy(lang);
  // Defer loading services data until needed (lazy evaluation)
  const services = getServices(lang);
  const isRTL = lang === "ar";

  // Defer loading products data - only load when ProductGrid is visible
  // This reduces initial JavaScript execution time

  return (
    <div 
      className="space-y-12 md:space-y-16 lg:space-y-20"
      style={{
        minHeight: '100vh',
      }}
    >
      {/* Hero Section - Enhanced Visual Hierarchy */}
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="my-8 md:my-12 lg:my-16">
          <PageHero 
            ctaPrimaryHref="/quote"
            ctaSecondaryHref="/resources"
            badge="ISO Certified Manufacturer"
          />
        </div>
      </div>

      {/* Home Page Statistics - Trust Building Section */}
      {/* Priority 1: Core Metrics - Immediately after Hero for instant credibility */}
      <section 
        id="stats" 
        className="!py-12 md:!py-16 lg:!py-20 bg-[var(--background)]"
        suppressHydrationWarning
      >
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Section Header - Enhanced Typography */}
          <div className="mb-10 md:mb-12 lg:mb-16 text-center">
            <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
              {lang === "zh" ? "行业领先数据" : "Industry-Leading Metrics"}
            </h2>
            <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              {lang === "zh" 
                ? "用数据证明我们的专业实力和全球交付能力"
                : "Data-driven proof of our expertise and global delivery capabilities"}
            </p>
          </div>
          <StatsGrid
            stats={homePageStats}
            lang={lang}
            columns={5}
            suppressHydrationWarning
          />
        </div>
      </section>

      {/* SEO Content Section - Why Global Theme Parks Choose Miying */}
      <Section
        id="why-choose-miying"
        title={lang === "zh" ? "为什么全球主题公园选择米盈设备" : "Why Global Theme Parks Choose Miying Equipment"}
      >
        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          {/* Industry-Leading Manufacturing Standards */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 md:p-12 lg:p-16">
            <h2 className="mb-6 md:mb-8 text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight tracking-tight">
              {lang === "zh" ? "ISO认证游乐设备制造商标准" : "ISO Certified Amusement Rides Manufacturer Standards"}
            </h2>
            <p className="mb-8 md:mb-10 text-base md:text-lg lg:text-xl leading-relaxed text-[var(--text-secondary)]">
              {lang === "zh" 
                ? "作为领先的游乐设备制造商和主题公园设备供应商，米盈在游乐设备行业拥有超过15年的经验，已成为50多个国家FEC（家庭娱乐中心）和主题公园值得信赖的合作伙伴。我们的ISO 9001认证制造工厂确保每台设备都符合国际安全标准，包括CE、ASTM和EN认证。我们提供从标准型号到完全定制设计的全方位解决方案，支持全球交付和安装服务。"
                : "As a leading amusement rides manufacturer and theme park equipment supplier, Miying has over 15 years of experience serving FECs (Family Entertainment Centers) and theme parks across 50+ countries. Our ISO 9001 certified manufacturing facility ensures every ride meets international safety standards including CE, ASTM, and EN certifications. We offer comprehensive solutions from standard models to fully custom designs, with global delivery and installation services."}
            </p>
            <ul className="space-y-4 md:space-y-5 text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">
              {(lang === "zh" 
                ? ["ISO 9001质量管理体系认证", "CE欧洲安全标准认证", "ASTM F24美国安全标准认证", "EN 13814欧洲游乐设备安全标准"]
                : ["ISO 9001 Quality Management System Certification", "CE European Safety Standards Certification", "ASTM F24 US Safety Standards Certification", "EN 13814 European Amusement Ride Safety Standards"]
              ).map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Comprehensive Product Range */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 md:p-12 lg:p-16">
            <h2 className="mb-6 md:mb-8 text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight tracking-tight">
              {lang === "zh" ? "主题公园设备供应商产品目录" : "Theme Park Equipment Supplier Product Catalog"}
            </h2>
            <p className="mb-8 md:mb-10 text-base md:text-lg lg:text-xl leading-relaxed text-[var(--text-secondary)]">
              {lang === "zh"
                ? "从经典的旋转木马和碰碰车到刺激的过山车和现代VR景点，我们的产品目录涵盖了主题公园的完整需求。无论您是启动新的家庭娱乐中心还是扩展现有主题公园，我们都提供交钥匙解决方案。"
                : "From classic carousels and bumper cars to thrilling roller coasters and modern VR attractions, our catalog covers the complete spectrum of amusement park needs. Whether you're launching a new family entertainment center or expanding an existing theme park, we provide turnkey solutions."}
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {(lang === "zh"
                ? ["家庭游乐设备：旋转木马、碰碰车、小火车", "刺激游乐设备：过山车、跳楼机、大摆锤", "水上设备：水滑梯、造浪池设备", "VR/AR互动体验设备"]
                : ["Family Rides: Carousels, Bumper Cars, Mini Trains", "Thrill Rides: Roller Coasters, Drop Towers, Swing Rides", "Water Rides: Water Slides, Wave Pool Equipment", "VR/AR Interactive Experience Equipment"]
              ).map((item, index) => (
                <div key={index} className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]">
                  <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* End-to-End Project Support */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 md:p-12 lg:p-16">
            <h2 className="mb-6 md:mb-8 text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight tracking-tight">
              {lang === "zh" ? "游乐设备安装服务和售后支持" : "Amusement Ride Installation Services & Support"}
            </h2>
            <p className="mb-8 md:mb-10 text-base md:text-lg lg:text-xl leading-relaxed text-[var(--text-secondary)]">
              {lang === "zh"
                ? "我们的服务不仅限于设备交付。我们提供完整的支持，包括："
                : "Our service doesn't end with equipment delivery. We provide complete support including:"}
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {(lang === "zh"
                ? [
                    { title: "场地规划", desc: "场地规划和布局优化" },
                    { title: "安装监督", desc: "安装监督和操作培训" },
                    { title: "备件供应", desc: "备件供应链管理" },
                    { title: "预防性维护", desc: "预防性维护计划" },
                    { title: "设备翻新", desc: "设备翻新和升级服务" },
                    { title: "技术支持", desc: "24/7技术支持和远程诊断" },
                  ]
                : [
                    { title: "Site Planning", desc: "Site planning and layout optimization" },
                    { title: "Installation Supervision", desc: "Installation supervision and training" },
                    { title: "Spare Parts Supply", desc: "Spare parts supply chain management" },
                    { title: "Preventive Maintenance", desc: "Preventive maintenance programs" },
                    { title: "Equipment Refurbishment", desc: "Equipment refurbishment and upgrades" },
                    { title: "Technical Support", desc: "24/7 technical support and remote diagnostics" },
                  ]
              ).map((item, index) => (
                <div key={index} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]">
                  <h4 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">{item.title}</h4>
                  <p className="text-base leading-relaxed text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Trust Layer - Comprehensive Social Proof */}
      {/* Priority 2: Trust Building - After core value proposition */}
      <TrustLayer 
        variant="full"
        showPartners={true}
        showCertifications={true}
        showFactoryPhotos={true}
        showProjectHighlights={false}
        maxPartners={10}
      />

      <Section
        id="services"
        title={c.servicesTitle}
        subtitle={lang === "zh" ? "从市场调研到售后支持，一站式解决方案" : "From market research to after-sales support, one-stop solutions"}
        className="relative overflow-hidden"
      >

        {/* Service Highlights - Top 4 Core Services with equal height */}
        <div className="relative z-10 mb-10 md:mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {services.slice(0, 4).map((service, index) => {
            // Import Lucide icons dynamically based on service type
            const serviceIcons = [
              <ShoppingCart key="0" className="h-7 w-7" />, // Purchasing & Agent Support
              <MessageSquare key="1" className="h-7 w-7" />, // Consulting
              <FileCheck key="2" className="h-7 w-7" />, // Appraisal
              <Wrench key="3" className="h-7 w-7" />, // Refurbishment
            ];
            
            // Gradient colors for icons
            const iconGradients = [
              "from-emerald-500/30 to-cyan-500/20", // Purchasing - green to cyan
              "from-blue-500/30 to-indigo-500/20", // Consulting - blue to indigo
              "from-purple-500/30 to-pink-500/20", // Appraisal - purple to pink
              "from-orange-500/30 to-amber-500/20", // Refurbishment - orange to amber
            ];
            
            return (
              <div
                key={service.title}
                onClick={() => router.push("/services")}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 md:p-8 transition-colors hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)] cursor-pointer h-full flex flex-col"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    {/* Icon with simple background */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 transition-colors group-hover:bg-[var(--accent-primary)]/20">
                      {serviceIcons[index] || serviceIcons[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Description - flex-1 to push button to bottom */}
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-6 flex-1">
                    {service.desc}
                  </p>
                  
                  {/* CTA Button - always at bottom */}
                  <div className="mt-auto">
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--accent-primary)] px-5 py-3 sm:px-7 sm:py-3 text-sm sm:text-base font-semibold shadow-lg shadow-[var(--action-primary)]/30 hover:shadow-xl hover:shadow-[var(--action-primary)]/50 transition-all duration-200 hover:-translate-y-1 hover:brightness-110 active:scale-95 min-h-[44px] touch-manipulation w-full text-[var(--action-primary-text)] border border-[var(--action-primary)]/20"
                    >
                      <span>{c.cta.getTechnicalConsultation || (lang === "zh" ? "获取技术咨询" : "Get Technical Consultation")}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Request Service Consultation CTA */}
        <div className="text-center">
          <Link
            href="/contact?type=service"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--accent-primary)] px-6 py-4 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold shadow-lg shadow-[var(--action-primary)]/30 hover:shadow-2xl hover:shadow-[var(--action-primary)]/50 transition-all duration-200 hover:-translate-y-1 hover:brightness-110 active:scale-95 min-h-[44px] touch-manipulation text-[var(--action-primary-text)] border border-[var(--action-primary)]/20"
          >
            <span>{c.cta.scheduleConsultation || (lang === "zh" ? "预约服务咨询" : "Schedule Service Consultation")}</span>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </Section>

      {/* Featured Products by Category */}
      <Section
        id="featured-products"
        title={lang === "zh" ? "热门产品分类" : "Featured Products by Category"}
        subtitle={lang === "zh" ? "按分类浏览我们的热门产品" : "Browse our popular products by category"}
      >
        <div className="space-y-12">
          {[
            { mainCategory: "Family Rides", subCategory: "Carousels", limit: 3 },
            { mainCategory: "Thrill Rides", subCategory: "Roller Coasters", limit: 3 },
            { mainCategory: "Family Rides", subCategory: "Bumper Cars", limit: 3 },
          ].map((category, index) => {
            const categoryProducts = getProducts(lang).filter((p) => {
              if (category.mainCategory && p.mainCategory !== category.mainCategory) return false;
              if (category.subCategory && p.subCategory !== category.subCategory.toLowerCase().replace(/\s+/g, "-")) return false;
              return true;
            }).slice(0, category.limit);

            if (categoryProducts.length === 0) return null;

            const categoryName = lang === "zh" 
              ? (category.mainCategory === "Family Rides" ? "家庭游乐设备" : category.mainCategory === "Thrill Rides" ? "刺激游乐设备" : category.mainCategory)
              : category.mainCategory;
            const subCategoryName = lang === "zh"
              ? (category.subCategory === "Carousels" ? "旋转木马" : category.subCategory === "Roller Coasters" ? "过山车" : category.subCategory === "Bumper Cars" ? "碰碰车" : category.subCategory)
              : category.subCategory;

            return (
              <div key={index} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                      {categoryName} - {subCategoryName}
                    </h3>
                    <p className="text-[var(--text-secondary)] mt-2 text-base">
                      {lang === "zh" ? "精选产品" : "Featured Products"}
                    </p>
                  </div>
                  <Link
                    href={`/quote?category=${encodeURIComponent(category.mainCategory)}&subCategory=${encodeURIComponent(category.subCategory)}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--accent-primary)] px-5 py-3 sm:px-7 sm:py-3 text-sm sm:text-base font-semibold shadow-lg shadow-[var(--action-primary)]/30 hover:shadow-xl hover:shadow-[var(--action-primary)]/50 transition-all duration-200 hover:-translate-y-1 hover:brightness-110 active:scale-95 min-h-[44px] touch-manipulation text-[var(--action-primary-text)] border border-[var(--action-primary)]/20"
                  >
                    <span>{c.cta.requestPricing || (lang === "zh" ? "获取定价" : "Request Pricing")}</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.name}
                      product={product}
                      lang={lang}
                      index={0}
                      isRTL={isRTL}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Request Product Catalog CTA */}
        <div className="mt-12 text-center space-y-4">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--accent-primary)] px-6 py-4 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold shadow-lg shadow-[var(--action-primary)]/30 hover:shadow-2xl hover:shadow-[var(--action-primary)]/50 transition-all duration-200 hover:-translate-y-1 hover:brightness-110 active:scale-95 min-h-[44px] touch-manipulation text-[var(--action-primary-text)] border border-[var(--action-primary)]/20"
          >
            <span>{c.cta.downloadDatasheet || (lang === "zh" ? "下载产品目录" : "Download Product Catalog")}</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </Link>
          <p className="text-base text-[var(--text-secondary)]">
            {lang === "zh" ? "或" : "or"}
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--action-primary)] bg-[var(--action-primary)]/5 px-6 py-4 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold text-[var(--action-primary)] shadow-md hover:shadow-lg hover:shadow-[var(--action-primary)]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--action-primary)]/15 active:scale-95 min-h-[44px] touch-manipulation"
          >
            <span>{c.cta.getCustomQuote || (lang === "zh" ? "获取定制报价" : "Get Custom Quote")}</span>
          </Link>
        </div>
      </Section>

      <Section
        id="products"
        title={c.productsTitle}
        subtitle={c.productsSubtitle || "Representative rides; request specs for your project."}
      >
        <ProductGrid />
      </Section>

      {/* Customer Testimonials */}
      <Section
        id="testimonials"
        title={lang === "zh" ? "客户评价" : "What Our Clients Say"}
        subtitle={lang === "zh" ? "来自全球客户的真实反馈" : "Real feedback from our clients worldwide"}
      >
        <TestimonialsGrid testimonials={testimonials.slice(0, 3).map(t => getLocalizedTestimonial(t, lang))} lang={lang} />
      </Section>

      {/* Trust Layer Before Final CTA - Reinforce Purchase Confidence */}
      <TrustLayer 
        variant="compact"
        showPartners={true}
        showCertifications={true}
        showFactoryPhotos={false}
        showProjectHighlights={true}
        maxPartners={8}
      />

      <Section
        id="contact"
        title={c.contactTitle}
        subtitle={c.contactSubtitle}
      >
        <Suspense fallback={<div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#0a1628] to-[#0c1014] p-6 dark:border-white/10 dark:bg-white/5">{c.contactPage.loadingForm}</div>}>
          <ContactForm />
        </Suspense>
      </Section>

      <Section
        id="visit"
        title={c.verificationTitle}
        subtitle={c.verificationSubtitle}
      >
        <VerificationGate />
      </Section>
    </div>
  );
}

