"use client";

import { Suspense } from "react";
import Link from "next/link";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { ProductGrid } from "../components/ProductGrid";
import { ContactForm } from "../components/ContactForm";
import { VerificationGate } from "../components/VerificationGate";
import { StatsGrid } from "../components/StatsGrid";
import { TestimonialsGrid } from "../components/TestimonialsGrid";
import { PartnersSection } from "../components/PartnersSection";
import { ProductCard } from "../components/ProductCard";
import { copy, getServices, getProducts } from "../content/copy";
import { homePageStats } from "../content/homePageStats";
import { testimonials, getLocalizedTestimonial } from "../content/testimonials";
import { useLanguage } from "../components/language";

export default function Home() {
  const { lang } = useLanguage();
  const c = copy(lang);
  const services = getServices(lang);
  const isRTL = lang === "ar";

  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="my-10">
          <PageHero ctaPrimaryHref="/quote" />
        </div>
      </div>

      {/* Home Page Statistics - Trust Building Section */}
      {/* Stats Section with background - positioned right after Hero */}
      <section 
        id="stats" 
        className="py-12 md:py-16 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <StatsGrid stats={homePageStats} lang={lang} columns={5} />
        </div>
      </section>

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
              <Link
                key={service.title}
                href="/services"
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 transition hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]"
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
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[var(--accent-primary)] opacity-0 transition group-hover:opacity-100">
                  <span>{lang === "zh" ? "了解更多" : "Learn more"}</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* View All Services Link */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-hover)] hover:border-[var(--accent-primary)]/30 min-h-[44px] touch-manipulation"
          >
            <span>{lang === "zh" ? "查看所有服务" : "View All Services"}</span>
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
                    href={`/products?mainCategory=${encodeURIComponent(category.mainCategory)}&subCategory=${encodeURIComponent(category.subCategory.toLowerCase().replace(/\s+/g, "-"))}`}
                    className="text-sm font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] transition flex items-center gap-2 min-h-[32px] touch-manipulation"
                  >
                    <span>{lang === "zh" ? "查看全部" : "View All"}</span>
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
        
        {/* View All Products CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-hover)] hover:border-[var(--accent-primary)]/30 min-h-[44px] touch-manipulation"
          >
            <span>{lang === "zh" ? "查看所有产品" : "View All Products"}</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
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

      {/* Partners Section */}
      <PartnersSection maxPartners={10} />

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

