import type { Partner } from "./types/partner";

// Global partners/clients data
export const partners: Partner[] = [
  {
    id: "theme-park-inc",
    name: "Theme Park Inc.",
    logo: "/partners/theme-park-inc.png", // Placeholder - replace with actual logo
    country: "USA",
    countryCode: "US",
    category: "Theme Park",
  },
  {
    id: "dubai-entertainment",
    name: "Dubai Entertainment Group",
    logo: "/partners/dubai-entertainment.png", // Placeholder - replace with actual logo
    country: "UAE",
    countryCode: "AE",
    category: "Theme Park",
  },
  {
    id: "shanghai-mall",
    name: "Shanghai Mall Group",
    logo: "/partners/shanghai-mall.png", // Placeholder - replace with actual logo
    country: "China",
    countryCode: "CN",
    category: "Shopping Mall",
  },
  {
    id: "family-fun-centers",
    name: "Family Fun Centers",
    logo: "/partners/family-fun-centers.png", // Placeholder - replace with actual logo
    country: "USA",
    countryCode: "US",
    category: "FEC",
  },
  {
    id: "tokyo-amusement",
    name: "Tokyo Amusement Co.",
    logo: "/partners/tokyo-amusement.png", // Placeholder - replace with actual logo
    country: "Japan",
    countryCode: "JP",
    category: "FEC",
  },
];

// Helper function to get partners by category
export function getPartnersByCategory(category?: Partner["category"]): Partner[] {
  if (!category) return partners;
  return partners.filter((partner) => partner.category === category);
}

// Helper function to get partners by country
export function getPartnersByCountry(countryCode?: string): Partner[] {
  if (!countryCode) return partners;
  return partners.filter((partner) => partner.countryCode === countryCode);
}



