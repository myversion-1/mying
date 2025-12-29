"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts, type Product, copy } from "../content/copy";
import { useLanguage } from "./language";
import { Badge } from "./ui/Badge";
import { EmptyState } from "./EmptyState";

type Props = {
  items?: Product[];
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

export function ProductGrid({ items }: Props) {
  const { lang } = useLanguage();
  const c = copy(lang);
  const localizedProducts = useMemo(() => {
    const products = items || getProducts(lang);
    return Array.isArray(products) ? products : [];
  }, [items, lang]);
  const [filter, setFilter] = useState<FilterType>("all");

  // Get all unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(localizedProducts.map((p) => p.category)));
    return uniqueCategories.sort();
  }, [localizedProducts]);

  // Filter products based on selected filter
  const filteredProducts = useMemo(() => {
    if (filter === "all") return localizedProducts;
    if (filter === "rides") {
      return localizedProducts.filter((product) => RIDE_CATEGORIES.includes(product.category));
    }
    if (filter === "decorative") {
      return localizedProducts.filter((product) => !RIDE_CATEGORIES.includes(product.category));
    }
    // Specific category
    return localizedProducts.filter((product) => product.category === filter);
  }, [localizedProducts, filter]);

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
          filteredProducts.map((product) => (
        <article
          key={product.name}
          className="group flex flex-col gap-3 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-white/0 p-4 transition hover:border-white/20"
        >
          {/* Product Image */}
          <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
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
          </div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-sm uppercase tracking-[0.14em] text-white/50">
                {product.category}
              </div>
              <h3 className="text-xl font-semibold text-white">
                {product.name}
              </h3>
            </div>
            <Badge tone={product.status === "New" ? "positive" : "warning"}>
              {product.status}
            </Badge>
          </div>
          {product.badge && (
            <div className="text-xs font-semibold text-[#7df6ff]">
              {product.badge}
            </div>
          )}
          <dl className="grid grid-cols-2 gap-3 text-sm text-white/70">
            <Spec label={c.productLabels?.footprint || "Footprint"} value={product.footprint} />
            <Spec label={c.productLabels?.height || "Height"} value={product.height} />
            <Spec label={c.productLabels?.riders || "Riders"} value={product.riders} />
            {product.year && <Spec label={c.productLabels?.year || "Year"} value={product.year} />}
          </dl>
          <Link
            href={`/contact?product=${encodeURIComponent(product.name)}`}
            className="mt-auto w-fit rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            {c.productLabels?.requestDetails || "Request details"}
          </Link>
        </article>
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

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-lg border border-white/5 bg-white/5 px-3 py-2">
      <span className="text-[11px] uppercase tracking-[0.14em] text-white/50">
        {label}
      </span>
      <span className="text-white">{value}</span>
    </div>
  );
}

