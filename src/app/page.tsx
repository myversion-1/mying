"use client";

import { Suspense } from "react";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { ProductGrid } from "../components/ProductGrid";
import { ContactForm } from "../components/ContactForm";
import { VerificationGate } from "../components/VerificationGate";
import { StatsGrid } from "../components/StatsGrid";
import { TestimonialsGrid } from "../components/TestimonialsGrid";
import { copy, getServices } from "../content/copy";
import { homePageStats } from "../content/homePageStats";
import { testimonials, getLocalizedTestimonial } from "../content/testimonials";
import { useLanguage } from "../components/language";

export default function Home() {
  const { lang } = useLanguage();
  const c = copy(lang);
  const services = getServices(lang);

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
          <StatsGrid stats={homePageStats} lang={lang} columns={4} />
        </div>
      </section>

      <Section
        id="services"
        title={c.servicesTitle}
        subtitle={c.servicesSubtitle || "Consulting, sourcing, refurbishment, and assembly for attractions worldwide."}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-white/5 bg-white/5 p-4"
            >
              <div className="text-[11px] uppercase tracking-[0.14em] text-white/50">
                {c.serviceLabel || "Service"}
              </div>
              <h3 className="text-lg font-semibold text-white">
                {service.title}
              </h3>
              <p className="text-white/70">{service.desc}</p>
            </div>
          ))}
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

      <Section
        id="contact"
        title={c.contactTitle}
        subtitle={c.contactSubtitle}
      >
        <Suspense fallback={<div className="rounded-2xl border border-white/10 bg-white/5 p-6">{c.contactPage.loadingForm}</div>}>
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

