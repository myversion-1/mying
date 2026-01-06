"use client";

import Link from "next/link";
import { copy } from "../content/copy";
import { useLanguage } from "./language";

type Props = {
  headline?: string;
  subhead?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryHref?: string;
  badge?: string;
};

export function PageHero({
  headline,
  subhead,
  ctaPrimaryHref = "/contact",
  ctaSecondaryHref = "/products",
  badge,
}: Props) {
  const { lang } = useLanguage();
  const c = copy(lang);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#101823] via-[#0d131b] to-[#0b1016] px-6 py-12 shadow-2xl md:px-10 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,234,255,0.15),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_50%_80%,rgba(0,234,255,0.12),transparent_20%)]" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7df6ff]">
            {badge ?? c.hero.badge}
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
            {headline ?? c.hero.title}
          </h1>
          <p className="text-lg text-white/70 md:text-xl">
            {subhead ?? c.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            {/* Primary CTA: Get Quote */}
            <Link
              href={ctaPrimaryHref}
              className="rounded-full bg-[#00eaff] px-6 py-3 text-sm font-semibold text-[#0b1116] shadow-[0_0_28px_rgba(0,234,255,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_0_36px_rgba(0,234,255,0.5)]"
            >
              {c.cta.requestQuote ?? c.cta.primary}
            </Link>
            {/* Secondary CTA: Browse Products */}
            <Link
              href={ctaSecondaryHref}
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              {c.cta.secondary}
            </Link>
            {/* Note: WhatsApp is available via the floating action button (FAB) in the bottom right corner */}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-white/70 md:max-w-xs">
          {c.highlights.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

