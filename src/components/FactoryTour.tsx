"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type FactoryTourProps = {
  videoUrl?: string;
  videoThumbnail?: string;
  galleryImages?: string[];
  ctaText?: string;
  ctaHref?: string;
};

export function FactoryTour({
  videoUrl,
  videoThumbnail,
  galleryImages = [],
  ctaText = "Schedule Factory Visit",
  ctaHref = "/visit",
}: FactoryTourProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Video Section */}
      {videoUrl && (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0">
          <div className="aspect-video w-full">
            {videoThumbnail ? (
              <div className="relative h-full w-full">
                <Image
                  src={videoThumbnail}
                  alt="Factory tour video thumbnail"
                  fill
                  className="object-cover"
                  quality={65}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-16 w-16 items-center justify-center rounded-full bg-[#00eaff] shadow-[0_0_28px_rgba(0,234,255,0.5)] transition hover:scale-110 hover:shadow-[0_0_36px_rgba(0,234,255,0.7)]"
                  >
                    <svg
                      className="ml-1 h-8 w-8 text-[#0b1116]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#00eaff]/20">
                      <svg
                        className="h-10 w-10 text-[#00eaff]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--dark-bg-text-secondary)]">Factory Tour Video</p>
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-[#7df6ff] hover:text-[#00eaff]"
                  >
                    Watch on YouTube →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <div>
          <h3 className="mb-4 text-xl font-semibold text-white">Production Line Gallery</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20"
              >
                <Image
                  src={image}
                  alt={`Production line photo ${index + 1}`}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  quality={65}
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-4xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -right-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={selectedImage}
              alt="Production line photo"
              width={1200}
              height={800}
              className="max-h-[90vh] w-auto rounded-lg object-contain"
              quality={65}
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="flex justify-center">
        <Link
          href={ctaHref}
          className="rounded-lg bg-[var(--action-primary)] px-8 py-3 text-sm font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}









