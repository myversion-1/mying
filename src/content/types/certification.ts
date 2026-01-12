// Certification detail types
export type CertificationDetail = {
  id: string;
  name: {
    en: string;
    zh: string;
    ar: string;
    ru: string;
    ja: string;
    ko: string;
    th: string;
    vi: string;
    id: string;
    hi: string;
    es: string;
    fr: string;
  };
  certificateNumber?: string;
  issuingAuthority: {
    en: string;
    zh: string;
    ar: string;
    ru: string;
    ja: string;
    ko: string;
    th: string;
    vi: string;
    id: string;
    hi: string;
    es: string;
    fr: string;
  };
  issueDate?: string; // Format: YYYY-MM-DD
  expiryDate?: string; // Format: YYYY-MM-DD or "N/A" for permanent certifications
  validityPeriod?: {
    en: string;
    zh: string;
    ar: string;
    ru: string;
    ja: string;
    ko: string;
    th: string;
    vi: string;
    id: string;
    hi: string;
    es: string;
    fr: string;
  };
  description: {
    en: string;
    zh: string;
    ar: string;
    ru: string;
    ja: string;
    ko: string;
    th: string;
    vi: string;
    id: string;
    hi: string;
    es: string;
    fr: string;
  };
  category: "Quality" | "Safety" | "Environmental" | "Compliance";
  logo?: string; // Path to certification logo
  certificateImage?: string; // Path to certificate image
};

