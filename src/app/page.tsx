"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { copy, getServices, getProducts } from "../content/copy";
import { homePageStats } from "../content/homePageStats";
import { testimonials, getLocalizedTestimonial } from "../content/testimonials";
import { useLanguage } from "../components/language";
import { useIsMobile, useIsDesktop } from "../utils/device-detection";

// Code split heavy components to reduce initial bundle size
// Use intersection observer pattern for better performance
const ProductGrid = dynamic(() => import("../components/ProductGrid").then((mod) => ({ default: mod.ProductGrid })), {
  loading: () => <div className="h-64 animate-pulse rounded-2xl bg-[var(--surface-elevated)]" />,
  ssr: false, // Disable SSR for better performance - load on client only
});

const ContactForm = dynamic(() => import("../components/ContactForm").then((mod) => ({ default: mod.ContactForm })), {
  loading: () => <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#0a1628] to-[#0c1014] p-6 dark:border-white/10 dark:bg-white/5">Loading form...</div>,
  ssr: false, // Contact form doesn't need SSR
});

const VerificationGate = dynamic(() => import("../components/VerificationGate").then((mod) => ({ default: mod.VerificationGate })), {
  loading: () => <div className="h-32 animate-pulse rounded-2xl bg-[var(--surface-elevated)]" />,
  ssr: false,
});

// StatsGrid is above the fold - enable SSR for better FCP/LCP
const StatsGrid = dynamic(() => import("../components/StatsGrid").then((mod) => ({ default: mod.StatsGrid })), {
  loading: () => <div className="h-32 animate-pulse rounded-2xl bg-[var(--surface-elevated)]" />,
  ssr: true, // Enable SSR for above-the-fold content to improve FCP/LCP
});

const TestimonialsGrid = dynamic(() => import("../components/TestimonialsGrid").then((mod) => ({ default: mod.TestimonialsGrid })), {
  loading: () => <div className="h-64 animate-pulse rounded-2xl bg-[var(--surface-elevated)]" />,
  ssr: false, // Disable SSR to reduce initial bundle
});

const TrustLayer = dynamic(() => import("../components/TrustLayer").then((mod) => ({ default: mod.TrustLayer })), {
  loading: () => <div className="h-48 animate-pulse rounded-2xl bg-[var(--surface-elevated)]" />,
  ssr: false, // Disable SSR to reduce initial bundle - load images on client
});

const ProductCard = dynamic(() => import("../components/ProductCard").then((mod) => ({ default: mod.ProductCard })), {
  ssr: false, // Disable SSR for better performance
});

