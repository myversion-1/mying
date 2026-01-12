/**
 * Safety Standards Library
 * Manages global amusement ride safety standards and generates compliance statements
 * 
 * Supported Standards:
 * - EN 13814: European standard for amusement rides
 * - ASTM F1148: US standard for home playground equipment
 * - GB 8408-2018: Chinese standard for large amusement rides
 * - EN 1176: European standard for playground equipment
 * - ASTM F24: US standard for amusement rides and devices
 */

export type SafetyStandard = {
  code: string;
  name: string;
  nameEn: string;
  nameZh: string;
  region: string;
  description: string;
  descriptionEn: string;
  descriptionZh: string;
  applicableTypes: string[]; // e.g., ["Theme Park", "FEC", "Water Park"]
};

export const SAFETY_STANDARDS: SafetyStandard[] = [
  {
    code: "EN13814",
    name: "EN 13814",
    nameEn: "EN 13814 - Amusement Rides Safety",
    nameZh: "EN 13814 - 游乐设施安全标准",
    region: "Europe",
    description:
      "European standard covering the design, manufacture, and operation of amusement rides",
    descriptionEn:
      "European standard covering the design, manufacture, and operation of amusement rides",
    descriptionZh: "欧洲标准，涵盖游乐设施的设计、制造和运营",
    applicableTypes: ["Theme Park", "FEC", "Carnival", "Water Park"],
  },
  {
    code: "EN1176",
    name: "EN 1176",
    nameEn: "EN 1176 - Playground Equipment Safety",
    nameZh: "EN 1176 - 游乐场设备安全标准",
    region: "Europe",
    description:
      "European standard for playground equipment and surfacing safety requirements",
    descriptionEn:
      "European standard for playground equipment and surfacing safety requirements",
    descriptionZh: "欧洲游乐场设备和地面安全要求标准",
    applicableTypes: ["FEC", "Shopping Mall", "Playground"],
  },
  {
    code: "ASTM F1148",
    name: "ASTM F1148",
    nameEn: "ASTM F1148 - Home Playground Equipment",
    nameZh: "ASTM F1148 - 家用游乐设备标准",
    region: "USA",
    description:
      "US standard for home playground equipment safety and performance requirements",
    descriptionEn:
      "US standard for home playground equipment safety and performance requirements",
    descriptionZh: "美国家用游乐设备安全和性能要求标准",
    applicableTypes: ["FEC", "Shopping Mall", "Home"],
  },
  {
    code: "ASTM F24",
    name: "ASTM F24",
    nameEn: "ASTM F24 - Amusement Rides and Devices",
    nameZh: "ASTM F24 - 游乐设施和设备标准",
    region: "USA",
    description:
      "US standard for amusement rides and devices covering design, manufacture, and operation",
    descriptionEn:
      "US standard for amusement rides and devices covering design, manufacture, and operation",
    descriptionZh: "美国游乐设施和设备标准，涵盖设计、制造和运营",
    applicableTypes: ["Theme Park", "FEC", "Carnival", "Water Park"],
  },
  {
    code: "GB 8408-2018",
    name: "GB 8408-2018",
    nameEn: "GB 8408-2018 - Large Amusement Rides Safety",
    nameZh: "GB 8408-2018 - 大型游乐设施安全规范",
    region: "China",
    description:
      "Chinese national standard for large amusement rides safety specifications",
    descriptionEn:
      "Chinese national standard for large amusement rides safety specifications",
    descriptionZh: "中国大型游乐设施安全规范国家标准",
    applicableTypes: ["Theme Park", "FEC", "Water Park"],
  },
];

/**
 * Get applicable safety standards for a case study
 * Based on project type, country, and other factors
 */
export function getApplicableStandards(
  projectType: string,
  countryCode?: string
): SafetyStandard[] {
  const applicable: SafetyStandard[] = [];

  // Filter by project type
  SAFETY_STANDARDS.forEach((standard) => {
    if (standard.applicableTypes.includes(projectType)) {
      applicable.push(standard);
    }
  });

  // Filter by region if country code provided
  if (countryCode) {
    const regionMap: Record<string, string> = {
      US: "USA",
      CA: "USA", // North America
      GB: "Europe",
      DE: "Europe",
      FR: "Europe",
      IT: "Europe",
      ES: "Europe",
      NL: "Europe",
      BE: "Europe",
      AT: "Europe",
      CH: "Europe",
      SE: "Europe",
      NO: "Europe",
      DK: "Europe",
      FI: "Europe",
      PL: "Europe",
      CN: "China",
      HK: "China",
      TW: "China",
    };

    const region = regionMap[countryCode];
    if (region) {
      return applicable.filter((std) => std.region === region);
    }
  }

  return applicable;
}

/**
 * Generate compliance statement in multiple languages
 */
export function generateComplianceStatement(
  standards: SafetyStandard[],
  lang: string = "en"
): string {
  if (standards.length === 0) {
    return lang === "zh"
      ? "本项目符合相关安全标准要求"
      : "This project complies with relevant safety standards";
  }

  const standardNames = standards.map((std) => std.code).join(", ");

  const statements: Record<string, string> = {
    en: `This project complies with international safety standards including ${standardNames}, ensuring the highest level of safety for all riders.`,
    zh: `本项目符合国际安全标准，包括 ${standardNames}，确保所有乘客的最高安全水平。`,
    ar: `يتوافق هذا المشروع مع معايير السلامة الدولية بما في ذلك ${standardNames}، مما يضمن أعلى مستوى من السلامة لجميع الركاب.`,
    ru: `Этот проект соответствует международным стандартам безопасности, включая ${standardNames}, обеспечивая высший уровень безопасности для всех пассажиров.`,
    ja: `このプロジェクトは、${standardNames}を含む国際安全基準に準拠しており、すべての乗客の最高レベルの安全性を確保しています。`,
    ko: `이 프로젝트는 ${standardNames}를 포함한 국제 안전 표준을 준수하여 모든 승객의 최고 수준의 안전을 보장합니다.`,
    th: `โครงการนี้เป็นไปตามมาตรฐานความปลอดภัยสากล รวมถึง ${standardNames} เพื่อรับประกันความปลอดภัยในระดับสูงสุดสำหรับผู้โดยสารทุกคน`,
    vi: `Dự án này tuân thủ các tiêu chuẩn an toàn quốc tế bao gồm ${standardNames}, đảm bảo mức độ an toàn cao nhất cho tất cả hành khách.`,
    id: `Proyek ini mematuhi standar keselamatan internasional termasuk ${standardNames}, memastikan tingkat keselamatan tertinggi untuk semua penumpang.`,
    hi: `यह परियोजना ${standardNames} सहित अंतर्राष्ट्रीय सुरक्षा मानकों का अनुपालन करती है, सभी यात्रियों के लिए उच्चतम स्तर की सुरक्षा सुनिश्चित करती है।`,
    es: `Este proyecto cumple con los estándares internacionales de seguridad, incluidos ${standardNames}, garantizando el más alto nivel de seguridad para todos los pasajeros.`,
    fr: `Ce projet est conforme aux normes de sécurité internationales, y compris ${standardNames}, garantissant le plus haut niveau de sécurité pour tous les passagers.`,
  };

  return statements[lang] || statements.en;
}











