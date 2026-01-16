"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { copy } from "../content/copy";
import { useLanguage, type Lang } from "./language";
import { trackCTAClick } from "../lib/analytics";
import { CheckCircle2, Award, Globe2 } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  headline?: string;
  subhead?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryHref?: string;
  badge?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  heroImage?: string; // Optional hero image (3D render or factory photo)
  lang?: Lang; // Optional: pass lang from server to prevent hydration mismatch
};

export function PageHero({
  headline,
  subhead,
  ctaPrimaryHref = "/quote",
  ctaSecondaryHref = "/resources",
  badge,
  primaryCtaText,
  secondaryCtaText,
  heroImage = "/products/米盈游乐设备产品介绍 conv 0.jpeg", // Default factory photo
  lang: langProp,
}: Props) {
  const { lang: langFromContext } = useLanguage();
  const pathname = usePathname();
  
  // Use prop lang if provided (from server), otherwise use context (client-only)
  // This prevents hydration mismatch when used in server components
  // Initialize with prop if available, otherwise use context
  const [mounted, setMounted] = useState(false);
  
  // Only use context lang after mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Use prop lang during SSR and initial render, context lang after mount
  // If langProp is provided, always use it (from server)
  // Otherwise, use context lang after mount
  const lang = langProp || (mounted ? langFromContext : "en");
  
  const c = copy(lang);

  // Primary CTA: "Get a Quote" - Solid fill style
  const primaryCTA = primaryCtaText || c.cta.requestQuote || c.cta.primary;
  
  // Secondary CTA: "Download Specs" - Outline style
  const secondaryCTA = secondaryCtaText || c.cta.downloadSpecs || c.cta.secondary;

  // Trust badges data
  const trustBadges = [
    {
      icon: Award,
      label: lang === "zh" ? "ISO 9001" : "ISO 9001",
      description: lang === "zh" ? "认证制造商" : "Certified",
    },
    {
      icon: CheckCircle2,
      label: lang === "zh" ? "CE 标志" : "CE Marking",
      description: lang === "zh" ? "合规认证" : "Compliant",
    },
    {
      icon: Globe2,
      label: lang === "zh" ? "80+ 国家" : "80+ Countries",
      description: lang === "zh" ? "全球出口" : "Global Export",
    },
  ];

  // Use badge prop if provided, otherwise use default from translations
  const badgeText = badge !== undefined && badge !== null ? badge : c.hero.badge;

  return (
    <div className="relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]">
      {/* Layout: Left Text, Right Image (Desktop) / Centered (Mobile) */}
      <div className="relative flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-16">
        {/* Main Content - Left Side (Desktop) / Centered (Mobile) */}
        <div className="flex-1 px-6 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16 space-y-6 md:space-y-8 order-2 md:order-1">
          {/* Badge */}
          {badgeText && (
            <div 
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary-light)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-primary)] border border-[var(--accent-primary)]/30"
              suppressHydrationWarning={badge !== undefined}
            >
              {badgeText}
            </div>
          )}
          
          {/* Headline (H1) - Emphasizes Industry Position */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[var(--text-primary)] tracking-tight max-w-3xl">
            {headline ?? c.hero.title}
          </h1>
          
          {/* Subtitle - Describes Specific Solution */}
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-[var(--text-secondary)] max-w-2xl">
            {subhead ?? c.hero.subtitle}
          </p>
          
          {/* CTA Buttons - Clear Visual Hierarchy */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 pt-4" suppressHydrationWarning>
            {/* Primary CTA: Solid Fill - "Get a Quote" */}
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
              className="rounded-xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--accent-primary)] px-6 py-4 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold shadow-lg shadow-[var(--action-primary)]/30 hover:shadow-2xl hover:shadow-[var(--action-primary)]/50 transition-all duration-200 hover:-translate-y-1 hover:brightness-110 active:scale-95 touch-manipulation text-center flex items-center justify-center flex-1 sm:flex-none sm:min-w-[200px] text-[var(--action-primary-text)] border border-[var(--action-primary)]/20"
              suppressHydrationWarning
            >
              {primaryCTA}
            </Link>

            {/* Secondary CTA: Outline Style - "Download Specs" */}
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
              className="rounded-xl border-2 border-[var(--action-primary)] bg-[var(--action-primary)]/5 px-6 py-4 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold text-[var(--action-primary)] shadow-md hover:shadow-lg hover:shadow-[var(--action-primary)]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--action-primary)]/15 active:scale-95 touch-manipulation text-center flex items-center justify-center flex-1 sm:flex-none sm:min-w-[200px]"
              suppressHydrationWarning
            >
              {secondaryCTA}
            </Link>
          </div>

          {/* Trust Badges - Minimal Icon Style Below CTAs */}
          <div className="flex flex-wrap items-center gap-6 pt-4" suppressHydrationWarning>
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                >
                  <Icon className="h-5 w-5 text-[var(--accent-primary)] flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-[var(--text-primary)]">
                      {badge.label}
                    </span>
                    <span className="text-xs text-[var(--text-tertiary)]">
                      {badge.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Hero Image - Right Side (Desktop) / Above (Mobile) */}
        <div className="relative w-full md:w-1/2 lg:w-2/5 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden order-1 md:order-2">
          {/* Floating Animation Container */}
          <div className="absolute inset-0 animate-float">
            <Image
              src={heroImage}
              alt={lang === "zh" ? "米盈工厂实景" : "Miying Factory Facilities"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              priority
              quality={85}
            />
          </div>
          
          {/* Gradient Overlay for Better Text Readability (if needed) */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--surface-elevated)] md:from-transparent md:via-transparent md:to-[var(--surface-elevated)] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
