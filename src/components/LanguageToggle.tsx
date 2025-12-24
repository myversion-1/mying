"use client";

import { copy } from "../content/copy";
import { useLanguage, type Lang } from "./language";

const languages: Lang[] = ["en", "es"];

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const c = copy(lang);

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80">
      {languages.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2 py-1 transition ${
            lang === l
              ? "bg-white text-[#0c1014] shadow-sm"
              : "text-white/70 hover:text-white"
          }`}
          aria-label={`Switch to ${l === "en" ? "English" : "Spanish"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
      <span className="hidden md:inline text-white/50">| {c.nav.home}</span>
    </div>
  );
}

