import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { getMainCategories, getSubCategories, type MainCategory } from "../content/product-categories";
import { getProductCountByCategory } from "../utils/product-category-mapper";
import { productsMultilingual } from "../content/products_multilingual";

export interface CategoryStructureItem {
  mainCategory: MainCategory;
  subCategories: Array<{
    id: string;
    name: { en: string; zh: string; [key: string]: string };
    count: number;
  }>;
  count: number;
}

/**
 * Hook to compute category structure with product counts
 * Only computes when needed (dropdown open or on products page)
 */
export function useCategoryData(
  shouldCompute: boolean
): CategoryStructureItem[] {
  return useMemo(() => {
    if (!shouldCompute) {
      return [];
    }

    const mainCategories = getMainCategories();
    return mainCategories
      .map((mainCat) => {
        const subCategories = getSubCategories(mainCat);
        const subCategoriesWithCounts = subCategories
          .map((subCat) => {
            const count = getProductCountByCategory(
              productsMultilingual,
              mainCat,
              subCat.id
            );
            return { ...subCat, count };
          })
          .filter((subCat) => subCat.count > 0); // Only show subcategories with products

        const mainCategoryCount = getProductCountByCategory(
          productsMultilingual,
          mainCat
        );

        return {
          mainCategory: mainCat,
          subCategories: subCategoriesWithCounts,
          count: mainCategoryCount,
        };
      })
      .filter((cat) => cat.count > 0); // Only show main categories with products
  }, [shouldCompute]);
}

