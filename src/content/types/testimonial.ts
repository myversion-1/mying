// Testimonial types - shared between client and server
export type Testimonial = {
  id: string;
  name: string;
  company: string;
  country: string;
  countryCode?: string; // ISO country code for flag display
  position?: string; // Job title/position
  rating: number; // 1-5 stars
  text: string;
  textEn?: string;
  textZh?: string;
  image?: string; // Path to customer photo in /public folder
  project?: string; // Related project name
  year?: string; // Year of project/completion
};







