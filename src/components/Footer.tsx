"use client";

import { copy } from "../content/copy";
import { useLanguage } from "./language";

export function Footer() {
  const { lang } = useLanguage();
  const c = copy(lang);
  return (
    <footer className="border-t border-white/5 bg-[#0a0f13]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between md:px-8">
        <div>{c.footer.rights}</div>
        <div className="flex gap-4">
          <a
            href="mailto:miyingyoule@gmail.com"
            className="hover:text-white"
            aria-label="Email"
          >
            miyingyoule@gmail.com
          </a>
          <a
            href="tel:+8613112959561"
            className="hover:text-white"
            aria-label="Phone"
          >
            +86 131 1295 9561
          </a>
        </div>
      </div>
    </footer>
  );
}

