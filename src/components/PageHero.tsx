"use client";

import Link from "next/link";
import { copy } from "../content/copy";
import { useLanguage } from "./language";

const WHATSAPP_LINK = "https://wa.me/8613112959561";

type Props = {
  headline?: string;
  subhead?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryHref?: string;
  badge?: string;
};

export function PageHero({
  headline,
  subhead,
  ctaPrimaryHref = "/contact",
  ctaSecondaryHref = "/products",
  badge,
}: Props) {
  const { lang } = useLanguage();
  const c = copy(lang);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#101823] via-[#0d131b] to-[#0b1016] px-6 py-12 shadow-2xl md:px-10 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,234,255,0.15),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_50%_80%,rgba(0,234,255,0.12),transparent_20%)]" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7df6ff]">
            {badge ?? c.hero.badge}
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
            {headline ?? c.hero.title}
          </h1>
          <p className="text-lg text-white/70 md:text-xl">
            {subhead ?? c.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={ctaPrimaryHref}
              className="rounded-full bg-[#00eaff] px-6 py-3 text-sm font-semibold text-[#0b1116] shadow-[0_0_28px_rgba(0,234,255,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_0_36px_rgba(0,234,255,0.5)]"
            >
              {c.cta.requestQuote ?? c.cta.primary}
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(37,211,102,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_0_36px_rgba(37,211,102,0.5)] flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              {c.cta.whatsapp ?? "WhatsApp Chat Now"}
            </a>
            <Link
              href={ctaSecondaryHref}
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              {c.cta.secondary}
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-white/70 md:max-w-xs">
          {c.highlights.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