export default function Home() {
  const { lang } = useLanguage();
  const router = useRouter();
  const c = copy(lang);
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  // Defer loading services data until needed (lazy evaluation)
  const services = getServices(lang);
  const isRTL = lang === "ar";
  
  // Defer loading products data - only load when ProductGrid is visible
  // This reduces initial JavaScript execution time

  return (
    <div 
      className={`space-y-6 md:space-y-10 lg:space-y-12 ${isMobile ? 'mobile-optimized' : 'desktop-optimized'}`}
      style={{
        // Prevent layout shift by reserving minimum space
        minHeight: '100vh',
      }}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Hero Section - Optimized for mobile: CTA above the fold */}
        <div className="my-6 md:my-10">
          <PageHero 
            ctaPrimaryHref="/quote"
            ctaSecondaryHref="/resources"
            badge="ISO Certified Manufacturer"
          />
        </div>
      </div>

      {/* Home Page Statistics - Trust Building Section */}
      {/* Stats Section with background - positioned right after Hero - Reduced padding on mobile */}
      {/* Mobile: 2 columns, Desktop: 5 columns for better layout */}
      <section 
        id="stats" 
        className="py-6 md:py-10 lg:py-16 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"
      >
        <div className={`mx-auto max-w-6xl ${isMobile ? 'px-4' : 'px-4 md:px-8'}`}>
          <StatsGrid 
            stats={homePageStats} 
            lang={lang} 
            columns={isMobile ? 2 : 5} 
          />
        </div>
      </section>

      {/* SEO Content Section - Why Global Theme Parks Choose Miying */}
      <Section
        id="why-choose-miying"
        title={lang === "zh" ? "为什么全球主题公园选择米盈设备" : "Why Global Theme Parks Choose Miying Equipment"}
      >
        <div className={`space-y-8 md:space-y-10 lg:space-y-12`}>
          {/* Industry-Leading Manufacturing Standards */}
          <div className={`rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] ${isMobile ? 'p-6' : 'p-8 md:p-10'}`}>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
              {lang === "zh" ? "ISO认证游乐设备制造商标准" : "ISO Certified Amusement Rides Manufacturer Standards"}
            </h2>
            <p className="mb-4 leading-relaxed text-[var(--text-secondary)]">
              {lang === "zh" 
                ? "作为领先的游乐设备制造商和主题公园设备供应商，米盈在游乐设备行业拥有超过15年的经验，已成为50多个国家FEC（家庭娱乐中心）和主题公园值得信赖的合作伙伴。我们的ISO 9001认证制造工厂确保每台设备都符合国际安全标准，包括CE、ASTM和EN认证。我们提供从标准型号到完全定制设计的全方位解决方案，支持全球交付和安装服务。"
                : "As a leading amusement rides manufacturer and theme park equipment supplier, Miying has over 15 years of experience serving FECs (Family Entertainment Centers) and theme parks across 50+ countries. Our ISO 9001 certified manufacturing facility ensures every ride meets international safety standards including CE, ASTM, and EN certifications. We offer comprehensive solutions from standard models to fully custom designs, with global delivery and installation services."}
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              {(lang === "zh" 
                ? ["ISO 9001质量管理体系认证", "CE欧洲安全标准认证", "ASTM F24美国安全标准认证", "EN 13814欧洲游乐设备安全标准"]
                : ["ISO 9001 Quality Management System Certification", "CE European Safety Standards Certification", "ASTM F24 US Safety Standards Certification", "EN 13814 European Amusement Ride Safety Standards"]
              ).map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Comprehensive Product Range */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 md:p-10">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
              {lang === "zh" ? "主题公园设备供应商产品目录" : "Theme Park Equipment Supplier Product Catalog"}
            </h2>
            <p className="mb-4 leading-relaxed text-[var(--text-secondary)]">
              {lang === "zh"
                ? "从经典的旋转木马和碰碰车到刺激的过山车和现代VR景点，我们的产品目录涵盖了主题公园的完整需求。无论您是启动新的家庭娱乐中心还是扩展现有主题公园，我们都提供交钥匙解决方案。"
                : "From classic carousels and bumper cars to thrilling roller coasters and modern VR attractions, our catalog covers the complete spectrum of amusement park needs. Whether you're launching a new family entertainment center or expanding an existing theme park, we provide turnkey solutions."}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {(lang === "zh"
                ? ["家庭游乐设备：旋转木马、碰碰车、小火车", "刺激游乐设备：过山车、跳楼机、大摆锤", "水上设备：水滑梯、造浪池设备", "VR/AR互动体验设备"]
                : ["Family Rides: Carousels, Bumper Cars, Mini Trains", "Thrill Rides: Roller Coasters, Drop Towers, Swing Rides", "Water Rides: Water Slides, Wave Pool Equipment", "VR/AR Interactive Experience Equipment"]
              ).map((item, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
                  <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[var(--text-secondary)]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* End-to-End Project Support */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 md:p-10">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
              {lang === "zh" ? "游乐设备安装服务和售后支持" : "Amusement Ride Installation Services & Support"}
            </h2>
            <p className="mb-6 leading-relaxed text-[var(--text-secondary)]">
              {lang === "zh"
                ? "我们的服务不仅限于设备交付。我们提供完整的支持，包括："
                : "Our service doesn't end with equipment delivery. We provide complete support including:"}
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                <div key={index} className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
                  <h4 className="mb-2 font-semibold text-[var(--text-primary)]">{item.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Trust Layer - Comprehensive Social Proof */}
      <TrustLayer 
        variant="full"
        showPartners={true}
        showCertifications={true}
        showFactoryPhotos={true}
        showProjectHighlights={true}
        maxPartners={10}
      />

      <Section
        id="services"
        title={c.servicesTitle}
        subtitle={lang === "zh" ? "从市场调研到售后支持，一站式解决方案" : "From market research to after-sales support, one-stop solutions"}
      >
        {/* Service Highlights - Top 4 Core Services */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service, index) => {
            const serviceIcons = [
              <svg key="0" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>,
              <svg key="1" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>,
              <svg key="2" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>,
              <svg key="3" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>,
            ];
            
            return (
              <div
                key={service.title}
                onClick={() => router.push("/services")}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 transition hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)] cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--accent-primary)]/30 transition group-hover:bg-[var(--surface-hover)] group-hover:border-[var(--accent-primary)]/50">
                    {serviceIcons[index] || serviceIcons[0]}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {service.desc}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-6 py-3 text-sm font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
                  >
                    <span>{c.cta.getTechnicalConsultation || (lang === "zh" ? "获取技术咨询" : "Get Technical Consultation")}</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Request Service Consultation CTA */}
        <div className="text-center">
          <Link
            href="/contact?type=service"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-8 py-4 text-base font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
          >
            <span>{c.cta.scheduleConsultation || (lang === "zh" ? "预约服务咨询" : "Schedule Service Consultation")}</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
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
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                      {categoryName} - {subCategoryName}
                    </h3>
                    <p className="text-[var(--text-secondary)] mt-1">
                      {lang === "zh" ? "精选产品" : "Featured Products"}
                    </p>
                  </div>
                  <Link
                    href={`/quote?category=${encodeURIComponent(category.mainCategory)}&subCategory=${encodeURIComponent(category.subCategory)}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-6 py-3 text-sm font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
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
        <div className="mt-8 text-center space-y-4">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-8 py-4 text-base font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
          >
            <span>{c.cta.downloadDatasheet || (lang === "zh" ? "下载产品目录" : "Download Product Catalog")}</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </Link>
          <p className="text-sm text-[var(--text-secondary)]">
            {lang === "zh" ? "或" : "or"}
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--action-secondary-border)] bg-[var(--action-secondary)] px-8 py-4 text-base font-semibold text-[var(--action-secondary-text)] transition-colors hover:bg-[var(--action-secondary-hover-bg)] min-h-[44px] touch-manipulation"
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

