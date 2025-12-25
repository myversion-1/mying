"use client";

import { copy } from "../content/copy";
import { useLanguage, type Lang } from "./language";

const languages: Lang[] = ["en", "es", "ru", "zh", "ja", "ko", "th", "vi", "id", "hi"];

const languageNames: Record<Lang, string> = {
  en: "English",
  es: "Español",
  ru: "Русский",
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
    <div className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/80 max-w-fit">
      {languages.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-1.5 py-0.5 transition flex-shrink-0 ${
            lang === l
              ? "bg-white text-[#0c1014] shadow-sm font-semibold"
              : "text-white/70 hover:text-white"
          }`}
          aria-label={`Switch to ${languageNames[l]}`}
          title={languageNames[l]}
        >
          {l === "zh" ? "中文" : l === "ja" ? "日本語" : l === "ko" ? "한국어" : l === "th" ? "ไทย" : l === "vi" ? "VI" : l === "id" ? "ID" : l === "hi" ? "हिन्दी" : l === "ru" ? "RU" : l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

