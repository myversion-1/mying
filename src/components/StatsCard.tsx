"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

type StatsCardProps = {
  number: string | number;
  suffix?: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  // Allow parent to indicate if this is above the fold
  aboveTheFold?: boolean;
};

export function StatsCard({
  number,
  suffix = "",
  label,
  description,
  icon,
  className = "",
  aboveTheFold = false
}: StatsCardProps) {
  const [inView, setInView] = useState(aboveTheFold); // Start true if above the fold
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If above the fold, load immediately
    if (aboveTheFold) {
      setInView(true);
      return;
    }

    // For below-the-fold cards, use Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' } // Lower threshold and add margin for earlier loading
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [aboveTheFold]);

  // Convert number to numeric value for CountUp
  const numericValue = typeof number === "string"
    ? parseFloat(number.replace(/[^0-9.]/g, "")) || 0
    : number;

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 transition-all duration-300 hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)] hover:shadow-lg ${className}`}
    >
      {/* Background accent - subtle brand color on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex flex-col gap-4">
        {/* Icon */}
        {icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-primary-light)] text-[var(--accent-primary)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30">
            {icon}
          </div>
        )}

        {/* Content */}
        <div className="space-y-2">
          {/* Number with CountUp animation */}
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-[var(--accent-primary)] md:text-5xl">
              {inView ? (
                <CountUp
                  start={0}
                  end={numericValue}
                  duration={2.5}
                  decimals={0}
                  separator=","
                  enableScrollSpy={false}
                />
              ) : (
                "0"
              )}
            </span>
            {suffix && (
              <span className="text-3xl font-bold text-[var(--accent-primary)] md:text-4xl">
                {suffix}
              </span>
            )}
          </div>

          {/* Label */}
          <div className="text-base font-semibold text-[var(--text-primary)] md:text-lg">
            {label}
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-[var(--text-secondary)] md:text-base">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-[var(--accent-primary)]/0 transition-colors duration-300 group-hover:bg-[var(--accent-primary)]/5 pointer-events-none" />
    </div>
  );
}
