"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts, type Product, copy } from "../content/copy";
import { useLanguage } from "./language";
import { Badge } from "./ui/Badge";
import { EmptyState } from "./EmptyState";
import { ProductSpecs } from "./ProductSpecs";
import { ProductCard } from "./ProductCard";
import type { ProductUsage, VenueType, TargetAudience } from "../content/products_multilingual";
import { generateProductSlug } from "../utils/hreflang";

type Props = {
  items?: Product[];
  initialSearchQuery?: string;
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

export function ProductGrid({ items, initialSearchQuery = "" }: Props) {
  const { lang } = useLanguage();
  const c = copy(lang);
  const isRTL = lang === "ar";

  // Get products - use provided items or fetch all
  const allProducts = items || getProducts(lang);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [filter, setFilter] = useState<"all" | "rides" | "decorative" | string>("all");
  const [multiFilter, setMultiFilter] = useState<{
    usage?: ProductUsage;
    venueType?: VenueType;
    targetAudience?: TargetAudience;
  }>({});

  // Get unique categories
  const categories = Array.from(new Set(allProducts.map((p) => p.category)));

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.positioning?.toLowerCase().includes(query) ||
          p.idealFor?.some((scenario) => scenario.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (filter === "rides") {
      filtered = filtered.filter((p) => RIDE_CATEGORIES.includes(p.category));
    } else if (filter === "decorative") {
      filtered = filtered.filter((p) => !RIDE_CATEGORIES.includes(p.category));
    } else if (filter !== "all") {
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
  }, [allProducts, searchQuery, filter, multiFilter]);

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
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={lang === "zh" ? "搜索产品..." : "Search products..."}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-12 py-3 text-white placeholder:text-white/50 focus:border-[#7df6ff]/60 focus:outline-none focus:ring-2 focus:ring-[#7df6ff]/20"
        />
        <svg
          className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-white/50 ${isRTL ? "right-4" : "left-4"}`}
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
            className={`absolute top-1/2 -translate-y-1/2 text-white/50 hover:text-white ${isRTL ? "left-4" : "right-4"}`}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {(["all", "rides", "decorative"] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              filter === filterOption
                ? "border-[#7df6ff] bg-[#7df6ff]/10 text-[#7df6ff]"
                : "border-white/20 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
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
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/50">Category:</span>
              <button
                onClick={() => setFilter("all")}
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 hover:border-white/30 hover:text-white"
              >
                {filter} ×
              </button>
            </div>
          </>
        )}
      </div>

      {/* Multi-dimensional Filters (similar to Arrowy's approach) */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-white/70">Usage:</label>
          <select
            value={multiFilter.usage || ""}
            onChange={(e) => {
              setMultiFilter((prev) => ({
                ...prev,
                usage: e.target.value ? (e.target.value as ProductUsage) : undefined,
              }));
            }}
            className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white outline-none transition focus:border-[#7df6ff]/60"
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
          <label className="text-sm font-medium text-white/70">Venue:</label>
          <select
            value={multiFilter.venueType || ""}
            onChange={(e) => {
              setMultiFilter((prev) => ({
                ...prev,
                venueType: e.target.value ? (e.target.value as VenueType) : undefined,
              }));
            }}
            className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white outline-none transition focus:border-[#7df6ff]/60"
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
          <label className="text-sm font-medium text-white/70">Audience:</label>
          <select
            value={multiFilter.targetAudience || ""}
            onChange={(e) => {
              setMultiFilter((prev) => ({
                ...prev,
                targetAudience: e.target.value ? (e.target.value as TargetAudience) : undefined,
              }));
            }}
            className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white outline-none transition focus:border-[#7df6ff]/60"
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
            className={`${isRTL ? "mr-auto" : "ml-auto"} rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white/70 hover:border-white/30 hover:text-white`}
          >
            {lang === "zh" ? "清除筛选" : "Clear Filters"}
          </button>
        )}
      </div>

      {/* Category Dropdown for Specific Filtering */}
      {(filter === "rides" || filter === "decorative" || filter === "all") && (
        <div className="flex items-center gap-3">
          <label className="text-sm text-white/70">Specific category:</label>
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) {
                setFilter(e.target.value);
              }
            }}
            className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-[#7df6ff]/60"
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

      {/* Products Grid - Container Queries enabled */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard
              key={`${product.name}-${index}`}
              product={product}
              lang={lang}
              index={index}
              isRTL={isRTL}
            />
          ))
        ) : (
          <div className="col-span-2">
            <EmptyState />
          </div>
        )}
      </div>
    </div>
  );
}
