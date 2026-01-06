// Case/Portfolio types - shared between client and server
export type CaseStat = {
  label: string;
  labelEn?: string;
  labelZh?: string;
  value: string;
};

export type CaseItem = {
  id: string;
  title: string;
  titleEn?: string;
  titleZh?: string;
  country: string;
  countryCode?: string; // ISO country code for flag display
  projectType: string;
  projectTypeEn?: string;
  projectTypeZh?: string;
  image: string; // Path to image in /public folder
  stats: CaseStat[];
  highlights: string[];
  highlightsEn?: string[];
  highlightsZh?: string[];
  description?: string;
  descriptionEn?: string;
  descriptionZh?: string;
  year?: string;
  clientName?: string; // Optional client name if allowed
  testimonial?: {
    text: string;
    textEn?: string;
    textZh?: string;
    author: string;
    position?: string;
  };
};








