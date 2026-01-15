"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLanguage } from "../language";
import { copy } from "../../content/copy";
import { useCategoryData } from "../../hooks/useCategoryData";
import { MegaMenu } from "./MegaMenu";

interface ProductDropdownProps {
  isProductsPage: boolean;
}

export function ProductDropdown({ isProductsPage }: ProductDropdownProps) {
  const { lang } = useLanguage();
  const c = copy(lang);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [pointerEventsEnabled, setPointerEventsEnabled] = useState(false);
  const productsDropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentMainCategory = searchParams.get("mainCategory") || null;
  const currentSubCategory = searchParams.get("subCategory") || null;
  const currentCategory = searchParams.get("category") || null; // Legacy support

  // Only compute category structure when dropdown is open or on products page
  const categoryStructure = useCategoryData(
    productsDropdownOpen || isProductsPage
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        productsDropdownRef.current &&
        !productsDropdownRef.current.contains(event.target as Node)
      ) {
        setProductsDropdownOpen(false);
        setPointerEventsEnabled(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enhanced hover buffer: prevent menu flickering when mouse quickly passes over
  const handleMouseEnter = () => {
    // Clear any pending leave timeout
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }

    // Small delay before enabling pointer events to prevent flickering
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(true);
      // Enable pointer events after animation delay
      setTimeout(() => {
        setPointerEventsEnabled(true);
      }, 150);
    }, 150);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    // Check if mouse is moving to mega menu
    const relatedTarget = e.relatedTarget as Node | null;
    if (
      relatedTarget &&
      productsDropdownRef.current &&
      productsDropdownRef.current.contains(relatedTarget)
    ) {
      // Mouse is moving to mega menu, don't close
      return;
    }

    // Clear any pending enter timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Delay closing to allow mouse to move to mega menu
    leaveTimeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
      setPointerEventsEnabled(false);
    }, 300);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  const navText = c.nav.products;
  if (!navText) return null;

  const isProductsActive = isProductsPage;

  return (
    <div
      className="relative mega-menu-trigger"
      ref={productsDropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={(e) => handleMouseLeave(e)}
    >
      <Link
        href="/products"
        prefetch={true}
        className={`relative inline-flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide transition-colors whitespace-nowrap group ${
          isProductsActive
            ? "text-[var(--text-primary)]"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        }`}
      >
        <span className="relative z-10">{navText}</span>
        <svg
          className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 relative z-10 ${
            productsDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        {/* Active Line - Bottom slider animation */}
        <span
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent-primary)] rounded-full transition-all duration-300 ease-out ${
            isProductsActive
              ? "opacity-100 scale-x-100"
              : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
          }`}
          style={{
            transformOrigin: "center",
          }}
        />
      </Link>
      {/* Mega Menu */}
      <MegaMenu
        categoryStructure={categoryStructure}
        isOpen={productsDropdownOpen}
        pointerEventsEnabled={pointerEventsEnabled}
        onClose={() => {
          setProductsDropdownOpen(false);
          setPointerEventsEnabled(false);
        }}
        currentMainCategory={currentMainCategory}
        isProductsPage={isProductsPage}
        lang={lang}
      />
    </div>
  );
}

