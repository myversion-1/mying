"use client";

import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { ProductGrid } from "../components/ProductGrid";
import { ContactForm } from "../components/ContactForm";
import { VerificationGate } from "../components/VerificationGate";
import { copy, services } from "../content/copy";
import { useLanguage } from "../components/language";

export default function Home() {
  const { lang } = useLanguage();
  const c = copy(lang);

  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="my-10">
          <PageHero />
        </div>
      </div>

      <Section
        id="services"
        title={c.servicesTitle}
        subtitle="Consulting, sourcing, refurbishment, and assembly for attractions worldwide."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-white/5 bg-white/5 p-4"
            >
              <div className="text-[11px] uppercase tracking-[0.14em] text-white/50">
                Service
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
        subtitle="Representative rides; request specs for your project."
      >
        <ProductGrid />
      </Section>

      <Section
        id="contact"
        title={c.contactTitle}
        subtitle={c.contactSubtitle}
      >
        <ContactForm />
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
