import type { Award } from "./types/award";

// Awards and Recognition data
// Based on Arrowy's strategy: iF Design Award, DIA China Design Award
export const awards: Award[] = [
  {
    id: "iso-9001",
    name: "ISO 9001 Certified",
    nameEn: "ISO 9001 Certified",
    nameZh: "ISO 9001 认证",
    year: "2020",
    description: "Quality Management System certification ensuring consistent quality standards",
    descriptionEn: "Quality Management System certification ensuring consistent quality standards",
    descriptionZh: "质量管理体系认证，确保一致的质量标准",
    issuer: "International Organization for Standardization",
    category: "Quality",
  },
  {
    id: "ce-marking",
    name: "CE Marking",
    nameEn: "CE Marking",
    nameZh: "CE 认证",
    year: "2019",
    description: "European Conformity certification for safety and environmental standards",
    descriptionEn: "European Conformity certification for safety and environmental standards",
    descriptionZh: "欧洲符合性认证，符合安全和环境标准",
    issuer: "European Union",
    category: "Safety",
  },
  {
    id: "en-13814",
    name: "EN 13814 Compliant",
    nameEn: "EN 13814 Compliant",
    nameZh: "EN 13814 合规",
    year: "2021",
    description: "European standard for safety of amusement rides and devices",
    descriptionEn: "European standard for safety of amusement rides and devices",
    descriptionZh: "欧洲游乐设备安全标准",
    issuer: "European Committee for Standardization",
    category: "Safety",
  },
  {
    id: "astm-f24",
    name: "ASTM F24 Certified",
    nameEn: "ASTM F24 Certified",
    nameZh: "ASTM F24 认证",
    year: "2022",
    description: "American standard for amusement rides and devices safety",
    descriptionEn: "American standard for amusement rides and devices safety",
    descriptionZh: "美国游乐设备安全标准",
    issuer: "ASTM International",
    category: "Safety",
  },
  // Add more awards as needed
  // Example: Design awards, innovation awards, etc.
];

// Helper function to get localized award
export function getLocalizedAward(award: Award, lang: string): Award {
  if (lang === "zh") {
    return {
      ...award,
      name: award.nameZh || award.name,
      description: award.descriptionZh || award.description,
    };
  }
  return {
    ...award,
    name: award.nameEn || award.name,
    description: award.descriptionEn || award.description,
  };
}






















