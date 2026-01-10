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
    <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface-elevated)] via-[var(--surface)] to-[var(--background)] px-6 py-12 shadow-2xl md:px-10 md:py-16">
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary-light)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-primary)] !text-[var(--accent-primary)] dark:bg-[rgba(0,234,255,0.5)] dark:!text-white dark:border dark:border-[rgba(0,234,255,0.6)]">
            {badge ?? c.hero.badge}
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-[var(--text-primary)] !text-[var(--text-primary)] md:text-4xl">
            {headline ?? c.hero.title}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] !text-[var(--text-secondary)] md:text-xl">
            {subhead ?? c.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            {/* Primary CTA: Single conversion action */}
            <Link
              href={ctaPrimaryHref}
              className="rounded-lg bg-[var(--action-primary)] px-8 py-3 text-sm font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] min-w-[44px] touch-manipulation"
            >
              {c.cta.requestQuote ?? c.cta.primary}
            </Link>
            {/* Secondary CTA: Auxiliary action */}
            <Link
              href={ctaSecondaryHref}
              className="rounded-lg border border-[var(--action-secondary-border)] bg-[var(--action-secondary)] px-8 py-3 text-sm font-semibold text-[var(--action-secondary-text)] transition-colors hover:bg-[var(--action-secondary-hover-bg)] min-h-[44px] min-w-[44px] touch-manipulation"
            >
              {c.cta.secondary}
            </Link>
            {/* Note: WhatsApp is available via the floating action button (FAB) in the bottom right corner */}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-[var(--text-secondary)] md:max-w-xs">
          {c.highlights.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

