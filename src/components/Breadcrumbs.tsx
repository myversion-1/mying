"use client";

import Link from "next/link";
import { useLanguage } from "./language";
import { copy } from "../content/copy";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumbs component for better navigation
 * Displays a navigation trail showing the user's location in the site hierarchy
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { lang } = useLanguage();
  const c = copy(lang);

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm text-[var(--dark-bg-text-secondary)]"
    >
      {/* Home */}
      <Link
        href="/"
        className="transition hover:text-[#00eaff]"
        aria-label={c.nav.home}
      >
        {lang === "zh" ? "首页" : "Home"}
      </Link>

      {/* Separator and items */}
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-[var(--dark-bg-text-tertiary)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          {index === items.length - 1 ? (
            <span className="text-[var(--dark-bg-text)]" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="transition-colors hover:text-[var(--accent-primary)] min-h-[44px] min-w-[44px] touch-manipulation"
            >
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}










