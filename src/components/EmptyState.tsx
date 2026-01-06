"use client";

import Link from "next/link";
import { copy } from "../content/copy";
import { useLanguage } from "./language";

type EmptyStateProps = {
  title?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
};

export function EmptyState({
  title,
  message,
  actionLabel,
  actionHref = "/products",
  icon,
}: EmptyStateProps) {
  const { lang } = useLanguage();
  const c = copy(lang);

  const defaultText: Record<string, { title: string; message: string; action: string }> = {
    en: {
      title: "No products found",
      message: "Try adjusting your filters or search terms.",
      action: "View all products",
    },
    zh: {
      title: "未找到产品",
      message: "请尝试调整筛选条件或搜索词。",
      action: "查看所有产品",
    },
    ar: {
      title: "لم يتم العثور على منتجات",
      message: "حاول تعديل المرشحات أو مصطلحات البحث.",
      action: "عرض جميع المنتجات",
    },
    ru: {
      title: "Продукты не найдены",
      message: "Попробуйте изменить фильтры или условия поиска.",
      action: "Просмотреть все продукты",
    },
    ja: {
      title: "製品が見つかりません",
      message: "フィルターまたは検索語を調整してみてください。",
      action: "すべての製品を表示",
    },
    ko: {
      title: "제품을 찾을 수 없습니다",
      message: "필터 또는 검색어를 조정해보세요.",
      action: "모든 제품 보기",
    },
    th: {
      title: "ไม่พบผลิตภัณฑ์",
      message: "ลองปรับตัวกรองหรือคำค้นหา",
      action: "ดูผลิตภัณฑ์ทั้งหมด",
    },
    vi: {
      title: "Không tìm thấy sản phẩm",
      message: "Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.",
      action: "Xem tất cả sản phẩm",
    },
    id: {
      title: "Produk tidak ditemukan",
      message: "Coba sesuaikan filter atau istilah pencarian.",
      action: "Lihat semua produk",
    },
    hi: {
      title: "कोई उत्पाद नहीं मिला",
      message: "अपने फ़िल्टर या खोज शब्दों को समायोजित करने का प्रयास करें।",
      action: "सभी उत्पाद देखें",
    },
    es: {
      title: "No se encontraron productos",
      message: "Intenta ajustar tus filtros o términos de búsqueda.",
      action: "Ver todos los productos",
    },
  };

  const text = defaultText[lang] || defaultText.en;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon || (
        <div className="mb-6 rounded-full bg-white/5 p-6">
          <svg
            className="h-12 w-12 text-white/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
      )}
      <h3 className="text-xl font-semibold text-white mb-2">{title || text.title}</h3>
      <p className="text-white/70 mb-6 max-w-md">{message || text.message}</p>
      {actionHref && (
        <Link
          href={actionHref}
          className="rounded-full bg-[#00eaff] px-5 py-3 text-sm font-semibold text-[#0b1116] shadow-[0_0_28px_rgba(0,234,255,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_0_36px_rgba(0,234,255,0.5)]"
        >
          {actionLabel || text.action}
        </Link>
      )}
    </div>
  );
}











