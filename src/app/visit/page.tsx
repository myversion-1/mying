"use client";

import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { VerificationGate } from "../../components/VerificationGate";

export default function VisitPage() {
  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="my-10">
          <PageHero
            headline="Verified factory visits with a simple gated booking flow."
            subhead="We review your project, verify readiness, then share a one-time code to unlock scheduling."
            ctaPrimaryHref="/visit#gate"
            ctaSecondaryHref="/contact"
            badge="Booking"
          />
        </div>
      </div>

      <Section
        id="gate"
        title="Unlock booking"
        subtitle="Enter your verification code to access factory visit scheduling."
      >
        <VerificationGate />
      </Section>
    </div>
  );
}

