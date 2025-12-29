import type { Lang } from "../components/language";
import { productsMultilingual, getLocalizedProduct, type ProductMultilingual } from "./products_multilingual";
import { getLocalizedServices, services as defaultServices } from "./services_multilingual";

export type Product = {
  name: string;
  category: string;
  footprint: string;
  height: string;
  riders: string;
  status: "New" | "Used";
  year?: string;
  badge?: string;
  image?: string; // Path to image in /public folder (e.g., "/products/product-name.jpg")
};

// Get localized products based on language
export function getProducts(lang: Lang): Product[] {
  return productsMultilingual.map(p => getLocalizedProduct(p, lang));
}

// Export products array for backward compatibility (defaults to English)
export const products: Product[] = getProducts("en");

// Legacy products array removed - now using productsMultilingual from products_multilingual.ts
// Use getProducts(lang) to get localized products

// Get localized services based on language
export function getServices(lang: Lang) {
  return getLocalizedServices(lang);
}

// Export services array for backward compatibility (defaults to English)
export const services = defaultServices;

export function copy(lang: Lang) {
  if (lang === "ar") {
    return {
      nav: {
        home: "الرئيسية",
        about: "من نحن",
        services: "الخدمات",
        products: "المنتجات",
        contact: "اتصل بنا",
        visit: "زيارة المصنع",
      },
      cta: {
        primary: "طلب زيارة",
        secondary: "عرض المنتجات",
      },
      hero: {
        title: "ألعاب ترفيهية موثوقة. توصيل عالمي.",
        subtitle:
          "من التصميم إلى التثبيت، نساعد المتنزهات والأماكن على إطلاق جاذبية تحظى بإعجاب الجماهير في الوقت المحدد وفي الميزانية.",
        badge: "سلامة مختبرة في المصنع",
      },
      highlights: [
        "الشحن العالمي والامتثال",
        "سلامة مختبرة في المصنع",
        "خبرة في الترميم والتجميع",
        "دعم سريع وواضح",
      ],
      servicesTitle: "خدمات متخصصة",
      servicesSubtitle: "الاستشارات والتوريد والترميم والتجميع للجاذبيات في جميع أنحاء العالم.",
      serviceLabel: "خدمة",
      productsTitle: "كتالوج مميز",
      productsSubtitle: "ألعاب ممثلة؛ اطلب المواصفات لمشروعك.",
      contactTitle: "أخبرنا عن مشروعك",
      contactSubtitle:
        "أرسل خططك وسنرد بالخيارات والجداول الزمنية والخطوات التالية.",
      verificationTitle: "زيارة المصنع (عملاء موثقون)",
      verificationSubtitle:
        "اطلب التحقق. بعد الموافقة، سنرسل رمزًا لمرة واحدة لإلغاء قفل الحجز.",
      bookingButton: "عرض الجدول",
      codePlaceholder: "رمز التحقق",
      verifyButton: "التحقق وعرض الحجز",
      wrongCode: "رمز غير صحيح. تحقق من بريد التحقق الخاص بك.",
      successCode: "تم قبول الرمز. اختر الفترة الزمنية أدناه.",
      form: {
        name: "الاسم",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        country: "البلد",
        company: "الشركة",
        message: "تفاصيل المشروع أو الألعاب المهتمة",
        submit: "إرسال",
      },
      footer: {
        rights: "© 2025 Miying. جميع الحقوق محفوظة.",
      },
      productLabels: {
        footprint: "المساحة",
        height: "الارتفاع",
        riders: "الركاب",
        year: "السنة",
        requestDetails: "طلب التفاصيل",
      },
    };
  }
  
  if (lang === "ru") {
    return {
      nav: {
        home: "Главная",
        about: "О нас",
        services: "Услуги",
        products: "Продукция",
        contact: "Контакты",
        visit: "Посещение завода",
      },
      cta: {
        primary: "Запросить посещение",
        secondary: "Посмотреть продукцию",
      },
      hero: {
        title: "Надежные аттракционы. Доставка по всему миру.",
        subtitle:
          "От проектирования до установки, мы помогаем паркам и площадкам запускать популярные аттракционы вовремя и в рамках бюджета.",
        badge: "Безопасность, проверенная на заводе",
      },
      highlights: [
        "Глобальная доставка и соответствие требованиям",
        "Безопасность, проверенная на заводе",
        "Экспертиза в реставрации и сборке",
        "Быстрая и понятная поддержка",
      ],
      servicesTitle: "Специализированные услуги",
      servicesSubtitle: "Консультации, закупки, реставрация и сборка аттракционов по всему миру.",
      serviceLabel: "Услуга",
      productsTitle: "Рекомендуемый каталог",
      productsSubtitle: "Представительные аттракционы; запросите спецификации для вашего проекта.",
      contactTitle: "Расскажите нам о вашем проекте",
      contactSubtitle:
        "Отправьте ваши планы, и мы ответим с вариантами, сроками и следующими шагами.",
      verificationTitle: "Посещение завода (проверенные клиенты)",
      verificationSubtitle:
        "Запросите проверку. После одобрения мы отправим одноразовый код для разблокировки бронирования.",
      bookingButton: "Показать расписание",
      codePlaceholder: "Код верификации",
      verifyButton: "Проверить и показать бронирование",
      wrongCode: "Неверный код. Проверьте ваше письмо с верификацией.",
      successCode: "Код принят. Выберите слот ниже.",
      form: {
        name: "Имя",
        email: "Email",
        phone: "Телефон",
        country: "Страна",
        company: "Компания",
        message: "Детали проекта или интересующие аттракционы",
        submit: "Отправить",
      },
      footer: {
        rights: "© 2025 Miying. Все права защищены.",
      },
      productLabels: {
        footprint: "Площадь",
        height: "Высота",
        riders: "Пассажиры",
        year: "Год",
        requestDetails: "Запросить детали",
      },
    };
  }
  
  if (lang === "zh") {
    return {
      nav: {
        home: "首页",
        about: "关于我们",
        services: "服务",
        products: "产品",
        contact: "联系我们",
        visit: "工厂参观",
      },
      cta: {
        primary: "申请参观",
        secondary: "查看产品",
      },
      hero: {
        title: "可靠的游乐设备。全球交付。",
        subtitle:
          "从设计到安装，我们帮助游乐园和场馆及时、按预算推出受欢迎的游乐设施。",
        badge: "工厂测试安全",
      },
      highlights: [
        "全球运输与合规",
        "工厂测试安全",
        "翻新与组装专业服务",
        "快速、清晰的支持",
      ],
      servicesTitle: "专业服务",
      servicesSubtitle: "为全球景点提供咨询、采购、翻新和组装服务。",
      serviceLabel: "服务",
      productsTitle: "精选目录",
      productsSubtitle: "代表性游乐设备；为您的项目请求规格。",
      contactTitle: "告诉我们您的项目",
      contactSubtitle:
        "发送您的计划，我们将回复选项、时间表和后续步骤。",
      verificationTitle: "工厂参观（已验证客户）",
      verificationSubtitle:
        "申请验证。批准后，我们将发送一次性代码以解锁预约。",
      bookingButton: "显示时间表",
      codePlaceholder: "验证码",
      verifyButton: "验证并显示预约",
      wrongCode: "代码无效。请检查您的验证邮件。",
      successCode: "代码已接受。请在下方选择时间段。",
      form: {
        name: "姓名",
        email: "邮箱",
        phone: "电话",
        country: "国家",
        company: "公司",
        message: "项目详情或感兴趣的设备",
        submit: "发送",
      },
      footer: {
        rights: "© 2025 Miying. 保留所有权利。",
      },
      productLabels: {
        footprint: "占地面积",
        height: "高度",
        riders: "载客数",
        year: "年份",
        requestDetails: "请求详情",
      },
    };
  }
  
  if (lang === "ja") {
    return {
      nav: {
        home: "ホーム",
        about: "会社概要",
        services: "サービス",
        products: "製品",
        contact: "お問い合わせ",
        visit: "工場見学",
      },
      cta: {
        primary: "工場見学を申し込む",
        secondary: "製品を見る",
      },
      hero: {
        title: "信頼できるアトラクション。世界中に配送。",
        subtitle:
          "設計から設置まで、パークや会場が予算内で時間通りに人気のアトラクションを立ち上げるお手伝いをします。",
        badge: "工場でテスト済みの安全性",
      },
      highlights: [
        "グローバル配送とコンプライアンス",
        "工場でテスト済みの安全性",
        "改修と組立の専門知識",
        "迅速で明確なサポート",
      ],
      servicesTitle: "専門サービス",
      servicesSubtitle: "世界中のアトラクション向けのコンサルティング、調達、改修、組立。",
      serviceLabel: "サービス",
      productsTitle: "おすすめカタログ",
      productsSubtitle: "代表的なアトラクション；プロジェクトの仕様をリクエストしてください。",
      contactTitle: "プロジェクトについてお聞かせください",
      contactSubtitle:
        "計画を送信していただければ、オプション、タイムライン、次のステップをお返しします。",
      verificationTitle: "工場見学（認証済みクライアント）",
      verificationSubtitle:
        "認証をリクエストしてください。承認後、予約を解除するためのワンタイムコードを送信します。",
      bookingButton: "スケジュールを表示",
      codePlaceholder: "認証コード",
      verifyButton: "認証して予約を表示",
      wrongCode: "コードが無効です。認証メールを確認してください。",
      successCode: "コードが承認されました。下から時間枠を選択してください。",
      form: {
        name: "お名前",
        email: "メールアドレス",
        phone: "電話番号",
        country: "国",
        company: "会社名",
        message: "プロジェクトの詳細または興味のあるアトラクション",
        submit: "送信",
      },
      footer: {
        rights: "© 2025 Miying. 全著作権所有。",
      },
    };
  }
  
  if (lang === "ko") {
    return {
      nav: {
        home: "홈",
        about: "회사 소개",
        services: "서비스",
        products: "제품",
        contact: "문의하기",
        visit: "공장 방문",
      },
      cta: {
        primary: "공장 방문 요청",
        secondary: "제품 보기",
      },
      hero: {
        title: "신뢰할 수 있는 놀이기구. 전 세계 배송.",
        subtitle:
          "디자인부터 설치까지, 우리는 공원과 장소가 예산 내에서 시간에 맞춰 인기 있는 어트랙션을 시작할 수 있도록 도와드립니다.",
        badge: "공장 테스트 안전성",
      },
      highlights: [
        "글로벌 배송 및 규정 준수",
        "공장 테스트 안전성",
        "리모델링 및 조립 전문성",
        "빠르고 명확한 지원",
      ],
      servicesTitle: "전문 서비스",
      servicesSubtitle: "전 세계 어트랙션을 위한 컨설팅, 조달, 개조 및 조립.",
      serviceLabel: "서비스",
      productsTitle: "추천 카탈로그",
      productsSubtitle: "대표적인 놀이기구；프로젝트 사양을 요청하세요.",
      contactTitle: "프로젝트에 대해 알려주세요",
      contactSubtitle:
        "계획을 보내주시면 옵션, 타임라인 및 다음 단계를 답변드리겠습니다.",
      verificationTitle: "공장 방문 (인증된 고객)",
      verificationSubtitle:
        "인증을 요청하세요. 승인되면 예약을 잠금 해제하는 일회용 코드를 보내드립니다.",
      bookingButton: "일정 표시",
      codePlaceholder: "인증 코드",
      verifyButton: "인증하고 예약 표시",
      wrongCode: "코드가 유효하지 않습니다. 인증 이메일을 확인하세요.",
      successCode: "코드가 승인되었습니다. 아래에서 시간대를 선택하세요.",
      form: {
        name: "이름",
        email: "이메일",
        phone: "전화번호",
        country: "국가",
        company: "회사",
        message: "프로젝트 세부사항 또는 관심 있는 놀이기구",
        submit: "보내기",
      },
      footer: {
        rights: "© 2025 Miying. 모든 권리 보유.",
      },
    };
  }
  
  if (lang === "th") {
    return {
      nav: {
        home: "หน้าแรก",
        about: "เกี่ยวกับเรา",
        services: "บริการ",
        products: "ผลิตภัณฑ์",
        contact: "ติดต่อ",
        visit: "เยี่ยมชมโรงงาน",
      },
      cta: {
        primary: "ขอเยี่ยมชมโรงงาน",
        secondary: "ดูผลิตภัณฑ์",
      },
      hero: {
        title: "เครื่องเล่นที่น่าเชื่อถือ ส่งทั่วโลก",
        subtitle:
          "ตั้งแต่การออกแบบไปจนถึงการติดตั้ง เราช่วยให้สวนสนุกและสถานที่เปิดตัวเครื่องเล่นที่ได้รับความนิยมตรงเวลาและตามงบประมาณ",
        badge: "ความปลอดภัยที่ทดสอบในโรงงาน",
      },
      highlights: [
        "การจัดส่งทั่วโลกและการปฏิบัติตามกฎระเบียบ",
        "ความปลอดภัยที่ทดสอบในโรงงาน",
        "ความเชี่ยวชาญในการปรับปรุงและประกอบ",
        "การสนับสนุนที่รวดเร็วและชัดเจน",
      ],
      servicesTitle: "บริการเฉพาะทาง",
      servicesSubtitle: "การให้คำปรึกษา การจัดหา การปรับปรุง และการประกอบสำหรับสถานที่ท่องเที่ยวทั่วโลก",
      serviceLabel: "บริการ",
      productsTitle: "แคตตาล็อกแนะนำ",
      productsSubtitle: "เครื่องเล่นตัวแทน；ขอข้อมูลจำเพาะสำหรับโครงการของคุณ",
      contactTitle: "บอกเราเกี่ยวกับโครงการของคุณ",
      contactSubtitle:
        "ส่งแผนของคุณมา เราจะตอบกลับพร้อมตัวเลือก ไทม์ไลน์ และขั้นตอนถัดไป",
      verificationTitle: "เยี่ยมชมโรงงาน (ลูกค้าที่ยืนยันแล้ว)",
      verificationSubtitle:
        "ขอการยืนยัน เมื่ออนุมัติแล้ว เราจะส่งรหัสใช้ครั้งเดียวเพื่อปลดล็อกการจอง",
      bookingButton: "แสดงตารางเวลา",
      codePlaceholder: "รหัสยืนยัน",
      verifyButton: "ยืนยันและแสดงการจอง",
      wrongCode: "รหัสไม่ถูกต้อง ตรวจสอบอีเมลยืนยันของคุณ",
      successCode: "รหัสได้รับการยอมรับ เลือกช่วงเวลาด้านล่าง",
      form: {
        name: "ชื่อ",
        email: "อีเมล",
        phone: "โทรศัพท์",
        country: "ประเทศ",
        company: "บริษัท",
        message: "รายละเอียดโครงการหรือเครื่องเล่นที่สนใจ",
        submit: "ส่ง",
      },
      footer: {
        rights: "© 2025 Miying. สงวนลิขสิทธิ์",
      },
    };
  }
  
  if (lang === "vi") {
    return {
      nav: {
        home: "Trang chủ",
        about: "Về chúng tôi",
        services: "Dịch vụ",
        products: "Sản phẩm",
        contact: "Liên hệ",
        visit: "Tham quan nhà máy",
      },
      cta: {
        primary: "Yêu cầu tham quan",
        secondary: "Xem sản phẩm",
      },
      hero: {
        title: "Trò chơi giải trí đáng tin cậy. Giao hàng toàn cầu.",
        subtitle:
          "Từ thiết kế đến lắp đặt, chúng tôi giúp các công viên và địa điểm khởi động các điểm tham quan thu hút đám đông đúng thời hạn và trong ngân sách.",
        badge: "An toàn đã được kiểm tra tại nhà máy",
      },
      highlights: [
        "Vận chuyển toàn cầu & tuân thủ",
        "An toàn đã được kiểm tra tại nhà máy",
        "Chuyên môn về cải tạo & lắp ráp",
        "Hỗ trợ nhanh chóng, rõ ràng",
      ],
      servicesTitle: "Dịch vụ chuyên biệt",
      servicesSubtitle: "Tư vấn, tìm nguồn cung, cải tạo và lắp ráp cho các điểm tham quan trên toàn thế giới.",
      serviceLabel: "Dịch vụ",
      productsTitle: "Danh mục nổi bật",
      productsSubtitle: "Trò chơi đại diện；yêu cầu thông số kỹ thuật cho dự án của bạn.",
      contactTitle: "Cho chúng tôi biết về dự án của bạn",
      contactSubtitle:
        "Gửi kế hoạch của bạn và chúng tôi sẽ phản hồi với các tùy chọn, thời gian biểu và các bước tiếp theo.",
      verificationTitle: "Tham quan nhà máy (khách hàng đã xác minh)",
      verificationSubtitle:
        "Yêu cầu xác minh. Sau khi được phê duyệt, chúng tôi sẽ gửi mã một lần để mở khóa đặt chỗ.",
      bookingButton: "Hiển thị lịch trình",
      codePlaceholder: "Mã xác minh",
      verifyButton: "Xác minh và hiển thị đặt chỗ",
      wrongCode: "Mã không hợp lệ. Vui lòng kiểm tra email xác minh của bạn.",
      successCode: "Mã đã được chấp nhận. Chọn khung thời gian bên dưới.",
      form: {
        name: "Tên",
        email: "Email",
        phone: "Điện thoại",
        country: "Quốc gia",
        company: "Công ty",
        message: "Chi tiết dự án hoặc trò chơi quan tâm",
        submit: "Gửi",
      },
      footer: {
        rights: "© 2025 Miying. Bảo lưu mọi quyền.",
      },
    };
  }
  
  if (lang === "id") {
    return {
      nav: {
        home: "Beranda",
        about: "Tentang Kami",
        services: "Layanan",
        products: "Produk",
        contact: "Kontak",
        visit: "Kunjungan Pabrik",
      },
      cta: {
        primary: "Minta Kunjungan",
        secondary: "Lihat Produk",
      },
      hero: {
        title: "Wahana yang Terpercaya. Pengiriman Global.",
        subtitle:
          "Dari desain hingga instalasi, kami membantu taman hiburan dan venue meluncurkan atraksi yang disukai pengunjung tepat waktu dan sesuai anggaran.",
        badge: "Keamanan teruji di pabrik",
      },
      highlights: [
        "Pengiriman global & kepatuhan",
        "Keamanan teruji di pabrik",
        "Keahlian perbaikan & perakitan",
        "Dukungan cepat dan jelas",
      ],
      servicesTitle: "Layanan khusus",
      servicesSubtitle: "Konsultasi, pengadaan, perbaikan, dan perakitan untuk atraksi di seluruh dunia.",
      serviceLabel: "Layanan",
      productsTitle: "Katalog unggulan",
      productsSubtitle: "Wahana perwakilan；minta spesifikasi untuk proyek Anda.",
      contactTitle: "Ceritakan tentang proyek Anda",
      contactSubtitle:
        "Kirim rencana Anda dan kami akan merespons dengan opsi, timeline, dan langkah selanjutnya.",
      verificationTitle: "Kunjungan pabrik (klien terverifikasi)",
      verificationSubtitle:
        "Minta verifikasi. Setelah disetujui, kami akan mengirim kode satu kali untuk membuka kunci pemesanan.",
      bookingButton: "Tampilkan jadwal",
      codePlaceholder: "Kode verifikasi",
      verifyButton: "Verifikasi dan tampilkan pemesanan",
      wrongCode: "Kode tidak valid. Periksa email verifikasi Anda.",
      successCode: "Kode diterima. Pilih slot waktu di bawah ini.",
      form: {
        name: "Nama",
        email: "Email",
        phone: "Telepon",
        country: "Negara",
        company: "Perusahaan",
        message: "Detail proyek atau wahana yang diminati",
        submit: "Kirim",
      },
      footer: {
        rights: "© 2025 Miying. Hak cipta dilindungi.",
      },
    };
  }
  
  if (lang === "hi") {
    return {
      nav: {
        home: "होम",
        about: "हमारे बारे में",
        services: "सेवाएं",
        products: "उत्पाद",
        contact: "संपर्क करें",
        visit: "कारखाना दौरा",
      },
      cta: {
        primary: "दौरे का अनुरोध करें",
        secondary: "उत्पाद देखें",
      },
      hero: {
        title: "विश्वसनीय मनोरंजन राइड्स। वैश्विक डिलीवरी।",
        subtitle:
          "डिज़ाइन से स्थापना तक, हम पार्कों और वेन्यू को समय पर और बजट के भीतर भीड़-प्रसन्न आकर्षण शुरू करने में मदद करते हैं।",
        badge: "कारखाने में परीक्षित सुरक्षा",
      },
      highlights: [
        "वैश्विक शिपिंग और अनुपालन",
        "कारखाने में परीक्षित सुरक्षा",
        "नवीकरण और असेंबली विशेषज्ञता",
        "तेज़, स्पष्ट सहायता",
      ],
      servicesTitle: "विशेष सेवाएं",
      servicesSubtitle: "दुनिया भर में आकर्षण के लिए परामर्श, सोर्सिंग, नवीकरण और असेंबली।",
      serviceLabel: "सेवा",
      productsTitle: "विशेष कैटलॉग",
      productsSubtitle: "प्रतिनिधि राइड्स；अपने प्रोजेक्ट के लिए विनिर्देशों का अनुरोध करें।",
      contactTitle: "अपने प्रोजेक्ट के बारे में बताएं",
      contactSubtitle:
        "अपनी योजनाएं भेजें और हम विकल्प, समयसीमा और अगले कदमों के साथ जवाब देंगे।",
      verificationTitle: "कारखाना दौरा (सत्यापित ग्राहक)",
      verificationSubtitle:
        "सत्यापन का अनुरोध करें। अनुमोदन के बाद, हम बुकिंग अनलॉक करने के लिए एक-बार का कोड भेजेंगे।",
      bookingButton: "शेड्यूल दिखाएं",
      codePlaceholder: "सत्यापन कोड",
      verifyButton: "सत्यापित करें और बुकिंग दिखाएं",
      wrongCode: "अमान्य कोड। अपना सत्यापन ईमेल जांचें।",
      successCode: "कोड स्वीकृत। नीचे अपना समय स्लॉट चुनें।",
      form: {
        name: "नाम",
        email: "ईमेल",
        phone: "फोन",
        country: "देश",
        company: "कंपनी",
        message: "प्रोजेक्ट विवरण या रुचि की राइड्स",
        submit: "भेजें",
      },
      footer: {
        rights: "© 2025 Miying. सभी अधिकार सुरक्षित।",
      },
    };
  }
  
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
      servicesSubtitle: "Consultoría, abastecimiento, renovación y montaje para atracciones en todo el mundo.",
      serviceLabel: "Servicio",
      productsTitle: "Catálogo destacado",
      productsSubtitle: "Atracciones representativas；solicite especificaciones para su proyecto.",
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
      "Send your plans and we'll respond with options, timelines, and next steps.",
    verificationTitle: "Factory visit (verified clients)",
    verificationSubtitle:
      "Request verification. Once approved, we'll send a one-time code to unlock booking.",
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
      productLabels: {
        footprint: "Footprint",
        height: "Height",
        riders: "Riders",
        year: "Year",
        requestDetails: "Request details",
      },
    };
  }

