"use client";

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * Reusable Filter Button Component
 * 
 * Consistent styling and click feedback
 * Separated from business logic
 */
export function FilterButton({ label, isActive, onClick, className = "" }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors
        min-h-[44px] min-w-[44px] touch-manipulation
        ${isActive
          ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
          : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/50 hover:text-[var(--text-primary)]"
        }
        ${className}
      `}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
}






