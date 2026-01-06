"use client";

import type { Product } from "../content/copy";
import type { Lang } from "./language";
import { copy } from "../content/copy";

interface ProductSpecsProps {
  product: Product;
  lang: Lang;
  variant?: "card" | "detail";
  className?: string;
}

/**
 * ProductSpecs Component
 * 
 * Structured component for displaying product technical specifications.
 * Supports both card view (compact) and detail view (full).
 * 
 * B2B Standard Compliance:
 * - Displays footprint, height, capacity (riders), and year
 * - Responsive: key-value list on mobile (< 768px), table on desktop (≥ 768px)
 * - RTL support for Arabic and other RTL languages
 * - Multi-language label support
 */
export function ProductSpecs({
  product,
  lang,
  variant = "card",
  className = "",
}: ProductSpecsProps) {
  const c = copy(lang);
  const isRTL = lang === "ar";

  // Get localized labels
  const labels = {
    footprint: c.productLabels?.footprint || (lang === "zh" ? "占地面积" : "Footprint"),
    height: c.productLabels?.height || (lang === "zh" ? "高度" : "Height"),
    riders: c.productLabels?.riders || (lang === "zh" ? "载客量" : "Riders"),
    year: c.productLabels?.year || (lang === "zh" ? "年份" : "Year"),
  };

  // Card variant: compact grid layout with Container Queries
  if (variant === "card") {
    return (
      <dl
        className={`
          grid gap-2 @[200px]:gap-3 text-xs @[300px]:text-sm text-white/70
          grid-cols-1 @[200px]:grid-cols-2 @[400px]:grid-cols-4
          ${className}
        `}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <SpecItem
          label={labels.footprint}
          value={product.footprint}
          explanation={product.venueRequirements}
          isRTL={isRTL}
        />
        <SpecItem label={labels.height} value={product.height} isRTL={isRTL} />
        <SpecItem label={labels.riders} value={product.riders} isRTL={isRTL} />
        {product.year && (
          <SpecItem label={labels.year} value={product.year} isRTL={isRTL} />
        )}
      </dl>
    );
  }

  // Detail variant: full specification list
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${className}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h2 className={`mb-4 text-2xl font-semibold text-white ${isRTL ? "text-right" : "text-left"}`}>
        {lang === "zh" ? "规格参数" : "Specifications"}
      </h2>
      <dl className="space-y-3">
        <DetailSpecItem
          label={labels.footprint}
          value={product.footprint}
          isRTL={isRTL}
        />
        <DetailSpecItem label={labels.height} value={product.height} isRTL={isRTL} />
        <DetailSpecItem label={labels.riders} value={product.riders} isRTL={isRTL} />
        {product.year && (
          <DetailSpecItem label={labels.year} value={product.year} isRTL={isRTL} />
        )}
      </dl>
    </div>
  );
}

/**
 * SpecItem - Compact card view item
 */
function SpecItem({
  label,
  value,
  explanation,
  isRTL,
}: {
  label: string;
  value: string;
  explanation?: string;
  isRTL: boolean;
}) {
  return (
    <div
      className={`flex flex-col rounded-lg border border-white/5 bg-white/5 px-3 py-2 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      <dt className="text-[11px] uppercase tracking-[0.14em] text-white/50">
        {label}
      </dt>
      <dd className="text-white">{value}</dd>
      {explanation && (
        <span className="mt-1 text-xs text-white/60">({explanation})</span>
      )}
    </div>
  );
}

/**
 * DetailSpecItem - Full detail view item
 * Responsive: vertical list on mobile, horizontal table on desktop
 */
function DetailSpecItem({
  label,
  value,
  isRTL,
}: {
  label: string;
  value: string;
  isRTL: boolean;
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:justify-between border-b border-white/10 pb-2 ${
        isRTL ? "sm:flex-row-reverse" : ""
      }`}
    >
      <dt
        className={`text-sm text-white/60 mb-1 sm:mb-0 ${
          isRTL ? "sm:text-right" : "sm:text-left"
        }`}
      >
        {label}
      </dt>
      <dd
        className={`font-medium text-white ${
          isRTL ? "sm:text-right" : "sm:text-left"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}


