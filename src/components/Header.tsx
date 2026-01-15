"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./language";
import { copy } from "../content/copy";
import { trackCTAClick } from "../lib/analytics";
import { Logo } from "./Header/Logo";
import { DesktopNav } from "./Header/DesktopNav";
import { MobileNav } from "./Header/MobileNav";
import { ShimmerCTA } from "./Header/ShimmerCTA";

// Code splitting: Lazy load non-critical header components
// Preload components on mouse enter for zero-delay interaction
const LanguageToggle = dynamic(() => import("./LanguageToggle"), {
  ssr: false,
  loading: () => (
    <div 
      className="flex h-[44px] min-w-[80px] items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]"
      aria-label="Loading language selector"
    >
      <div className="h-4 w-12 animate-pulse rounded bg-[var(--text-tertiary)]/20" />
    </div>
  ),
});

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
  loading: () => (
    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]">
      <div className="h-5 w-5 animate-pulse rounded bg-[var(--text-tertiary)]/20" />
    </div>
  ),
});

// Preload components on hover - ensures zero-delay interaction
function usePreloadOnHover() {
  const preloadLanguageToggle = () => {
    // Preload the component chunk
    import("./LanguageToggle");
  };

  const preloadThemeToggle = () => {
    // Preload the component chunk
    import("./ThemeToggle");
  };

  return { preloadLanguageToggle, preloadThemeToggle };
}

// Core navigation items - prioritized for conversion paths
const links = [
  { href: "/", key: "home" },
  { href: "/products", key: "products", hasDropdown: true },
  { href: "/services", key: "services" },
  { href: "/cases", key: "cases" },
  { href: "/about", key: "about" },
];

// Wrapper component for toggle buttons with preload on hover
function ToggleWrapper() {
  const { preloadLanguageToggle, preloadThemeToggle } = usePreloadOnHover();

  return (
    <>
      <div
        onMouseEnter={preloadThemeToggle}
        className="flex items-center"
      >
        <ThemeToggle />
      </div>
      <div
        onMouseEnter={preloadLanguageToggle}
        className="flex items-center"
      >
        <LanguageToggle />
      </div>
    </>
);
}

export function Header() {
  const { lang } = useLanguage();
  const c = copy(lang);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for sticky header
  // Only check scroll position after mount to prevent hydration mismatch
  useEffect(() => {
    // Check initial scroll position after mount (using requestAnimationFrame to avoid synchronous setState)
    const checkInitialScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Use requestAnimationFrame to defer state update and avoid cascading renders
    requestAnimationFrame(checkInitialScroll);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use ref to update data attribute directly on DOM, avoiding className changes that cause hydration mismatch
  const headerRef = useRef<HTMLElement>(null);

  // Update data-scrolled attribute after mount to prevent hydration mismatch
  // This ensures SSR and client hydration have identical className strings
  useEffect(() => {
    if (headerRef.current) {
      if (isScrolled) {
        headerRef.current.setAttribute("data-scrolled", "true");
      } else {
        headerRef.current.removeAttribute("data-scrolled");
      }
    }
  }, [isScrolled]);

  // Always return the same className for SSR and initial client render
  // Style changes are handled via data-scrolled attribute and CSS
  // No dynamic className based on isScrolled to prevent hydration mismatch
  const headerClassName =
    "sticky top-0 z-[var(--z-sticky)] bg-white/70 dark:bg-[#0c1014]/70 backdrop-blur-md border-b border-white/10 dark:border-white/5 transition-all duration-300 relative header-modern";

  return (
    <header 
      ref={headerRef} 
      className={headerClassName}
    >
      <div className="header-content-wrapper">
        {/* Main Header Layout - flex justify-between items-center */}
        <div className="flex items-center justify-between w-full">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Logo />
              </div>
              
          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-center">
            <DesktopNav links={links} />
            </div>
            
          {/* Right: LanguageToggle, ThemeToggle, CTA Button */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <ToggleWrapper />
            {/* Shimmer CTA Button - Prominent with shimmer effect */}
            <div className="hidden lg:block">
              <ShimmerCTA className="lg:inline-flex" />
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] min-h-[44px] min-w-[44px] touch-manipulation"
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
        <MobileNav
          links={links}
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
}
