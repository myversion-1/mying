"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts, type Product, copy } from "../content/copy";
import { useLanguage } from "./language";
import { Badge } from "./ui/Badge";
import { EmptyState } from "./EmptyState";
import type { ProductUsage, VenueType, TargetAudience } from "../content/products_multilingual";
import { generateProductSlug } from "../utils/hreflang";

type Props = {
  items?: Product[];
  initialSearchQuery?: string;
};

// Define which categories are "rides" vs "decorative"
const RIDE_CATEGORIES = [
  "Family Ride",
  "Thrill Ride",
  "Water Ride",
  "Carousel",
  "Ferris Wheel",
  "Go-Kart",
  "Bumper Car",
  "Train",
  "Trampoline",
  "Themed Attraction",
];

type FilterType = "all" | "rides" | "decorative" | string;
type MultiDimensionFilter = {
  usage?: ProductUsage;
  venueType?: VenueType;
  targetAudience?: TargetAudience;
};

export function ProductGrid({ items, initialSearchQuery = "" }: Props) {
  const { lang } = useLanguage();
  const c = copy(lang);
  const localizedProducts = useMemo(() => {
    const products = items || getProducts(lang);
    return Array.isArray(products) ? products : [];
  }, [items, lang]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [multiFilter, setMultiFilter] = useState<MultiDimensionFilter>({});
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  
  // Update search query when initialSearchQuery changes (from URL params)
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Get all unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(localizedProducts.map((p) => p.category)));
    return uniqueCategories.sort();
  }, [localizedProducts]);

  // Get unique values for multi-dimensional filters
  const usageTypes = useMemo(() => {
    return Array.from(new Set(localizedProducts.map((p) => p.usage).filter(Boolean))) as ProductUsage[];
  }, [localizedProducts]);
  
  const venueTypes = useMemo(() => {
    return Array.from(new Set(localizedProducts.map((p) => p.venueType).filter(Boolean))) as VenueType[];
  }, [localizedProducts]);
  
  const targetAudiences = useMemo(() => {
    return Array.from(new Set(localizedProducts.map((p) => p.targetAudience).filter(Boolean))) as TargetAudience[];
  }, [localizedProducts]);

  // Filter products based on selected filter, multi-dimensional filters, and search query
  const filteredProducts = useMemo(() => {
    let result = localizedProducts;
    
    // Apply category filter
    if (filter === "all") {
      result = localizedProducts;
    } else if (filter === "rides") {
      result = localizedProducts.filter((product) => RIDE_CATEGORIES.includes(product.category));
    } else if (filter === "decorative") {
      result = localizedProducts.filter((product) => !RIDE_CATEGORIES.includes(product.category));
    } else {
      // Specific category
      result = localizedProducts.filter((product) => product.category === filter);
    }
    
    // Apply multi-dimensional filters
    if (multiFilter.usage) {
      result = result.filter((product) => product.usage === multiFilter.usage);
    }
    if (multiFilter.venueType) {
      result = result.filter((product) => product.venueType === multiFilter.venueType);
    }
    if (multiFilter.targetAudience) {
      result = result.filter((product) => product.targetAudience === multiFilter.targetAudience);
    }
    
    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(query);
        const categoryMatch = product.category.toLowerCase().includes(query);
        const positioningMatch = product.positioning?.toLowerCase().includes(query);
        return nameMatch || categoryMatch || positioningMatch;
      });
    }
    
    return result;
  }, [localizedProducts, filter, multiFilter, searchQuery]);

  // Count products in each group
  const rideCount = useMemo(
    () => localizedProducts.filter((p) => RIDE_CATEGORIES.includes(p.category)).length,
    [localizedProducts]
  );
  const decorativeCount = useMemo(
    () => localizedProducts.filter((p) => !RIDE_CATEGORIES.includes(p.category)).length,
    [localizedProducts]
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={lang === "zh" ? "搜索产品名称、类别或描述..." : "Search products by name, category, or description..."}
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 pl-12 text-white placeholder:text-white/50 outline-none transition focus:border-[#7df6ff]/60 focus:bg-white/10"
        />
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50"
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
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
            aria-label="Clear search"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            filter === "all"
              ? "border-[#00eaff] bg-[#00eaff]/20 text-[#00eaff] shadow-[0_0_16px_rgba(0,234,255,0.3)]"
              : "border-white/20 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
          }`}
        >
          All Products ({localizedProducts.length})
        </button>
        <div className="h-4 w-px bg-white/20" />
        <button
          onClick={() => setFilter("rides")}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            filter === "rides"
              ? "border-[#00eaff] bg-[#00eaff]/20 text-[#00eaff] shadow-[0_0_16px_rgba(0,234,255,0.3)]"
              : "border-white/20 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
          }`}
        >
          All Rides ({rideCount})
        </button>
        <button
          onClick={() => setFilter("decorative")}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            filter === "decorative"
              ? "border-[#00eaff] bg-[#00eaff]/20 text-[#00eaff] shadow-[0_0_16px_rgba(0,234,255,0.3)]"
              : "border-white/20 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
          }`}
        >
          Decorative Items ({decorativeCount})
        </button>
        {filter !== "all" && filter !== "rides" && filter !== "decorative" && (
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
            {targetAudiences.map((audience) => (
              <option key={audience} value={audience}>
                {audience === "Family" ? (lang === "zh" ? "家庭" : "Family") :
                 audience === "Adults" ? (lang === "zh" ? "成人" : "Adults") :
                 audience === "Kids" ? (lang === "zh" ? "儿童" : "Kids") :
                 audience === "All Ages" ? (lang === "zh" ? "全年龄" : "All Ages") : audience}
              </option>
            ))}
          </select>
        </div>
        
        {(multiFilter.usage || multiFilter.venueType || multiFilter.targetAudience) && (
          <button
            onClick={() => setMultiFilter({})}
            className="ml-auto rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white/70 hover:border-white/30 hover:text-white"
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
                      {category} ({localizedProducts.filter((p) => p.category === category).length})
                    </option>
                  ))
              : null}
            {filter === "decorative" || filter === "all"
              ? categories
                  .filter((cat) => !RIDE_CATEGORIES.includes(cat))
                  .map((category) => (
                    <option key={category} value={category}>
                      {category} ({localizedProducts.filter((p) => p.category === category).length})
                    </option>
                  ))
              : null}
          </select>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => {
            const productSlug = generateProductSlug(product.name);
            const productUrl = `/products/${productSlug}`;
            
            return (
        <article
          key={`${product.name}-${index}`}
          className="group flex flex-col gap-3 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-white/0 p-4 transition hover:border-white/20"
        >
          {/* Product Image - Clickable link to product detail */}
          <Link href={productUrl} className="block">
            <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={`${product.name} - ${product.category} amusement ride${product.status === "Used" ? " (Used)" : ""}`}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2 text-4xl opacity-30">🎠</div>
                    <div className="text-xs text-white/40">No image available</div>
                  </div>
                </div>
              )}
              {/* Patent Badge - Overlay on image */}
              {product.patentCount && product.patentCount > 0 && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge tone="patent">
                    {product.patentCount}+ {lang === "zh" ? "专利" : "Patents"}
                  </Badge>
                </div>
              )}
            </div>
          </Link>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="text-sm uppercase tracking-[0.14em] text-white/50">
                {product.category}
              </div>
              <Link href={productUrl}>
                <h3 className="text-xl font-semibold text-white transition hover:text-[#00eaff]">
                  {product.name}
                </h3>
              </Link>
            </div>
            <Badge tone={product.status === "New" ? "positive" : "warning"}>
              {product.status}
            </Badge>
          </div>
          
          {/* ① Product Positioning Statement */}
          {product.positioning && (
            <p className="text-sm leading-relaxed text-white/80">
              {product.positioning}
            </p>
          )}
          
          {/* ② Ideal For Scenarios */}
          {product.idealFor && product.idealFor.length > 0 && (
            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-[0.1em] text-white/60">
                {lang === "zh" ? "适用场景" : "Ideal for"}
              </div>
              <ul className="space-y-1">
                {product.idealFor.slice(0, 3).map((scenario, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-white/70">
                    <span className="mt-1 text-[#7df6ff]">•</span>
                    <span>{scenario}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {product.badge && (
            <div className="text-xs font-semibold text-[#7df6ff]">
              {product.badge}
            </div>
          )}
          
          {/* ③ Venue Requirements (with explanation) */}
          <dl className="grid grid-cols-2 gap-3 text-sm text-white/70">
            <Spec 
              label={c.productLabels?.footprint || "Footprint"} 
              value={product.footprint}
              explanation={product.venueRequirements}
            />
            <Spec label={c.productLabels?.height || "Height"} value={product.height} />
            <Spec label={c.productLabels?.riders || "Riders"} value={product.riders} />
            {product.year && <Spec label={c.productLabels?.year || "Year"} value={product.year} />}
          </dl>
          
          {/* ④ Safety & Compliance (brief) */}
          {product.safetyCompliance && product.safetyCompliance.length > 0 && (
            <div className="rounded-lg border border-[#7df6ff]/20 bg-[#7df6ff]/5 px-3 py-2">
              <div className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#7df6ff]">
                {lang === "zh" ? "安全认证" : "Safety & Compliance"}
              </div>
              <div className="text-xs text-white/70">
                {product.safetyCompliance[0]}
              </div>
            </div>
          )}
          
          {/* ⑦ Clear CTA - Link to product detail page */}
          <Link
            href={productUrl}
            className="mt-auto w-full rounded-full bg-[#00eaff] px-4 py-2.5 text-center text-sm font-semibold text-[#0b1116] shadow-[0_0_20px_rgba(0,234,255,0.3)] transition hover:-translate-y-[1px] hover:shadow-[0_0_28px_rgba(0,234,255,0.5)]"
          >
            {lang === "zh" ? "查看详情" : "View Details"}
          </Link>
          
          {/* Quick Quote Link */}
          <Link
            href={`/quote?product=${encodeURIComponent(product.name)}`}
            className="w-full rounded-full border border-white/20 bg-white/5 px-4 py-2 text-center text-xs font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            {lang === "zh" ? "快速询价" : "Quick Quote"}
          </Link>
        </article>
            );
          })
        ) : (
          <div className="col-span-2">
            <EmptyState />
          </div>
        )}
      </div>
    </div>
  );
}

function Spec({ label, value, explanation }: { label: string; value: string; explanation?: string }) {
  return (
    <div className="flex flex-col rounded-lg border border-white/5 bg-white/5 px-3 py-2">
      <span className="text-[11px] uppercase tracking-[0.14em] text-white/50">
        {label}
      </span>
      <span className="text-white">{value}</span>
      {explanation && (
        <span className="mt-1 text-xs text-white/60">({explanation})</span>
      )}
    </div>
  );
}

