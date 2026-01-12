import type { Partner, PartnerCategory } from "./types/partner";
import type { Lang } from "../components/language";

// Global partners/clients data with multilingual support
export const partners: Partner[] = [
  {
    id: "theme-park-inc",
    name: {
      en: "Theme Park Inc.",
      zh: "主题公园公司",
      ar: "شركة المتنزهات الترفيهية",
      ru: "Компания тематических парков",
      ja: "テーマパーク株式会社",
      ko: "테마파크 주식회사",
      th: "บริษัทธีมพาร์ค",
      vi: "Công ty Công viên Giải trí",
      id: "Perusahaan Taman Tema",
      hi: "थीम पार्क इंक",
      es: "Parques Temáticos S.A.",
      fr: "Parcs à Thème Inc.",
    },
    logo: "/partners/theme-park-inc.png",
    country: {
      en: "USA",
      zh: "美国",
      ar: "الولايات المتحدة",
      ru: "США",
      ja: "アメリカ",
      ko: "미국",
      th: "สหรัฐอเมริกา",
      vi: "Hoa Kỳ",
      id: "Amerika Serikat",
      hi: "संयुक्त राज्य अमेरिका",
      es: "Estados Unidos",
      fr: "États-Unis",
    },
    countryCode: "US",
    category: "Theme Park",
    website: "https://example.com",
    establishedYear: 2010,
    projectCount: 5,
    lastProjectYear: 2023,
  },
  {
    id: "dubai-entertainment",
    name: {
      en: "Dubai Entertainment Group",
      zh: "迪拜娱乐集团",
      ar: "مجموعة دبي للترفيه",
      ru: "Дубайская развлекательная группа",
      ja: "ドバイエンターテインメントグループ",
      ko: "두바이 엔터테인먼트 그룹",
      th: "กลุ่มบันเทิงดูไบ",
      vi: "Tập đoàn Giải trí Dubai",
      id: "Grup Hiburan Dubai",
      hi: "दुबई मनोरंजन समूह",
      es: "Grupo de Entretenimiento de Dubái",
      fr: "Groupe de Divertissement de Dubaï",
    },
    logo: "/partners/dubai-entertainment.png",
    country: {
      en: "UAE",
      zh: "阿联酋",
      ar: "الإمارات العربية المتحدة",
      ru: "ОАЭ",
      ja: "アラブ首長国連邦",
      ko: "아랍에미리트",
      th: "สหรัฐอาหรับเอมิเรตส์",
      vi: "Các Tiểu vương quốc Ả Rập Thống nhất",
      id: "Uni Emirat Arab",
      hi: "संयुक्त अरब अमीरात",
      es: "Emiratos Árabes Unidos",
      fr: "Émirats arabes unis",
    },
    countryCode: "AE",
    category: "Theme Park",
    website: "https://example.com",
    establishedYear: 2015,
    projectCount: 3,
    lastProjectYear: 2023,
  },
  {
    id: "shanghai-mall",
    name: {
      en: "Shanghai Mall Group",
      zh: "上海购物中心集团",
      ar: "مجموعة مراكز التسوق في شنغهاي",
      ru: "Шанхайская группа торговых центров",
      ja: "上海モールグループ",
      ko: "상하이 몰 그룹",
      th: "กลุ่มศูนย์การค้าซังไฮ่",
      vi: "Tập đoàn Trung tâm Thương mại Thượng Hải",
      id: "Grup Mall Shanghai",
      hi: "शंघाई मॉल समूह",
      es: "Grupo de Centros Comerciales de Shanghái",
      fr: "Groupe de Centres Commerciaux de Shanghai",
    },
    logo: "/partners/shanghai-mall.png",
    country: {
      en: "China",
      zh: "中国",
      ar: "الصين",
      ru: "Китай",
      ja: "中国",
      ko: "중국",
      th: "จีน",
      vi: "Trung Quốc",
      id: "Tiongkok",
      hi: "चीन",
      es: "China",
      fr: "Chine",
    },
    countryCode: "CN",
    category: "Shopping Mall",
    website: "https://example.com",
    establishedYear: 2012,
    projectCount: 8,
    lastProjectYear: 2024,
  },
  {
    id: "family-fun-centers",
    name: {
      en: "Family Fun Centers",
      zh: "家庭娱乐中心",
      ar: "مراكز الترفيه العائلية",
      ru: "Семейные развлекательные центры",
      ja: "ファミリーエンターテインメントセンター",
      ko: "패밀리 펀 센터",
      th: "ศูนย์บันเทิงครอบครัว",
      vi: "Trung tâm Giải trí Gia đình",
      id: "Pusat Hiburan Keluarga",
      hi: "फैमिली फन सेंटर",
      es: "Centros de Entretenimiento Familiar",
      fr: "Centres de Divertissement Familial",
    },
    logo: "/partners/family-fun-centers.png",
    country: {
      en: "USA",
      zh: "美国",
      ar: "الولايات المتحدة",
      ru: "США",
      ja: "アメリカ",
      ko: "미국",
      th: "สหรัฐอเมริกา",
      vi: "Hoa Kỳ",
      id: "Amerika Serikat",
      hi: "संयुक्त राज्य अमेरिका",
      es: "Estados Unidos",
      fr: "États-Unis",
    },
    countryCode: "US",
    category: "FEC",
    website: "https://example.com",
    establishedYear: 2008,
    projectCount: 12,
    lastProjectYear: 2024,
  },
  {
    id: "tokyo-amusement",
    name: {
      en: "Tokyo Amusement Co.",
      zh: "东京娱乐公司",
      ar: "شركة طوكيو للترفيه",
      ru: "Токийская развлекательная компания",
      ja: "東京アミューズメント株式会社",
      ko: "도쿄 엔터테인먼트 주식회사",
      th: "บริษัทบันเทิงโตเกียว",
      vi: "Công ty Giải trí Tokyo",
      id: "Perusahaan Hiburan Tokyo",
      hi: "टोक्यो मनोरंजन कंपनी",
      es: "Compañía de Entretenimiento de Tokio",
      fr: "Compagnie de Divertissement de Tokyo",
    },
    logo: "/partners/tokyo-amusement.png",
    country: {
      en: "Japan",
      zh: "日本",
      ar: "اليابان",
      ru: "Япония",
      ja: "日本",
      ko: "일본",
      th: "ญี่ปุ่น",
      vi: "Nhật Bản",
      id: "Jepang",
      hi: "जापान",
      es: "Japón",
      fr: "Japon",
    },
    countryCode: "JP",
    category: "FEC",
    website: "https://example.com",
    establishedYear: 2011,
    projectCount: 6,
    lastProjectYear: 2023,
  },
];

