"use client";

import { Suspense } from "react";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { ContactForm } from "../../components/ContactForm";
import { copy } from "../../content/copy";
import { useLanguage } from "../../components/language";

export default function ContactPage() {
  const { lang } = useLanguage();
  const c = copy(lang);

  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="my-10">
          <PageHero
            headline={c.contactTitle}
            subhead={c.contactSubtitle}
            ctaPrimaryHref="/visit"
            ctaSecondaryHref="/products"
            badge={c.pageBadges.leadCapture}
          />
        </div>
      </div>

      <Section title={c.contactTitle} subtitle={c.contactSubtitle}>
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <Suspense fallback={<div className="rounded-2xl border border-white/10 bg-white/5 p-6">{c.contactPage.loadingForm}</div>}>
            <ContactForm />
          </Suspense>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
            <h3 className="text-lg font-semibold text-white">{c.contactPage.whatToInclude}</h3>
            <ul className="list-disc space-y-2 pl-5 text-white/70">
              {c.contactPage.whatToIncludeItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              {c.contactPage.needAssistance}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

