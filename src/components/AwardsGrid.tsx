"use client";

import Image from "next/image";
import type { Award } from "../content/types/award";

type AwardsGridProps = {
  awards: Award[];
  lang?: string;
};

export function AwardsGrid({ awards, lang = "en" }: AwardsGridProps) {
  const getLocalizedName = (award: Award) => {
    if (lang === "zh") {
      return award.nameZh || award.name;
    }
    return award.nameEn || award.name;
  };

  const getLocalizedDescription = (award: Award) => {
    if (lang === "zh") {
      return award.descriptionZh || award.description;
    }
    return award.descriptionEn || award.description;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {awards.map((award) => (
        <div
          key={award.id}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 transition hover:border-[#7df6ff]/30 hover:bg-white/10"
        >
          <div className="flex flex-col gap-4">
            {/* Award Logo or Icon */}
            <div className="flex items-center justify-between">
              {award.logo ? (
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-white/5">
                  <Image
                    src={award.logo}
                    alt={getLocalizedName(award)}
                    fill
                    className="object-contain p-2"
                    quality={85}
                    loading="lazy"
                    sizes="64px"
                  />
                </div>
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#00eaff]/10">
                  <svg
                    className="h-8 w-8 text-[#00eaff]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
              )}
              {award.year && (
                <span className="rounded-full bg-[#00eaff]/20 px-3 py-1 text-xs font-semibold text-[#00eaff]">
                  {award.year}
                </span>
              )}
            </div>

            {/* Award Name */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {getLocalizedName(award)}
              </h3>
              {award.issuer && (
                <p className="text-xs text-white/60 mb-2">{award.issuer}</p>
              )}
              {getLocalizedDescription(award) && (
                <p className="text-sm text-white/70">
                  {getLocalizedDescription(award)}
                </p>
              )}
            </div>

            {/* Category Badge */}
            {award.category && (
              <div className="mt-auto">
                <span className="inline-block rounded-full bg-white/5 px-2 py-1 text-xs text-white/60">
                  {award.category}
                </span>
              </div>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#7df6ff]/0 transition-colors group-hover:bg-[#7df6ff]/5 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}








