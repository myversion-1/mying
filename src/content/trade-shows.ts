import type { TradeShow } from "./types/trade-show";

// Trade shows data
export const tradeShows: TradeShow[] = [
  {
    id: "iaapa-2025",
    name: {
      en: "IAAPA Expo 2025",
      zh: "IAAPA 博览会 2025",
    },
    location: {
      en: "Orlando, Florida, USA",
      zh: "美国佛罗里达州奥兰多",
    },
    date: {
      start: "2025-11-18",
      end: "2025-11-22",
    },
    booth: "Booth #1234",
    website: "https://www.iaapa.org/expos/iaapa-expo",
    status: "upcoming",
    description: {
      en: "The world's largest attractions industry event, featuring the latest innovations in amusement rides, games, and entertainment technology.",
      zh: "全球最大的景点行业盛会，展示最新的游乐设备、游戏和娱乐技术创新。",
    },
  },
  {
    id: "eae-2025",
    name: {
      en: "European Attractions Expo 2025",
      zh: "欧洲景点博览会 2025",
    },
    location: {
      en: "Barcelona, Spain",
      zh: "西班牙巴塞罗那",
    },
    date: {
      start: "2025-06-10",
      end: "2025-06-12",
    },
    status: "upcoming",
    description: {
      en: "Europe's premier attractions industry event, bringing together operators, manufacturers, and suppliers.",
      zh: "欧洲首屈一指的景点行业盛会，汇聚运营商、制造商和供应商。",
    },
  },
  {
    id: "asia-attractions-expo-2025",
    name: {
      en: "Asia Attractions Expo 2025",
      zh: "亚洲景点博览会 2025",
    },
    location: {
      en: "Singapore",
      zh: "新加坡",
    },
    date: {
      start: "2025-05-20",
      end: "2025-05-22",
    },
    status: "upcoming",
    description: {
      en: "The leading attractions industry event in Asia, showcasing the latest trends and innovations.",
      zh: "亚洲领先的景点行业盛会，展示最新趋势和创新。",
    },
  },
  {
    id: "iaapa-2024",
    name: {
      en: "IAAPA Expo 2024",
      zh: "IAAPA 博览会 2024",
    },
    location: {
      en: "Orlando, Florida, USA",
      zh: "美国佛罗里达州奥兰多",
    },
    date: {
      start: "2024-11-18",
      end: "2024-11-22",
    },
    booth: "Booth #1234",
    website: "https://www.iaapa.org/expos/iaapa-expo",
    status: "past",
    description: {
      en: "Successfully participated in the world's largest attractions industry event.",
      zh: "成功参与全球最大的景点行业盛会。",
    },
  },
];

// Helper function to get trade shows by status
export function getTradeShowsByStatus(status: TradeShow["status"]): TradeShow[] {
  return tradeShows.filter((show) => show.status === status);
}

// Helper function to get upcoming trade shows
export function getUpcomingTradeShows(): TradeShow[] {
  return getTradeShowsByStatus("upcoming").sort((a, b) => 
    a.date.start.localeCompare(b.date.start)
  );
}

// Helper function to get localized trade show
export function getLocalizedTradeShow(show: TradeShow, lang: string): {
  name: string;
  location: string;
  description?: string;
} {
  return {
    name: show.name[lang as keyof typeof show.name] || show.name.en,
    location: show.location[lang as keyof typeof show.location] || show.location.en,
    description: show.description?.[lang as keyof typeof show.description] || show.description?.en,
  };
}









