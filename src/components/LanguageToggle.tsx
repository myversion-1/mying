"use client";

import { copy } from "../content/copy";
import { useLanguage, type Lang } from "./language";

const languages: Lang[] = ["en", "es", "ru", "ar", "zh", "ja", "ko", "th", "vi", "id", "hi"];

const languageNames: Record<Lang, string> = {
  en: "English",
  es: "Español",
  ru: "Русский",
  ar: "العربية",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  th: "ไทย",
  vi: "Tiếng Việt",
  id: "Bahasa Indonesia",
  hi: "हिन्दी",
};

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const c = copy(lang);

  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-2 py-1.5 text-xs text-[var(--text-secondary)] max-w-fit">
      {languages.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2.5 py-1 transition flex-shrink-0 ${
            lang === l
              ? "bg-[var(--action-primary)] text-[var(--action-primary-text)] font-semibold"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
          aria-label={`Switch to ${languageNames[l]}`}
          title={languageNames[l]}
        >
          {l === "zh" ? "中文" : l === "ja" ? "日本語" : l === "ko" ? "한국어" : l === "th" ? "ไทย" : l === "vi" ? "VI" : l === "id" ? "ID" : l === "hi" ? "हिन्दी" : l === "ru" ? "RU" : l === "ar" ? "عربي" : l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

