// Partner types - shared between client and server
export type PartnerCategory = 
  | "Theme Park"
  | "FEC"
  | "Shopping Mall"
  | "Water Park"
  | "Amusement Park"
  | "Other";

export type Partner = {
  id: string;
  name: string;
  logo: string; // Path to partner logo in /public folder
  country: string;
  countryCode?: string; // ISO country code for flag display
  category?: PartnerCategory;
  website?: string; // Optional partner website URL
};



