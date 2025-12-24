"use client";

import { useState } from "react";
import { useLanguage } from "./language";
import { copy } from "../content/copy";

const DEMO_CODE = "VISIT2025";

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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={c.codePlaceholder}
          className="flex-1 rounded-xl border border-white/10 bg-[#0c1014] px-3 py-3 text-white outline-none transition focus:border-[#7df6ff]/60"
        />
        <button
          type="submit"
          className="rounded-full bg-[#00eaff] px-5 py-3 text-sm font-semibold text-[#0b1116] shadow-[0_0_28px_rgba(0,234,255,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_0_36px_rgba(0,234,255,0.5)]"
        >
          {c.verifyButton}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-3 text-sm text-amber-300">{c.wrongCode}</p>
      )}
      {status === "success" && (
        <div className="mt-4 space-y-3 rounded-xl border border-[#00eaff]/30 bg-[#00eaff]/10 p-4">
          <p className="text-sm text-white">{c.successCode}</p>
          <div className="overflow-hidden rounded-xl bg-[#0c1014]">
            <iframe
              src="https://calendly.com/"
              title="Calendly booking"
              className="h-[480px] w-full border-0"
            />
          </div>
        </div>
      )}
      <p className="mt-3 text-xs text-white/50">
        Demo code: {DEMO_CODE}. Replace with your generated codes after manual
        verification.
      </p>
    </div>
  );
}

