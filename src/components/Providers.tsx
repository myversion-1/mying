"use client";

import { LanguageProvider } from "./language";
import { DirectionProvider } from "./DirectionProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <DirectionProvider>{children}</DirectionProvider>
    </LanguageProvider>
  );
}

