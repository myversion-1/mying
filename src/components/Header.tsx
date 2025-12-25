"use client";

import Link from "next/link";
import { useLanguage } from "./language";
import { copy } from "../content/copy";
import { LanguageToggle } from "./LanguageToggle";

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/products", key: "products" },
  { href: "/contact", key: "contact" },
  { href: "/visit", key: "visit" },
];

export function Header() {
  const { lang } = useLanguage();
  const c = copy(lang);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0c1014]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="Miying logo"
            width={44}
            height={36}
            className="h-9 w-auto"
          />
          <div className="text-sm font-semibold uppercase tracking-[0.08em] text-white">
            Miying Rides
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-white md:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="rounded-full px-3 py-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {c.nav[link.key as keyof typeof c.nav]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Link
            href="/visit"
            className="hidden rounded-full bg-[#00eaff] px-3 py-2 text-sm font-semibold text-[#0b1116] shadow-[0_0_24px_rgba(0,234,255,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_0_32px_rgba(0,234,255,0.5)] md:inline-flex"
          >
            {c.cta.primary}
          </Link>
        </div>
      </div>
    </header>
  );
}

