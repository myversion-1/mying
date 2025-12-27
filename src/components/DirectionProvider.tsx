"use client";

import { useEffect } from "react";
import { useLanguage } from "./language";

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  const isRTL = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  return <>{children}</>;
}


