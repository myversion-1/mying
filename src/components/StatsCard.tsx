"use client";

import { useEffect, useRef, useState } from "react";
// Dynamic import for CountUp to reduce initial bundle size
import dynamic from "next/dynamic";

const CountUp = dynamic(() => import("react-countup").then((mod) => mod.default), {
  ssr: false, // CountUp doesn't need SSR
  loading: () => <span>0</span>, // Fallback during loading
});

type StatsCardProps = {
  number: string | number;
  suffix?: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
};

export function StatsCard({ 
  number, 
  suffix = "", 
  label, 
  description, 
  icon, 
  className = "" 
}: StatsCardProps) {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Disconnect after first trigger
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Convert number to numeric value for CountUp
  const numericValue = typeof number === "string" 
    ? parseFloat(number.replace(/[^0-9.]/g, "")) || 0
    : number;

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.03] to-white/[0.01] p-6 transition-all duration-300 hover:border-[#7df6ff]/30 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-[#7df6ff]/10 ${className}`}
    >
      {/* Background accent - subtle gray/brand color */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7df6ff]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative flex flex-col gap-4">
        {/* Icon */}
        {icon && (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#7df6ff]/10 text-[#7df6ff] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#7df6ff]/20">
            {icon}
          </div>
        )}
        
        {/* Content */}
        <div className="space-y-2">
          {/* Number with CountUp animation */}
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-[#00eaff] md:text-5xl">
              {inView ? (
                <CountUp
                  start={0}
                  end={numericValue}
                  duration={2.5}
                  decimals={0}
                  separator=","
                />
              ) : (
                "0"
              )}
            </span>
            {suffix && (
              <span className="text-3xl font-bold text-[#00eaff] md:text-4xl">
                {suffix}
              </span>
            )}
          </div>
          
          {/* Label */}
          <div className="text-lg font-semibold text-white md:text-xl">
            {label}
          </div>
          
          {/* Description */}
          {description && (
            <p className="text-sm text-white/60 md:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-[#7df6ff]/0 transition-colors duration-300 group-hover:bg-[#7df6ff]/5 pointer-events-none" />
    </div>
  );
}
