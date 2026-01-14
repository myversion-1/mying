"use client";

import { useState } from "react";
import * as React from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeAlt?: string;
  afterAlt?: string;
  label?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Empty mall corner before installation",
  afterAlt = "Miying compact ride installed in mall corner",
  label = "Space Transformation Efficiency",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const rectCacheRef = React.useRef<DOMRect | null>(null);
  const rafIdRef = React.useRef<number | null>(null);

  // Cache bounding rect and update on resize
  React.useEffect(() => {
    const updateRect = () => {
      if (containerRef.current) {
        rectCacheRef.current = containerRef.current.getBoundingClientRect();
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect, { passive: true });
    
    return () => {
      window.removeEventListener('resize', updateRect);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Optimized mouse move handler - use cached rect and requestAnimationFrame
  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      const rect = rectCacheRef.current || e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, percentage)));
    });
  }, []);

  // Optimized touch move handler - use cached rect and requestAnimationFrame
  const handleTouchMove = React.useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      const rect = rectCacheRef.current || e.currentTarget.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, percentage)));
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="before-after-slider my-12"
    >
      <h3 className="mb-4 text-center font-serif text-xl font-semibold text-[var(--text-primary)] md:text-2xl">
        {label}
      </h3>
      <div
        className="relative h-64 w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] md:h-96"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={() => setSliderPosition(50)}
      >
        {/* Before Image */}
        <div className="absolute inset-0">
          {beforeImage ? (
            <Image
              src={beforeImage}
              alt={beforeAlt}
              fill
              className="object-cover"
              sizes="100vw"
              quality={65}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-[var(--text-tertiary)]">
              <span>Empty mall corner</span>
            </div>
          )}
        </div>

        {/* After Image - clipped by slider */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          {afterImage ? (
            <Image
              src={afterImage}
              alt={afterAlt}
              fill
              className="object-cover"
              sizes="100vw"
              quality={65}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--accent-primary-light)] to-[var(--accent-primary-light)] text-[var(--text-secondary)]">
              <span>Miying compact ride installed</span>
            </div>
          )}
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-[var(--accent-primary)] shadow-[0_0_20px_rgba(0,234,255,0.5)]"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[var(--accent-primary)] bg-[var(--surface)] shadow-lg">
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-primary)]"></div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute left-4 top-4 rounded bg-[var(--background)]/80 backdrop-blur px-3 py-1 text-sm font-semibold text-[var(--text-primary)]">
          Before
        </div>
        <div className="absolute right-4 top-4 rounded bg-[var(--background)]/80 backdrop-blur px-3 py-1 text-sm font-semibold text-[var(--text-primary)]">
          After
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-[var(--text-tertiary)]">
        Drag the slider to compare space transformation
      </p>
    </div>
  );
}

