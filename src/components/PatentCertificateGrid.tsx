"use client";

import Image from "next/image";
import { useState } from "react";

export type PatentCertificate = {
  name: string;
  nameEn?: string;
  nameZh?: string;
  image: string; // Path to image in /public folder
  description?: string;
  descriptionEn?: string;
  descriptionZh?: string;
};

type PatentCertificateGridProps = {
  certificates: PatentCertificate[];
  lang?: string;
};

export function PatentCertificateGrid({ certificates, lang = "en" }: PatentCertificateGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getLocalizedName = (cert: PatentCertificate) => {
    if (lang === "zh") {
      return cert.nameZh || cert.name;
    }
    return cert.nameEn || cert.name;
  };

  const getLocalizedDescription = (cert: PatentCertificate) => {
    if (lang === "zh") {
      return cert.descriptionZh || cert.description;
    }
    return cert.descriptionEn || cert.description;
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 transition hover:border-[#7df6ff]/30 hover:bg-white/10 cursor-pointer"
            onClick={() => setSelectedImage(cert.image)}
          >
            <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5">
              <Image
                src={cert.image}
                alt={getLocalizedName(cert)}
                fill
                className="object-contain p-4 transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                quality={65}
                loading="lazy"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-semibold text-white line-clamp-2">
                {getLocalizedName(cert)}
              </h3>
              {getLocalizedDescription(cert) && (
                <p className="text-xs text-[var(--dark-bg-text-secondary)] line-clamp-2">
                  {getLocalizedDescription(cert)}
                </p>
              )}
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#7df6ff]/0 transition-colors group-hover:bg-[#7df6ff]/5 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
              aria-label="Close"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt="Patent Certificate"
                fill
                className="object-contain"
                sizes="90vw"
                quality={65}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}









