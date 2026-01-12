// Partner types - shared between client and server
import type { MultilingualText } from "./case";

export type PartnerCategory = 
  | "Theme Park"
  | "FEC"
  | "Shopping Mall"
  | "Water Park"
  | "Amusement Park"
  | "Other";

// Multilingual partner name type
export type PartnerName = MultilingualText & {
  // English is required as fallback
  en: string;
};

// Multilingual country name type
export type CountryName = MultilingualText & {
  // English is required as fallback
  en: string;
};

export type Partner = {
  id: string;
  // Multilingual name support (12 languages)
  name: PartnerName;
  logo: string; // Path to partner logo in /public folder
  // Multilingual country name support
  country: CountryName;
  countryCode: string; // ISO country code (required for flag display and filtering)
  category?: PartnerCategory;
  website?: string; // Optional partner website URL
  // Additional metadata
  establishedYear?: number; // Year the partner was established
  projectCount?: number; // Number of projects with this partner
  lastProjectYear?: number; // Year of last project
};