/**
 * Get localized partner name
 * @param partner - Partner object
 * @param lang - Language code
 * @returns Localized partner name, falls back to English
 */
export function getPartnerName(partner: Partner, lang: Lang = "en"): string {
  return partner.name[lang] || partner.name.en;
}

/**
 * Get localized country name
 * @param partner - Partner object
 * @param lang - Language code
 * @returns Localized country name, falls back to English
 */
export function getPartnerCountry(partner: Partner, lang: Lang = "en"): string {
  return partner.country[lang] || partner.country.en;
}

/**
 * Get partners by category
 * @param category - Partner category to filter by
 * @returns Filtered partners array, or all partners if no category provided
 */
export function getPartnersByCategory(category?: PartnerCategory): Partner[] {
  if (!category) return partners;
  return partners.filter((partner) => partner.category === category);
}

/**
 * Get partners by country code
 * @param countryCode - ISO country code to filter by
 * @returns Filtered partners array, or all partners if no country code provided
 */
export function getPartnersByCountry(countryCode?: string): Partner[] {
  if (!countryCode) return partners;
  return partners.filter((partner) => partner.countryCode === countryCode);
}

/**
 * Get unique country codes from all partners
 * @returns Array of unique ISO country codes
 */
export function getUniqueCountryCodes(): string[] {
  const codes = partners
    .map((partner) => partner.countryCode)
    .filter((code): code is string => Boolean(code));
  return Array.from(new Set(codes)).sort();
}

/**
 * Get partners grouped by country code
 * @returns Object mapping country codes to partner arrays
 */
export function getPartnersByCountryGrouped(): Record<string, Partner[]> {
  const grouped: Record<string, Partner[]> = {};
  partners.forEach((partner) => {
    const code = partner.countryCode;
    if (code) {
      if (!grouped[code]) {
        grouped[code] = [];
      }
      grouped[code].push(partner);
    }
  });
  return grouped;
}

/**
 * Get partners grouped by category
 * @returns Object mapping categories to partner arrays
 */
export function getPartnersByCategoryGrouped(): Record<string, Partner[]> {
  const grouped: Record<string, Partner[]> = {};
  partners.forEach((partner) => {
    const category = partner.category || "Other";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(partner);
  });
  return grouped;
}

/**
 * Get total number of partners
 * @returns Total count of partners
 */
export function getTotalPartnersCount(): number {
  return partners.length;
}

/**
 * Get partners with projects in a specific year
 * @param year - Year to filter by
 * @returns Filtered partners array
 */
export function getPartnersByYear(year: number): Partner[] {
  return partners.filter((partner) => partner.lastProjectYear === year);
}

/**
 * Get partners sorted by project count (descending)
 * @returns Sorted partners array
 */
export function getPartnersByProjectCount(): Partner[] {
  return [...partners].sort((a, b) => (b.projectCount || 0) - (a.projectCount || 0));
}
