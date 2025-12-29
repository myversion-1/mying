"use client";

import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { getServices, copy } from "../../content/copy";
import { useLanguage } from "../../components/language";

export default function ServicesPage() {
  const { lang } = useLanguage();
  const c = copy(lang);
  const services = getServices(lang);
  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="my-10">
          <PageHero
            headline="End-to-end ride support: sourcing, appraisal, refurbishment, assembly."
            subhead="Modeled after industry leaders, we help you choose, acquire, and deploy rides with clear documentation and timelines."
            ctaPrimaryHref="/contact"
            ctaSecondaryHref="/products"
            badge={c.pageBadges.serviceSuite}
          />
        </div>
      </div>

      <Section title="Service catalog">
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-white/5 bg-white/5 p-5"
            >
              <div className="text-xs uppercase tracking-[0.14em] text-white/50">
                {service.title}
              </div>
              <p className="mt-2 text-white/80">{service.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="How we work"
        subtitle="A simple, transparent process that keeps stakeholders aligned."
      >
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "01. Scope & shortlist",
              desc: "Clarify goals, budgets, and compliance needs; shortlist rides.",
            },
            {
              title: "02. Appraise & verify",
              desc: "Condition checks, documents, and timelines before committing.",
            },
            {
              title: "03. Refurb & assemble",
              desc: "Refurbishment, shipping coordination, and on-site assembly.",
            },
            {
              title: "04. Test & handover",
              desc: "Load tests, documentation package, training for operators.",
            },
            {
              title: "05. Support",
              desc: "Parts sourcing, inspections, and seasonal readiness checks.",
            },
          ].map((step) => (
            <li
              key={step.title}
              className="rounded-2xl border border-white/5 bg-white/5 p-4"
            >
              <div className="text-sm font-semibold text-white">{step.title}</div>
              <p className="text-white/70">{step.desc}</p>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

