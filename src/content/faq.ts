import type { FAQ } from "./types/faq";
import type { Lang } from "../components/language";

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
  {
    id: "custom-lead-time",
    category: "Product",
    question: {
      en: "What is the typical lead time for custom amusement rides?",
      zh: "定制游乐设备的典型交货期是多少？",
    },
    answer: {
      en: "Lead times for custom amusement rides typically range from 60-90 days for standard customizations to 120-180 days for fully custom designs. Factors affecting lead time include design complexity, manufacturing capacity, and component availability. We provide detailed production schedules in your quote and keep you updated throughout the process.",
      zh: "定制游乐设备的交货期通常从标准定制的60-90天到完全定制设计的120-180天不等。影响交货期的因素包括设计复杂度、制造能力和组件可用性。我们会在报价中提供详细的生产计划，并在整个过程中及时更新。",
    },
    order: 1,
  },
  {
    id: "international-installation",
    category: "Installation",
    question: {
      en: "Do you provide installation and training services internationally?",
      zh: "你们是否在国际范围内提供安装和培训服务？",
    },
    answer: {
      en: "Yes, we provide installation and training services worldwide. Our experienced installation teams travel to your location to ensure proper setup and commissioning. We offer comprehensive operator training programs covering safety procedures, daily operations, and maintenance. Training can be conducted in multiple languages and includes both classroom instruction and hands-on practice.",
      zh: "是的，我们在全球范围内提供安装和培训服务。我们经验丰富的安装团队会前往您的现场，确保正确设置和调试。我们提供全面的操作员培训计划，涵盖安全程序、日常操作和维护。培训可以用多种语言进行，包括课堂指导和实践操作。",
    },
    order: 1,
  },
  {
    id: "financing-options",
    category: "Payment",
    question: {
      en: "What financing options are available for large orders?",
      zh: "大订单有哪些融资选择？",
    },
    answer: {
      en: "We offer flexible financing solutions for large orders including installment payment plans, trade credit, and partnerships with financial institutions. Payment terms can be structured as 30% deposit, 40% at production milestone, 20% before shipment, and 10% upon delivery. For orders over $500,000, we can arrange extended payment terms or leasing options. Contact our sales team to discuss customized financing solutions for your project.",
      zh: "我们为大订单提供灵活的融资解决方案，包括分期付款计划、贸易信贷以及与金融机构的合作。付款条件可以设置为30%定金、生产里程碑时40%、发货前20%和交付时10%。对于超过50万美元的订单，我们可以安排延长付款期限或租赁选项。请联系我们的销售团队讨论适合您项目的定制融资解决方案。",
    },
    order: 1,
  },
  {
    id: "roi-calculation",
    category: "Product",
    question: {
      en: "How do I calculate ROI for amusement park equipment?",
      zh: "如何计算游乐设备投资回报率？",
    },
    answer: {
      en: "ROI calculation for amusement rides considers initial investment, operating costs, revenue per ride cycle, daily throughput, and seasonal factors. Key metrics include: payback period (typically 12-24 months), annual revenue potential, and lifetime value. We provide a free ROI calculator tool that factors in your local market conditions, ticket pricing, and operating hours. Contact us to receive our ROI Calculator spreadsheet and consultation on revenue optimization strategies.",
      zh: "游乐设备的投资回报率计算考虑初始投资、运营成本、每次运行收入、每日吞吐量和季节性因素。关键指标包括：投资回收期（通常12-24个月）、年度收入潜力和生命周期价值。我们提供免费的ROI计算器工具，考虑您当地的市场条件、票价和运营时间。请联系我们获取ROI计算器电子表格和收入优化策略咨询。",
    },
    order: 1,
  },
  {
    id: "warranty-after-sales",
    category: "Warranty",
    question: {
      en: "What is your warranty and after-sales support policy?",
      zh: "你们的保修和售后服务政策是什么？",
    },
    answer: {
      en: "We provide a comprehensive 12-month warranty covering manufacturing defects, component failures, and structural issues. Warranty includes parts replacement and labor costs. Our after-sales support includes: 24/7 technical hotline, remote diagnostics, spare parts supply chain (10+ year availability), preventive maintenance programs, and on-site service visits when needed. Extended warranty options up to 3 years are available. We maintain a global network of service partners for faster response times.",
      zh: "我们提供全面的12个月保修，涵盖制造缺陷、组件故障和结构问题。保修包括零件更换和人工成本。我们的售后服务包括：24/7技术热线、远程诊断、备件供应链（10年以上可用性）、预防性维护计划以及需要时的现场服务访问。可提供长达3年的延长保修选项。我们维护全球服务合作伙伴网络，以加快响应时间。",
    },
    order: 1,
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
export function getLocalizedFAQ(faq: FAQ, lang: Lang): { question: string; answer: string } {
  // FAQ currently only supports en and zh, default to en for other languages
  let supportedLang: "en" | "zh";
  if (lang === "en" || lang === "zh") {
    supportedLang = lang;
  } else {
    supportedLang = "en";
  }
  const question = faq.question[supportedLang] ?? faq.question.en;
  const answer = faq.answer[supportedLang] ?? faq.answer.en;
  return { question, answer };
}



