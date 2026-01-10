"use client";

import Image from "next/image";
import type { Testimonial } from "../content/types/testimonial";

type TestimonialsGridProps = {
  testimonials: Testimonial[];
  lang?: string;
};

export function TestimonialsGrid({ testimonials, lang = "en" }: TestimonialsGridProps) {
  // Debug logging (only in development)
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('[TestimonialsGrid] Rendering with testimonials:', testimonials?.length || 0);
  }

  const getLocalizedText = (testimonial: Testimonial) => {
    if (lang === "zh") {
      return testimonial.textZh || testimonial.text;
    }
    return testimonial.textEn || testimonial.text;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-[var(--text-tertiary)]"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Handle empty testimonials
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-8 text-[var(--text-secondary)]">
        <p>No testimonials available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial) => {
        // Safety check for testimonial data
        if (!testimonial || !testimonial.id) {
          return null;
        }
        
        return (
        <div
          key={testimonial.id}
          className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 transition-colors hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]"
        >
          {/* Rating Stars */}
          <div className="mb-4 flex items-center gap-1">
            {renderStars(testimonial.rating)}
          </div>

          {/* Testimonial Text */}
          <blockquote className="mb-4 text-[var(--text-primary)] italic leading-relaxed">
            "{getLocalizedText(testimonial)}"
          </blockquote>

          {/* Project Type Badge */}
          {testimonial.projectType && (
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-[var(--surface-elevated)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)] border border-[var(--accent-primary)]/30">
                {testimonial.projectType}
              </span>
            </div>
          )}

          {/* Customer Info */}
          <div className="flex items-center gap-3">
            {testimonial.image ? (
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  quality={85}
                  loading="lazy"
                  sizes="48px"
                />
              </div>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-semibold">
                {testimonial.name[0].toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <div className="font-semibold text-[var(--text-primary)] leading-tight">{testimonial.name}</div>
              <div className="flex items-center gap-2 mt-1">
                {testimonial.companyLogo ? (
                  <div className="relative h-5 w-5 overflow-hidden rounded">
                    <Image
                      src={testimonial.companyLogo}
                      alt={testimonial.company}
                      fill
                      className="object-contain"
                      quality={85}
                      loading="lazy"
                      sizes="20px"
                    />
                  </div>
                ) : null}
                <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {testimonial.position && `${testimonial.position}, `}
                  {testimonial.company}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-[var(--text-tertiary)] leading-relaxed">{testimonial.country}</span>
                {testimonial.project && (
                  <>
                    <span className="text-xs text-[var(--text-tertiary)]">•</span>
                    <span className="text-xs text-[var(--text-tertiary)]">{testimonial.project}</span>
                  </>
                )}
                {testimonial.year && (
                  <>
                    <span className="text-xs text-[var(--text-tertiary)]">•</span>
                    <span className="text-xs text-[var(--text-tertiary)]">{testimonial.year}</span>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
        );
      })}
    </div>
  );
}








