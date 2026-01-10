"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/Badge";
import { ProductSpecs } from "./ProductSpecs";
import type { Product } from "../content/copy";
import type { Lang } from "./language";
import { generateProductSlug } from "../utils/hreflang";
import { trackCTAClick } from "../lib/analytics";

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
 */
export function ProductCard({ product, lang, index, isRTL }: ProductCardProps) {
  const pathname = usePathname();
  const productSlug = generateProductSlug(product.name);
  const productUrl = `/products/${productSlug}`;

  return (
    <article
      className="
        @container
        group flex flex-col gap-3 rounded-2xl border border-[var(--border)] 
        bg-[var(--surface-elevated)] p-4 transition hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)]
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
          "
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={`${product.name} - ${product.category} amusement ride${product.status === "Used" ? " (Used)" : ""}`}
              fill
              className="object-cover transition group-hover:scale-105"
              sizes="(max-width: 300px) 100vw, (max-width: 500px) 50vw, 33vw"
              loading={index < 6 ? "eager" : "lazy"}
              priority={index < 6}
              quality={85}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mb-2 text-4xl opacity-30">🎠</div>
                <div className="text-xs text-[var(--text-tertiary)]">No image available</div>
              </div>
            </div>
          )}
          {/* Product Type Badge - Similar to Arrowy's EV/GAS/FE system */}
          {product.type && (
            <div
              className={`
                absolute z-10
                top-2 ${isRTL ? "left-2" : "right-2"}
                @[300px]:top-3
                ${isRTL ? "@[300px]:left-3 @[300px]:right-auto" : "@[300px]:right-3"}
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
          {/* Patent Badge - Container Query responsive positioning */}
          {product.patentCount && product.patentCount > 0 && (
            <div
              className={`
                absolute z-10
                ${product.type ? "top-12" : "top-2"} ${isRTL ? "left-2" : "right-2"}
                @[300px]:${product.type ? "top-14" : "top-3"}
                ${isRTL ? "@[300px]:left-3 @[300px]:right-auto" : "@[300px]:right-3"}
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
        <Badge tone={product.status === "New" ? "positive" : "warning"}>
          {product.status}
        </Badge>
      </div>

      {/* Product Positioning - Container Query responsive text size */}
      {product.positioning && (
        <p
          className="
            text-xs @[300px]:text-sm leading-relaxed text-[var(--text-secondary)]
            line-clamp-2 @[500px]:line-clamp-3
          "
        >
          {product.positioning}
        </p>
      )}

      {/* Ideal For Scenarios - Container Query responsive visibility */}
      {product.idealFor && product.idealFor.length > 0 && (
        <div
          className="
            space-y-1
            hidden @[300px]:block
          "
        >
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

      {product.badge && (
        <div className="text-xs @[300px]:text-sm font-semibold text-[var(--accent-primary)]">
          {product.badge}
        </div>
      )}

      {/* Technical Specifications - Container Query responsive grid */}
      <ProductSpecs product={product} lang={lang} variant="card" />

      {/* Safety & Compliance - Container Query responsive visibility */}
      {product.safetyCompliance && product.safetyCompliance.length > 0 && (
        <div
          className="
            rounded-lg border border-[var(--accent-primary)]/20 bg-[var(--accent-primary-light)] px-3 py-2
            hidden @[300px]:block
          "
        >
          <div className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--accent-primary)]">
            {lang === "zh" ? "安全认证" : "Safety & Compliance"}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">
            {product.safetyCompliance[0]}
          </div>
        </div>
      )}

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
            w-full @[300px]:flex-1 rounded-lg bg-[var(--action-primary)] 
            px-4 py-2 @[300px]:py-2.5 text-center text-xs @[300px]:text-sm 
            font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)]
            transition-colors hover:bg-[var(--action-primary-hover)]
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
            w-full @[300px]:flex-1 rounded-lg border border-[var(--action-secondary-border)] 
            bg-[var(--action-secondary)] px-4 py-2 text-center text-xs @[300px]:text-sm font-semibold 
            text-[var(--action-secondary-text)] !text-[var(--action-secondary-text)]
            transition-colors hover:bg-[var(--action-secondary-hover-bg)]
            min-h-[44px] min-w-[44px] touch-manipulation
          "
        >
          {lang === "zh" ? "查看详情" : "View Details"}
        </Link>
      </div>
    </article>
  );
}

