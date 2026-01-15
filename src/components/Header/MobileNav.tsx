"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLanguage } from "../language";
import { copy } from "../../content/copy";
import { useCategoryData } from "../../hooks/useCategoryData";
import { productsMultilingual } from "../../content/products_multilingual";
import { categoryIcons, DefaultCategoryIcon } from "./categoryIcons";
import { trackCTAClick } from "../../lib/analytics";
import type { MainCategory } from "../../content/product-categories";

interface MobileNavProps {
  links: Array<{ href: string; key: string; hasDropdown?: boolean }>;
  isOpen: boolean;
  onClose: () => void;
}

// Helper function to get localized category name
function getLocalizedCategoryName(mainCategory: MainCategory, lang: string): string {
  if (lang === "zh") {
    const nameMap: Record<MainCategory, string> = {
      "Family Rides": "家庭游乐设备",
      "Thrill Rides": "刺激游乐设备",
      "Kiddie Rides": "儿童游乐设备",
      "Water Rides": "水上设备",
      "Bumper Cars": "碰碰车",
      "VR/Interactive": "VR/互动设备",
      "Custom Solutions": "定制解决方案",
    };
    return nameMap[mainCategory] || mainCategory;
  }
  return mainCategory;
}

export function MobileNav({ links, isOpen, onClose }: MobileNavProps) {
  const { lang } = useLanguage();
  const c = copy(lang);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSubCategoryOpen, setMobileSubCategoryOpen] = useState<
    string | null
  >(null);

  const isProductsPage = pathname === "/products";
  const currentMainCategory = searchParams.get("mainCategory") || null;
  const currentSubCategory = searchParams.get("subCategory") || null;
  const currentCategory = searchParams.get("category") || null; // Legacy support
  const totalProductCount = productsMultilingual.length;

  // Only compute category structure when mobile products menu is open or on products page
  const categoryStructure = useCategoryData(mobileProductsOpen || isProductsPage);

  if (!isOpen) return null;

  return (
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
                  className="flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] min-h-[44px] touch-manipulation"
                >
                  <span>{navText}</span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${
                      mobileProductsOpen ? "rotate-180" : ""
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
                </button>
                {mobileProductsOpen && (
                  <div className="ml-4 flex flex-col gap-1 border-l-2 border-[var(--border)] pl-4">
                    {/* All Products Link */}
                    <Link
                      href="/products"
                      onClick={() => {
                        onClose();
                        setMobileProductsOpen(false);
                      }}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors min-h-[44px] touch-manipulation ${
                        isProductsPage &&
                        !currentMainCategory &&
                        !currentCategory
                          ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20"
                          : "text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      }`}
                    >
                      <svg
                        className="h-4 w-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                      <span>{lang === "zh" ? "所有产品" : "All Products"}</span>
                      <span className="ml-auto text-xs font-normal text-[var(--text-tertiary)]">
                        {totalProductCount}
                      </span>
                    </Link>

                    {/* Multi-level Category Structure */}
                    {categoryStructure.map(
                      ({ mainCategory, subCategories, count }) => {
                        const isMainCategoryActive =
                          currentMainCategory === mainCategory &&
                          isProductsPage &&
                          !currentSubCategory;
                        const MainCategoryIcon =
                          categoryIcons[mainCategory] || DefaultCategoryIcon;
                        const mainCategoryName = getLocalizedCategoryName(
                          mainCategory,
                          lang
                        );

                        return (
                          <div key={mainCategory} className="flex flex-col gap-1">
                            {/* Main Category Button/Link */}
                            {subCategories.length > 0 ? (
                              <button
                                onClick={() =>
                                  setMobileSubCategoryOpen(
                                    mobileSubCategoryOpen === mainCategory
                                      ? null
                                      : mainCategory
                                  )
                                }
                                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors min-h-[44px] touch-manipulation ${
                                  isMainCategoryActive
                                    ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20"
                                    : "text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                                }`}
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  <MainCategoryIcon className="h-4 w-4 flex-shrink-0" />
                                  <span className="flex-1 truncate">
                                    {mainCategoryName}
                                  </span>
                                  <span
                                    className={`text-xs font-normal ${
                                      isMainCategoryActive
                                        ? "text-[var(--accent-primary)]/70"
                                        : "text-[var(--text-tertiary)]"
                                    }`}
                                  >
                                    {count}
                                  </span>
                                </div>
                                <svg
                                  className={`h-4 w-4 transition-transform duration-200 flex-shrink-0 ${
                                    mobileSubCategoryOpen === mainCategory
                                      ? "rotate-180"
                                      : ""
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
                              </button>
                            ) : (
                              <Link
                                href={`/products?mainCategory=${encodeURIComponent(mainCategory)}`}
                                onClick={() => {
                                  onClose();
                                  setMobileProductsOpen(false);
                                }}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors min-h-[44px] touch-manipulation ${
                                  isMainCategoryActive
                                    ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20"
                                    : "text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                                }`}
                              >
                                <MainCategoryIcon className="h-4 w-4 flex-shrink-0" />
                                <span className="flex-1 truncate">
                                  {mainCategoryName}
                                </span>
                                <span
                                  className={`text-xs font-normal ${
                                    isMainCategoryActive
                                      ? "text-[var(--accent-primary)]/70"
                                      : "text-[var(--text-tertiary)]"
                                  }`}
                                >
                                  {count}
                                </span>
                              </Link>
                            )}

                            {/* Sub Categories */}
                            {subCategories.length > 0 &&
                              mobileSubCategoryOpen === mainCategory && (
                                <div className="ml-6 flex flex-col gap-0.5 border-l-2 border-[var(--border)] pl-3">
                                  {subCategories.map((subCat) => {
                                    const isSubCategoryActive =
                                      currentMainCategory === mainCategory &&
                                      currentSubCategory === subCat.id &&
                                      isProductsPage;
                                    const subCategoryName =
                                      subCat.name[lang === "zh" ? "zh" : "en"] ||
                                      subCat.name["en"];

                                    return (
                                      <Link
                                        key={subCat.id}
                                        href={`/products?mainCategory=${encodeURIComponent(mainCategory)}&subCategory=${encodeURIComponent(subCat.id)}`}
                                        onClick={() => {
                                          onClose();
                                          setMobileProductsOpen(false);
                                          setMobileSubCategoryOpen(null);
                                        }}
                                        className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs transition-colors min-h-[44px] touch-manipulation ${
                                          isSubCategoryActive
                                            ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-medium"
                                            : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                                        }`}
                                      >
                                        <span className="flex-1 truncate">
                                          {subCategoryName}
                                        </span>
                                        <span
                                          className={`text-xs font-normal ${
                                            isSubCategoryActive
                                              ? "text-[var(--accent-primary)]/70"
                                              : "text-[var(--text-tertiary)]"
                                          }`}
                                        >
                                          {subCat.count}
                                        </span>
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            );
          }

          // Regular navigation links
          return (
            <Link
              key={link.key}
              href={link.href}
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
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
                ctaText:
                  c.cta.requestQuote ||
                  (lang === "zh" ? "获取报价" : "Get Quote"),
                ctaLocation: "header_mobile",
                destination: "/quote",
                page: pathname,
              });
              onClose();
            }}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-[var(--action-primary)] px-4 py-3 text-sm font-bold text-center text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span>
              {c.cta.requestQuote || (lang === "zh" ? "获取报价" : "Get Quote")}
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

