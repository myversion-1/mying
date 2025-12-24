import type { Lang } from "../components/language";

export type Product = {
  name: string;
  category: string;
  footprint: string;
  height: string;
  riders: string;
  status: "New" | "Used";
  year?: string;
  badge?: string;
};

export const products: Product[] = [
  {
    name: "Spinning Raft",
    category: "Water Ride",
    footprint: "30 x 20 m",
    height: "12 m",
    riders: "8 per raft",
    status: "Used",
    year: "2007",
    badge: "Latest addition",
  },
  {
    name: "Junior Coaster 247",
    category: "Roller Coaster",
    footprint: "247 m track",
    height: "15 m",
    riders: "24",
    status: "New",
  },
  {
    name: "XLR8 Transportable",
    category: "Thrill Ride",
    footprint: "18 x 12 m",
    height: "24 m",
    riders: "24",
    status: "Used",
  },
  {
    name: "Aerial Ropeway",
    category: "Transportable",
    footprint: "Custom",
    height: "Varies",
    riders: "4 per cabin",
    status: "Used",
  },
  {
    name: "Family Safari Coaster",
    category: "Family Ride",
    footprint: "36 x 18 m",
    height: "13 m",
    riders: "20",
    status: "New",
  },
  {
    name: "Giant Wheel 50m",
    category: "Ferris Wheel",
    footprint: "30 x 30 m",
    height: "50 m",
    riders: "240",
    status: "New",
    badge: "Flagship",
  },
];

export const services = [
  {
    title: "Purchasing & Agent Support",
    desc: "Guidance to source, evaluate, and negotiate new or used rides globally.",
  },
  {
    title: "Consulting",
    desc: "From selecting manufacturers to planning whole park lineups with compliance in mind.",
  },
  {
    title: "Appraisal",
    desc: "Accurate market assessments before you buy, sell, refinance, or transfer assets.",
  },
  {
    title: "Refurbishment",
    desc: "End-to-end refurbishment with factory testing and transparent timelines.",
  },
  {
    title: "Assembly & Installation",
    desc: "On-site assembly by experienced engineers to get you opening-day ready.",
  },
  {
    title: "Attraction Rentals",
    desc: "Short- and long-term ride rentals for parks and event agencies worldwide.",
  },
];

export function copy(lang: Lang) {
  if (lang === "es") {
    return {
      nav: {
        home: "Inicio",
        about: "Nosotros",
        services: "Servicios",
        products: "Productos",
        contact: "Contacto",
        visit: "Visita a fábrica",
      },
      cta: {
        primary: "Solicitar visita",
        secondary: "Ver productos",
      },
      hero: {
        title: "Atracciones confiables. Entregas globales.",
        subtitle:
          "Desde el diseño hasta la instalación, ayudamos a parques y recintos a lanzar atracciones que encantan al público, a tiempo y en presupuesto.",
        badge: "Seguridad validada en fábrica",
      },
      highlights: [
        "Envíos globales y cumplimiento normativo",
        "Seguridad probada en fábrica",
        "Experiencia en montaje y reacondicionamiento",
        "Soporte rápido y claro",
      ],
      servicesTitle: "Servicios especializados",
      productsTitle: "Catálogo destacado",
      contactTitle: "Conversemos de tu proyecto",
      contactSubtitle:
        "Envía tus planes y te responderemos con opciones, tiempos y próximos pasos.",
      verificationTitle: "Visita a fábrica (clientes verificados)",
      verificationSubtitle:
        "Solicita verificación. Al aprobarte, te enviamos un código único para agendar la visita.",
      bookingButton: "Mostrar agenda",
      codePlaceholder: "Código de verificación",
      verifyButton: "Verificar y mostrar agenda",
      wrongCode: "Código incorrecto. Revisa el email de verificación.",
      successCode: "Código aceptado. Elige tu horario a continuación.",
      form: {
        name: "Nombre",
        email: "Correo",
        phone: "Teléfono",
        country: "País",
        company: "Empresa",
        message: "Proyecto o rides de interés",
        submit: "Enviar",
      },
      footer: {
        rights: "© 2025 Miying. Todos los derechos reservados.",
      },
    };
  }

  return {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      products: "Products",
      contact: "Contact",
      visit: "Factory Visit",
    },
    cta: {
      primary: "Request Factory Visit",
      secondary: "View Products",
    },
    hero: {
      title: "Reliable Amusement Rides. Delivered Worldwide.",
      subtitle:
        "From design to installation, we help parks and venues launch crowd-pleasing attractions on time and on budget.",
      badge: "Factory-tested safety",
    },
    highlights: [
      "Global shipping & compliance",
      "Factory-tested safety",
      "Refurbishment & assembly expertise",
      "Fast, clear support",
    ],
    servicesTitle: "Specialized services",
    productsTitle: "Featured catalog",
    contactTitle: "Tell us about your project",
    contactSubtitle:
      "Send your plans and we’ll respond with options, timelines, and next steps.",
    verificationTitle: "Factory visit (verified clients)",
    verificationSubtitle:
      "Request verification. Once approved, we’ll send a one-time code to unlock booking.",
    bookingButton: "Show schedule",
    codePlaceholder: "Verification code",
    verifyButton: "Verify and show booking",
    wrongCode: "Invalid code. Check your verification email.",
    successCode: "Code accepted. Choose your slot below.",
    form: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      country: "Country",
      company: "Company",
      message: "Project details or rides of interest",
      submit: "Send",
    },
    footer: {
      rights: "© 2025 Miying. All rights reserved.",
    },
  };
}

