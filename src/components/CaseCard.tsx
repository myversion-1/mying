"use client";

import Image from "next/image";
import { useState } from "react";
import type { CaseItem } from "../content/types/case";

type CaseCardProps = {
  caseItem: CaseItem;
  onClick?: () => void;
};

export function CaseCard({ caseItem, onClick }: CaseCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 transition hover:border-[#7df6ff]/30 hover:bg-white/10 cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5">
        {!imageError ? (
          <Image
            src={caseItem.image}
            alt={caseItem.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-white/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-white/50">Case Image</p>
            </div>
          </div>
        )}
        {/* Country Badge */}
        <div className="absolute top-3 right-3 rounded-full bg-[#0c1014]/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {caseItem.country}
        </div>
        {/* Project Type Badge */}
        <div className="absolute top-3 left-3 rounded-full bg-[#00eaff]/90 px-3 py-1 text-xs font-semibold text-[#0c1014]">
          {caseItem.projectType}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{caseItem.title}</h3>
          {caseItem.year && (
            <p className="text-sm text-white/60">{caseItem.year}</p>
          )}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3">
          {caseItem.stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-lg bg-white/5 px-3 py-1.5 border border-white/10"
            >
              <div className="text-xs text-white/60">{stat.label}</div>
              <div className="text-sm font-semibold text-[#00eaff]">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        {caseItem.highlights && caseItem.highlights.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-white/50">
              Highlights
            </div>
            <ul className="space-y-1">
              {caseItem.highlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00eaff]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Description (truncated) */}
        {caseItem.description && (
          <p className="text-sm text-white/70 line-clamp-2">
            {caseItem.description}
          </p>
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#7df6ff]/0 transition-colors group-hover:bg-[#7df6ff]/5 pointer-events-none" />
    </div>
  );
}







