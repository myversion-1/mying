import type { Lang } from "../components/language";
import type { Product } from "../content/copy";

/**
 * SEO Utils - 健壮的工具类
 * 
 * 目标：建立一个类型安全的 SEO 工具函数，自动从产品数据中提取关键词（Name, Category, Specs），
 * 并根据当前语言生成符合 SEO 最佳实践的 Metadata。
 * 
 * 特性：
 * - 支持 11 种语言
 * - 完善的 Fallback 机制
 * - 类型安全
 * - 优雅处理数据缺失情况
 */

/**
 * SEO 输入接口 - 支持灵活的产品数据输入
 */
export interface ProductSEOInput {
  name: string;
  category: string;
  specs?: Record<string, string>;
  // 可选字段，用于从 Product 类型转换
  footprint?: string;
  height?: string;
  riders?: string;
  year?: string;
}

/**
 * SEO 结果接口
 */
export interface SEOResult {
  title: string;
  description: string;
}

/**
 * 从 Product 类型转换为 ProductSEOInput
 * 提供类型安全的转换函数
 */
export function productToSEOInput(product: Product): ProductSEOInput {
  const specs: Record<string, string> = {};
  
  if (product.footprint && product.footprint.trim() !== "") {
    specs.footprint = product.footprint;
  }
  if (product.height && product.height.trim() !== "") {
    specs.height = product.height;
  }
  if (product.riders && product.riders.trim() !== "") {
    specs.riders = product.riders;
  }
  if (product.year && product.year.trim() !== "") {
    specs.year = product.year;
  }

  return {
    name: product.name || "Product",
    category: product.category || "Amusement Ride",
    specs,
  };
}

/**
 * 提取规格参数的本地化标签
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

  return labels[key]?.[lang] || key;
}

/**
 * 品牌名称翻译
 */
