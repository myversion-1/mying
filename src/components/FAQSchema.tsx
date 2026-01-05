import type { Lang } from "./language";

interface FAQSchemaProps {
  lang?: Lang;
  baseUrl?: string;
}

/**
 * FAQ Schema for Voice Search Optimization
 * Helps Google understand common questions and provide featured snippets
 */
export function FAQSchema({ lang = "en", baseUrl = "https://mying.vercel.app" }: FAQSchemaProps) {
  // FAQ content in multiple languages
  const faqs: Record<Lang, Array<{ question: string; answer: string }>> = {
    en: [
      {
        question: "What types of amusement rides does Miying manufacture?",
        answer: "Miying manufactures a wide range of amusement rides including family rides, thrill rides, water rides, carousels, Ferris wheels, go-karts, bumper cars, trains, trampolines, and themed attractions. We also offer decorative items for amusement parks and entertainment centers.",
      },
      {
        question: "How do I request a quote for an amusement ride?",
        answer: "You can request a quote by visiting our quote page, filling out the contact form, or contacting us directly via WhatsApp at +86-131-1295-9561. We'll provide detailed pricing and layout suggestions based on your requirements.",
      },
      {
        question: "Can I visit the Miying factory before placing an order?",
        answer: "Yes, we encourage factory visits to verify our manufacturing capabilities and quality standards. You can schedule a factory visit through our visit page. We offer verified factory tours to help you make informed decisions.",
      },
      {
        question: "What safety certifications do Miying rides have?",
        answer: "All Miying amusement rides are factory-tested for safety and comply with international safety standards. We hold multiple patents and certifications ensuring the highest quality and safety standards for our products.",
      },
      {
        question: "Does Miying provide installation and after-sales support?",
        answer: "Yes, Miying provides comprehensive delivery, installation, and after-sales support services worldwide. Our team assists with installation guidance and offers ongoing maintenance support to ensure optimal performance of your amusement rides.",
      },
      {
        question: "What is the typical delivery time for amusement rides?",
        answer: "Delivery times vary based on the product type, customization requirements, and order quantity. Contact us for specific delivery timelines. We work with you to ensure timely delivery that meets your project schedule.",
      },
      {
        question: "Can Miying customize rides for specific themes or requirements?",
        answer: "Yes, Miying offers customization services for amusement rides to match specific themes, branding requirements, or venue constraints. Our consulting team works with you to design rides that fit your unique needs.",
      },
      {
        question: "What languages does Miying support for customer service?",
        answer: "Miying supports customer service in 11 languages: English, Chinese, Arabic, Russian, Japanese, Korean, Thai, Vietnamese, Indonesian, Hindi, and Spanish. Our team is ready to assist you in your preferred language.",
      },
    ],
    zh: [
      {
        question: "米盈制造哪些类型的游乐设备？",
        answer: "米盈制造多种类型的游乐设备，包括家庭游乐设备、刺激游乐设备、水上设备、旋转木马、摩天轮、卡丁车、碰碰车、小火车、蹦床和主题景点。我们还提供游乐园和娱乐中心的装饰物品。",
      },
      {
        question: "如何申请游乐设备报价？",
        answer: "您可以通过访问我们的报价页面、填写联系表单或直接通过WhatsApp联系我们（+86-131-1295-9561）来申请报价。我们将根据您的需求提供详细的价格和布局建议。",
      },
      {
        question: "我可以在下单前参观米盈工厂吗？",
        answer: "是的，我们鼓励工厂参观以验证我们的制造能力和质量标准。您可以通过我们的参观页面安排工厂访问。我们提供经过验证的工厂参观，帮助您做出明智的决定。",
      },
      {
        question: "米盈游乐设备有哪些安全认证？",
        answer: "所有米盈游乐设备都经过工厂安全测试，符合国际安全标准。我们拥有多项专利和认证，确保产品的最高质量和安全标准。",
      },
      {
        question: "米盈是否提供安装和售后服务？",
        answer: "是的，米盈在全球范围内提供全面的交付、安装和售后服务。我们的团队协助安装指导，并提供持续维护支持，确保您的游乐设备达到最佳性能。",
      },
    ],
    ar: [
      {
        question: "ما أنواع ألعاب الترفيه التي تصنعها Miying؟",
        answer: "تصنع Miying مجموعة واسعة من ألعاب الترفيه بما في ذلك ألعاب العائلة، وألعاب الإثارة، والألعاب المائية، والدواليب، والعجلات الدوارة، وسيارات الكارت، وسيارات الصدام، والقطارات، والترامبولين، والمعالم ذات الطابع الخاص.",
      },
    ],
    ru: [
      {
        question: "Какие типы аттракционов производит Miying?",
        answer: "Miying производит широкий спектр аттракционов, включая семейные аттракционы, экстремальные аттракционы, водные аттракционы, карусели, колеса обозрения, картинг, бамперные машинки, поезда, батуты и тематические достопримечательности.",
      },
    ],
    ja: [
      {
        question: "Miyingはどのような種類のアトラクションを製造していますか？",
        answer: "Miyingは、ファミリーアトラクション、スリルアトラクション、ウォーターアトラクション、メリーゴーラウンド、観覧車、ゴーカート、バンパーカー、列車、トランポリン、テーマアトラクションなど、幅広いアトラクションを製造しています。",
      },
    ],
    ko: [
      {
        question: "Miying는 어떤 종류의 놀이기구를 제조합니까?",
        answer: "Miying는 가족 놀이기구, 스릴 놀이기구, 워터 놀이기구, 회전목마, 대관람차, 고카트, 범퍼카, 기차, 트램폴린, 테마 어트랙션을 포함한 다양한 놀이기구를 제조합니다.",
      },
    ],
    th: [
      {
        question: "Miying ผลิตเครื่องเล่นประเภทใดบ้าง?",
        answer: "Miying ผลิตเครื่องเล่นหลากหลายประเภท รวมถึงเครื่องเล่นสำหรับครอบครัว เครื่องเล่นตื่นเต้น เครื่องเล่นน้ำ ม้าหมุน ชิงช้าสวรรค์ รถโกคาร์ท รถบั๊มเปอร์ รถไฟ กระโดด และสถานที่ท่องเที่ยวตามธีม",
      },
    ],
    vi: [
      {
        question: "Miying sản xuất những loại trò chơi giải trí nào?",
        answer: "Miying sản xuất nhiều loại trò chơi giải trí bao gồm trò chơi gia đình, trò chơi cảm giác mạnh, trò chơi nước, vòng quay ngựa gỗ, vòng quay khổng lồ, xe đua, xe đụng, tàu hỏa, nhảy bật và các điểm tham quan theo chủ đề.",
      },
    ],
    id: [
      {
        question: "Jenis wahana permainan apa yang diproduksi Miying?",
        answer: "Miying memproduksi berbagai jenis wahana permainan termasuk wahana keluarga, wahana ekstrem, wahana air, komedi putar, kincir raksasa, gokart, mobil bumper, kereta, trampolin, dan atraksi bertema.",
      },
    ],
    hi: [
      {
        question: "Miying किस प्रकार के मनोरंजन राइड्स का निर्माण करती है?",
        answer: "Miying परिवार राइड्स, रोमांचक राइड्स, जल राइड्स, कैरोसेल, फेरिस व्हील, गो-कार्ट, बम्पर कार, ट्रेन, ट्रैम्पोलिन और थीम्ड आकर्षण सहित विभिन्न प्रकार के मनोरंजन राइड्स का निर्माण करती है।",
      },
    ],
    es: [
      {
        question: "¿Qué tipos de atracciones fabrica Miying?",
        answer: "Miying fabrica una amplia gama de atracciones que incluyen atracciones familiares, atracciones de emociones, atracciones acuáticas, carruseles, norias, karts, autos chocadores, trenes, trampolines y atracciones temáticas.",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs[lang].map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}





