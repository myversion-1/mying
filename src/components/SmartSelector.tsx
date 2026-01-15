"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useLanguage } from "./language";
import type { Product } from "../content/copy";
import { productFitsConstraints } from "../utils/product-dimensions";
import { ROICalculator } from "./ROICalculator";
import { Home, Building2, Globe, Filter } from "lucide-react";
import type { VenueType } from "../content/products_multilingual";

interface SmartSelectorProps {
  products: Product[];
  onFilteredProductsChange?: (filtered: Product[]) => void;
}

/**
 * Smart Product Selector Tool - B2B Optimized
 * 
 * Features:
 * 1. Space constraints filtering (ceiling height, footprint)
 * 2. Application scenario filtering (Indoor, Outdoor, Both) with visual icons
 * 3. Mobile-optimized interface with touch-friendly controls
 * 4. Real-time product filtering
 */
export function SmartSelector({
  products,
  onFilteredProductsChange,
}: SmartSelectorProps) {
  const { lang } = useLanguage();
  const [ceilingHeight, setCeilingHeight] = useState<number | null>(null);
  const [footprint, setFootprint] = useState<number | null>(null);
  const [venueType, setVenueType] = useState<VenueType | "">("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter products based on constraints
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Space constraints filter
    if (ceilingHeight !== null || footprint !== null) {
      filtered = filtered.filter((product) =>
        productFitsConstraints(
          product.height,
          product.footprint,
          ceilingHeight,
          footprint
        )
      );
    }

    // Venue type filter
    if (venueType) {
      filtered = filtered.filter((product) => {
        if (!product.venueType) return false;
        return product.venueType === venueType || product.venueType === "Both";
      });
    }

    return filtered;
  }, [products, ceilingHeight, footprint, venueType]);

  // Use ref to track previous filtered products to avoid infinite loops
  const prevFilteredProductsRef = useRef<Product[]>([]);
  const callbackRef = useRef(onFilteredProductsChange);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = onFilteredProductsChange;
  }, [onFilteredProductsChange]);

  // Notify parent of filtered products only when they actually change
  useEffect(() => {
    const currentKey = filteredProducts.map(p => p.name).join(',');
    const prevKey = prevFilteredProductsRef.current.map(p => p.name).join(',');

    if (currentKey !== prevKey && callbackRef.current) {
      prevFilteredProductsRef.current = filteredProducts;
      callbackRef.current(filteredProducts);
    } else {
      prevFilteredProductsRef.current = filteredProducts;
    }
  }, [filteredProducts]);

  const hasActiveFilters = ceilingHeight !== null || footprint !== null || venueType !== "";
  const filteredCount = filteredProducts.length;
  const totalCount = products.length;

  // Venue type options with icons
  const venueTypeOptions: Array<{ value: VenueType; label: string; labelZh: string; icon: typeof Home }> = [
    { value: "Indoor", label: "Indoor", labelZh: "室内", icon: Home },
    { value: "Outdoor", label: "Outdoor", labelZh: "户外", icon: Globe },
    { value: "Both", label: "Both", labelZh: "室内外通用", icon: Building2 },
  ];

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--accent-primary-light)] text-[var(--accent-primary)]">
            <Filter className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              {lang === "zh" ? "智能选型工具" : "Smart Product Selector"}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {lang === "zh"
                ? "根据您的场地空间约束筛选合适的产品"
                : "Filter products based on your space constraints"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition min-h-[44px] min-w-[44px] touch-manipulation"
          aria-label={isExpanded ? (lang === "zh" ? "收起" : "Collapse") : (lang === "zh" ? "展开" : "Expand")}
        >
          <svg
            className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Filter Status */}
      {hasActiveFilters && (
        <div className="mb-4 rounded-md border border-[var(--accent-primary)]/30 bg-[var(--accent-primary-light)] p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[var(--text-primary)]">
              {lang === "zh"
                ? `显示 ${filteredCount} / ${totalCount} 个产品`
                : `Showing ${filteredCount} / ${totalCount} products`}
            </div>
            <button
              onClick={() => {
                setCeilingHeight(null);
                setFootprint(null);
                setVenueType("");
              }}
              className="text-xs text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] transition min-h-[44px] min-w-[44px] touch-manipulation"
            >
              {lang === "zh" ? "清除筛选" : "Clear Filters"}
            </button>
          </div>
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div className="overflow-hidden transition-opacity">
          <div className="space-y-6 pt-4">
            {/* Application Scenario Filter - Visual Icons */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                {lang === "zh" ? "应用场景" : "Application Scenario"}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {venueTypeOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = venueType === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setVenueType(isSelected ? "" : option.value)}
                      className={`
                        flex flex-col items-center gap-2 rounded-md border p-3 transition
                        min-h-[80px] touch-manipulation
                        ${isSelected
                          ? "border-[var(--accent-primary)] bg-[var(--accent-primary-light)]"
                          : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)]"
                        }
                      `}
                    >
                      <Icon className={`h-6 w-6 ${isSelected ? "text-[var(--accent-primary)]" : "text-[var(--text-secondary)]"}`} />
                      <span className={`text-xs font-medium ${isSelected ? "text-[var(--accent-primary)]" : "text-[var(--text-secondary)]"}`}>
                        {lang === "zh" ? option.labelZh : option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ceiling Height Input */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                {lang === "zh" ? "净高 (Ceiling Height)" : "Ceiling Height"}
                {ceilingHeight !== null && (
                  <span className="ml-2 text-[var(--accent-primary)]">
                    {ceilingHeight.toFixed(1)} m
                  </span>
                )}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="0.1"
                  value={ceilingHeight || 5}
                  onChange={(e) =>
                    setCeilingHeight(parseFloat(e.target.value))
                  }
                  className="flex-1 h-2 bg-[var(--surface)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
                />
                <input
                  type="number"
                  min="2"
                  max="20"
                  step="0.1"
                  value={ceilingHeight || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCeilingHeight(value ? parseFloat(value) : null);
                  }}
                  placeholder="m"
                  className="w-24 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 min-h-[44px] touch-manipulation"
                />
              </div>
              <p className="mt-2 text-xs text-[var(--text-tertiary)]">
                {lang === "zh"
                  ? "输入您场地的最大净高限制"
                  : "Enter the maximum ceiling height of your venue"}
              </p>
            </div>

            {/* Footprint Input */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                {lang === "zh" ? "可用面积 (Footprint)" : "Available Footprint"}
                {footprint !== null && (
                  <span className="ml-2 text-[var(--accent-primary)]">
                    {footprint.toFixed(1)} m
                  </span>
                )}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="3"
                  max="30"
                  step="0.1"
                  value={footprint || 10}
                  onChange={(e) =>
                    setFootprint(parseFloat(e.target.value))
                  }
                  className="flex-1 h-2 bg-[var(--surface)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
                />
                <input
                  type="number"
                  min="3"
                  max="30"
                  step="0.1"
                  value={footprint || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFootprint(value ? parseFloat(value) : null);
                  }}
                  placeholder="m"
                  className="w-24 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 min-h-[44px] touch-manipulation"
                />
              </div>
              <p className="mt-2 text-xs text-[var(--text-tertiary)]">
                {lang === "zh"
                  ? "输入您场地的最大可用面积（最大尺寸）"
                  : "Enter the maximum available footprint (largest dimension)"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ROI Calculator - Show when filters are active */}
      {hasActiveFilters && filteredProducts.length > 0 && (
        <div className="mt-6 pt-6 border-t border-[var(--border)] transition-opacity">
          <ROICalculator lang={lang} />
        </div>
      )}
    </div>
  );
}
