"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useLanguage } from "./language";
import type { Product } from "../content/copy";
import { productFitsConstraints } from "../utils/product-dimensions";
import { ROICalculator } from "./ROICalculator";

interface SmartSelectorProps {
  products: Product[];
  onFilteredProductsChange?: (filtered: Product[]) => void;
}

/**
 * Smart Product Selector Tool
 * Allows users to input space constraints (ceiling height and footprint)
 * and filters products in real-time
 */
export function SmartSelector({
  products,
  onFilteredProductsChange,
}: SmartSelectorProps) {
  const { lang } = useLanguage();
  const [ceilingHeight, setCeilingHeight] = useState<number | null>(null);
  const [footprint, setFootprint] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter products based on constraints
  const filteredProducts = useMemo(() => {
    if (ceilingHeight === null && footprint === null) {
      return products;
    }

    return products.filter((product) =>
      productFitsConstraints(
        product.height,
        product.footprint,
        ceilingHeight,
        footprint
      )
    );
  }, [products, ceilingHeight, footprint]);

  // Use ref to track previous filtered products to avoid infinite loops
  const prevFilteredProductsRef = useRef<Product[]>([]);
  const callbackRef = useRef(onFilteredProductsChange);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = onFilteredProductsChange;
  }, [onFilteredProductsChange]);

  // Notify parent of filtered products only when they actually change
  useEffect(() => {
    // Create a stable comparison key from filtered products
    const currentKey = filteredProducts.map(p => p.name).join(',');
    const prevKey = prevFilteredProductsRef.current.map(p => p.name).join(',');

    // Only call callback if products actually changed
    if (currentKey !== prevKey && callbackRef.current) {
      prevFilteredProductsRef.current = filteredProducts;
      callbackRef.current(filteredProducts);
    } else {
      // Update ref even if callback isn't called
      prevFilteredProductsRef.current = filteredProducts;
    }
  }, [filteredProducts]);

  const hasActiveFilters = ceilingHeight !== null || footprint !== null;
  const filteredCount = filteredProducts.length;
  const totalCount = products.length;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00eaff]/20 text-[#00eaff]">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
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
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-2 text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition"
          aria-label={isExpanded ? "Collapse" : "Expand"}
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
        <div className="mb-4 rounded-lg border border-[#00eaff]/30 bg-[#00eaff]/10 p-3 transition-opacity">
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
              }}
              className="text-xs text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] transition"
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
                    className="w-24 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
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
                    className="w-24 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
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
        <div className="mt-6 pt-6 border-t border-white/10 transition-opacity">
          <ROICalculator products={filteredProducts} />
        </div>
      )}
    </div>
  );
}

