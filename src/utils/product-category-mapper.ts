import type { ProductMultilingual } from "../content/products_multilingual";
import type { MainCategory } from "../content/product-categories";
import { productCategories } from "../content/product-categories";

/**
 * Automatically map products to main categories and sub categories
 * based on product name, category, and other characteristics
 */
export function inferProductCategory(product: ProductMultilingual): {
  mainCategory: MainCategory;
  subCategory: string;
} {
  const nameEn = product.name.en.toLowerCase();
  const nameZh = product.name.zh.toLowerCase();
  const categoryEn = product.category.en.toLowerCase();
  const categoryZh = product.category.zh.toLowerCase();
  
  // Combine all text for matching
  const combinedText = `${nameEn} ${nameZh} ${categoryEn} ${categoryZh}`.toLowerCase();

  // Bumper Cars
  if (
    combinedText.includes("bumper") ||
    combinedText.includes("碰碰") ||
    combinedText.includes("collision") ||
    combinedText.includes("drift")
  ) {
    if (combinedText.includes("racing") || combinedText.includes("racing") || combinedText.includes("go-kart") || combinedText.includes("卡丁")) {
      return { mainCategory: "Bumper Cars", subCategory: "racing-car" };
    }
    return { mainCategory: "Bumper Cars", subCategory: "bumper-car" };
  }

  // Train Rides
  if (
    combinedText.includes("train") ||
    combinedText.includes("火车") ||
    combinedText.includes("railway")
  ) {
    if (combinedText.includes("kiddie") || combinedText.includes("mini") || combinedText.includes("儿童") || combinedText.includes("小")) {
      return { mainCategory: "Kiddie Rides", subCategory: "kiddie-train" };
    }
    return { mainCategory: "Family Rides", subCategory: "train" };
  }

  // Carousel
  if (
    combinedText.includes("carousel") ||
    combinedText.includes("旋转木马") ||
    combinedText.includes("转马") ||
    combinedText.includes("merry-go-round")
  ) {
    if (combinedText.includes("kiddie") || combinedText.includes("儿童")) {
      return { mainCategory: "Kiddie Rides", subCategory: "kiddie-carousel" };
    }
    return { mainCategory: "Family Rides", subCategory: "carousel" };
  }

  // Trampoline
  if (
    combinedText.includes("trampoline") ||
    combinedText.includes("蹦床") ||
    combinedText.includes("jumping") ||
    combinedText.includes("jump")
  ) {
    return { mainCategory: "Family Rides", subCategory: "trampoline" };
  }

  // Ferris Wheel
  if (
    combinedText.includes("ferris") ||
    combinedText.includes("wheel") ||
    combinedText.includes("摩天轮") ||
    combinedText.includes("观景轮")
  ) {
    return { mainCategory: "Family Rides", subCategory: "ferris-wheel" };
  }

  // Swing Rides
  if (
    combinedText.includes("swing") ||
    combinedText.includes("秋千") ||
    combinedText.includes("pendulum")
  ) {
    return { mainCategory: "Family Rides", subCategory: "swing" };
  }

  // Water Rides
  if (
    combinedText.includes("water") ||
    combinedText.includes("水上") ||
    combinedText.includes("aqua") ||
    combinedText.includes("漂流") ||
    combinedText.includes("rafting")
  ) {
    if (combinedText.includes("slide") || combinedText.includes("滑梯")) {
      return { mainCategory: "Water Rides", subCategory: "water-slide" };
    }
    return { mainCategory: "Water Rides", subCategory: "water-play" };
  }

  // Thrill Rides
  if (
    combinedText.includes("thrill") ||
    combinedText.includes("刺激") ||
    combinedText.includes("drop") ||
    combinedText.includes("tower") ||
    combinedText.includes("coaster") ||
    combinedText.includes("过山车") ||
    combinedText.includes("跳楼")
  ) {
    if (combinedText.includes("drop") || combinedText.includes("tower") || combinedText.includes("跳楼")) {
      return { mainCategory: "Thrill Rides", subCategory: "drop-tower" };
    }
    if (combinedText.includes("coaster") || combinedText.includes("过山车")) {
      return { mainCategory: "Thrill Rides", subCategory: "roller-coaster" };
    }
    if (combinedText.includes("spinning") || combinedText.includes("旋转")) {
      return { mainCategory: "Thrill Rides", subCategory: "spinning" };
    }
    return { mainCategory: "Thrill Rides", subCategory: "spinning" };
  }

  // Kiddie Rides
  if (
    combinedText.includes("kiddie") ||
    combinedText.includes("儿童") ||
    combinedText.includes("kids") ||
    combinedText.includes("mini") ||
    (parseInt(product.riders) <= 2 && product.targetAudience === "Kids")
  ) {
    if (combinedText.includes("car") || combinedText.includes("vehicle") || combinedText.includes("车")) {
      return { mainCategory: "Kiddie Rides", subCategory: "kiddie-vehicle" };
    }
    if (combinedText.includes("train") || combinedText.includes("火车")) {
      return { mainCategory: "Kiddie Rides", subCategory: "kiddie-train" };
    }
    if (combinedText.includes("carousel") || combinedText.includes("旋转木马")) {
      return { mainCategory: "Kiddie Rides", subCategory: "kiddie-carousel" };
    }
    return { mainCategory: "Kiddie Rides", subCategory: "kiddie-vehicle" };
  }

  // VR/Interactive
  if (
    combinedText.includes("vr") ||
    combinedText.includes("virtual") ||
    combinedText.includes("interactive") ||
    combinedText.includes("互动") ||
    combinedText.includes("游戏")
  ) {
    if (combinedText.includes("vr") || combinedText.includes("virtual")) {
      return { mainCategory: "VR/Interactive", subCategory: "vr-experience" };
    }
    return { mainCategory: "VR/Interactive", subCategory: "interactive-games" };
  }

  // Default: Family Rides - Other
  // Most products are family rides, so default to that
  return { mainCategory: "Family Rides", subCategory: "other-family" };
}

/**
 * Apply category mapping to a product
 */
export function applyCategoryMapping(product: ProductMultilingual): ProductMultilingual {
  // Only apply if not already set
  if (product.mainCategory && product.subCategory) {
    return product;
  }

  const { mainCategory, subCategory } = inferProductCategory(product);
  return {
    ...product,
    mainCategory,
    subCategory,
  };
}

/**
 * Get product count by category
 */
export function getProductCountByCategory(
  products: ProductMultilingual[],
  mainCategory?: MainCategory,
  subCategory?: string
): number {
  return products.filter((p) => {
    if (mainCategory && p.mainCategory !== mainCategory) return false;
    if (subCategory && p.subCategory !== subCategory) return false;
    return true;
  }).length;
}









