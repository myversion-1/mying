import type { Lang } from "../components/language";

export type ServiceMultilingual = {
  title: { en: string; zh: string };
  desc: { en: string; zh: string };
};

export const servicesMultilingual: ServiceMultilingual[] = [
  {
    title: {
      en: "Purchasing & Agent Support",
      zh: "采购与代理支持",
    },
    desc: {
      en: "Guidance to source, evaluate, and negotiate new or used rides globally.",
      zh: "在全球范围内采购、评估和谈判新旧游乐设备的指导服务。",
    },
  },
  {
    title: {
      en: "Consulting",
      zh: "咨询服务",
    },
    desc: {
      en: "From selecting manufacturers to planning whole park lineups with compliance in mind.",
      zh: "从选择制造商到规划整个园区布局，确保符合合规要求。",
    },
  },
  {
    title: {
      en: "Appraisal",
      zh: "评估服务",
    },
    desc: {
      en: "Accurate market assessments before you buy, sell, refinance, or transfer assets.",
      zh: "在购买、出售、再融资或转让资产前提供准确的市场评估。",
    },
  },
  {
    title: {
      en: "Refurbishment",
      zh: "翻新服务",
    },
    desc: {
      en: "End-to-end refurbishment with factory testing and transparent timelines.",
      zh: "端到端翻新服务，包括工厂测试和透明的时间表。",
    },
  },
  {
    title: {
      en: "Assembly & Installation",
      zh: "组装与安装",
    },
    desc: {
      en: "On-site assembly by experienced engineers to get you opening-day ready.",
      zh: "由经验丰富的工程师进行现场组装，确保开业日准备就绪。",
    },
  },
  {
    title: {
      en: "Attraction Rentals",
      zh: "设备租赁",
    },
    desc: {
      en: "Short- and long-term ride rentals for parks and event agencies worldwide.",
      zh: "为全球公园和活动机构提供短期和长期设备租赁服务。",
    },
  },
];

// Helper function to get localized services
export function getLocalizedServices(lang: Lang) {
  const isZh = lang === "zh";
  return servicesMultilingual.map((service) => ({
    title: service.title[isZh ? "zh" : "en"] || service.title["en"],
    desc: service.desc[isZh ? "zh" : "en"] || service.desc["en"],
  }));
}

// Export services array for backward compatibility (defaults to English)
export const services = getLocalizedServices("en");
