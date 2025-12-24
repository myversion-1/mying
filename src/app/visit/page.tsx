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
        subtitle="Enter your verification code. Replace the demo code and Calendly link with your own."
      >
        <VerificationGate />
      </Section>

      <Section
        title="How verification works"
        subtitle="Keep high-intent clients prioritized while screening unserious requests."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Request",
              desc: "Clients submit project details via the contact form or a dedicated verification form.",
            },
            {
              title: "Review",
              desc: "You confirm seriousness, timing, and budget alignment. Issue a one-time code.",
            },
            {
              title: "Schedule",
              desc: "Client enters the code, sees your Calendly, and books within your allowed windows.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/5 bg-white/5 p-4"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

