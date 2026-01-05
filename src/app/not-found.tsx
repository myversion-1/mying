"use client";

import Link from "next/link";
import { useLanguage } from "../components/language";
import { copy } from "../content/copy";

export default function NotFound() {
  const { lang } = useLanguage();
  const c = copy(lang);

  // 404 page text in different languages
  const notFoundText: Record<string, { title: string; message: string; backHome: string }> = {
    en: {
      title: "Page Not Found",
      message: "The page you're looking for doesn't exist or has been moved.",
      backHome: "Back to Home",
    },
    zh: {
      title: "页面未找到",
      message: "您访问的页面不存在或已被移动。",
      backHome: "返回首页",
    },
    ar: {
      title: "الصفحة غير موجودة",
      message: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
      backHome: "العودة إلى الصفحة الرئيسية",
    },
    ru: {
      title: "Страница не найдена",
      message: "Страница, которую вы ищете, не существует или была перемещена.",
      backHome: "Вернуться на главную",
    },
    ja: {
      title: "ページが見つかりません",
      message: "お探しのページは存在しないか、移動された可能性があります。",
      backHome: "ホームに戻る",
    },
    ko: {
      title: "페이지를 찾을 수 없습니다",
      message: "찾고 있는 페이지가 존재하지 않거나 이동되었습니다.",
      backHome: "홈으로 돌아가기",
    },
    th: {
      title: "ไม่พบหน้า",
      message: "หน้าที่คุณกำลังมองหาไม่มีอยู่หรือถูกย้ายแล้ว",
      backHome: "กลับไปที่หน้าแรก",
    },
    vi: {
      title: "Không tìm thấy trang",
      message: "Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.",
      backHome: "Về trang chủ",
    },
    id: {
      title: "Halaman Tidak Ditemukan",
      message: "Halaman yang Anda cari tidak ada atau telah dipindahkan.",
      backHome: "Kembali ke Beranda",
    },
    hi: {
      title: "पृष्ठ नहीं मिला",
      message: "आप जिस पृष्ठ की तलाश कर रहे हैं वह मौजूद नहीं है या स्थानांतरित कर दिया गया है।",
      backHome: "होम पर वापस जाएं",
    },
    es: {
      title: "Página no encontrada",
      message: "La página que buscas no existe o ha sido movida.",
      backHome: "Volver al inicio",
    },
  };

  const text = notFoundText[lang] || notFoundText.en;

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#00eaff] mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-white mb-4">{text.title}</h2>
          <p className="text-lg text-white/70 mb-8">{text.message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="rounded-full bg-[#00eaff] px-6 py-3 text-sm font-semibold text-[#0b1116] shadow-[0_0_28px_rgba(0,234,255,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_0_36px_rgba(0,234,255,0.5)]"
          >
            {text.backHome}
          </Link>
          <Link
            href="/products"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            {c.cta.secondary}
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Link
            href="/"
            className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
          >
            {c.nav.home}
          </Link>
          <Link
            href="/about"
            className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
          >
            {c.nav.about}
          </Link>
          <Link
            href="/services"
            className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
          >
            {c.nav.services}
          </Link>
          <Link
            href="/products"
            className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
          >
            {c.nav.products}
          </Link>
        </div>
      </div>
    </div>
  );
}










