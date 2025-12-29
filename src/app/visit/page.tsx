"use client";

import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { VerificationGate } from "../../components/VerificationGate";
import { copy } from "../../content/copy";
import { useLanguage } from "../../components/language";

export default function VisitPage() {
  const { lang } = useLanguage();
  const c = copy(lang);

  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="my-10">
          <PageHero
            headline={c.verificationTitle}
            subhead={c.verificationSubtitle}
            ctaPrimaryHref="/visit#gate"
            ctaSecondaryHref="/contact"
            badge={c.pageBadges.booking}
          />
        </div>
      </div>

      <Section
        id="gate"
        title={c.verificationTitle}
        subtitle={c.verificationSubtitle}
      >
        <VerificationGate />
      </Section>
    </div>
  );
}

