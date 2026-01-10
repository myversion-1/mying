import type { Lang } from "./language";

interface HowToSchemaProps {
  lang?: Lang;
  baseUrl?: string;
}

/**
 * HowTo Schema for Voice Search Optimization
 * Helps Google understand step-by-step processes for featured snippets
 */
export function HowToSchema({ lang = "en", baseUrl = "https://mying.vercel.app" }: HowToSchemaProps) {
  // HowTo content in multiple languages
  const howTos: Record<Lang, Array<{
    name: string;
    description: string;
    steps: Array<{ name: string; text: string; url?: string }>;
  }>> = {
    en: [
      {
        name: "How to Order Amusement Rides from Miying",
        description: "Step-by-step guide to ordering amusement rides from Miying Amusement Equipment",
        steps: [
          {
            name: "Browse Products",
            text: "Visit our products page to explore our wide range of amusement rides including family rides, thrill rides, water rides, and decorative items.",
            url: `${baseUrl}/products`,
          },
          {
            name: "Select Your Products",
            text: "Choose the amusement rides that match your venue requirements, target audience, and budget. Review product specifications, safety compliance, and ideal use cases.",
            url: `${baseUrl}/products`,
          },
          {
            name: "Request a Quote",
            text: "Fill out our quote request form with your product selections, quantity, and specific requirements. Our team will provide detailed pricing and layout suggestions.",
            url: `${baseUrl}/quote`,
          },
          {
            name: "Schedule Factory Visit (Optional)",
            text: "Schedule a factory visit to verify our manufacturing capabilities, quality standards, and see the rides in production. This helps ensure you're making the right choice.",
            url: `${baseUrl}/visit`,
          },
          {
            name: "Review and Confirm",
            text: "Review the quote, discuss customization options, delivery timelines, and installation requirements with our team.",
          },
          {
            name: "Place Order",
            text: "Confirm your order and proceed with payment. Our team will coordinate production, quality testing, and delivery logistics.",
          },
          {
            name: "Delivery and Installation",
            text: "Receive your amusement rides with our delivery and installation support. Our team provides guidance for optimal setup and safety compliance.",
          },
        ],
      },
      {
        name: "How to Visit Miying Factory",
        description: "Guide to scheduling and preparing for a factory visit to verify manufacturing capabilities",
        steps: [
          {
            name: "Request Visit",
            text: "Fill out the factory visit request form on our visit page with your preferred dates and contact information.",
            url: `${baseUrl}/visit`,
          },
          {
            name: "Receive Confirmation",
            text: "Our team will confirm your visit date and provide detailed information about the factory location, transportation options, and what to expect during the tour.",
          },
          {
            name: "Prepare for Visit",
            text: "Review our product catalog, prepare questions about specific rides, and bring any documentation or requirements you'd like to discuss.",
          },
          {
            name: "Factory Tour",
            text: "During the visit, you'll see our manufacturing facilities, quality control processes, and rides in various stages of production. You can also discuss customization options.",
          },
          {
            name: "Follow-up",
            text: "After the visit, our team will follow up with any additional information, quotes, or next steps based on your requirements.",
          },
        ],
      },
    ],
    zh: [
      {
        name: "如何从米盈订购游乐设备",
        description: "从米盈游乐设备订购游乐设备的逐步指南",
        steps: [
          {
            name: "浏览产品",
            text: "访问我们的产品页面，探索我们广泛的游乐设备系列，包括家庭游乐设备、刺激设备、水上设备和装饰物品。",
            url: `${baseUrl}/products`,
          },
          {
            name: "选择产品",
            text: "选择符合您场地要求、目标受众和预算的游乐设备。查看产品规格、安全合规性和理想使用场景。",
            url: `${baseUrl}/products`,
          },
          {
            name: "申请报价",
            text: "填写我们的报价申请表，包括产品选择、数量和具体要求。我们的团队将提供详细的价格和布局建议。",
            url: `${baseUrl}/quote`,
          },
          {
            name: "安排工厂参观（可选）",
            text: "安排工厂参观以验证我们的制造能力、质量标准并查看生产中的设备。这有助于确保您做出正确的选择。",
            url: `${baseUrl}/visit`,
          },
          {
            name: "审查和确认",
            text: "审查报价，与我们的团队讨论定制选项、交付时间表和安装要求。",
          },
          {
            name: "下订单",
            text: "确认您的订单并付款。我们的团队将协调生产、质量测试和交付物流。",
          },
          {
            name: "交付和安装",
            text: "通过我们的交付和安装支持接收您的游乐设备。我们的团队提供最佳设置和安全合规性指导。",
          },
        ],
      },
    ],
    ar: [
      {
        name: "كيفية طلب ألعاب الترفيه من Miying",
        description: "دليل خطوة بخطوة لطلب ألعاب الترفيه من Miying",
        steps: [
          {
            name: "تصفح المنتجات",
            text: "قم بزيارة صفحة المنتجات لاستكشاف مجموعة واسعة من ألعاب الترفيه.",
            url: `${baseUrl}/products`,
          },
        ],
      },
    ],
    ru: [
      {
        name: "Как заказать аттракционы у Miying",
        description: "Пошаговое руководство по заказу аттракционов у Miying",
        steps: [
          {
            name: "Просмотр продуктов",
            text: "Посетите нашу страницу продуктов, чтобы изучить широкий ассортимент аттракционов.",
            url: `${baseUrl}/products`,
          },
        ],
      },
    ],
    ja: [
      {
        name: "Miyingからアトラクションを注文する方法",
        description: "Miyingからアトラクションを注文するためのステップバイステップガイド",
        steps: [
          {
            name: "製品を閲覧",
            text: "製品ページにアクセスして、幅広いアトラクションを探索します。",
            url: `${baseUrl}/products`,
          },
        ],
      },
    ],
    ko: [
      {
        name: "Miying에서 놀이기구 주문하는 방법",
        description: "Miying에서 놀이기구를 주문하는 단계별 가이드",
        steps: [
          {
            name: "제품 둘러보기",
            text: "제품 페이지를 방문하여 다양한 놀이기구를 탐색합니다.",
            url: `${baseUrl}/products`,
          },
        ],
      },
    ],
    th: [
      {
        name: "วิธีสั่งซื้อเครื่องเล่นจาก Miying",
        description: "คู่มือทีละขั้นตอนในการสั่งซื้อเครื่องเล่นจาก Miying",
        steps: [
          {
            name: "เรียกดูผลิตภัณฑ์",
            text: "เยี่ยมชมหน้าผลิตภัณฑ์เพื่อสำรวจเครื่องเล่นที่หลากหลาย",
            url: `${baseUrl}/products`,
          },
        ],
      },
    ],
    vi: [
      {
        name: "Cách đặt hàng trò chơi giải trí từ Miying",
        description: "Hướng dẫn từng bước để đặt hàng trò chơi giải trí từ Miying",
        steps: [
          {
            name: "Duyệt sản phẩm",
            text: "Truy cập trang sản phẩm để khám phá nhiều loại trò chơi giải trí",
            url: `${baseUrl}/products`,
          },
        ],
      },
    ],
    id: [
      {
        name: "Cara Memesan Wahana Permainan dari Miying",
        description: "Panduan langkah demi langkah untuk memesan wahana permainan dari Miying",
        steps: [
          {
            name: "Jelajahi Produk",
            text: "Kunjungi halaman produk kami untuk menjelajahi berbagai wahana permainan",
            url: `${baseUrl}/products`,
          },
        ],
      },
    ],
    hi: [
      {
        name: "Miying से मनोरंजन राइड्स कैसे ऑर्डर करें",
        description: "Miying से मनोरंजन राइड्स ऑर्डर करने के लिए चरण-दर-चरण गाइड",
        steps: [
          {
            name: "उत्पाद ब्राउज़ करें",
            text: "विभिन्न प्रकार के मनोरंजन राइड्स का अन्वेषण करने के लिए हमारे उत्पाद पृष्ठ पर जाएं",
            url: `${baseUrl}/products`,
          },
        ],
      },
    ],
    es: [
      {
        name: "Cómo pedir atracciones de Miying",
        description: "Guía paso a paso para pedir atracciones de Miying",
        steps: [
          {
            name: "Explorar productos",
            text: "Visite nuestra página de productos para explorar una amplia gama de atracciones",
            url: `${baseUrl}/products`,
          },
        ],
      },
    ],
  };

  return (
    <>
      {howTos[lang].map((howTo, index) => {
        const howToSchema = {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: howTo.name,
          description: howTo.description,
          step: howTo.steps.map((step, stepIndex) => ({
            "@type": "HowToStep",
            position: stepIndex + 1,
            name: step.name,
            text: step.text,
            ...(step.url && { url: step.url }),
          })),
        };

        return (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
          />
        );
      })}
    </>
  );
}











