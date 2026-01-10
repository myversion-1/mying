"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLanguage } from "./language";
import { copy } from "../content/copy";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { getProducts } from "../content/copy";
import { 
  productCategories, 
  getMainCategories, 
  getSubCategories,
  getLocalizedCategoryName,
  type MainCategory 
} from "../content/product-categories";
import { getProductCountByCategory } from "../utils/product-category-mapper";
import { productsMultilingual } from "../content/products_multilingual";

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/products", key: "products", hasDropdown: true },
  { href: "/cases", key: "cases" },
  { href: "/blog", key: "blog" },
  { href: "/resources", key: "resources" },
  { href: "/faq", key: "faq" },
  { href: "/trade-shows", key: "trade-shows" },
  { href: "/contact", key: "contact" },
  { href: "/visit", key: "visit" },
];

// Category icons mapping
const categoryIcons: Record<string, (props: React.SVGProps<SVGSVGElement>) => JSX.Element> = {
  "Family Ride": (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  "Thrill Ride": (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  "Kiddie Ride": (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "Water Ride": (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  "Roller Coaster": (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  "Ferris Wheel": (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  "Carousel": (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

// Default icon for categories without specific icon
const DefaultCategoryIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

export function Header() {
  const { lang } = useLanguage();
  const c = copy(lang);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSubCategoryOpen, setMobileSubCategoryOpen] = useState<string | null>(null);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const productsDropdownRef = useRef<HTMLDivElement>(null);

  // Get products for counting
  const products = getProducts(lang);
  
  // Build multi-level category structure with counts
  const mainCategories = getMainCategories();
  const categoryStructure = mainCategories.map((mainCat) => {
    const subCategories = getSubCategories(mainCat);
    const subCategoriesWithCounts = subCategories.map((subCat) => {
      const count = getProductCountByCategory(productsMultilingual, mainCat, subCat.id);
      return { ...subCat, count };
    }).filter((subCat) => subCat.count > 0); // Only show subcategories with products
    
    const mainCategoryCount = getProductCountByCategory(productsMultilingual, mainCat);
    
    return {
      mainCategory: mainCat,
      subCategories: subCategoriesWithCounts,
      count: mainCategoryCount,
    };
  }).filter((cat) => cat.count > 0); // Only show main categories with products

  // Get current category from URL
  const currentMainCategory = searchParams.get("mainCategory") || null;
  const currentSubCategory = searchParams.get("subCategory") || null;
  const currentCategory = searchParams.get("category") || null; // Legacy support
  const isProductsPage = pathname === "/products";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur transition-colors">
      <div className="mx-auto max-w-6xl px-4 py-3 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative flex items-center justify-center rounded-lg p-1.5 transition-colors dark:bg-transparent bg-[var(--surface-elevated)] border border-[var(--border)] dark:border-transparent">
              <img
                src="/logo.jpg"
                alt="Miying logo"
                width={44}
                height={36}
                className="h-9 w-auto transition-opacity group-hover:opacity-90"
              />
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] whitespace-nowrap">
              Miying Rides
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-3 text-sm font-medium text-[var(--text-primary)] lg:flex flex-shrink-0">
            {links.map((link) => {
              const navText = c.nav[link.key as keyof typeof c.nav];
              if (!navText) return null;

              // Products dropdown menu (similar to Arrowy's navigation)
              if (link.key === "products" && link.hasDropdown) {
                const isProductsActive = isProductsPage;
                return (
                  <div key={link.key} className="relative" ref={productsDropdownRef}>
                    <Link
                      href="/products"
                      onMouseEnter={() => setProductsDropdownOpen(true)}
                      onMouseLeave={() => setProductsDropdownOpen(false)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-sm font-medium transition whitespace-nowrap ${
                        isProductsActive
                          ? "text-[var(--text-primary)] bg-[var(--surface-hover)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {navText}
                      <svg
                        className={`h-4 w-4 flex-shrink-0 transition-transform ${productsDropdownOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    {productsDropdownOpen && (
                      <div
                        onMouseEnter={() => setProductsDropdownOpen(true)}
                        onMouseLeave={() => setProductsDropdownOpen(false)}
                        className="absolute top-full left-0 mt-2 w-80 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] shadow-lg p-2 z-50 max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* All Products Link */}
                        <Link
                          href="/products"
                          onClick={(e) => {
                            e.stopPropagation();
                            setProductsDropdownOpen(false);
                          }}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition mb-1 min-h-[44px] touch-manipulation ${
                            isProductsPage && !currentMainCategory && !currentCategory
                              ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20"
                              : "text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                          }`}
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                          <span>{lang === "zh" ? "所有产品" : "All Products"}</span>
                          <span className="ml-auto text-xs font-normal text-[var(--text-tertiary)]">
                            {products.length}
                          </span>
                        </Link>
                        <div className="border-t border-[var(--border)] my-2" />
                        
                        {/* Multi-level Category Structure */}
                        <div className="space-y-2">
                          {categoryStructure.map(({ mainCategory, subCategories, count }) => {
                            const isMainCategoryActive = currentMainCategory === mainCategory && isProductsPage;
                            const MainCategoryIcon = categoryIcons[mainCategory] || DefaultCategoryIcon;
                            const isZh = lang === "zh";
                            const mainCategoryName = isZh 
                              ? (mainCategory === "Family Rides" ? "家庭游乐设备" :
                                 mainCategory === "Thrill Rides" ? "刺激游乐设备" :
                                 mainCategory === "Kiddie Rides" ? "儿童游乐设备" :
                                 mainCategory === "Water Rides" ? "水上设备" :
                                 mainCategory === "Bumper Cars" ? "碰碰车" :
                                 mainCategory === "VR/Interactive" ? "VR/互动设备" :
                                 mainCategory === "Custom Solutions" ? "定制解决方案" : mainCategory)
                              : mainCategory;

                            return (
                              <div key={mainCategory} className="space-y-1">
                                {/* Main Category Link */}
                                <Link
                                  href={`/products?mainCategory=${encodeURIComponent(mainCategory)}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setProductsDropdownOpen(false);
                                  }}
                                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition min-h-[44px] touch-manipulation ${
                                    isMainCategoryActive && !currentSubCategory
                                      ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20"
                                      : "text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                                  }`}
                                >
                                  <MainCategoryIcon className="h-4 w-4 flex-shrink-0" />
                                  <span className="flex-1 truncate">{mainCategoryName}</span>
                                  <span className={`text-xs font-normal ${isMainCategoryActive ? "text-[var(--accent-primary)]/70" : "text-[var(--text-tertiary)]"}`}>
                                    {count}
                                  </span>
                                </Link>
                                
                                {/* Sub Categories */}
                                {subCategories.length > 0 && (
                                  <div className="ml-7 space-y-0.5 border-l-2 border-[var(--border)] pl-3">
                                    {subCategories.map((subCat) => {
                                      const isSubCategoryActive = currentMainCategory === mainCategory && currentSubCategory === subCat.id && isProductsPage;
                                      const subCategoryName = subCat.name[isZh ? "zh" : "en"] || subCat.name["en"];
                                      
                                      return (
                                        <Link
                                          key={subCat.id}
                                          href={`/products?mainCategory=${encodeURIComponent(mainCategory)}&subCategory=${encodeURIComponent(subCat.id)}`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setProductsDropdownOpen(false);
                                          }}
                                          className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition min-h-[44px] touch-manipulation ${
                                            isSubCategoryActive
                                              ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-medium"
                                              : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                                          }`}
                                        >
                                          <span className="flex-1 truncate">{subCategoryName}</span>
                                          <span className={`text-xs font-normal ${isSubCategoryActive ? "text-[var(--accent-primary)]/70" : "text-[var(--text-tertiary)]"}`}>
                                            {subCat.count}
                                          </span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // Check if current link is active
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`inline-flex items-center rounded-full px-2.5 py-2 text-sm font-medium transition whitespace-nowrap ${
                    isActive
                      ? "text-[var(--text-primary)] bg-[var(--surface-hover)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {navText}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <ThemeToggle />
            <LanguageToggle />
            {/* Desktop CTA Button */}
            <Link
              href="/visit"
              className="hidden rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] lg:inline-flex whitespace-nowrap min-h-[44px] touch-manipulation"
            >
              {c.cta.primary}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded-lg p-2 text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
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
          <div className="lg:hidden mt-4 pb-4 border-t border-[var(--border)] pt-4">
            <nav className="flex flex-col gap-2">
              {links.map((link) => {
                const navText = c.nav[link.key as keyof typeof c.nav];
                if (!navText) return null;

                // Products dropdown menu for mobile
                if (link.key === "products" && link.hasDropdown) {
                  return (
                    <div key={link.key} className="flex flex-col gap-2">
                      <button
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        className="flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] min-h-[44px] touch-manipulation"
                      >
                        <span>{navText}</span>
                        <svg
                          className={`h-4 w-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {mobileProductsOpen && (
                        <div className="ml-4 flex flex-col gap-1 border-l-2 border-[var(--border)] pl-4">
                          {/* All Products Link */}
                          <Link
                            href="/products"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileProductsOpen(false);
                            }}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition min-h-[44px] touch-manipulation ${
                              isProductsPage && !currentMainCategory && !currentCategory
                                ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20"
                                : "text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                            }`}
                          >
                            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            <span>{lang === "zh" ? "所有产品" : "All Products"}</span>
                            <span className="ml-auto text-xs font-normal text-[var(--text-tertiary)]">
                              {products.length}
                            </span>
                          </Link>
                          
                          {/* Multi-level Category Structure */}
                          {categoryStructure.map(({ mainCategory, subCategories, count }) => {
                            const isMainCategoryActive = currentMainCategory === mainCategory && isProductsPage && !currentSubCategory;
                            const MainCategoryIcon = categoryIcons[mainCategory] || DefaultCategoryIcon;
                            const isZh = lang === "zh";
                            const mainCategoryName = isZh 
                              ? (mainCategory === "Family Rides" ? "家庭游乐设备" :
                                 mainCategory === "Thrill Rides" ? "刺激游乐设备" :
                                 mainCategory === "Kiddie Rides" ? "儿童游乐设备" :
                                 mainCategory === "Water Rides" ? "水上设备" :
                                 mainCategory === "Bumper Cars" ? "碰碰车" :
                                 mainCategory === "VR/Interactive" ? "VR/互动设备" :
                                 mainCategory === "Custom Solutions" ? "定制解决方案" : mainCategory)
                              : mainCategory;

                            return (
                              <div key={mainCategory} className="flex flex-col gap-1">
                                {/* Main Category Button/Link */}
                                {subCategories.length > 0 ? (
                                  <button
                                    onClick={() => setMobileSubCategoryOpen(mobileSubCategoryOpen === mainCategory ? null : mainCategory)}
                                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition min-h-[44px] touch-manipulation ${
                                      isMainCategoryActive
                                        ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20"
                                        : "text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                                    }`}
                                  >
                                    <div className="flex items-center gap-3 flex-1">
                                      <MainCategoryIcon className="h-4 w-4 flex-shrink-0" />
                                      <span className="flex-1 truncate">{mainCategoryName}</span>
                                      <span className={`text-xs font-normal ${isMainCategoryActive ? "text-[var(--accent-primary)]/70" : "text-[var(--text-tertiary)]"}`}>
                                        {count}
                                      </span>
                                    </div>
                                    <svg
                                      className={`h-4 w-4 transition-transform flex-shrink-0 ${mobileSubCategoryOpen === mainCategory ? "rotate-180" : ""}`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                ) : (
                                  <Link
                                    href={`/products?mainCategory=${encodeURIComponent(mainCategory)}`}
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setMobileProductsOpen(false);
                                    }}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition min-h-[44px] touch-manipulation ${
                                      isMainCategoryActive
                                        ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20"
                                        : "text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                                    }`}
                                  >
                                    <MainCategoryIcon className="h-4 w-4 flex-shrink-0" />
                                    <span className="flex-1 truncate">{mainCategoryName}</span>
                                    <span className={`text-xs font-normal ${isMainCategoryActive ? "text-[var(--accent-primary)]/70" : "text-[var(--text-tertiary)]"}`}>
                                      {count}
                                    </span>
                                  </Link>
                                )}
                                
                                {/* Sub Categories */}
                                {subCategories.length > 0 && mobileSubCategoryOpen === mainCategory && (
                                  <div className="ml-6 flex flex-col gap-0.5 border-l-2 border-[var(--border)] pl-3">
                                    {subCategories.map((subCat) => {
                                      const isSubCategoryActive = currentMainCategory === mainCategory && currentSubCategory === subCat.id && isProductsPage;
                                      const subCategoryName = subCat.name[isZh ? "zh" : "en"] || subCat.name["en"];
                                      
                                      return (
                                        <Link
                                          key={subCat.id}
                                          href={`/products?mainCategory=${encodeURIComponent(mainCategory)}&subCategory=${encodeURIComponent(subCat.id)}`}
                                          onClick={() => {
                                            setMobileMenuOpen(false);
                                            setMobileProductsOpen(false);
                                            setMobileSubCategoryOpen(null);
                                          }}
                                          className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs transition min-h-[44px] touch-manipulation ${
                                            isSubCategoryActive
                                              ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-medium"
                                              : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                                          }`}
                                        >
                                          <span className="flex-1 truncate">{subCategoryName}</span>
                                          <span className={`text-xs font-normal ${isSubCategoryActive ? "text-[var(--accent-primary)]/70" : "text-[var(--text-tertiary)]"}`}>
                                            {subCat.count}
                                          </span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  >
                    {navText}
                  </Link>
                );
              })}
              {/* Mobile CTA Button */}
              <Link
                href="/visit"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-semibold text-center text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
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

