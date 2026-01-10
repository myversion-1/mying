import type { CaseItem } from "./types/case";

// Case studies / Portfolio data
// Based on Arrowy's Cases page strategy
export const cases: CaseItem[] = [
  {
    id: "dubai-theme-park",
    title: "Theme Park in Dubai",
    titleEn: "Theme Park in Dubai",
    titleZh: "迪拜主题公园",
    country: "UAE",
    countryCode: "AE",
    coordinates: { latitude: 25.2048, longitude: 55.2708 },
    projectType: "Theme Park",
    projectTypeEn: "Theme Park",
    projectTypeZh: "主题公园",
    image: "/cases/迪拜主题公园 - 鸟瞰图.png",
    stats: [
      { label: "Rides", labelEn: "Rides", labelZh: "设备数量", value: "25" },
      { label: "Investment", labelEn: "Investment", labelZh: "投资额", value: "$5M" },
      { label: "Year", labelEn: "Year", labelZh: "年份", value: "2023" },
    ],
    highlights: [
      "Custom design solutions",
      "Fast delivery within 8 months",
      "Full installation support",
    ],
    highlightsEn: [
      "Custom design solutions",
      "Fast delivery within 8 months",
      "Full installation support",
    ],
    highlightsZh: [
      "定制化设计方案",
      "8个月内快速交付",
      "全程安装支持",
    ],
    description: "A comprehensive theme park project featuring 25 custom-designed amusement rides, delivered and installed within 8 months.",
    descriptionEn: "A comprehensive theme park project featuring 25 custom-designed amusement rides, delivered and installed within 8 months.",
    descriptionZh: "一个综合主题公园项目，包含25个定制设计的游乐设备，在8个月内完成交付和安装。",
    year: "2023",
    slug: "dubai-theme-park",
    datePublished: "2023-06-15",
    city: "Dubai",
    cityEn: "Dubai",
    cityZh: "迪拜",
    // New fields for case study detail page
    clientPainPoints: {
      en: "The client faced challenges with limited space availability and needed to maximize ride capacity within a constrained area. Additionally, they required fast-track delivery to meet a tight opening deadline.",
      zh: "客户面临空间有限的挑战，需要在受限区域内最大化设备容量。此外，他们需要快速交付以满足紧张的开放期限。",
      ar: "واجه العميل تحديات مع توفر مساحة محدودة واحتاج إلى زيادة سعة الألعاب في منطقة محدودة. بالإضافة إلى ذلك، احتاجوا إلى تسليم سريع للوفاء بموعد افتتاح ضيق.",
    },
    spaceConstraints: {
      ceilingHeight: "12m",
      ceilingHeightEn: "12 meters",
      ceilingHeightZh: "12米",
      floorArea: "15,000 sqm",
      floorAreaEn: "15,000 square meters",
      floorAreaZh: "15,000平方米",
    },
    solution: {
      en: "Miying designed a comprehensive solution featuring compact ride layouts optimized for space efficiency. We implemented a modular installation approach that allowed for parallel construction, reducing overall timeline by 30%. Custom-designed rides were engineered to maximize capacity while maintaining safety standards. Our team provided on-site installation support and training to ensure smooth operations from day one.",
      zh: "Miying 设计了一个综合解决方案，采用紧凑的设备布局以优化空间效率。我们实施了模块化安装方法，允许并行施工，将总体时间线缩短了30%。定制设计的设备经过工程优化，在保持安全标准的同时最大化容量。我们的团队提供现场安装支持和培训，确保从第一天起顺利运营。",
      ar: "صممت Miying حلاً شاملاً يتميز بتخطيطات ألعاب مدمجة محسّنة لكفاءة المساحة. قمنا بتنفيذ نهج تثبيت معياري يسمح بالبناء المتوازي، مما قلل الجدول الزمني الإجمالي بنسبة 30٪. تم تصميم الألعاب المخصصة هندسياً لزيادة السعة مع الحفاظ على معايير السلامة. قدم فريقنا دعم التثبيت في الموقع والتدريب لضمان العمليات السلسة من اليوم الأول.",
    },
    completionPhotos: [
      "/cases/迪拜主题公园 - 鸟瞰图.png",
      // Add more completion photos as available
    ],
    safetyCompliance: {
      standards: ["EN13814", "ASTM F24"],
      complianceStatement: {
        en: "This project complies with international safety standards including EN13814 and ASTM F24, ensuring the highest level of safety for all riders.",
        zh: "本项目符合国际安全标准，包括 EN13814 和 ASTM F24，确保所有乘客的最高安全水平。",
        ar: "يتوافق هذا المشروع مع معايير السلامة الدولية بما في ذلك EN13814 و ASTM F24، مما يضمن أعلى مستوى من السلامة لجميع الركاب.",
      },
    },
  },
  {
    id: "singapore-fec",
    title: "Family Entertainment Center in Singapore",
    titleEn: "Family Entertainment Center in Singapore",
    titleZh: "新加坡家庭娱乐中心",
    country: "Singapore",
    countryCode: "SG",
    projectType: "FEC",
    projectTypeEn: "Family Entertainment Center",
    projectTypeZh: "家庭娱乐中心",
    image: "/cases/新加坡 FEC - 室内全景.png",
    stats: [
      { label: "Rides", labelEn: "Rides", labelZh: "设备数量", value: "15" },
      { label: "Area", labelEn: "Area", labelZh: "面积", value: "3,000 sqm" },
      { label: "Year", labelEn: "Year", labelZh: "年份", value: "2024" },
    ],
    highlights: [
      "Indoor installation expertise",
      "Space-optimized designs",
      "Multi-level ride integration",
    ],
    highlightsEn: [
      "Indoor installation expertise",
      "Space-optimized designs",
      "Multi-level ride integration",
    ],
    highlightsZh: [
      "室内安装专业经验",
      "空间优化设计",
      "多层设备集成",
    ],
    description: "An indoor family entertainment center with 15 rides optimized for limited space, featuring innovative multi-level integration.",
    descriptionEn: "An indoor family entertainment center with 15 rides optimized for limited space, featuring innovative multi-level integration.",
    descriptionZh: "一个室内家庭娱乐中心，包含15个针对有限空间优化的游乐设备，采用创新的多层集成设计。",
    year: "2024",
  },
  {
    id: "thailand-water-park",
    title: "Water Park in Thailand",
    titleEn: "Water Park in Thailand",
    titleZh: "泰国水上乐园",
    country: "Thailand",
    countryCode: "TH",
    projectType: "Water Park",
    projectTypeEn: "Water Park",
    projectTypeZh: "水上乐园",
    image: "/cases/泰国水上乐园 - 全景.png",
    stats: [
      { label: "Rides", labelEn: "Rides", labelZh: "设备数量", value: "12" },
      { label: "Capacity", labelEn: "Capacity", labelZh: "容量", value: "2,000/day" },
      { label: "Year", labelEn: "Year", labelZh: "年份", value: "2023" },
    ],
    highlights: [
      "Water-resistant materials",
      "Safety-certified equipment",
      "Tropical climate adaptation",
    ],
    highlightsEn: [
      "Water-resistant materials",
      "Safety-certified equipment",
      "Tropical climate adaptation",
    ],
    highlightsZh: [
      "防水材料",
      "安全认证设备",
      "热带气候适应",
    ],
    description: "A water park project with 12 water rides designed for tropical climate, featuring corrosion-resistant materials and enhanced safety features.",
    descriptionEn: "A water park project with 12 water rides designed for tropical climate, featuring corrosion-resistant materials and enhanced safety features.",
    descriptionZh: "一个水上乐园项目，包含12个专为热带气候设计的水上设备，采用防腐蚀材料和增强的安全功能。",
    year: "2023",
  },
  {
    id: "usa-carnival",
    title: "Traveling Carnival in USA",
    titleEn: "Traveling Carnival in USA",
    titleZh: "美国巡回嘉年华",
    country: "USA",
    countryCode: "US",
    projectType: "Carnival",
    projectTypeEn: "Traveling Carnival",
    projectTypeZh: "巡回嘉年华",
    image: "/cases/美国嘉年华 - 夜间.png",
    stats: [
      { label: "Rides", labelEn: "Rides", labelZh: "设备数量", value: "8" },
      { label: "Mobility", labelEn: "Mobility", labelZh: "移动性", value: "Portable" },
      { label: "Year", labelEn: "Year", labelZh: "年份", value: "2024" },
    ],
    highlights: [
      "Portable design",
      "Quick setup/teardown",
      "ASTM F24 certified",
    ],
    highlightsEn: [
      "Portable design",
      "Quick setup/teardown",
      "ASTM F24 certified",
    ],
    highlightsZh: [
      "便携式设计",
      "快速安装/拆卸",
      "ASTM F24认证",
    ],
    description: "A set of 8 portable carnival rides designed for traveling shows, featuring quick setup and teardown capabilities.",
    descriptionEn: "A set of 8 portable carnival rides designed for traveling shows, featuring quick setup and teardown capabilities.",
    descriptionZh: "一套8个便携式嘉年华设备，专为巡回演出设计，具有快速安装和拆卸功能。",
    year: "2024",
  },
  {
    id: "china-shopping-mall",
    title: "Shopping Mall Attraction in China",
    titleEn: "Shopping Mall Attraction in China",
    titleZh: "中国购物中心游乐区",
    country: "China",
    countryCode: "CN",
    projectType: "Shopping Mall",
    projectTypeEn: "Shopping Mall Attraction",
    projectTypeZh: "购物中心游乐区",
    image: "/cases/中国购物中心 - 游乐区.png",
    stats: [
      { label: "Rides", labelEn: "Rides", labelZh: "设备数量", value: "20" },
      { label: "Floor", labelEn: "Floor", labelZh: "楼层", value: "3rd Floor" },
      { label: "Year", labelEn: "Year", labelZh: "年份", value: "2024" },
    ],
    highlights: [
      "Indoor air quality compliance",
      "Noise reduction technology",
      "Family-friendly designs",
    ],
    highlightsEn: [
      "Indoor air quality compliance",
      "Noise reduction technology",
      "Family-friendly designs",
    ],
    highlightsZh: [
      "室内空气质量合规",
      "降噪技术",
      "家庭友好设计",
    ],
    description: "An indoor attraction area in a shopping mall with 20 rides, featuring noise reduction and air quality compliance for indoor environments.",
    descriptionEn: "An indoor attraction area in a shopping mall with 20 rides, featuring noise reduction and air quality compliance for indoor environments.",
    descriptionZh: "购物中心内的室内游乐区，包含20个游乐设备，具有降噪和室内空气质量合规特性。",
    year: "2024",
  },
];

// Helper function to get localized case
export function getLocalizedCase(caseItem: CaseItem, lang: string): CaseItem {
  if (lang === "zh") {
    return {
      ...caseItem,
      title: caseItem.titleZh || caseItem.title,
      projectType: caseItem.projectTypeZh || caseItem.projectType,
      description: caseItem.descriptionZh || caseItem.description,
      highlights: caseItem.highlightsZh || caseItem.highlights,
      stats: caseItem.stats.map((stat) => ({
        ...stat,
        label: stat.labelZh || stat.label,
      })),
    };
  }
  return {
    ...caseItem,
    title: caseItem.titleEn || caseItem.title,
    projectType: caseItem.projectTypeEn || caseItem.projectType,
    description: caseItem.descriptionEn || caseItem.description,
    highlights: caseItem.highlightsEn || caseItem.highlights,
    stats: caseItem.stats.map((stat) => ({
      ...stat,
      label: stat.labelEn || stat.label,
    })),
  };
}

