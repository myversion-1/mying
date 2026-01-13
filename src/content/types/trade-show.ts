// Trade Show types - shared between client and server
export type TradeShowStatus = "upcoming" | "current" | "past";

export type TradeShow = {
  id: string;
  name: {
    en: string;
    zh: string;
    ar?: string;
    ru?: string;
    ja?: string;
    ko?: string;
    th?: string;
    vi?: string;
    id?: string;
    hi?: string;
    es?: string;
    fr?: string;
  };
  location: {
    en: string;
    zh: string;
    ar?: string;
    ru?: string;
    ja?: string;
    ko?: string;
    th?: string;
    vi?: string;
    id?: string;
    hi?: string;
    es?: string;
    fr?: string;
  };
  date: {
    start: string; // ISO date string (e.g., "2025-03-15")
    end: string;   // ISO date string
  };
  booth?: string;  // Booth number or location
  website?: string; // Official website URL
  status: TradeShowStatus;
  description?: {
    en: string;
    zh: string;
    [key: string]: string | undefined;
  };
};









