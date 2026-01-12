"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./language";

/**
 * Scroll to Top Button Component
 * Fixed button in bottom-right corner that appears after scrolling down
 * Smoothly scrolls to top when clicked
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { lang } = useLanguage();

  // Show button when user scrolls down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label={lang === "zh" ? "返回顶部" : "Scroll to top"}
      className={`
        fixed bottom-20 left-4 md:bottom-6 md:left-6 z-50
        flex items-center justify-center
        w-12 h-12 md:w-14 md:h-14
        rounded-full
        bg-[var(--action-primary)]
        text-[var(--action-primary-text)]
        !text-[var(--action-primary-text)]
        border-2 border-[var(--action-primary)]
        shadow-lg
        transition-colors duration-300 ease-out
        hover:bg-[var(--action-primary-hover)]
        hover:border-[var(--action-primary-hover)]
        min-h-[44px] min-w-[44px]
        touch-manipulation
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <svg
        className="w-6 h-6 md:w-7 md:h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}

