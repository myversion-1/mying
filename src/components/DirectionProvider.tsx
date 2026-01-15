"use client";

import { useEffect } from "react";
import { useLanguage } from "./language";

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const { lang, isReady } = useLanguage();
  const isRTL = lang === "ar";

  useEffect(() => {
    // Only update direction when language is ready
    if (!isReady) return;

    const htmlElement = document.documentElement;
    const newDir = isRTL ? "rtl" : "ltr";
    
    // Prevent layout shift by updating direction smoothly
    if (htmlElement.dir !== newDir) {
      htmlElement.dir = newDir;
    }
    
    if (htmlElement.lang !== lang) {
      htmlElement.lang = lang;
      htmlElement.setAttribute("xml:lang", lang);
    }
  }, [lang, isRTL, isReady]);

  return <>{children}</>;
}


