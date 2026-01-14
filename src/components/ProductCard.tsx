"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/Badge";
import { ProductSpecs } from "./ProductSpecs";
import type { Product } from "../content/copy";
import type { Lang } from "./language";
import { generateProductSlug } from "../utils/hreflang";
import { trackCTAClick } from "../lib/analytics";
import { encodeImagePath, hasNonASCIICharacters } from "../utils/image-utils";

interface ProductCardProps {
  product: Product;
  lang: Lang;
  index: number;
  isRTL: boolean;
}

/**
 * ProductCard Component with Container Queries
 * 
 * Uses CSS Container Queries to adapt layout based on container width
 * instead of viewport width. This allows cards to be responsive even
 * when placed in different container contexts (e.g., sidebar, grid, etc.)
 * 
 * Container Breakpoints:
 * - Narrow (< 300px): Single column, compact image
 * - Medium (300px - 500px): Two column specs, standard image
 * - Wide (> 500px): Full layout, larger image, horizontal specs
 * 
 * Optimized with React.memo to prevent unnecessary re-renders
 */
function ProductCardComponent({ product, lang, index, isRTL }: ProductCardProps) {
  const pathname = usePathname();
  const productSlug = generateProductSlug(product.name);
  const productUrl = `/products/${productSlug}`;

  return (
    <article
      className="
        @container
        group flex flex-col gap-3 rounded-2xl border border-[#374151] 
        bg-[var(--surface-elevated)] p-4 transition-all duration-300 overflow-hidden
        hover:border-[var(--accent-primary)]/50 hover:bg-[var(--surface-hover)] 
        hover:shadow-lg hover:shadow-[var(--accent-primary)]/20
        hover:-translate-y-1 hover:scale-[1.02]
      "
    >
      {/* Product Image - Container Query responsive aspect ratio */}
      <Link href={productUrl} className="block">
        <div
          className="
            relative w-full overflow-hidden rounded-xl 
            bg-gradient-to-br from-white/10 to-white/5
            @[300px]:aspect-[4/3]
            @[500px]:aspect-video
            aspect-square
            group-hover:ring-2 group-hover:ring-[var(--accent-primary)]/30
            transition-all duration-300
          "
        >
          {product.image ? (
            hasNonASCIICharacters(product.image) ? (
              // For images with Chinese characters, use native img tag to avoid Next.js Image optimizer issues
              <img
                src={encodeImagePath(product.image)}
                alt={`${product.name} - ${product.category} amusement ride${product.status === "Used" ? " (Used)" : ""}`}
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                width={800}
                height={800}
                style={{ aspectRatio: '1 / 1', opacity: index < 6 ? 1 : 0 }}
                loading={index < 6 ? "eager" : "lazy"}
                fetchPriority={index < 3 ? "high" : "auto"}
                decoding="async"
                suppressHydrationWarning
                onLoad={(e) => {
                  // Progressive fade-in for lazy loaded images
                  const target = e.target as HTMLImageElement;
                  target.setAttribute('data-loaded', 'true');
                  target.style.opacity = '1';
                  target.style.transition = 'opacity 0.5s ease-in-out';
                }}
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
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
                sizes="(max-width: 300px) 100vw, (max-width: 500px) 50vw, 33vw"
                loading={index < 6 ? "eager" : "lazy"}
                priority={index < 6}
                quality={65}
                fetchPriority={index < 3 ? "high" : "auto"}
                onLoad={(e) => {
                  // Mark image as loaded for progressive fade-in
                  const target = e.target as HTMLImageElement;
                  target.setAttribute('data-loaded', 'true');
                  target.style.opacity = '1';
                }}
                style={{ opacity: index < 6 ? 1 : 0 }}
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
          {/* Product Type Badge - Refined capsule design */}
          {product.type && (
            <div
              className={`
                absolute z-10
                top-2.5 ${isRTL ? "left-2.5" : "right-2.5"}
              `}
            >
              <Badge tone={product.type}>
                {product.type === "electric" 
                  ? "EV" 
                  : product.type === "mechanical" 
                    ? "MECH" 
                    : "HYBRID"}
              </Badge>
            </div>
          )}
          {/* Patent Badge - Refined capsule design */}
          {product.patentCount && product.patentCount > 0 && (
            <div
              className={`
                absolute z-10
                ${product.type ? "top-11" : "top-2.5"} ${isRTL ? "left-2.5" : "right-2.5"}
              `}
            >
              <Badge tone="patent">
                {product.patentCount}+ {lang === "zh" ? "专利" : "Patents"}
              </Badge>
            </div>
          )}
        </div>
      </Link>

      {/* Product Header - Container Query responsive layout */}
      <div
        className="
          flex flex-col gap-2
          @[300px]:flex-row @[300px]:items-start @[300px]:justify-between
        "
      >
        <div className="flex-1">
          <div className="text-xs @[300px]:text-sm uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
            {product.category}
          </div>
          <Link href={productUrl}>
            <h3
              className="
                text-lg @[300px]:text-xl font-semibold text-[var(--text-primary)] 
                transition hover:text-[var(--accent-primary)]
              "
            >
              {product.name}
            </h3>
          </Link>
        </div>
        <div className="flex-shrink-0">
          <Badge tone={product.status === "New" ? "positive" : "warning"}>
            {product.status}
          </Badge>
        </div>
      </div>

      {/* Product Positioning - Short description, always visible */}
      {product.positioning && (
        <p
          className="
            text-sm leading-relaxed text-[var(--text-secondary)]
            line-clamp-2
          "
        >
          {product.positioning}
        </p>
      )}

      {/* Detailed Information - Show on hover with smooth slide-in animation */}
      <div className="
        max-h-0 overflow-hidden opacity-0 translate-y-[-10px]
        group-hover:max-h-[500px] group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-300 ease-out
        space-y-3
      ">
        {/* Technical Specifications - Slide in on hover */}
        <div className="pt-2 border-t border-[var(--border)]">
          <ProductSpecs product={product} lang={lang} variant="card" />
        </div>

        {/* Ideal For Scenarios - Show on hover */}
        {product.idealFor && product.idealFor.length > 0 && (
          <div className="space-y-1.5">
            <div className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
              {lang === "zh" ? "适用场景" : "Ideal for"}
            </div>
            <ul className="space-y-1">
              {product.idealFor.slice(0, 3).map((scenario, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                  <span className="mt-1 text-[var(--accent-primary)]">•</span>
                  <span>{scenario}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Safety & Compliance - Show on hover */}
        {product.safetyCompliance && product.safetyCompliance.length > 0 && (
          <div className="rounded-lg border border-[var(--accent-primary)]/20 bg-[var(--accent-primary-light)] px-3 py-2">
            <div className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--accent-primary)]">
              {lang === "zh" ? "安全认证" : "Safety & Compliance"}
            </div>
            <div className="text-xs text-[var(--text-secondary)]">
              {product.safetyCompliance[0]}
            </div>
          </div>
        )}

        {/* Badge - Show on hover if exists */}
        {product.badge && (
          <div className="text-xs font-semibold text-[var(--accent-primary)]">
            {product.badge}
          </div>
        )}
      </div>

      {/* CTA Buttons - Container Query responsive layout */}
      <div
        className="
          mt-auto flex flex-col gap-2
          @[300px]:flex-row
        "
      >
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
            w-full @[300px]:flex-1 rounded-xl bg-[var(--action-primary)] 
            px-4 py-2.5 text-center text-sm 
            font-bold text-[var(--action-primary-text)] !text-[var(--action-primary-text)]
            transition-all duration-300 hover:bg-[var(--action-primary-hover)] hover:shadow-lg hover:-translate-y-0.5
            min-h-[44px] min-w-[44px] touch-manipulation
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
            w-full @[300px]:flex-1 rounded-xl border border-[var(--action-secondary-border)] 
            bg-[var(--action-secondary)] px-4 py-2.5 text-center text-sm font-semibold 
            text-[var(--action-secondary-text)] !text-[var(--action-secondary-text)]
            transition-all duration-300 hover:bg-[var(--action-secondary-hover-bg)] hover:border-[var(--accent-primary)]/30
            min-h-[44px] min-w-[44px] touch-manipulation
          "
        >
          {lang === "zh" ? "查看详情" : "View Details"}
        </Link>
      </div>
    </article>
  );
}

// Memoize ProductCard to prevent unnecessary re-renders
// Only re-render if product, lang, index, or isRTL changes
export const ProductCard = memo(ProductCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.product.name === nextProps.product.name &&
    prevProps.product.image === nextProps.product.image &&
    prevProps.product.category === nextProps.product.category &&
    prevProps.product.status === nextProps.product.status &&
    prevProps.lang === nextProps.lang &&
    prevProps.index === nextProps.index &&
    prevProps.isRTL === nextProps.isRTL
  );
});

