// Award types - shared between client and server
export type Award = {
  id: string;
  name: string;
  nameEn?: string;
  nameZh?: string;
  year: string;
  logo?: string; // Path to award logo in /public folder
  description?: string;
  descriptionEn?: string;
  descriptionZh?: string;
  issuer?: string; // Award issuer organization
  category?: string; // Award category (e.g., "Design", "Quality", "Innovation")
};

















