"use client";

import { useState } from "react";
import type { Product } from "../content/copy";
import type { Lang } from "./language";
import { copy } from "../content/copy";
import { Download, FileText } from "lucide-react";

interface ProductSpecsProps {
  product: Product;
  lang: Lang;
  variant?: "card" | "detail";
  className?: string;
}

/**
 * ProductSpecs Component - B2B Optimized
 * 
 * Features:
 * 1. Responsive table layout (mobile: list, desktop: table)
 * 2. Dark mode support with high readability
 * 3. Export PDF specification sheet button
 * 4. Structured technical parameters display
 */
export function ProductSpecs({
  product,
  lang,
  variant = "card",
  className = "",
}: ProductSpecsProps) {
  const c = copy(lang);
  const isRTL = lang === "ar";
  const [isExporting, setIsExporting] = useState(false);

  // Get localized labels
  const labels = {
    footprint: c.productLabels?.footprint || (lang === "zh" ? "占地面积" : "Footprint"),
    height: c.productLabels?.height || (lang === "zh" ? "高度" : "Height"),
    riders: c.productLabels?.riders || (lang === "zh" ? "载客量" : "Riders"),
    year: c.productLabels?.year || (lang === "zh" ? "年份" : "Year"),
    specifications: lang === "zh" ? "技术规格" : "Technical Specifications",
    exportPdf: lang === "zh" ? "导出 PDF 规格书" : "Export PDF Spec Sheet",
  };

  // Handle PDF export
  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      // TODO: Implement PDF generation
      // For now, create a simple text-based export
      const specText = `
${product.name} - ${labels.specifications}
${labels.footprint}: ${product.footprint}
${labels.height}: ${product.height}
${labels.riders}: ${product.riders}
${product.year ? `${labels.year}: ${product.year}` : ''}
      `.trim();
      
      const blob = new Blob([specText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${product.name.replace(/\s+/g, '-')}-specs.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Card variant: compact grid layout
  if (variant === "card") {
    return (
      <div
        className={`
          grid gap-2 text-xs text-[var(--text-secondary)]
          grid-cols-3 min-w-0
          ${className}
        `}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <SpecItem label={labels.footprint} value={product.footprint} isRTL={isRTL} />
        <SpecItem label={labels.height} value={product.height} isRTL={isRTL} />
        <SpecItem label={labels.riders} value={product.riders} isRTL={isRTL} />
      </div>
    );
  }

  // Detail variant: responsive table with PDF export
  return (
    <div
      className={`rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-4 md:p-6 ${className}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl md:text-2xl font-semibold text-[var(--text-primary)] ${isRTL ? "text-right" : "text-left"}`}>
          {labels.specifications}
        </h2>
        {/* Export PDF Button */}
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="
            flex items-center gap-2 rounded-md border border-[var(--accent-primary)]/50 
            bg-[var(--accent-primary-light)] px-4 py-2 text-sm font-semibold 
            text-[var(--accent-primary)] transition-colors 
            hover:bg-[var(--accent-primary)]/20 hover:border-[var(--accent-primary)]
            disabled:opacity-50 disabled:cursor-not-allowed
            min-h-[44px] touch-manipulation
          "
        >
          {isExporting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--accent-primary)] border-t-transparent" />
              <span>{lang === "zh" ? "导出中..." : "Exporting..."}</span>
            </>
          ) : (
            <>
              <FileText className="h-4 w-4" />
              <span>{labels.exportPdf}</span>
            </>
          )}
        </button>
      </div>

      {/* Responsive Table - Mobile: List, Desktop: Table */}
      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className={`text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)] ${isRTL ? "text-right" : "text-left"}`}>
                {lang === "zh" ? "参数" : "Parameter"}
              </th>
              <th className={`text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)] ${isRTL ? "text-right" : "text-left"}`}>
                {lang === "zh" ? "数值" : "Value"}
              </th>
            </tr>
          </thead>
          <tbody>
            <TableRow label={labels.footprint} value={product.footprint} isRTL={isRTL} />
            <TableRow label={labels.height} value={product.height} isRTL={isRTL} />
            <TableRow label={labels.riders} value={product.riders} isRTL={isRTL} />
            {product.year && (
              <TableRow label={labels.year} value={product.year} isRTL={isRTL} />
            )}
            {product.venueRequirements && (
              <TableRow 
                label={lang === "zh" ? "场地要求" : "Venue Requirements"} 
                value={product.venueRequirements} 
                isRTL={isRTL} 
              />
            )}
            {product.powerSupply && (
              <TableRow 
                label={lang === "zh" ? "电源要求" : "Power Supply"} 
                value={product.powerSupply} 
                isRTL={isRTL} 
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * SpecItem - Compact card view item
 */
function SpecItem({
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
      className={`flex flex-col rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 min-w-0 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      <div className="text-[10px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mb-0.5">
        {label}
      </div>
      <div className="text-xs font-semibold text-[var(--text-primary)]">
        {value}
      </div>
    </div>
  );
}

/**
 * TableRow - Table row for detail view
 */
function TableRow({
  label,
  value,
  isRTL,
}: {
  label: string;
  value: string;
  isRTL: boolean;
}) {
  return (
    <tr className="border-b border-[var(--border)] last:border-b-0">
      <td className={`py-3 px-4 text-sm text-[var(--text-secondary)] ${isRTL ? "text-right" : "text-left"}`}>
        {label}
      </td>
      <td className={`py-3 px-4 text-sm font-medium text-[var(--text-primary)] ${isRTL ? "text-right" : "text-left"}`}>
        {value}
      </td>
    </tr>
  );
}
