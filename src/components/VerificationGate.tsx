"use client";

import { useState } from "react";
import { useLanguage } from "./language";
import { copy } from "../content/copy";

// Get verification code from environment variable or use default
// For production, set NEXT_PUBLIC_VERIFICATION_CODE in Vercel environment variables
const DEMO_CODE = process.env.NEXT_PUBLIC_VERIFICATION_CODE || "VISIT2025";

export function VerificationGate() {
  const { lang } = useLanguage();
  const c = copy(lang);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === DEMO_CODE) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] dark-bg-component p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={c.codePlaceholder}
          className="flex-1 rounded-xl border border-white/20 bg-[var(--dark-bg-base)] px-3 py-3 text-[var(--dark-bg-text)] outline-none transition focus:border-[var(--accent-primary)]/60 min-h-[44px] touch-manipulation"
        />
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--accent-primary)] px-5 py-3 sm:px-7 sm:py-3 text-sm sm:text-base font-semibold shadow-lg shadow-[var(--action-primary)]/30 hover:shadow-xl hover:shadow-[var(--action-primary)]/50 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-95 min-h-[44px] min-w-[44px] touch-manipulation text-[var(--action-primary-text)] border border-[var(--action-primary)]/20"
        >
          {c.verifyButton}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-3 text-sm text-amber-300">{c.wrongCode}</p>
      )}
      {status === "success" && (
        <div className="mt-4 space-y-3 rounded-xl border border-[var(--accent-primary)]/30 bg-[var(--accent-primary-light)] p-4">
          <p className="text-sm text-[var(--dark-bg-text)]">{c.successCode}</p>
          <div className="overflow-hidden rounded-xl bg-[var(--dark-bg-base)]">
            <iframe
              src={
                process.env.NEXT_PUBLIC_CALENDLY_URL ||
                "https://calendly.com/your-username/meeting"
              }
              title="Calendly booking"
              className="h-[480px] w-full border-0"
            />
          </div>
        </div>
      )}
      <p className="mt-3 text-xs text-[var(--dark-bg-text-tertiary)]">
        Contact us to receive your verification code for factory visit scheduling.
      </p>
    </div>
  );
}

