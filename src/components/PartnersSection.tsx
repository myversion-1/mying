"use client";

import { useState } from "react";
import Image from "next/image";
import { partners, getPartnerName } from "../content/partners";
import type { Partner } from "../content/types/partner";
import { useLanguage } from "./language";

type PartnersSectionProps = {
  partners?: Partner[];
  title?: string;
  subtitle?: string;
  maxPartners?: number;
  showCategory?: boolean;
};

// Partner Logo Card Component with error handling
function PartnerLogoCard({ 
  partner, 
  showCategory 
}: { 
  partner: Partner; 
  showCategory: boolean;
}) {
  const { lang } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const partnerName = getPartnerName(partner, lang);
  
  return (
    <div className="group relative flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 transition hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]">
      {partner.logo && !imageError ? (
        <div className="relative h-16 w-full">
          <Image
            src={partner.logo}
            alt={partnerName}
            fill
            className="object-contain opacity-70 transition group-hover:opacity-100"
            quality={65}
            loading="lazy"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="flex h-16 w-full items-center justify-center text-[var(--text-tertiary)]">
          <span className="text-sm font-medium">{partnerName}</span>
        </div>
      )}
      
      {/* Category Badge (optional) */}
      {showCategory && partner.category && (
        <div className="absolute bottom-2 right-2">
          <span className="rounded-full bg-[var(--surface-elevated)] px-2 py-0.5 text-xs font-semibold text-[var(--text-primary)] border border-[var(--accent-primary)]/30">
            {partner.category}
          </span>
        </div>
      )}
    </div>
  );
}

export function PartnersSection({
  partners: customPartners,
  title,
  subtitle,
  maxPartners,
  showCategory = false,
}: PartnersSectionProps) {
  const { lang } = useLanguage();
  const displayPartners = customPartners || partners;
  const limitedPartners = maxPartners ? displayPartners.slice(0, maxPartners) : displayPartners;

  const defaultTitle = lang === "zh" ? "我们的合作伙伴" : "Our Partners";
  const defaultSubtitle = lang === "zh" 
    ? "全球领先的游乐园和娱乐中心信任 Miying" 
    : "Leading theme parks and entertainment centers worldwide trust Miying";

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="mb-8 text-center">
            {title && (
              <h2 className="mb-2 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
                {title || defaultTitle}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-[var(--text-secondary)]">
                {subtitle || defaultSubtitle}
              </p>
            )}
          </div>
        )}

        {/* Partners Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {limitedPartners.map((partner) => (
            <PartnerLogoCard
              key={partner.id}
              partner={partner}
              showCategory={showCategory}
            />
          ))}
        </div>

        {/* Empty State */}
        {limitedPartners.length === 0 && (
          <div className="text-center py-8 text-[var(--text-secondary)]">
            <p>{lang === "zh" ? "暂无合作伙伴信息" : "No partners available at the moment."}</p>
          </div>
        )}
      </div>
    </section>
  );
}



