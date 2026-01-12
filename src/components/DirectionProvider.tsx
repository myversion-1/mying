"use client";

import { useEffect } from "react";
import { useLanguage } from "./language";

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  const isRTL = lang === "ar";

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.dir = isRTL ? "rtl" : "ltr";
    htmlElement.lang = lang;
    // Set xml:lang for better i18n support
    htmlElement.setAttribute("xml:lang", lang);
  }, [lang, isRTL]);

  return <>{children}</>;
}


