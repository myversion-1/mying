// Case/Portfolio types - shared between client and server
export type CaseStat = {
  label: string;
  labelEn?: string;
  labelZh?: string;
  value: string;
};

// Multi-language text type for 12 languages support
export type MultilingualText = {
  en?: string;
  zh?: string;
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
  // Fallback to first available language
  [key: string]: string | undefined;
};

// Geographic coordinates for map display
export type Coordinates = {
  latitude: number;
  longitude: number;
};

// Space constraints, especially ceiling height
export type SpaceConstraints = {
  ceilingHeight?: string; // e.g., "4.5m", "15ft"
  ceilingHeightEn?: string;
  ceilingHeightZh?: string;
  floorArea?: string;
  floorAreaEn?: string;
  floorAreaZh?: string;
  width?: string;
  widthEn?: string;
  widthZh?: string;
  length?: string;
  lengthEn?: string;
  lengthZh?: string;
  otherConstraints?: MultilingualText;
};

// Safety standard compliance information
export type SafetyCompliance = {
  standards: string[]; // e.g., ["EN13814", "ASTM F1148", "GB 8408-2018"]
  complianceStatement: MultilingualText;
  certificationBody?: string;
  certificationDate?: string;
};

export type CaseItem = {
  id: string;
  title: string;
  titleEn?: string;
  titleZh?: string;
  country: string;
  countryCode?: string; // ISO country code for flag display
  coordinates?: Coordinates; // For map display
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
  
  // New required fields for case study detail page
  /**
   * 客户痛点 (Client Pain Points)
   * Describes the main problems and challenges the client faced before the project
   */
  clientPainPoints?: MultilingualText;
  
  /**
   * 空间约束条件 (Space Constraints)
   * Especially ceiling height limitations and other physical constraints
   */
  spaceConstraints?: SpaceConstraints;
  
  /**
   * Miying 解决方案 (Miying Solution)
   * Detailed description of Miying's customized solution
   */
  solution?: MultilingualText;
  
  /**
   * 项目完工实景图 (Project Completion Photos)
   * Array of image paths showing the completed project
   */
  completionPhotos?: string[];
  
  /**
   * 安全标准合规性 (Safety Compliance)
   * Automatic compliance statements based on global safety standards
   */
  safetyCompliance?: SafetyCompliance;
  
  testimonial?: {
    text: string;
    textEn?: string;
    textZh?: string;
    author: string;
    position?: string;
  };
  
  // SEO and metadata
  slug?: string; // URL-friendly slug
  datePublished?: string; // ISO date string
  city?: string; // City name for location
  cityEn?: string;
  cityZh?: string;
};








