// Content type definitions

export type CopyContent = {
  nav: {
    home: string;
    about: string;
    services: string;
    products: string;
    contact: string;
    visit: string;
  };
  cta: {
    primary: string;
    secondary: string;
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
};