const BRAND_NAME: Record<Lang, string> = {
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

/**
 * 制造商标签翻译
 */
const MANUFACTURER_LABEL: Record<Lang, string> = {
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

/**
 * 核心 SEO 逻辑：提取规格参数并生成多语言描述
 * 
 * @param product - 产品数据（Product 类型或 ProductSEOInput）
 * @param lang - 语言代码
 * @returns SEO 优化的 title 和 description
 */
export function generateProductSEO(
  product: Product | ProductSEOInput,
  lang: Lang
): SEOResult {
  // 类型转换：如果是 Product 类型，转换为 ProductSEOInput
  const input: ProductSEOInput = 
    'footprint' in product && typeof product.footprint === 'string'
      ? productToSEOInput(product as Product)
      : (product as ProductSEOInput);

  // 安全提取：确保 name 和 category 有默认值
  const productName = input.name?.trim() || "Product";
  const category = input.category?.trim() || "Amusement Ride";

  // 1. 提取前两个非空的规格参数
  const allSpecs = input.specs || {};
  const validSpecs = Object.entries(allSpecs)
    .filter(([_, value]) => value && typeof value === 'string' && value.trim() !== "")
    .slice(0, 2)
    .map(([key, value]) => {
      const label = getSpecLabel(key, lang);
      return `${label}: ${value}`;
    });

  const specString = validSpecs.length > 0 ? ` (${validSpecs.join(", ")})` : "";

  // 2. 定义 11 种语言的模板映射（完整的 SEO 模板）
  const seoTemplates: Record<Lang, { title: string; desc: string }> = {
    en: {
      title: `${productName} - Professional ${category} Manufacturer | ${BRAND_NAME.en}`,
      desc: `High-quality ${productName}${specString}. Leading ${category} supplier for amusement parks worldwide. Contact us for quotes and factory visits.`
    },
    zh: {
      title: `${productName} - 专业 ${category} 制造商 | ${BRAND_NAME.zh}`,
      desc: `优质 ${productName}${specString}。全球领先的 ${category} 游乐设备供应商，品质保障。联系我们获取报价和工厂参观。`
    },
    ar: {
      title: `${productName} - مصنع ${category} محترف | ${BRAND_NAME.ar}`,
      desc: `عالية الجودة ${productName}${specString}. مورد رائد لـ ${category} لمنتزهات الملاهي في جميع أنحاء العالم. اتصل بنا للحصول على عروض الأسعار وزيارات المصنع.`
    },
    ru: {
      title: `${productName} - Профессиональный производитель ${category} | ${BRAND_NAME.ru}`,
      desc: `Высококачественный ${productName}${specString}. Ведущий поставщик ${category} для парков развлечений по всему миру. Свяжитесь с нами для получения предложений и посещения завода.`
    },
    ja: {
      title: `${productName} - プロフェッショナル ${category} メーカー | ${BRAND_NAME.ja}`,
      desc: `高品質な ${productName}${specString}。世界中のアミューズメントパーク向けの主要な ${category} サプライヤー。見積もりと工場見学についてはお問い合わせください。`
    },
    ko: {
      title: `${productName} - 전문 ${category} 제조업체 | ${BRAND_NAME.ko}`,
      desc: `고품질 ${productName}${specString}. 전 세계 놀이공원을 위한 선도적인 ${category} 공급업체. 견적 및 공장 방문 문의는 연락주세요.`
    },
    th: {
      title: `${productName} - ผู้ผลิต ${category} มืออาชีพ | ${BRAND_NAME.th}`,
      desc: `${productName}${specString} คุณภาพสูง ผู้จำหน่าย ${category} ชั้นนำสำหรับสวนสนุกทั่วโลก ติดต่อเราสำหรับใบเสนอราคาและการเยี่ยมชมโรงงาน`
    },
    vi: {
      title: `${productName} - Nhà sản xuất ${category} Chuyên nghiệp | ${BRAND_NAME.vi}`,
      desc: `${productName}${specString} chất lượng cao. Nhà cung cấp ${category} hàng đầu cho công viên giải trí trên toàn thế giới. Liên hệ với chúng tôi để nhận báo giá và tham quan nhà máy.`
    },
    id: {
      title: `${productName} - Produsen ${category} Profesional | ${BRAND_NAME.id}`,
      desc: `${productName}${specString} berkualitas tinggi. Pemasok ${category} terkemuka untuk taman hiburan di seluruh dunia. Hubungi kami untuk penawaran dan kunjungan pabrik.`
    },
    hi: {
      title: `${productName} - पेशेवर ${category} निर्माता | ${BRAND_NAME.hi}`,
      desc: `उच्च गुणवत्ता ${productName}${specString}. दुनिया भर में मनोरंजन पार्कों के लिए अग्रणी ${category} आपूर्तिकर्ता। उद्धरण और कारखाना दौरे के लिए हमसे संपर्क करें।`
    },
    es: {
      title: `${productName} - Fabricante Profesional de ${category} | ${BRAND_NAME.es}`,
      desc: `${productName}${specString} de alta calidad. Proveedor líder de ${category} para parques de atracciones en todo el mundo. Contáctenos para cotizaciones y visitas a la fábrica.`
    },
  };

  // 3. Fallback 机制：如果语言不存在，回退到英语
  const template = seoTemplates[lang] || seoTemplates['en'];

  // 4. 最终安全检查：确保返回的字符串不为空
  return {
    title: template.title || `${productName} | ${BRAND_NAME.en}`,
    description: template.desc || `High-quality ${productName} from ${BRAND_NAME.en}.`
  };
}

/**
 * 便捷函数：仅生成 Title
 */
export function generateProductTitle(
  product: Product | ProductSEOInput,
  lang: Lang
): string {
  return generateProductSEO(product, lang).title;
}

/**
 * 便捷函数：仅生成 Description
 */
export function generateProductDescription(
  product: Product | ProductSEOInput,
  lang: Lang
): string {
  return generateProductSEO(product, lang).description;
}
