"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { getProducts, type Product, copy } from "../content/copy";
import { useLanguage } from "./language";
import { EmptyState } from "./EmptyState";
import { ProductCard } from "./ProductCard";
import { SmartSelector } from "./SmartSelector";
import { SearchInput } from "./ui/SearchInput";
import { FilterButton } from "./ui/FilterButton";
import { Select } from "./ui/Select";
import type { ProductUsage, VenueType, TargetAudience } from "../content/products_multilingual";
import { debounce, onIdle } from "../utils/main-thread-optimization";
import { useIsMobile } from "../utils/device-detection";

type Props = {
  items?: Product[];
  initialSearchQuery?: string;
  initialCategoryFilter?: string; // Legacy support
  initialMainCategoryFilter?: string;
  initialSubCategoryFilter?: string;
};

// Define which categories are "rides" vs "decorative"
const RIDE_CATEGORIES = [
  "Roller Coasters",
  "Ferris Wheels",
  "Carousels",
  "Drop Towers",
  "Water Rides",
  "Family Rides",
  "Thrill Rides",
  "Kiddie Rides",
];

export function ProductGrid({ 
  items, 
  initialSearchQuery = "", 
  initialCategoryFilter = "",
  initialMainCategoryFilter = "",
  initialSubCategoryFilter = ""
}: Props) {
  const { lang } = useLanguage();
  const c = copy(lang);
  const isRTL = lang === "ar";
  const isMobile = useIsMobile();

  // Get products - use provided items or fetch all
  const allProducts = items || getProducts(lang);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(initialSearchQuery);
  
  // Debounce search input to reduce TBT (Total Blocking Time)
  // This prevents filtering on every keystroke, reducing main thread blocking
  const debouncedSetSearch = useRef(
    debounce((value: string) => {
      setDebouncedSearchQuery(value);
    }, 300) // Wait 300ms after user stops typing
  ).current;

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value); // Update UI immediately for better UX
    debouncedSetSearch(value); // Debounce the actual filtering
  }, [debouncedSetSearch]);

  const [filter, setFilter] = useState<"all" | "rides" | "decorative" | string>(
    initialCategoryFilter || "all"
  );
  const [mainCategoryFilter, setMainCategoryFilter] = useState<string>(initialMainCategoryFilter || "");
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>(initialSubCategoryFilter || "");
  
  // Initialize filters from URL parameters
  useEffect(() => {
    if (initialCategoryFilter) {
      setFilter(initialCategoryFilter);
    }
    if (initialMainCategoryFilter) {
      setMainCategoryFilter(initialMainCategoryFilter);
    }
    if (initialSubCategoryFilter) {
      setSubCategoryFilter(initialSubCategoryFilter);
    }
  }, [initialCategoryFilter, initialMainCategoryFilter, initialSubCategoryFilter]);
  const [multiFilter, setMultiFilter] = useState<{
    usage?: ProductUsage;
    venueType?: VenueType;
    targetAudience?: TargetAudience;
  }>({});
  const [spaceFilteredProducts, setSpaceFilteredProducts] = useState<Product[] | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(allProducts.map((p) => p.category)));

  // Filter products based on search and filters
  // Use useMemo with optimized filtering logic
  const filteredProducts = useMemo(() => {
    // Start with space-filtered products if available, otherwise use all products
    let filtered = spaceFilteredProducts || allProducts;

    // Early return if no filters applied
    const hasSearchQuery = debouncedSearchQuery && debouncedSearchQuery.trim().length > 0;
    const hasCategoryFilter = mainCategoryFilter || (filter !== "all" && filter !== "");
    const hasMultiFilter = multiFilter.usage || multiFilter.venueType || multiFilter.targetAudience;
    
    if (!hasSearchQuery && !hasCategoryFilter && !hasMultiFilter) {
      return filtered;
    }

    // Text search - use debouncedSearchQuery to reduce filtering frequency
    // Optimize: cache lowercase query
    if (hasSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      const queryLength = query.length;
      
      // Use more efficient filtering for large arrays
      filtered = filtered.filter((p) => {
        // Early exit optimizations
        if (p.name.toLowerCase().includes(query)) return true;
        if (p.category.toLowerCase().includes(query)) return true;
        if (p.positioning?.toLowerCase().includes(query)) return true;
        if (p.idealFor?.some((scenario) => scenario.toLowerCase().includes(query))) return true;
        return false;
      });
    }

    // Multi-level category filter (priority: mainCategory + subCategory > legacy category)
    if (mainCategoryFilter) {
      filtered = filtered.filter((p) => p.mainCategory === mainCategoryFilter);
      if (subCategoryFilter) {
        filtered = filtered.filter((p) => p.subCategory === subCategoryFilter);
      }
    } else if (filter === "rides") {
      // Legacy filter support - use Set for O(1) lookup
      const rideCategoriesSet = new Set(RIDE_CATEGORIES);
      filtered = filtered.filter((p) => rideCategoriesSet.has(p.category));
    } else if (filter === "decorative") {
      // Legacy filter support - use Set for O(1) lookup
      const rideCategoriesSet = new Set(RIDE_CATEGORIES);
      filtered = filtered.filter((p) => !rideCategoriesSet.has(p.category));
    } else if (filter !== "all") {
      // Legacy category filter support
      filtered = filtered.filter((p) => p.category === filter);
    }

    // Multi-dimensional filters
    if (multiFilter.usage) {
      filtered = filtered.filter((p) => p.usage === multiFilter.usage);
    }
    if (multiFilter.venueType) {
      filtered = filtered.filter((p) => p.venueType === multiFilter.venueType);
    }
    if (multiFilter.targetAudience) {
      filtered = filtered.filter((p) => p.targetAudience === multiFilter.targetAudience);
    }

    return filtered;
  }, [allProducts, spaceFilteredProducts, debouncedSearchQuery, filter, mainCategoryFilter, subCategoryFilter, multiFilter]);

  // Usage types for filter
  const usageTypes: ProductUsage[] = [
    "Family Entertainment",
    "Thrill Adventure",
    "Water Attraction",
    "Kiddie Fun",
  ];

  // Venue types for filter
  const venueTypes: VenueType[] = [
    "Indoor",
    "Outdoor",
    "Both",
  ];

  // Target audience types for filter
  const audienceTypes: TargetAudience[] = ["Family", "Adults", "Kids"];

  // Progressive loading - reduce initial DOM size
  // Start with fewer items, load more as user scrolls
  const INITIAL_ITEMS = 6; // Reduced from 12 to 6 for better initial performance
  const ITEMS_PER_LOAD = 6; // Load 6 more items at a time
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);
  const [currentPage, setCurrentPage] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_ITEMS);
    setCurrentPage(1);
  }, [debouncedSearchQuery, filter, mainCategoryFilter, subCategoryFilter, multiFilter, spaceFilteredProducts]);

  // Intersection Observer for progressive loading
  useEffect(() => {
    if (!loadMoreRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && visibleCount < filteredProducts.length) {
          // Load more items during idle time to avoid blocking main thread
          onIdle(() => {
            setVisibleCount((prev) => Math.min(prev + ITEMS_PER_LOAD, filteredProducts.length));
          });
        }
      },
      { rootMargin: "200px" } // Start loading 200px before reaching the bottom
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [visibleCount, filteredProducts.length]);

  // Calculate visible products (progressive loading)
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  // Pagination for better UX (optional, can be removed if using infinite scroll)
  const totalPages = Math.ceil(filteredProducts.length / INITIAL_ITEMS);

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      {/* Smart Selector Tool */}
      <SmartSelector
        products={allProducts}
        onFilteredProductsChange={setSpaceFilteredProducts}
      />

      {/* Search Bar */}
      <SearchInput
        value={searchQuery}
        onChange={(value) => {
          setSearchQuery(value);
          debouncedSetSearch(value);
        }}
        placeholder={lang === "zh" ? "搜索产品..." : "Search products..."}
        isRTL={isRTL}
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {(["all", "rides", "decorative"] as const).map((filterOption) => {
          const label =
            filterOption === "all"
              ? lang === "zh" ? "全部" : "All"
              : filterOption === "rides"
              ? lang === "zh" ? "游乐设施" : "Rides"
              : lang === "zh" ? "装饰" : "Decorative";
          
          return (
            <FilterButton
              key={filterOption}
              label={label}
              isActive={filter === filterOption}
              onClick={() => setFilter(filterOption)}
            />
          );
        })}
        {filter !== "all" && (
          <FilterButton
            label={`${filter} ×`}
            isActive={false}
            onClick={() => setFilter("all")}
            className="text-xs"
          />
        )}
      </div>

      {/* Multi-dimensional Filters */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-4`}>
        <Select
          value={multiFilter.usage || ""}
          onChange={(value) => {
            setMultiFilter((prev) => ({
              ...prev,
              usage: value ? (value as ProductUsage) : undefined,
            }));
          }}
          options={usageTypes.map((usage) => ({
            value: usage,
            label: usage === "Family Entertainment" ? (lang === "zh" ? "家庭娱乐" : "Family Entertainment") :
                   usage === "Thrill Adventure" ? (lang === "zh" ? "刺激冒险" : "Thrill Adventure") :
                   usage === "Water Attraction" ? (lang === "zh" ? "水上项目" : "Water Attraction") :
                   usage === "Kiddie Fun" ? (lang === "zh" ? "儿童游乐" : "Kiddie Fun") : usage,
          }))}
          placeholder={lang === "zh" ? "全部类型" : "All Types"}
          label={lang === "zh" ? "用途" : "Usage"}
          className={isMobile ? "w-full" : "flex-1 min-w-[150px]"}
        />
        
        <Select
          value={multiFilter.venueType || ""}
          onChange={(value) => {
            setMultiFilter((prev) => ({
              ...prev,
              venueType: value ? (value as VenueType) : undefined,
            }));
          }}
          options={venueTypes.map((venue) => ({
            value: venue,
            label: venue === "Indoor" ? (lang === "zh" ? "室内" : "Indoor") :
                   venue === "Outdoor" ? (lang === "zh" ? "户外" : "Outdoor") :
                   venue === "Both" ? (lang === "zh" ? "室内外通用" : "Both") : venue,
          }))}
          placeholder={lang === "zh" ? "全部场地" : "All Venues"}
          label={lang === "zh" ? "场地" : "Venue"}
          className={isMobile ? "w-full" : "flex-1 min-w-[150px]"}
        />
        
        <Select
          value={multiFilter.targetAudience || ""}
          onChange={(value) => {
            setMultiFilter((prev) => ({
              ...prev,
              targetAudience: value ? (value as TargetAudience) : undefined,
            }));
          }}
          options={audienceTypes.map((audience) => ({
            value: audience,
            label: audience === "Adults" ? (lang === "zh" ? "成人" : "Adults") :
                   audience === "Kids" ? (lang === "zh" ? "儿童" : "Kids") :
                   audience === "Family" ? (lang === "zh" ? "家庭" : "Family") : audience,
          }))}
          placeholder={lang === "zh" ? "全部受众" : "All Audiences"}
          label={lang === "zh" ? "受众" : "Audience"}
          className={isMobile ? "w-full" : "flex-1 min-w-[150px]"}
        />
        
        {(multiFilter.usage || multiFilter.venueType || multiFilter.targetAudience) && (
          <FilterButton
            label={lang === "zh" ? "清除筛选" : "Clear Filters"}
            isActive={false}
            onClick={() => setMultiFilter({})}
            className={`${isRTL ? "mr-auto" : "ml-auto"} ${isMobile ? "w-full" : ""}`}
          />
        )}
      </div>

      {/* Category Dropdown for Specific Filtering */}
      {(filter === "rides" || filter === "decorative" || filter === "all") && (
        <Select
          value=""
          onChange={(value) => {
            if (value) {
              setFilter(value);
            }
          }}
          options={[
            ...(filter === "rides" || filter === "all"
              ? categories
                  .filter((cat) => RIDE_CATEGORIES.includes(cat))
                  .map((category) => ({
                    value: category,
                    label: `${category} (${allProducts.filter((p) => p.category === category).length})`,
                  }))
              : []),
            ...(filter === "decorative" || filter === "all"
              ? categories
                  .filter((cat) => !RIDE_CATEGORIES.includes(cat))
                  .map((category) => ({
                    value: category,
                    label: `${category} (${allProducts.filter((p) => p.category === category).length})`,
                  }))
              : []),
          ]}
          placeholder={lang === "zh" ? "选择分类..." : "Select a category..."}
          label={lang === "zh" ? "具体分类" : "Specific category"}
        />
      )}

      {/* Products Grid */}
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {visibleProducts.length > 0 ? (
          <>
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={`${product.name}-${index}`}
                product={product}
                lang={lang}
                index={index}
                isRTL={isRTL}
              />
            ))}
            {visibleCount < filteredProducts.length && (
              <div ref={loadMoreRef} className="col-span-full h-20 flex items-center justify-center">
                <div className="text-sm text-[var(--text-tertiary)]">
                  {lang === "zh" ? "加载更多..." : "Loading more..."}
                </div>
              </div>
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Results count - Always show */}
      {filteredProducts.length > 0 && (
        <div className="text-center text-sm text-[var(--text-tertiary)] pt-4">
          {lang === "zh" 
            ? `显示 ${visibleProducts.length} / 共 ${filteredProducts.length} 个产品`
            : `Showing ${visibleProducts.length} of ${filteredProducts.length} products`}
        </div>
      )}
    </div>
  );
}
