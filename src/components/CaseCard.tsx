"use client";

import Image from "next/image";
import { useState } from "react";
import type { CaseItem } from "../content/types/case";
import { Skeleton } from "./Skeleton";

type CaseCardProps = {
  caseItem: CaseItem;
  onClickAction?: () => void;
};

export function CaseCard({ caseItem, onClickAction }: CaseCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] transition hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)] cursor-pointer touch-manipulation"
      onClick={onClickAction}
    >
      {/* Image */}
      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5">
        {/* Skeleton placeholder - prevents CLS */}
        {imageLoading && !imageError && (
          <Skeleton
            variant="rectangular"
            className="absolute inset-0 h-full w-full bg-[var(--surface-elevated)]"
            animation="pulse"
          />
        )}
        {!imageError ? (
          <Image
            src={caseItem.image}
            alt={caseItem.title}
            fill
            className={`object-cover transition-opacity duration-300 group-hover:opacity-95 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            onLoad={() => setImageLoading(false)}
            quality={65}
            loading="lazy"
          />
        ) : (
            <div className="flex h-full items-center justify-center bg-[var(--surface-elevated)]">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-[var(--text-tertiary)]"
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
                <p className="mt-2 text-sm text-[var(--text-tertiary)]">Case Image</p>
              </div>
            </div>
        )}
        {/* Country Badge */}
        <div className="absolute top-3 right-3 rounded-full bg-[var(--background)]/90 backdrop-blur px-3 py-1 text-xs font-semibold text-[var(--text-primary)] border border-[var(--border)]">
          {caseItem.country}
        </div>
        {/* Project Type Badge */}
        <div className="absolute top-3 left-3 rounded-full bg-[var(--dark-bg-base)]/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-[var(--dark-bg-text)] border border-white/20 shadow-lg">
          {caseItem.projectType}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-1">{caseItem.title}</h3>
          {caseItem.year && (
            <p className="text-sm text-[var(--text-tertiary)]">{caseItem.year}</p>
          )}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3">
          {caseItem.stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-lg bg-[var(--surface)] px-3 py-1.5 border border-[var(--border)]"
            >
              <div className="text-xs text-[var(--text-tertiary)]">{stat.label}</div>
              <div className="text-sm font-semibold text-[var(--accent-primary)]">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        {caseItem.highlights && caseItem.highlights.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
              Highlights
            </div>
            <ul className="space-y-1">
              {caseItem.highlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-primary)]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Description (truncated) */}
        {caseItem.description && (
          <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
            {caseItem.description}
          </p>
        )}
      </div>

    </div>
  );
}








