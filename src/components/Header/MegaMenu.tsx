"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../language";
import { getProducts } from "../../content/copy";
import { categoryIcons, DefaultCategoryIcon } from "./categoryIcons";
import type { MainCategory } from "../../content/product-categories";
import type { CategoryStructureItem } from "../../hooks/useCategoryData";

interface MegaMenuProps {
  categoryStructure: CategoryStructureItem[];
  isOpen: boolean;
  pointerEventsEnabled: boolean;
  onClose: () => void;
  currentMainCategory: string | null;
  isProductsPage: boolean;
  lang: string;
}

// Helper to get localized category name
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

// Helper to get category description
function getCategoryDescription(mainCategory: MainCategory, lang: string): string {
  if (lang === "zh") {
    const descMap: Record<MainCategory, string> = {
      "Family Rides": "适合全年龄段的家庭娱乐设备",
      "Thrill Rides": "刺激惊险的高端游乐设备",
      "Kiddie Rides": "专为儿童设计的安全游乐设备",
      "Water Rides": "水上主题娱乐设备",
      "Bumper Cars": "经典碰撞娱乐设备",
      "VR/Interactive": "虚拟现实和互动体验设备",
      "Custom Solutions": "个性化定制解决方案",
    };
    return descMap[mainCategory] || "";
  } else {
    const descMap: Record<MainCategory, string> = {
      "Family Rides": "Family-friendly entertainment rides for all ages",
      "Thrill Rides": "High-intensity thrill rides for adventure seekers",
      "Kiddie Rides": "Safe and fun rides designed for children",
      "Water Rides": "Water-themed entertainment attractions",
      "Bumper Cars": "Classic collision entertainment rides",
      "VR/Interactive": "Virtual reality and interactive experience equipment",
      "Custom Solutions": "Personalized custom solutions",
    };
    return descMap[mainCategory] || "";
  }
}

export function MegaMenu({
  categoryStructure,
  isOpen,
  pointerEventsEnabled,
  onClose,
  currentMainCategory,
  isProductsPage,
  lang,
}: MegaMenuProps) {
  const products = getProducts(lang as any);

  if (!isOpen) return null;

  return (
    <div
      className={`mega-menu-container ${
        pointerEventsEnabled ? "mega-menu-visible" : "mega-menu-hidden"
      }`}
      style={{
        pointerEvents: pointerEventsEnabled ? "auto" : "none",
        zIndex: "var(--z-dropdown)",
      }}
      onMouseEnter={(e) => {
        // Keep menu open when mouse enters mega menu
        // This prevents the menu from closing when moving from trigger to menu
        e.stopPropagation();
      }}
      onMouseLeave={(e) => {
        // Allow parent to handle closing when mouse truly leaves
        // The parent's handleMouseLeave will check if mouse is still in menu area
        e.stopPropagation();
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mega-menu-content">
        {/* Left Side: Category Icons + Descriptions */}
        <div className="mega-menu-left">
          <div className="space-y-1">
            {categoryStructure.map(({ mainCategory, count }) => {
              const MainCategoryIcon =
                categoryIcons[mainCategory] || DefaultCategoryIcon;
              const mainCategoryName = getLocalizedCategoryName(
                mainCategory,
                lang
              );
              const description = getCategoryDescription(mainCategory, lang);
              const isActive =
                currentMainCategory === mainCategory && isProductsPage;

              return (
                <Link
                  key={mainCategory}
                  href={`/products?mainCategory=${encodeURIComponent(mainCategory)}`}
                  prefetch={true}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                      className={`mega-menu-category-link group ${
                        isActive ? "mega-menu-category-active" : ""
                      }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]"
                          : "bg-[var(--surface)] text-[var(--text-secondary)] group-hover:bg-[var(--surface-hover)] group-hover:text-[var(--accent-primary)]"
                      }`}
                    >
                      <MainCategoryIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {mainCategoryName}
                        </span>
                        <span className="text-xs font-normal text-[var(--text-tertiary)]">
                          ({count})
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                        {description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View All Products Link */}
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <Link
              href="/products"
              prefetch={true}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="flex items-center gap-2 text-sm font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] transition-colors group"
            >
              <span>
                {lang === "zh" ? "查看所有产品" : "View All Products"}
              </span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
            </Link>
          </div>
        </div>

        {/* Right Side: Product Grid */}
        <div className="mega-menu-right">
          <div className="mega-menu-products-grid">
            {categoryStructure.map(({ mainCategory, subCategories }) => {
              // Get top 4 products from this category for display
              const categoryProducts = products
                .filter((p) => p.mainCategory === mainCategory)
                .slice(0, 4);

              if (categoryProducts.length === 0) return null;

              const mainCategoryName = getLocalizedCategoryName(
                mainCategory,
                lang
              );

              return (
                <div key={mainCategory} className="mega-menu-product-section">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                    {mainCategoryName}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {categoryProducts.map((product, idx) => (
                      <Link
                        key={`${product.name}-${idx}`}
                        href={`/products?mainCategory=${encodeURIComponent(mainCategory)}`}
                        prefetch={true}
                        onClick={(e) => {
                          e.stopPropagation();
                          onClose();
                        }}
                        className="mega-menu-product-card group"
                      >
                        <div className="relative aspect-square rounded-lg overflow-hidden bg-[var(--surface)] mb-2">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 768px) 50vw, 150px"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-[var(--surface-elevated)]">
                              <svg
                                className="h-8 w-8 text-[var(--text-tertiary)]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-xs font-medium text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
                          {product.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

