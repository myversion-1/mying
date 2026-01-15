"use client";

import { useEffect, useRef, useState } from "react";

type SectionProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, title, eyebrow, subtitle, children, className = "" }: SectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Keep observing for re-animation if needed
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section 
      ref={ref}
      id={id} 
      className={`${className} ${mounted && isVisible ? 'revealed' : ''}`}
      style={{
        // Prevent layout shift by reserving minimum space
        minHeight: '1px',
      }}
      suppressHydrationWarning
    >
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {(title || subtitle) && (
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-3xl space-y-3 sm:space-y-4">
            {eyebrow && (
              <div className="inline-flex rounded-full bg-[var(--accent-primary-light)] px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent-primary)]">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] leading-tight tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

