"use client";

import Link from "next/link";
import type { Lang } from "./language";
import { copy } from "../content/copy";

interface StickyProductCTAProps {
  productName: string;
  lang: Lang;
}

/**
 * Sticky Product CTA Component
 * 
 * Fixed CTA block that appears on product pages, prompting users to:
 * - Request a quote
 * - Download specifications
 * 
 * Stays visible as user scrolls through the product page.
 */
export function StickyProductCTA({ productName, lang }: StickyProductCTAProps) {
  const c = copy(lang);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-md shadow-lg md:bottom-0">
      <div className="mx-auto max-w-6xl px-4 py-4 md:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm md:text-base font-semibold text-[var(--text-primary)] truncate">
              {lang === "zh" ? "准备获取报价？" : "Ready to Get a Quote?"}
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] line-clamp-1">
              {lang === "zh" 
                ? `为 ${productName} 获取定制报价或下载详细规格` 
                : `Get a custom quote for ${productName} or download detailed specifications`}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <Link
              href={`/quote?product=${encodeURIComponent(productName)}`}
              className="rounded-lg bg-[var(--action-primary)] px-6 py-3 text-sm font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation text-center flex items-center justify-center"
            >
              {c.cta.requestQuote || (lang === "zh" ? "获取报价" : "Request Quote")}
            </Link>
            <Link
              href="/resources"
              className="rounded-lg border border-[var(--action-secondary-border)] bg-[var(--action-secondary)] px-6 py-3 text-sm font-semibold text-[var(--action-secondary-text)] transition-colors hover:bg-[var(--action-secondary-hover-bg)] min-h-[44px] touch-manipulation text-center flex items-center justify-center"
            >
              {c.cta.downloadSpecs || (lang === "zh" ? "下载规格" : "Download Specs")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

