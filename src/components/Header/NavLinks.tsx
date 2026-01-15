"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../language";
import { copy } from "../../content/copy";

interface NavLinksProps {
  links: Array<{ href: string; key: string; hasDropdown?: boolean }>;
  excludeKey?: string; // Key to exclude (e.g., "products" if it has dropdown)
}

export function NavLinks({ links, excludeKey }: NavLinksProps) {
  const { lang } = useLanguage();
  const c = copy(lang);
  const pathname = usePathname();

  return (
    <>
      {links
        .filter((link) => !link.hasDropdown && link.key !== excludeKey)
        .map((link) => {
          const navText = c.nav[link.key as keyof typeof c.nav];
          if (!navText) return null;

          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.key}
              href={link.href}
              prefetch={true}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium tracking-wide transition-colors whitespace-nowrap group ${
                isActive
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span className="relative z-10">{navText}</span>
              {/* Active Line - Bottom slider animation */}
              <span
                className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent-primary)] rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                }`}
                style={{
                  transformOrigin: "center",
                }}
              />
            </Link>
          );
        })}
    </>
  );
}

