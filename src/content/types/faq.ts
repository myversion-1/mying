// FAQ types - shared between client and server
export type FAQCategory = 
  | "Product"
  | "Service"
  | "Shipping"
  | "Payment"
  | "Installation"
  | "Maintenance"
  | "Warranty"
  | "Other";

export type FAQ = {
  id: string;
  category: FAQCategory;
  question: {
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
  answer: {
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
  order: number; // Display order within category
};











