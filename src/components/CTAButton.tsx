"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "./language";
import { copy } from "../content/copy";
import { trackCTAClick } from "../lib/analytics";

type CTAVariant = "primary" | "secondary" | "outline";

type CTAContext = 
  | "requestPricing"
  | "getTechnicalConsultation"
  | "downloadDatasheet"
  | "requestQuote"
  | "scheduleConsultation"
  | "downloadSpecs"
  | "contactSales"
  | "getCustomQuote"
  | "viewProductDetails"
  | "requestProductInfo";

interface CTAButtonProps {
  context: CTAContext;
  lang: Lang;
  href: string;
  variant?: CTAVariant;
  className?: string;
  productName?: string;
  serviceName?: string;
}

/**
 * Unified CTA Button Component
 * 
 * Provides consistent, outcome-driven CTA labels across the site.
 * Eliminates vague CTAs like "View Products" or "Learn More".
 * 
 * All CTAs lead to either:
 * - Contact forms (/quote, /contact)
 * - Lead magnets (/resources)
 * - Specific product/service pages with conversion forms
 */
export function CTAButton({
  context,
  lang,
  href,
  variant = "primary",
  className = "",
  productName,
  serviceName,
}: CTAButtonProps) {
  const c = copy(lang);
  const pathname = usePathname();

  // Get context-specific CTA text
  const getCTAText = (): string => {
    switch (context) {
      case "requestPricing":
        return lang === "zh" ? "获取定价" : "Request Pricing";
      case "getTechnicalConsultation":
        return lang === "zh" ? "获取技术咨询" : "Get Technical Consultation";
      case "downloadDatasheet":
        return lang === "zh" ? "下载数据表" : "Download Datasheet";
      case "requestQuote":
        return c.cta.requestQuote || (lang === "zh" ? "获取报价" : "Get a Quote");
      case "scheduleConsultation":
        return lang === "zh" ? "预约咨询" : "Schedule Consultation";
      case "downloadSpecs":
        return c.cta.downloadSpecs || (lang === "zh" ? "下载产品规格" : "Download Product Specs");
      case "contactSales":
        return lang === "zh" ? "联系销售团队" : "Contact Sales Team";
      case "getCustomQuote":
        return lang === "zh" ? "获取定制报价" : "Get Custom Quote";
      case "viewProductDetails":
        return lang === "zh" ? "查看产品详情" : "View Product Details";
      case "requestProductInfo":
        return lang === "zh" ? "获取产品信息" : "Request Product Information";
      default:
        return lang === "zh" ? "了解更多" : "Learn More";
    }
  };

  const baseClasses = "rounded-lg font-semibold transition-colors min-h-[44px] min-w-[44px] touch-manipulation text-center flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-[var(--action-primary)] text-[var(--action-primary-text)] !text-[var(--action-primary-text)] hover:bg-[var(--action-primary-hover)] px-8 py-4",
    secondary: "border border-[var(--action-secondary-border)] bg-[var(--action-secondary)] text-[var(--action-secondary-text)] hover:bg-[var(--action-secondary-hover-bg)] px-8 py-4",
    outline: "border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] px-6 py-3",
  };

  const ctaText = getCTAText();

  // Determine CTA location based on context
  const getCTALocation = (): string => {
    if (pathname === "/") return "homepage";
    if (pathname.startsWith("/products")) return "product";
    if (pathname.startsWith("/services")) return "service";
    if (pathname.startsWith("/cases")) return "case";
    if (pathname.startsWith("/about")) return "about";
    return "other";
  };

  const handleClick = () => {
    trackCTAClick({
      ctaText,
      ctaLocation: getCTALocation(),
      destination: href,
      page: pathname,
      section: context,
    });
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {ctaText}
    </Link>
  );
}

