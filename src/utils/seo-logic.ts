import type { Lang } from "../components/language";

/**
 * SEO Logic Utility
 * 
 * 逻辑流程：
 * 1. 获取产品名称和类别关键词 [cite: 33, 46]
 * 2. 从规格参数（specs）中筛选出非空的前两项 [cite: 6, 25]
 * 3. 组合成自然的营销短语，并映射到 11 种语言 [cite: 1, 28]
 */

/**
 * Generate product meta description with technical specifications
 * Creates SEO-optimized descriptions in all supported languages
 * 
 * @param productName - Product name
 * @param category - Product category keyword
 * @param specs - Record of specification key-value pairs (e.g., { footprint: "12m", height: "5.9m", riders: "36" })
 * @param lang - Language code (en, zh, ar, ru, ja, ko, th, vi, id, hi, es)
 * @returns Localized meta description with technical specs
 * 
 * @example
 * ```typescript
 * const description = generateProductMetaDescription(
 *   "Nuclear energy crisis",
 *   "Family Ride",
 *   { footprint: "D12M*H5.9M", height: "5.9 m", riders: "36" },
 *   "en"
 * );
 * ```
 */
export function generateProductMetaDescription(
  productName: string, 
  category: string, 
  specs: Record<string, string>, 
  lang: Lang
): string {
  // 获取前两个有效规格
  const validSpecs = Object.entries(specs)
    .filter(([_, value]) => value && value.trim() !== "")
    .slice(0, 2)
    .map(([key, value]) => {
      // Map technical keys to user-friendly labels based on language
      const label = getSpecLabel(key, lang);
      return `${label}: ${value}`;
    });

  const specText = validSpecs.length > 0 ? ` (${validSpecs.join(", ")})` : "";
  
  // 根据语言返回模板
  const templates: Record<Lang, string> = {
    en: `Looking for ${productName}${specText}? We are a leading ${category} manufacturer providing high-quality amusement rides.`,
    zh: `寻找 ${productName}${specText}？我们是专业的 ${category} 制造商，提供高品质游乐设备。`,
    ar: `تبحث عن ${productName}${specText}؟ نحن مصنع رائد في مجال ${category} نقدم ألعاب ترفيهية عالية الجودة.`,
    ru: `Ищете ${productName}${specText}? Мы ведущий производитель ${category}, предоставляющий высококачественные аттракционы.`,
    ja: `${productName}${specText}をお探しですか？当社は高品質なアトラクションを提供する${category}の主要メーカーです。`,
    ko: `${productName}${specText}를 찾고 계신가요? 저희는 고품질 놀이기구를 제공하는 선도적인 ${category} 제조업체입니다.`,
    th: `กำลังมองหา ${productName}${specText}? เราเป็นผู้ผลิต ${category} ชั้นนำที่ให้บริการเครื่องเล่นคุณภาพสูง`,
    vi: `Đang tìm kiếm ${productName}${specText}? Chúng tôi là nhà sản xuất ${category} hàng đầu cung cấp các trò chơi giải trí chất lượng cao.`,
    id: `Mencari ${productName}${specText}? Kami adalah produsen ${category} terkemuka yang menyediakan wahana bermain berkualitas tinggi.`,
    hi: `${productName}${specText} की तलाश कर रहे हैं? हम ${category} के अग्रणी निर्माता हैं जो उच्च गुणवत्ता वाले मनोरंजन राइड प्रदान करते हैं।`,
    es: `¿Busca ${productName}${specText}? Somos un fabricante líder de ${category} que proporciona atracciones de alta calidad.`,
  };

  return templates[lang] || templates['en'];
}

/**
 * Get localized label for specification keys
 * 
 * @param key - Specification key (footprint, height, riders, year, etc.)
 * @param lang - Language code
 * @returns Localized label for the specification
 */
function getSpecLabel(key: string, lang: Lang): string {
  const labels: Record<string, Record<Lang, string>> = {
    footprint: {
      en: "Footprint",
      zh: "占地面积",
      ar: "المساحة",
      ru: "Площадь",
      ja: "設置面積",
      ko: "설치 면적",
      th: "พื้นที่ติดตั้ง",
      vi: "Diện tích",
      id: "Luas",
      hi: "फुटप्रिंट",
      es: "Superficie",
    },
    height: {
      en: "Height",
      zh: "高度",
      ar: "الارتفاع",
      ru: "Высота",
      ja: "高さ",
      ko: "높이",
      th: "ความสูง",
      vi: "Chiều cao",
      id: "Tinggi",
      hi: "ऊंचाई",
      es: "Altura",
    },
    riders: {
      en: "Riders",
      zh: "载客量",
      ar: "الركاب",
      ru: "Пассажиры",
      ja: "定員",
      ko: "탑승 인원",
      th: "จำนวนผู้โดยสาร",
      vi: "Số người",
      id: "Penumpang",
      hi: "सवार",
      es: "Pasajeros",
    },
    year: {
      en: "Year",
      zh: "年份",
      ar: "السنة",
      ru: "Год",
      ja: "年",
      ko: "연도",
      th: "ปี",
      vi: "Năm",
      id: "Tahun",
      hi: "वर्ष",
      es: "Año",
    },
  };

  // Return localized label or fallback to key if not found
  return labels[key]?.[lang] || key;
}

/**
 * Generate product title with category keyword
 * Creates SEO-optimized titles in the format: [Product Name] - [Category Keyword] Manufacturer | Miying Amusement
 * 
 * @param productName - Product name
 * @param category - Product category keyword
 * @param lang - Language code (optional, defaults to English format)
 * @returns SEO-optimized product title
 * 
 * @example
 * ```typescript
 * const title = generateProductTitle("Nuclear energy crisis", "Family Ride");
 * // Returns: "Nuclear energy crisis - Family Ride Manufacturer | Miying Amusement"
 * ```
 */
export function generateProductTitle(
  productName: string,
  category: string,
  lang?: Lang
): string {
  // Brand name translations
  const brandName: Record<Lang, string> = {
    en: "Miying Amusement",
    zh: "米盈游乐",
    ar: "مييينج للترفيه",
    ru: "Миинг Развлечения",
    ja: "ミイングアミューズメント",
    ko: "미잉 어뮤즈먼트",
    th: "มิยิ่ง อะมิวส์เมนต์",
    vi: "Miying Amusement",
    id: "Miying Amusement",
    hi: "मियिंग एम्यूजमेंट",
    es: "Miying Amusement",
  };

  // Manufacturer label translations
  const manufacturerLabel: Record<Lang, string> = {
    en: "Manufacturer",
    zh: "制造商",
    ar: "الشركة المصنعة",
    ru: "Производитель",
    ja: "メーカー",
    ko: "제조업체",
    th: "ผู้ผลิต",
    vi: "Nhà sản xuất",
    id: "Produsen",
    hi: "निर्माता",
    es: "Fabricante",
  };

  const selectedLang = lang || "en";
  const brand = brandName[selectedLang];
  const manufacturer = manufacturerLabel[selectedLang];

  return `${productName} - ${category} ${manufacturer} | ${brand}`;
}
















