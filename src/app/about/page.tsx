"use client";

import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { useLanguage } from "../../components/language";
import { copy } from "../../content/copy";

export default function AboutPage() {
  const { lang } = useLanguage();
  const c = copy(lang);

  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="my-10">
          <PageHero
            headline="Engineering amusement rides with verified safety and global delivery."
            subhead="We guide buyers from concept to opening day, combining factory-level QA with transparent timelines and compliance-first execution."
          />
        </div>
      </div>

      <Section
        title="Why partner with us"
        subtitle="International trading tone, clear documentation, and experienced engineers who have shipped rides across multiple regions."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Factory-tested safety and documentation",
            "Compliance-ready for EU/US/Asia standards",
            "Refurbishment programs with clear scopes",
            "Assembly managed by experienced supervisors",
            "Transparent scheduling and progress reporting",
            "Long-term support and parts sourcing",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/5 bg-white/5 p-4 text-white/80"
            >
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Certifications & compliance focus"
        subtitle="We align documentation with key safety and quality frameworks."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {["EN 13814", "ASTM F24", "ISO 9001-ready", "Inspection reports", "Load tests", "Refurb QA checklists"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-white/80"
              >
                {item}
              </div>
            ),
          )}
        </div>
      </Section>
    </div>
  );
}

