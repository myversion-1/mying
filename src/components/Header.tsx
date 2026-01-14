"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLanguage } from "./language";
import { copy } from "../content/copy";
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
import { trackCTAClick } from "../lib/analytics";

// Code splitting: Lazy load non-critical header components
// These components are not needed for initial render and can be loaded on demand
const LanguageToggle = dynamic(() => import("./LanguageToggle"), {
  ssr: false, // Language toggle doesn't need SSR
  loading: () => (
    <div className="flex h-[44px] w-20 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]">
      <div className="h-4 w-12 animate-pulse rounded bg-[var(--text-tertiary)]/20" />
    </div>
  ),
});

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false, // Theme toggle doesn't need SSR
  loading: () => (
    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]">
      <div className="h-5 w-5 animate-pulse rounded bg-[var(--text-tertiary)]/20" />
    </div>
  ),
});

// Core navigation items - prioritized for conversion paths
// Only essential pages that support inquiry decisions
const links = [
  { href: "/", key: "home" },
  { href: "/products", key: "products", hasDropdown: true },
  { href: "/services", key: "services" },
  { href: "/cases", key: "cases" },
  { href: "/about", key: "about" },
];

// Secondary pages moved to footer (Blog, Resources, FAQ, Trade Shows, Visit)

// Category icons mapping
const categoryIcons: Record<string, (props: React.SVGProps<SVGSVGElement>) => React.ReactElement> = {
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
  const [isScrolled, setIsScrolled] = useState(false);
  const productsDropdownRef = useRef<HTMLDivElement>(null);

  // Get total product count (static, doesn't need language filtering)
  // This is lightweight and can be computed immediately
  const totalProductCount = productsMultilingual.length;
  
  // Lazy load filtered products data - only compute when dropdown is opened or needed
  // This defers expensive language filtering until user interaction, reducing initial render time
  const products = useMemo(() => {
    // Only compute if dropdown is open or on products page (where it's needed)
    if (!productsDropdownOpen && !mobileProductsOpen && pathname !== "/products") {
      return []; // Return empty array to avoid computation
    }
    return getProducts(lang);
  }, [productsDropdownOpen, mobileProductsOpen, pathname, lang]);

  // Lazy load category structure - only compute when dropdown is opened
  // This defers expensive calculations until user interaction, reducing initial render time
  const categoryStructure = useMemo(() => {
    // Only compute if dropdown is open or on products page (where it's needed)
    if (!productsDropdownOpen && !mobileProductsOpen && pathname !== "/products") {
      return [];
    }
    
    const mainCategories = getMainCategories();
    return mainCategories.map((mainCat) => {
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
  }, [productsDropdownOpen, mobileProductsOpen, pathname]);

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

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 border-b transition-all duration-300 relative overflow-hidden ${
        isScrolled 
          ? "border-[var(--border)] bg-[rgba(10,22,40,0.92)] backdrop-blur-xl shadow-xl dark:bg-[rgba(10,22,40,0.96)]" 
          : "border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-lg"
      }`}
    >
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-primary)]/5 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      {/* Animated accent line at bottom */}
      <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/50 to-transparent transition-all duration-500 ${
        isScrolled ? 'w-full opacity-100' : 'w-0 opacity-0'
      }`} />
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 sm:px-6 py-2.5 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Logo - Modern design with gradient glow and depth */}
          <Link href="/" prefetch={false} className="flex items-center gap-3 flex-shrink-0 group relative">
            {/* Logo container with gradient background and glow effect */}
            <div className="relative flex items-center justify-center rounded-2xl p-2 transition-all duration-300 group-hover:scale-105">
              {/* Gradient background with subtle glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)]/20 via-[var(--accent-primary)]/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Animated glow ring on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              
              {/* Border with gradient */}
              <div className="absolute inset-0 rounded-2xl border border-[var(--accent-primary)]/30 group-hover:border-[var(--accent-primary)]/50 transition-colors duration-300" />
              
              {/* Logo image with backdrop blur effect */}
              <div className="relative z-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-1.5 border border-white/10">
                <img
                  src="/logo.jpg"
                  alt="Miying logo"
                  width={40}
                  height={32}
                  className="h-8 w-auto transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
                />
              </div>
              
              {/* Subtle shine effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            
            {/* Brand name with improved typography - Hidden on mobile */}
            <div className="hidden sm:flex flex-col">
              <div className="text-base font-bold uppercase tracking-[0.1em] text-[var(--text-primary)] whitespace-nowrap group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                Miying
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--text-tertiary)] whitespace-nowrap group-hover:text-[var(--text-secondary)] transition-colors duration-300">
                Rides
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Vertically centered with logo */}
          <nav className="hidden items-center gap-3 text-sm font-medium text-[var(--text-primary)] lg:flex flex-shrink-0 h-[45px]">
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
                      prefetch={false}
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
                          prefetch={false}
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
                            {totalProductCount}
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
                                  prefetch={false}
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
                                          prefetch={false}
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
                  prefetch={false}
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

          {/* Right Side Actions - Vertically centered */}
          <div className="flex items-center gap-3 flex-shrink-0 h-[45px]">
            <ThemeToggle />
            <LanguageToggle />
            {/* Single Primary CTA Button - Prominent and always visible */}
            <Link
              href="/quote"
              prefetch={false}
              onClick={() => {
                trackCTAClick({
                  ctaText: c.cta.requestQuote || (lang === "zh" ? "获取报价" : "Get Quote"),
                  ctaLocation: "header",
                  destination: "/quote",
                  page: pathname,
                });
              }}
              className="hidden rounded-xl bg-[var(--action-primary)] px-6 py-2.5 text-sm font-bold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-all duration-300 hover:bg-[var(--action-primary-hover)] hover:shadow-lg hover:-translate-y-0.5 lg:inline-flex items-center gap-2 whitespace-nowrap min-h-[44px] touch-manipulation"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span>{c.cta.requestQuote || (lang === "zh" ? "获取报价" : "Get Quote")}</span>
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
                              {totalProductCount}
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
              {/* Mobile CTA Button - Single prominent button */}
              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <Link
                  href="/quote"
                  onClick={() => {
                    trackCTAClick({
                      ctaText: c.cta.requestQuote || (lang === "zh" ? "获取报价" : "Get Quote"),
                      ctaLocation: "header_mobile",
                      destination: "/quote",
                      page: pathname,
                    });
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-[var(--action-primary)] px-4 py-3 text-sm font-bold text-center text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-all duration-300 hover:bg-[var(--action-primary-hover)] hover:shadow-lg min-h-[44px] touch-manipulation"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span>{c.cta.requestQuote || (lang === "zh" ? "获取报价" : "Get Quote")}</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

