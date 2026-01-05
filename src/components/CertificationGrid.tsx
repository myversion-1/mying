"use client";

import Image from "next/image";

export type Certification = {
  name: string;
  description: string;
  icon?: string; // Icon name or emoji
  badge?: string; // Badge text like "Certified" or "Compliant"
};

type CertificationGridProps = {
  certifications: Certification[];
};

export function CertificationGrid({ certifications }: CertificationGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {certifications.map((cert, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 transition hover:border-[#7df6ff]/30 hover:bg-white/10"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7df6ff]/10 text-2xl">
              {cert.icon || "✓"}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-white">{cert.name}</h3>
                {cert.badge && (
                  <span className="rounded-full bg-[#7df6ff]/20 px-2 py-0.5 text-xs font-semibold text-[#7df6ff]">
                    {cert.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-white/70">{cert.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}








