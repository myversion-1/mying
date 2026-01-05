"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "./language";
import { copy } from "../content/copy";
import { LanguageToggle } from "./LanguageToggle";

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/products", key: "products" },
  { href: "/cases", key: "cases" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
  { href: "/visit", key: "visit" },
];

export function Header() {
  const { lang } = useLanguage();
  const c = copy(lang);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0c1014]/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/logo.jpg"
              alt="Miying logo"
              width={44}
              height={36}
              className="h-9 w-auto"
            />
            <div className="text-sm font-semibold uppercase tracking-[0.08em] text-white whitespace-nowrap">
              Miying Rides
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-3 text-sm font-medium text-white lg:flex flex-shrink-0">
            {links.map((link) => {
              const navText = c.nav[link.key as keyof typeof c.nav];
              if (!navText) return null;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className="rounded-full px-2.5 py-2 text-white/80 transition hover:bg-white/10 hover:text-white whitespace-nowrap"
                >
                  {navText}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <LanguageToggle />
            {/* Desktop CTA Button */}
            <Link
              href="/visit"
              className="hidden rounded-full bg-[#00eaff] px-3 py-2 text-sm font-semibold text-[#0b1116] shadow-[0_0_24px_rgba(0,234,255,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_0_32px_rgba(0,234,255,0.5)] lg:inline-flex whitespace-nowrap"
            >
              {c.cta.primary}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <nav className="flex flex-col gap-2">
              {links.map((link) => {
                const navText = c.nav[link.key as keyof typeof c.nav];
                if (!navText) return null;
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    {navText}
                  </Link>
                );
              })}
              {/* Mobile CTA Button */}
              <Link
                href="/visit"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 rounded-full bg-[#00eaff] px-4 py-2 text-sm font-semibold text-center text-[#0b1116] shadow-[0_0_24px_rgba(0,234,255,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_0_32px_rgba(0,234,255,0.5)]"
              >
                {c.cta.primary}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

