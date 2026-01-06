"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/Badge";
import { ProductSpecs } from "./ProductSpecs";
import type { Product } from "../content/copy";
import type { Lang } from "./language";
import { generateProductSlug } from "../utils/hreflang";

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
  const productSlug = generateProductSlug(product.name);
  const productUrl = `/products/${productSlug}`;

  return (
    <article
      className="
        @container
        group flex flex-col gap-3 rounded-2xl border border-white/5 
        bg-gradient-to-br from-white/5 to-white/0 p-4 transition hover:border-white/20
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
                <div className="text-xs text-white/40">No image available</div>
              </div>
            </div>
          )}
          {/* Patent Badge - Container Query responsive positioning */}
          {product.patentCount && product.patentCount > 0 && (
            <div
              className={`
                absolute z-10
                top-2 right-2
                @[300px]:top-3
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
          <div className="text-xs @[300px]:text-sm uppercase tracking-[0.14em] text-white/50">
            {product.category}
          </div>
          <Link href={productUrl}>
            <h3
              className="
                text-lg @[300px]:text-xl font-semibold text-white 
                transition hover:text-[#00eaff]
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
            text-xs @[300px]:text-sm leading-relaxed text-white/80
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
        <div className="text-xs @[300px]:text-sm font-semibold text-[#7df6ff]">
          {product.badge}
        </div>
      )}

      {/* Technical Specifications - Container Query responsive grid */}
      <ProductSpecs product={product} lang={lang} variant="card" />

      {/* Safety & Compliance - Container Query responsive visibility */}
      {product.safetyCompliance && product.safetyCompliance.length > 0 && (
        <div
          className="
            rounded-lg border border-[#7df6ff]/20 bg-[#7df6ff]/5 px-3 py-2
            hidden @[300px]:block
          "
        >
          <div className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#7df6ff]">
            {lang === "zh" ? "安全认证" : "Safety & Compliance"}
          </div>
          <div className="text-xs text-white/70">
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
          href={productUrl}
          className="
            w-full @[300px]:flex-1 rounded-full bg-[#00eaff] 
            px-4 py-2 @[300px]:py-2.5 text-center text-xs @[300px]:text-sm 
            font-semibold text-[#0b1116] 
            shadow-[0_0_20px_rgba(0,234,255,0.3)] 
            transition hover:-translate-y-[1px] hover:shadow-[0_0_28px_rgba(0,234,255,0.5)]
          "
        >
          {lang === "zh" ? "查看详情" : "View Details"}
        </Link>
        <Link
          href={`/quote?product=${encodeURIComponent(product.name)}`}
          className="
            w-full @[300px]:flex-1 rounded-full border border-white/20 
            bg-white/5 px-4 py-2 text-center text-xs font-semibold text-white 
            transition hover:border-white/40 hover:bg-white/10
          "
        >
          {lang === "zh" ? "快速询价" : "Quick Quote"}
        </Link>
      </div>
    </article>
  );
}

