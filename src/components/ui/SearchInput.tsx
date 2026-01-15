"use client";

import { useRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isRTL?: boolean;
  className?: string;
}

/**
 * Search Input Component
 * 
 * Consistent styling and clear button
 * Separated from business logic
 */
export function SearchInput({ value, onChange, placeholder, isRTL = false, className = "" }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-12 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
      />
      <svg
        className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-tertiary)] ${isRTL ? "right-4" : "left-4"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {value && (
        <button
          onClick={handleClear}
          className={`absolute top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)] ${isRTL ? "left-4" : "right-4"} min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation`}
          aria-label="Clear search"
        >
          <span className="text-2xl leading-none">×</span>
        </button>
      )}
    </div>
  );
}

