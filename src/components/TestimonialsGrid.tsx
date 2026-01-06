"use client";

import Image from "next/image";
import type { Testimonial } from "../content/types/testimonial";

type TestimonialsGridProps = {
  testimonials: Testimonial[];
  lang?: string;
};

export function TestimonialsGrid({ testimonials, lang = "en" }: TestimonialsGridProps) {
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
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 transition hover:border-[#7df6ff]/30 hover:bg-white/10"
        >
          {/* Rating Stars */}
          <div className="mb-4 flex items-center gap-1">
            {renderStars(testimonial.rating)}
          </div>

          {/* Testimonial Text */}
          <blockquote className="mb-4 text-white/90 italic">
            "{getLocalizedText(testimonial)}"
          </blockquote>

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
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00eaff]/20 text-[#00eaff] font-semibold">
                {testimonial.name[0].toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <div className="font-semibold text-white">{testimonial.name}</div>
              <div className="text-sm text-white/60">
                {testimonial.position && `${testimonial.position}, `}
                {testimonial.company}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-white/50">{testimonial.country}</span>
                {testimonial.project && (
                  <>
                    <span className="text-xs text-white/30">•</span>
                    <span className="text-xs text-white/50">{testimonial.project}</span>
                  </>
                )}
                {testimonial.year && (
                  <>
                    <span className="text-xs text-white/30">•</span>
                    <span className="text-xs text-white/50">{testimonial.year}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#7df6ff]/0 transition-colors group-hover:bg-[#7df6ff]/5 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}








