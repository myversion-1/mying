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
      className="flex items-center gap-2 text-sm text-white/70"
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
            className="h-4 w-4 text-white/40"
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
            <span className="text-white" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="transition hover:text-[#00eaff]"
            >
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}







