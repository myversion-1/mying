"use client";

import { usePathname } from "next/navigation";
import { NavLinks } from "./NavLinks";
import { ProductDropdown } from "./ProductDropdown";

interface DesktopNavProps {
  links: Array<{ href: string; key: string; hasDropdown?: boolean }>;
}

export function DesktopNav({ links }: DesktopNavProps) {
  const pathname = usePathname();
  const isProductsPage = pathname === "/products";

  return (
    <nav className="hidden items-center gap-3 text-sm font-medium tracking-wide text-[var(--text-primary)] lg:flex flex-shrink-0">
      <NavLinks links={links} excludeKey="products" />
      <ProductDropdown isProductsPage={isProductsPage} />
    </nav>
  );
}

