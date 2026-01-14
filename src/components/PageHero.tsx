"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { copy } from "../content/copy";
import { useLanguage } from "./language";
import { trackCTAClick } from "../lib/analytics";

type Props = {
  headline?: string;
  subhead?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryHref?: string;
  badge?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
};

export function PageHero({
  headline,
  subhead,
  ctaPrimaryHref = "/quote",
  ctaSecondaryHref = "/resources",
  badge,
  primaryCtaText,
  secondaryCtaText,
}: Props) {
  const { lang } = useLanguage();
  const pathname = usePathname();
  const c = copy(lang);

  // Primary CTA: "Get a Quote" (or "Talk to an Engineer" if specified)
  const primaryCTA = primaryCtaText || c.cta.requestQuote || c.cta.primary;
  
  // Secondary CTA: "Download Product Specs"
  const secondaryCTA = secondaryCtaText || c.cta.downloadSpecs || c.cta.secondary;

  // Use badge prop if provided, otherwise use default from translations
  // IMPORTANT: If badge prop is provided, use it directly to avoid hydration mismatch
  // Only fall back to c.hero.badge if badge is truly undefined
  // Use suppressHydrationWarning to prevent hydration mismatch when badge prop is provided
  const badgeText = badge !== undefined && badge !== null ? badge : c.hero.badge;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface-elevated)] via-[var(--surface)] to-[var(--background)] px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-16 lg:px-12 lg:py-20">
      <div className="relative flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between md:gap-10 lg:gap-12">
        {/* Main Content - Left Side */}
        <div className="flex-1 max-w-2xl space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
          {/* Badge - Smaller on mobile */}
          {/* Use suppressHydrationWarning to prevent hydration mismatch when badge prop is provided */}
          {badgeText && (
            <div 
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary-light)] px-2.5 py-0.5 text-[10px] md:px-3 md:py-1 md:text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-primary)] !text-[var(--accent-primary)] dark:bg-[rgba(0,234,255,0.5)] dark:!text-white dark:border dark:border-[rgba(0,234,255,0.6)]"
              suppressHydrationWarning={badge !== undefined}
            >
              {badgeText}
            </div>
          )}
          
          {/* Headline - Optimized for mobile readability */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight text-[var(--text-primary)] !text-[var(--text-primary)] tracking-tight">
            {headline ?? c.hero.title}
          </h1>
          
          {/* Subtitle - Clear Value Proposition - Shorter on mobile */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-[var(--text-secondary)] !text-[var(--text-secondary)] max-w-3xl">
            {subhead ?? c.hero.subtitle}
          </p>
          
          {/* CTA Buttons - Primary is visually dominant - Above the fold on mobile */}
          <div className="flex flex-col gap-3 sm:gap-4 pt-2 md:flex-row md:gap-4 lg:gap-6">
            {/* Primary CTA: Single conversion action - Visually dominant */}
            <Link
              href={ctaPrimaryHref}
              data-element-id="hero-primary-cta"
              data-section="hero"
              data-cta-location="hero"
              onClick={() => {
                trackCTAClick({
                  ctaText: primaryCTA,
                  ctaLocation: "hero",
                  destination: ctaPrimaryHref,
                  page: pathname,
                  section: "hero_primary",
                });
              }}
              className="rounded-lg bg-[var(--action-primary)] px-6 py-3.5 sm:px-8 sm:py-4 md:px-10 md:py-4 lg:px-12 lg:py-5 text-sm sm:text-base md:text-lg font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[48px] sm:min-h-[52px] md:min-h-[56px] touch-manipulation text-center flex items-center justify-center w-full md:flex-1 md:w-auto"
            >
              {primaryCTA}
            </Link>
            
            {/* Secondary CTA: Auxiliary action */}
            <Link
              href={ctaSecondaryHref}
              data-element-id="hero-secondary-cta"
              data-section="hero"
              data-cta-location="hero"
              onClick={() => {
                trackCTAClick({
                  ctaText: secondaryCTA,
                  ctaLocation: "hero",
                  destination: ctaSecondaryHref,
                  page: pathname,
                  section: "hero_secondary",
                });
              }}
              className="rounded-lg border border-[var(--action-secondary-border)] bg-[var(--action-secondary)] px-6 py-3 sm:px-8 sm:py-3.5 md:px-8 md:py-4 lg:px-10 lg:py-4.5 text-sm sm:text-base md:text-lg font-semibold text-[var(--action-secondary-text)] transition-colors hover:bg-[var(--action-secondary-hover-bg)] min-h-[44px] sm:min-h-[48px] md:min-h-[52px] touch-manipulation text-center flex items-center justify-center w-full md:flex-1 md:w-auto"
            >
              {secondaryCTA}
            </Link>
          </div>
        </div>
        
        {/* Highlights Grid - Right Side (Desktop) / Below (Mobile) - Moved below CTA on mobile for conversion priority */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-3 lg:gap-4 text-xs sm:text-sm md:text-sm lg:text-base text-[var(--text-secondary)] md:max-w-xs lg:max-w-sm md:flex-shrink-0 md:mt-0 mt-6 sm:mt-8">
          {c.highlights.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 sm:px-5 sm:py-4 md:px-4 md:py-3 lg:px-5 lg:py-4"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

