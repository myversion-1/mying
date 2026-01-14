"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts, type Product, copy } from "../content/copy";
import { useLanguage } from "./language";
import { Badge } from "./ui/Badge";
import { EmptyState } from "./EmptyState";
import { ProductSpecs } from "./ProductSpecs";
import { ProductCard } from "./ProductCard";
import { SmartSelector } from "./SmartSelector";
import type { ProductUsage, VenueType, TargetAudience } from "../content/products_multilingual";
import { generateProductSlug } from "../utils/hreflang";
import { debounce } from "../utils/main-thread-optimization";

type Props = {
  items?: Product[];
  initialSearchQuery?: string;
  initialCategoryFilter?: string; // Legacy support
  initialMainCategoryFilter?: string;
  initialSubCategoryFilter?: string;
};

// Define which categories are "rides" vs "decorative"
const RIDE_CATEGORIES = [
  "Roller Coasters",
  "Ferris Wheels",
  "Carousels",
  "Drop Towers",
  "Water Rides",
  "Family Rides",
  "Thrill Rides",
  "Kiddie Rides",
];

export function ProductGrid({ 
  items, 
  initialSearchQuery = "", 
  initialCategoryFilter = "",
  initialMainCategoryFilter = "",
  initialSubCategoryFilter = ""
}: Props) {
  const { lang } = useLanguage();
  const c = copy(lang);
  const isRTL = lang === "ar";

  // Get products - use provided items or fetch all
  const allProducts = items || getProducts(lang);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(initialSearchQuery);
  
  // Debounce search input to reduce TBT (Total Blocking Time)
  // This prevents filtering on every keystroke, reducing main thread blocking
  const debouncedSetSearch = useRef(
    debounce((value: string) => {
      setDebouncedSearchQuery(value);
    }, 300) // Wait 300ms after user stops typing
  ).current;

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value); // Update UI immediately for better UX
    debouncedSetSearch(value); // Debounce the actual filtering
  }, [debouncedSetSearch]);

  const [filter, setFilter] = useState<"all" | "rides" | "decorative" | string>(
    initialCategoryFilter || "all"
  );
  const [mainCategoryFilter, setMainCategoryFilter] = useState<string>(initialMainCategoryFilter || "");
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>(initialSubCategoryFilter || "");
  
  // Initialize filters from URL parameters
  useEffect(() => {
    if (initialCategoryFilter) {
      setFilter(initialCategoryFilter);
    }
    if (initialMainCategoryFilter) {
      setMainCategoryFilter(initialMainCategoryFilter);
    }
    if (initialSubCategoryFilter) {
      setSubCategoryFilter(initialSubCategoryFilter);
    }
  }, [initialCategoryFilter, initialMainCategoryFilter, initialSubCategoryFilter]);
  const [multiFilter, setMultiFilter] = useState<{
    usage?: ProductUsage;
    venueType?: VenueType;
    targetAudience?: TargetAudience;
  }>({});
  const [spaceFilteredProducts, setSpaceFilteredProducts] = useState<Product[] | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(allProducts.map((p) => p.category)));

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    // Start with space-filtered products if available, otherwise use all products
    let filtered = spaceFilteredProducts || allProducts;

    // Text search - use debouncedSearchQuery to reduce filtering frequency
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.positioning?.toLowerCase().includes(query) ||
          p.idealFor?.some((scenario) => scenario.toLowerCase().includes(query))
      );
    }

    // Multi-level category filter (priority: mainCategory + subCategory > legacy category)
    if (mainCategoryFilter) {
      filtered = filtered.filter((p) => p.mainCategory === mainCategoryFilter);
      if (subCategoryFilter) {
        filtered = filtered.filter((p) => p.subCategory === subCategoryFilter);
      }
    } else if (filter === "rides") {
      // Legacy filter support
      filtered = filtered.filter((p) => RIDE_CATEGORIES.includes(p.category));
    } else if (filter === "decorative") {
      // Legacy filter support
      filtered = filtered.filter((p) => !RIDE_CATEGORIES.includes(p.category));
    } else if (filter !== "all") {
      // Legacy category filter support
      filtered = filtered.filter((p) => p.category === filter);
    }

    // Multi-dimensional filters
    if (multiFilter.usage) {
      filtered = filtered.filter((p) => p.usage === multiFilter.usage);
    }
    if (multiFilter.venueType) {
      filtered = filtered.filter((p) => p.venueType === multiFilter.venueType);
    }
    if (multiFilter.targetAudience) {
      filtered = filtered.filter((p) => p.targetAudience === multiFilter.targetAudience);
    }

    return filtered;
  }, [allProducts, spaceFilteredProducts, debouncedSearchQuery, filter, mainCategoryFilter, subCategoryFilter, multiFilter]);

  // Usage types for filter
  const usageTypes: ProductUsage[] = [
    "Family Entertainment",
    "Thrill Adventure",
    "Water Attraction",
    "Kiddie Fun",
  ];

  // Venue types for filter
  const venueTypes: VenueType[] = [
    "Indoor",
    "Outdoor",
    "Both",
  ];

  // Target audience types for filter
  const audienceTypes: TargetAudience[] = ["Family", "Adults", "Kids"];

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      {/* Smart Selector Tool */}
      <SmartSelector
        products={allProducts}
        onFilteredProductsChange={setSpaceFilteredProducts}
      />

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={lang === "zh" ? "搜索产品..." : "Search products..."}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-12 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
        />
        <svg
          className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-tertiary)] ${isRTL ? "right-4" : "left-4"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className={`absolute top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] ${isRTL ? "left-4" : "right-4"} min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation`}
            aria-label="Clear search"
          >
            <span className="text-2xl">×</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {(["all", "rides", "decorative"] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`rounded-full border px-4 py-3 text-sm font-medium transition min-h-[44px] min-w-[44px] touch-manipulation ${
              filter === filterOption
                ? "border-[var(--accent-primary)] bg-[var(--accent-primary-light)] text-[var(--accent-primary)]"
                : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
            }`}
          >
            {filterOption === "all"
              ? lang === "zh"
                ? "全部"
                : "All"
              : filterOption === "rides"
              ? lang === "zh"
                ? "游乐设施"
                : "Rides"
              : lang === "zh"
              ? "装饰"
              : "Decorative"}
          </button>
        ))}
        {filter !== "all" && (
          <>
            <div className="h-4 w-px bg-[var(--border)]" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--text-tertiary)]">Category:</span>
              <button
                onClick={() => setFilter("all")}
                className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2.5 text-xs font-medium text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] min-h-[44px] min-w-[44px] touch-manipulation"
              >
                {filter} ×
              </button>
            </div>
          </>
        )}
      </div>

      {/* Multi-dimensional Filters (similar to Arrowy's approach) */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-[var(--text-secondary)]">Usage:</label>
          <select
            value={multiFilter.usage || ""}
            onChange={(e) => {
              setMultiFilter((prev) => ({
                ...prev,
                usage: e.target.value ? (e.target.value as ProductUsage) : undefined,
              }));
            }}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-primary)] min-h-[44px] touch-manipulation"
          >
            <option value="">All Types</option>
            {usageTypes.map((usage) => (
              <option key={usage} value={usage}>
                {usage === "Family Entertainment" ? (lang === "zh" ? "家庭娱乐" : "Family Entertainment") :
                 usage === "Thrill Adventure" ? (lang === "zh" ? "刺激冒险" : "Thrill Adventure") :
                 usage === "Water Attraction" ? (lang === "zh" ? "水上项目" : "Water Attraction") :
                 usage === "Kiddie Fun" ? (lang === "zh" ? "儿童游乐" : "Kiddie Fun") : usage}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-[var(--text-secondary)]">Venue:</label>
          <select
            value={multiFilter.venueType || ""}
            onChange={(e) => {
              setMultiFilter((prev) => ({
                ...prev,
                venueType: e.target.value ? (e.target.value as VenueType) : undefined,
              }));
            }}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-primary)] min-h-[44px] touch-manipulation"
          >
            <option value="">All Venues</option>
            {venueTypes.map((venue) => (
              <option key={venue} value={venue}>
                {venue === "Indoor" ? (lang === "zh" ? "室内" : "Indoor") :
                 venue === "Outdoor" ? (lang === "zh" ? "户外" : "Outdoor") :
                 venue === "Both" ? (lang === "zh" ? "室内外通用" : "Both") : venue}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-[var(--text-secondary)]">Audience:</label>
          <select
            value={multiFilter.targetAudience || ""}
            onChange={(e) => {
              setMultiFilter((prev) => ({
                ...prev,
                targetAudience: e.target.value ? (e.target.value as TargetAudience) : undefined,
              }));
            }}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-primary)] min-h-[44px] touch-manipulation"
          >
            <option value="">All Audiences</option>
            {audienceTypes.map((audience) => (
              <option key={audience} value={audience}>
                {audience === "Adults" ? (lang === "zh" ? "成人" : "Adults") :
                 audience === "Kids" ? (lang === "zh" ? "儿童" : "Kids") :
                 audience === "Family" ? (lang === "zh" ? "家庭" : "Family") : audience}
              </option>
            ))}
          </select>
        </div>
        
        {(multiFilter.usage || multiFilter.venueType || multiFilter.targetAudience) && (
          <button
            onClick={() => setMultiFilter({})}
            className={`${isRTL ? "mr-auto" : "ml-auto"} rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-sm text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] min-h-[44px] min-w-[44px] touch-manipulation`}
          >
            {lang === "zh" ? "清除筛选" : "Clear Filters"}
          </button>
        )}
      </div>

      {/* Category Dropdown for Specific Filtering */}
      {(filter === "rides" || filter === "decorative" || filter === "all") && (
        <div className="flex items-center gap-3">
          <label className="text-sm text-[var(--text-secondary)]">Specific category:</label>
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) {
                setFilter(e.target.value);
              }
            }}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-primary)] min-h-[44px] touch-manipulation"
          >
            <option value="">Select a category...</option>
            {filter === "rides" || filter === "all"
              ? categories
                  .filter((cat) => RIDE_CATEGORIES.includes(cat))
                  .map((category) => (
                    <option key={category} value={category}>
                      {category} ({allProducts.filter((p) => p.category === category).length})
                    </option>
                  ))
              : null}
            {filter === "decorative" || filter === "all"
              ? categories
                  .filter((cat) => !RIDE_CATEGORIES.includes(cat))
                  .map((category) => (
                    <option key={category} value={category}>
                      {category} ({allProducts.filter((p) => p.category === category).length})
                    </option>
                  ))
              : null}
          </select>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div
              key={`${product.name}-${index}`}
              className="transition-opacity"
            >
              <ProductCard
                product={product}
                lang={lang}
                index={index}
                isRTL={isRTL}
              />
            </div>
          ))
        ) : (
          <div className="col-span-2 transition-opacity">
            <EmptyState />
          </div>
        )}
      </div>
    </div>
  );
}
