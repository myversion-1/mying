"use client";

import Link from "next/link";
import { trackCTAClick } from "../../lib/analytics";
import { usePathname } from "next/navigation";
import { useLanguage } from "../language";
import { copy } from "../../content/copy";

interface ShimmerCTAProps {
  href?: string;
  className?: string;
}

export function ShimmerCTA({ href = "/quote", className = "" }: ShimmerCTAProps) {
  const { lang } = useLanguage();
  const c = copy(lang);
  const pathname = usePathname();

  return (
    <Link
      href={href}
      prefetch={false}
      onClick={() => {
        trackCTAClick({
          ctaText:
            c.cta.requestQuote ||
            (lang === "zh" ? "获取报价" : "Get Quote"),
          ctaLocation: "header",
          destination: href,
          page: pathname,
        });
      }}
      className={`shimmer-cta-button ${className}`}
    >
      <span className="shimmer-cta-content">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <span>
          {c.cta.requestQuote ||
            (lang === "zh" ? "获取报价" : "Get Quote")}
        </span>
      </span>
      {/* Shimmer effect overlay */}
      <span className="shimmer-overlay" />
    </Link>
  );
}

