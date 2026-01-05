// Content type definitions

export type CopyContent = {
  nav: {
    home: string;
    about: string;
    services: string;
    products: string;
    cases: string;
    blog: string;
    contact: string;
    visit: string;
  };
  cta: {
    primary: string;
    secondary: string;
    whatsapp?: string;
    requestQuote?: string;
  };
  hero: {
    title: string;
    subtitle: string;
    badge: string;
  };
  highlights: string[];
  servicesTitle: string;
  servicesSubtitle: string;
  serviceLabel: string;
  productsTitle: string;
  productsSubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  verificationTitle: string;
  verificationSubtitle: string;
  bookingButton: string;
  codePlaceholder: string;
  verifyButton: string;
  wrongCode: string;
  successCode: string;
  form: {
    name: string;
    email: string;
    phone: string;
    country: string;
    company: string;
    message: string;
    submit: string;
  };
  footer: {
    rights: string;
  };
  productLabels: {
    footprint: string;
    height: string;
    riders: string;
    year: string;
    requestDetails: string;
  };
  productDecision: {
    idealFor: string;
    notRecommendedFor: string;
    venueRequirements: string;
    powerSupply: string;
    safetyCompliance: string;
    deliveryInstallation: string;
    afterSales: string;
    seeInAction: string;
    videoAvailable: string;
    whatsappResponse: string;
    contactForQuote: string;
  };
  contactPage: {
    whatToInclude: string;
    whatToIncludeItems: string[];
    needAssistance: string;
    loadingForm: string;
  };
  pageBadges: {
    leadCapture: string;
    serviceSuite: string;
    booking: string;
    catalog: string;
  };
  aboutPage: {
    manufacturingCapabilities: {
      title: string;
      subtitle: string;
      items: string[];
    };
    certifications: {
      title: string;
      subtitle: string;
    };
    patents: {
      title: string;
      subtitle: string;
    };
    factoryTour: {
      title: string;
      subtitle: string;
      videoTitle: string;
      galleryTitle: string;
      ctaText: string;
    };
    partnership: {
      title: string;
      subtitle: string;
      items: string[];
    };
  };
  customerService: {
    whatsapp: string;
    email: string;
    open: string;
    close: string;
    whatsappLabel: string;
    emailLabel: string;
  };
  patents: {
    title: string;
    subtitle: string;
  };
};

/**
 * Interface for localized SEO metadata
 * Supports 11 languages: en, zh, ar, ru, ja, ko, th, vi, id, hi, es
 */
export interface LocalizedSEO {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
}

/**
 * Global SEO configuration for static pages
 */
export interface SiteMetaContent {
  home: LocalizedSEO;
  about: LocalizedSEO;
  products: LocalizedSEO;
  services: LocalizedSEO;
  cases: LocalizedSEO;
  blog: LocalizedSEO;
  contact: LocalizedSEO;
  // Specific templates for dynamic routes
  productDetailTemplate: (name: string) => string;
  blogDetailTemplate: (title: string) => string;
}

