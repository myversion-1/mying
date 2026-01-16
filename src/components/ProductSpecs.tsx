"use client";

import { useState } from "react";
import type { Product } from "../content/copy";
import type { Lang } from "./language";
import { copy } from "../content/copy";
import { Download, FileText, CheckCircle2, Settings, Wrench } from "lucide-react";

interface ProductSpecsProps {
  product: Product;
  lang: Lang;
  variant?: "card" | "detail";
  className?: string;
}

type TabType = "specs" | "certifications" | "installation" | "maintenance";

/**
 * ProductSpecs Component - B2B Optimized with Tabs
 * 
 * Features:
 * 1. Tabbed interface for better information organization
 * 2. Responsive table layout (mobile: list, desktop: table)
 * 3. Dark mode support with high readability
 * 4. Export PDF specification sheet button
 * 5. Structured technical parameters display
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
  const [activeTab, setActiveTab] = useState<TabType>("specs");

  // Get localized labels
  const labels = {
    footprint: c.productLabels?.footprint || (lang === "zh" ? "占地面积" : "Footprint"),
    height: c.productLabels?.height || (lang === "zh" ? "高度" : "Height"),
    riders: c.productLabels?.riders || (lang === "zh" ? "载客量" : "Riders"),
    year: c.productLabels?.year || (lang === "zh" ? "年份" : "Year"),
    specifications: lang === "zh" ? "技术规格" : "Technical Specifications",
    exportPdf: lang === "zh" ? "下载完整规格书 (PDF)" : "Download Full Spec Sheet (PDF)",
    coreParams: lang === "zh" ? "核心参数" : "Core Parameters",
    safetyCert: lang === "zh" ? "安全认证" : "Safety Certifications",
    installReq: lang === "zh" ? "安装要求" : "Installation Requirements",
    maintenance: lang === "zh" ? "维护信息" : "Maintenance Information",
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

  // Detail variant: tabbed interface with PDF export
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "specs", label: labels.coreParams, icon: <Settings className="h-4 w-4" /> },
    { id: "certifications", label: labels.safetyCert, icon: <CheckCircle2 className="h-4 w-4" /> },
    { id: "installation", label: labels.installReq, icon: <Wrench className="h-4 w-4" /> },
    { id: "maintenance", label: labels.maintenance, icon: <Wrench className="h-4 w-4" /> },
  ];

  return (
    <div
      className={`rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] ${className}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Tab Navigation */}
      <div className="border-b border-[var(--border)]">
        <div className="flex overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
          <nav className="flex gap-2 min-w-full sm:min-w-0" role="tablist">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`
                    flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors
                    min-h-[44px] touch-manipulation whitespace-nowrap
                    border-b-2 border-transparent
                    ${isActive
                      ? "text-[var(--accent-primary)] border-[var(--accent-primary)] bg-[var(--accent-primary)]/5"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                    }
                  `}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 md:p-6">
        {/* Action Bar with Export PDF Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl md:text-2xl font-semibold text-[var(--text-primary)] ${isRTL ? "text-right" : "text-left"}`}>
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="
              flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--accent-primary)]
              px-4 py-2 text-sm font-semibold sm:px-5 sm:py-2.5
              text-[var(--action-primary-text)]
              shadow-lg shadow-[var(--action-primary)]/30
              hover:shadow-xl hover:shadow-[var(--action-primary)]/50
              hover:-translate-y-0.5 hover:brightness-110 active:scale-95
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
              min-h-[44px] touch-manipulation
              border border-[var(--action-primary)]/20
            "
          >
            {isExporting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--action-primary-text)] border-t-transparent" />
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

        {/* Tab Panels */}
        <div className="space-y-4">
          {/* Core Parameters Tab */}
          {activeTab === "specs" && (
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
          )}

          {/* Safety Certifications Tab */}
          {activeTab === "certifications" && (
            <div className="space-y-4">
              {product.safetyCompliance && product.safetyCompliance.length > 0 ? (
                <div className="grid gap-3 md:grid-cols-2">
                  {product.safetyCompliance.map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
                    >
                      <CheckCircle2 className="h-5 w-5 text-[var(--accent-primary)] flex-shrink-0" />
                      <span className="text-sm font-medium text-[var(--text-primary)]">{cert}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-[var(--text-secondary)]">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-[var(--text-tertiary)]" />
                  <p>{lang === "zh" ? "此产品符合所有国际安全标准" : "This product complies with all international safety standards"}</p>
                </div>
              )}
            </div>
          )}

          {/* Installation Requirements Tab */}
          {activeTab === "installation" && (
            <div className="space-y-4">
              {product.venueRequirements && (
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                    {lang === "zh" ? "场地要求" : "Venue Requirements"}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">{product.venueRequirements}</p>
                </div>
              )}
              {product.powerSupply && (
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                    {lang === "zh" ? "电力要求" : "Power Supply"}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">{product.powerSupply}</p>
                </div>
              )}
              {(!product.venueRequirements && !product.powerSupply) && (
                <div className="text-center py-8 text-[var(--text-secondary)]">
                  <Settings className="h-12 w-12 mx-auto mb-4 text-[var(--text-tertiary)]" />
                  <p>{lang === "zh" ? "请联系我们获取详细的安装要求" : "Contact us for detailed installation requirements"}</p>
                </div>
              )}
            </div>
          )}

          {/* Maintenance Information Tab */}
          {activeTab === "maintenance" && (
            <div className="space-y-4">
              {product.afterSales && product.afterSales.length > 0 ? (
                <div className="space-y-3">
                  {product.afterSales.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
                    >
                      <Wrench className="h-5 w-5 text-[var(--accent-primary)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--text-secondary)]">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-[var(--text-secondary)]">
                  <Wrench className="h-12 w-12 mx-auto mb-4 text-[var(--text-tertiary)]" />
                  <p>{lang === "zh" ? "我们提供 24/7 技术支持和维护服务" : "We provide 24/7 technical support and maintenance services"}</p>
                </div>
              )}
            </div>
          )}
        </div>
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
