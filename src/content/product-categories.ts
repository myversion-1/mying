import type { Lang } from "../components/language";

export type MainCategory = 
  | "Family Rides"
  | "Thrill Rides"
  | "Kiddie Rides"
  | "Water Rides"
  | "Bumper Cars"
  | "VR/Interactive"
  | "Custom Solutions";

export type SubCategory = {
  id: string;
  name: Record<Lang, string>;
  icon?: string;
  description?: Record<Lang, string>;
};

export const productCategories: Record<MainCategory, SubCategory[]> = {
  "Family Rides": [
    { 
      id: "carousel", 
      name: { en: "Carousel Rides", zh: "旋转木马" },
      description: { en: "Classic rotating rides perfect for all ages", zh: "适合全年龄的经典旋转设备" }
    },
    { 
      id: "swing", 
      name: { en: "Swing Rides", zh: "秋千设备" },
      description: { en: "Gentle swinging motion for family entertainment", zh: "温和的摆动运动，适合家庭娱乐" }
    },
    { 
      id: "train", 
      name: { en: "Train Rides", zh: "小火车" },
      description: { en: "Miniature train rides for themed experiences", zh: "主题体验的迷你火车" }
    },
    { 
      id: "ferris-wheel", 
      name: { en: "Ferris Wheels", zh: "摩天轮" },
      description: { en: "Iconic observation wheels", zh: "标志性观景轮" }
    },
    { 
      id: "trampoline", 
      name: { en: "Trampoline", zh: "蹦床" },
      description: { en: "Active play and jumping fun", zh: "活跃游戏和跳跃乐趣" }
    },
    { 
      id: "other-family", 
      name: { en: "Other Family Rides", zh: "其他家庭设备" },
      description: { en: "Additional family-friendly attractions", zh: "其他家庭友好型设备" }
    },
  ],
  "Thrill Rides": [
    { 
      id: "drop-tower", 
      name: { en: "Drop Towers", zh: "跳楼机" },
      description: { en: "High-speed vertical drop experiences", zh: "高速垂直下降体验" }
    },
    { 
      id: "roller-coaster", 
      name: { en: "Roller Coasters", zh: "过山车" },
      description: { en: "High-speed coaster experiences", zh: "高速过山车体验" }
    },
    { 
      id: "spinning", 
      name: { en: "Spinning Rides", zh: "旋转设备" },
      description: { en: "Dynamic spinning and rotating attractions", zh: "动感旋转设备" }
    },
  ],
  "Kiddie Rides": [
    { 
      id: "kiddie-carousel", 
      name: { en: "Kiddie Carousel", zh: "儿童旋转木马" },
      description: { en: "Small-scale carousels for young children", zh: "适合幼儿的小型旋转木马" }
    },
    { 
      id: "kiddie-train", 
      name: { en: "Kiddie Train", zh: "儿童小火车" },
      description: { en: "Miniature trains designed for kids", zh: "专为儿童设计的迷你火车" }
    },
    { 
      id: "kiddie-vehicle", 
      name: { en: "Kiddie Vehicles", zh: "儿童车辆" },
      description: { en: "Small vehicles and cars for children", zh: "适合儿童的车辆设备" }
    },
  ],
  "Water Rides": [
    { 
      id: "water-slide", 
      name: { en: "Water Slides", zh: "水滑梯" },
      description: { en: "Water-based sliding attractions", zh: "水上滑行设备" }
    },
    { 
      id: "water-play", 
      name: { en: "Water Play Equipment", zh: "水上设备" },
      description: { en: "Interactive water play features", zh: "互动水上设备" }
    },
  ],
  "Bumper Cars": [
    { 
      id: "bumper-car", 
      name: { en: "Bumper Cars", zh: "碰碰车" },
      description: { en: "Classic bumper car attractions", zh: "经典碰碰车设备" }
    },
    { 
      id: "racing-car", 
      name: { en: "Racing Cars", zh: "赛车" },
      description: { en: "Racing and go-kart experiences", zh: "赛车和卡丁车体验" }
    },
  ],
  "VR/Interactive": [
    { 
      id: "vr-experience", 
      name: { en: "VR Experiences", zh: "VR体验" },
      description: { en: "Virtual reality attractions", zh: "虚拟现实设备" }
    },
    { 
      id: "interactive-games", 
      name: { en: "Interactive Games", zh: "互动游戏" },
      description: { en: "Interactive gaming attractions", zh: "互动游戏设备" }
    },
  ],
  "Custom Solutions": [
    { 
      id: "custom-design", 
      name: { en: "Custom Design", zh: "定制设计" },
      description: { en: "Bespoke ride designs for unique requirements", zh: "满足独特需求的定制设备设计" }
    },
    { 
      id: "themed-attractions", 
      name: { en: "Themed Attractions", zh: "主题设备" },
      description: { en: "Themed rides matching your brand or concept", zh: "匹配您品牌或概念的主题设备" }
    },
  ],
};

// Helper function to get localized category name
export function getLocalizedCategoryName(
  mainCategory: MainCategory,
  subCategoryId: string,
  lang: Lang
): string {
  const subCategories = productCategories[mainCategory];
  const subCategory = subCategories.find((sc) => sc.id === subCategoryId);
  if (!subCategory) return mainCategory;
  
  const isZh = lang === "zh";
  return subCategory.name[isZh ? "zh" : "en"] || subCategory.name["en"];
}

// Helper function to get all main categories
export function getMainCategories(): MainCategory[] {
  return Object.keys(productCategories) as MainCategory[];
}

// Helper function to get sub categories for a main category
export function getSubCategories(mainCategory: MainCategory): SubCategory[] {
  return productCategories[mainCategory] || [];
}

// Helper function to find main category by sub category id
export function findMainCategoryBySubCategory(subCategoryId: string): MainCategory | null {
  for (const [mainCategory, subCategories] of Object.entries(productCategories)) {
    if (subCategories.some((sc) => sc.id === subCategoryId)) {
      return mainCategory as MainCategory;
    }
  }
  return null;
}




