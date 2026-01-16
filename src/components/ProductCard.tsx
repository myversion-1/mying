"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/Badge";
import type { Product } from "../content/copy";
import type { Lang } from "./language";
import { generateProductSlug } from "../utils/hreflang";
import { trackCTAClick } from "../lib/analytics";
import { encodeImagePath, hasNonASCIICharacters } from "../utils/image-utils";
import { copy } from "../content/copy";
import { Ruler, Users, Maximize2 } from "lucide-react";

interface ProductCardProps {
  product: Product;
  lang: Lang;
  index: number;
  isRTL: boolean;
}

/**
 * ProductCard Component - B2B Optimized
 * 
 * Design Principles:
 * 1. Image at top for immediate visual recognition
 * 2. Structured list of core parameters (Footprint, Capacity, Height) below image
 * 3. Avoid large text blocks - use concise, technical information
 * 4. Category badges for quick identification
 * 
 * Optimized with React.memo to prevent unnecessary re-renders
 */
function ProductCardComponent({ product, lang, index, isRTL }: ProductCardProps) {
  const pathname = usePathname();
  const productSlug = generateProductSlug(product.name);
  const productUrl = `/products/${productSlug}`;
  const c = copy(lang);

  // Get localized labels
  const labels = {
    footprint: c.productLabels?.footprint || (lang === "zh" ? "占地面积" : "Footprint"),
    height: c.productLabels?.height || (lang === "zh" ? "高度" : "Height"),
    riders: c.productLabels?.riders || (lang === "zh" ? "载客量" : "Capacity"),
  };

  // Get category badge tone based on mainCategory
  const getCategoryBadgeTone = (mainCategory?: string): "positive" | "warning" | "neutral" => {
    if (!mainCategory) return "neutral";
    if (mainCategory === "Family Rides" || mainCategory === "Kiddie Rides") return "positive";
    if (mainCategory === "Thrill Rides") return "warning";
    return "neutral";
  };

  // Get category badge text
  const getCategoryBadgeText = (mainCategory?: string): string => {
    if (!mainCategory) return product.category;
    if (lang === "zh") {
      if (mainCategory === "Family Rides") return "家庭设备";
      if (mainCategory === "Thrill Rides") return "刺激设备";
      if (mainCategory === "Kiddie Rides") return "儿童设备";
      if (mainCategory === "Water Rides") return "水上设备";
      if (mainCategory === "Bumper Cars") return "碰碰车";
      if (mainCategory === "VR/Interactive") return "VR/互动";
      return mainCategory;
    }
    return mainCategory;
  };

  return (
    <article
      className="
        group flex flex-col gap-0 rounded-lg border border-[var(--border)] 
        bg-[var(--surface-elevated)] overflow-hidden transition-all duration-300
        hover:border-[var(--accent-primary)]/50 hover:bg-[var(--surface-hover)] 
        hover:shadow-lg
      "
    >
      {/* Product Image - Top Position */}
      <Link href={productUrl} className="block relative">
        <div
          className="
            relative w-full overflow-hidden 
            bg-gradient-to-br from-white/10 to-white/5
            aspect-video
            group-hover:ring-2 group-hover:ring-[var(--accent-primary)]/30
            transition-all duration-300
          "
        >
          {product.image ? (
            hasNonASCIICharacters(product.image) ? (
              <img
                src={encodeImagePath(product.image)}
                alt={`${product.name} - ${product.category} amusement ride${product.status === "Used" ? " (Used)" : ""}`}
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                width={800}
                height={450}
                style={{ aspectRatio: '16 / 9' }}
                loading="lazy"
                fetchPriority="low"
                decoding="async"
                suppressHydrationWarning
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.setAttribute('data-loaded', 'true');
                  target.style.opacity = '1';
                  target.style.transition = 'opacity 0.5s ease-in-out';
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="flex h-full items-center justify-center">
                        <div class="text-center">
                          <div class="mb-2 text-4xl opacity-30">🎠</div>
                          <div class="text-xs text-[var(--text-tertiary)]">No image available</div>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            ) : (
              <Image
                src={product.image}
                alt={`${product.name} - ${product.category} amusement ride${product.status === "Used" ? " (Used)" : ""}`}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                quality={65}
                fetchPriority="low"
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.setAttribute('data-loaded', 'true');
                  target.style.opacity = '1';
                }}
                style={{ opacity: 0 }}
              />
            )
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mb-2 text-4xl opacity-30">🎠</div>
                <div className="text-xs text-[var(--text-tertiary)]">No image available</div>
              </div>
            </div>
          )}
          
          {/* Category Badge - Top Right */}
          {product.mainCategory && (
            <div
              className={`
                absolute z-10 top-2 ${isRTL ? "left-2" : "right-2"}
              `}
            >
              <Badge tone={getCategoryBadgeTone(product.mainCategory)}>
                {getCategoryBadgeText(product.mainCategory)}
              </Badge>
            </div>
          )}
          
          {/* Status Badge - Top Left */}
          <div
            className={`
              absolute z-10 top-2 ${isRTL ? "right-2" : "left-2"}
            `}
          >
            <Badge tone={product.status === "New" ? "positive" : "warning"}>
              {product.status}
            </Badge>
          </div>
        </div>
      </Link>

      {/* Content Section - Structured Information */}
      <div className="flex flex-col gap-4 p-4">
        {/* Product Name and Category */}
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
            {product.category}
          </div>
          <Link href={productUrl}>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] transition hover:text-[var(--accent-primary)] line-clamp-2">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Core Parameters - Structured List */}
        <div className="grid grid-cols-3 gap-2 border-t border-[var(--border)] pt-3">
          {/* Footprint */}
          <div className="flex flex-col items-center text-center">
            <Maximize2 className="h-4 w-4 text-[var(--accent-primary)] mb-1" />
            <div className="text-[10px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mb-0.5">
              {labels.footprint}
            </div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              {product.footprint}
            </div>
          </div>

          {/* Capacity */}
          <div className="flex flex-col items-center text-center">
            <Users className="h-4 w-4 text-[var(--accent-primary)] mb-1" />
            <div className="text-[10px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mb-0.5">
              {labels.riders}
            </div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              {product.riders}
            </div>
          </div>

          {/* Height */}
          <div className="flex flex-col items-center text-center">
            <Ruler className="h-4 w-4 text-[var(--accent-primary)] mb-1" />
            <div className="text-[10px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mb-0.5">
              {labels.height}
            </div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              {product.height}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <Link
            href={`/quote?product=${encodeURIComponent(product.name)}`}
            onClick={() => {
              trackCTAClick({
                ctaText: lang === "zh" ? "获取报价" : "Request Quote",
                ctaLocation: "product_card",
                destination: `/quote?product=${encodeURIComponent(product.name)}`,
                page: pathname,
                section: "product_grid",
                productName: product.name,
              });
            }}
            className="
              w-full rounded-xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--accent-primary)]
              px-4 py-2.5 text-center text-sm sm:px-5 sm:py-3
              font-semibold text-[var(--action-primary-text)]
              shadow-lg shadow-[var(--action-primary)]/30
              hover:shadow-xl hover:shadow-[var(--action-primary)]/50
              hover:-translate-y-0.5 hover:brightness-110 active:scale-95
              transition-all duration-200
              min-h-[44px] touch-manipulation
              border border-[var(--action-primary)]/20
            "
          >
            {lang === "zh" ? "获取报价" : "Request Quote"}
          </Link>
          <Link
            href={productUrl}
            onClick={() => {
              trackCTAClick({
                ctaText: lang === "zh" ? "查看详情" : "View Details",
                ctaLocation: "product_card",
                destination: productUrl,
                page: pathname,
                section: "product_grid",
                productName: product.name,
              });
            }}
            className="
              w-full rounded-xl border-2 border-[var(--action-primary)]
              bg-[var(--action-primary)]/5 px-4 py-2.5 text-center text-sm font-semibold
              text-[var(--action-primary)] sm:px-5 sm:py-3
              shadow-md hover:shadow-lg hover:shadow-[var(--action-primary)]/20
              hover:-translate-y-0.5 hover:bg-[var(--action-primary)]/15 active:scale-95
              transition-all duration-200
              min-h-[44px] touch-manipulation
            "
          >
            {lang === "zh" ? "查看详情" : "View Details"}
          </Link>
        </div>
      </div>
    </article>
  );
}

// Memoize ProductCard to prevent unnecessary re-renders
export const ProductCard = memo(ProductCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.product.name === nextProps.product.name &&
    prevProps.product.image === nextProps.product.image &&
    prevProps.product.category === nextProps.product.category &&
    prevProps.product.status === nextProps.product.status &&
    prevProps.product.mainCategory === nextProps.product.mainCategory &&
    prevProps.lang === nextProps.lang &&
    prevProps.index === nextProps.index &&
    prevProps.isRTL === nextProps.isRTL
  );
});
