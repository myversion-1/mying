import type { FAQ } from "./types/faq";

// FAQ data
export const faqs: FAQ[] = [
  {
    id: "product-quality",
    category: "Product",
    question: {
      en: "What quality standards do your rides meet?",
      zh: "您的游乐设备符合哪些质量标准？",
    },
    answer: {
      en: "All our rides meet international safety standards including EN 13814 (European standard) and ASTM F24 (American standard). We conduct factory testing before shipment and provide certification documents. Our rides are also CE certified for European markets.",
      zh: "我们所有的游乐设备都符合国际安全标准，包括 EN 13814（欧洲标准）和 ASTM F24（美国标准）。我们在发货前进行工厂测试并提供认证文件。我们的设备还获得了 CE 认证，适用于欧洲市场。",
    },
    order: 1,
  },
  {
    id: "custom-design",
    category: "Service",
    question: {
      en: "Do you offer custom design services?",
      zh: "你们提供定制设计服务吗？",
    },
    answer: {
      en: "Yes, we offer comprehensive custom design services. Our team can work with you to create rides tailored to your space constraints, theme requirements, and target audience. We provide 3D renderings, technical drawings, and detailed specifications before manufacturing.",
      zh: "是的，我们提供全面的定制设计服务。我们的团队可以与您合作，根据您的空间限制、主题要求和目标受众创建定制游乐设备。我们在制造前提供 3D 渲染、技术图纸和详细规格。",
    },
    order: 1,
  },
  {
    id: "shipping-time",
    category: "Shipping",
    question: {
      en: "How long does shipping take?",
      zh: "运输需要多长时间？",
    },
    answer: {
      en: "Shipping time depends on the destination and product complexity. Typically, standard rides take 30-45 days for production and 15-30 days for shipping. Custom designs may take 60-90 days. We provide detailed timelines in your quote.",
      zh: "运输时间取决于目的地和产品复杂度。通常，标准游乐设备的生产需要 30-45 天，运输需要 15-30 天。定制设计可能需要 60-90 天。我们会在报价中提供详细的时间表。",
    },
    order: 1,
  },
  {
    id: "payment-terms",
    category: "Payment",
    question: {
      en: "What are your payment terms?",
      zh: "付款条件是什么？",
    },
    answer: {
      en: "We offer flexible payment terms: typically 30% deposit upon order confirmation, 60% before shipment, and 10% upon delivery and installation completion. We accept T/T, L/C, and other secure payment methods. Terms can be negotiated based on order size and project requirements.",
      zh: "我们提供灵活的付款条件：通常在订单确认时支付 30% 定金，发货前支付 60%，交付和安装完成后支付 10%。我们接受电汇、信用证和其他安全付款方式。条件可根据订单规模和项目要求协商。",
    },
    order: 1,
  },
  {
    id: "installation-support",
    category: "Installation",
    question: {
      en: "Do you provide installation services?",
      zh: "你们提供安装服务吗？",
    },
    answer: {
      en: "Yes, we provide professional installation services. Our experienced technicians can travel to your location to install and commission the rides. We also provide detailed installation manuals and video guides. Installation training for your staff is available upon request.",
      zh: "是的，我们提供专业安装服务。我们经验丰富的技术人员可以前往您的现场进行安装和调试。我们还提供详细的安装手册和视频指南。可根据要求为您的员工提供安装培训。",
    },
    order: 1,
  },
  {
    id: "warranty",
    category: "Warranty",
    question: {
      en: "What warranty do you provide?",
      zh: "你们提供什么保修？",
    },
    answer: {
      en: "We provide a comprehensive warranty covering manufacturing defects and component failures. Standard warranty is 12 months from delivery, covering parts and labor. Extended warranty options are available. We also provide lifetime technical support and spare parts availability.",
      zh: "我们提供全面的保修，涵盖制造缺陷和组件故障。标准保修期为交付后 12 个月，包括零件和人工。可提供延长保修选项。我们还提供终身技术支持和备件供应。",
    },
    order: 1,
  },
  {
    id: "maintenance",
    category: "Maintenance",
    question: {
      en: "What maintenance is required?",
      zh: "需要什么维护？",
    },
    answer: {
      en: "Regular maintenance includes daily inspections, weekly lubrication, monthly safety checks, and annual comprehensive inspections. We provide detailed maintenance manuals and can offer remote support or on-site maintenance services. Spare parts are readily available.",
      zh: "定期维护包括每日检查、每周润滑、每月安全检查以及年度全面检查。我们提供详细的维护手册，并可提供远程支持或现场维护服务。备件随时可用。",
    },
    order: 1,
  },
  {
    id: "factory-visit",
    category: "Service",
    question: {
      en: "Can we visit your factory?",
      zh: "我们可以参观您的工厂吗？",
    },
    answer: {
      en: "Absolutely! We welcome factory visits and encourage potential clients to see our manufacturing process, quality control, and existing ride installations. Please contact us to schedule a visit. We can arrange transportation and accommodation assistance.",
      zh: "当然可以！我们欢迎工厂参观，并鼓励潜在客户了解我们的制造流程、质量控制和现有设备安装。请联系我们安排参观。我们可以协助安排交通和住宿。",
    },
    order: 2,
  },
];

// Helper function to get FAQs by category
export function getFAQsByCategory(category?: FAQ["category"]): FAQ[] {
  if (!category) return faqs.sort((a, b) => a.order - b.order);
  return faqs
    .filter((faq) => faq.category === category)
    .sort((a, b) => a.order - b.order);
}

// Helper function to get localized FAQ
export function getLocalizedFAQ(faq: FAQ, lang: string): { question: string; answer: string } {
  const question = faq.question[lang as keyof typeof faq.question] || faq.question.en;
  const answer = faq.answer[lang as keyof typeof faq.answer] || faq.answer.en;
  return { question, answer };
}



