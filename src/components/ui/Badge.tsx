type Props = {
  children: React.ReactNode;
  tone?: "neutral" | "positive" | "warning" | "patent" | "electric" | "mechanical" | "hybrid" | "family" | "thrill" | "kiddie" | "water" | "vr";
};

export function Badge({ children, tone = "neutral" }: Props) {
  const toneClass =
    tone === "positive" || tone === "family" || tone === "kiddie"
      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 dark:bg-emerald-400/15 dark:text-emerald-300 dark:border-emerald-400/30"
      : tone === "warning" || tone === "thrill"
        ? "bg-amber-500/20 text-amber-400 border-amber-500/40 dark:bg-amber-400/15 dark:text-amber-300 dark:border-amber-400/30"
        : tone === "patent"
          ? "bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border-[var(--accent-primary)]/40"
          : tone === "electric"
            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 dark:bg-emerald-400/15 dark:text-emerald-300 dark:border-emerald-400/30"
            : tone === "mechanical"
              ? "bg-orange-500/20 text-orange-400 border-orange-500/40 dark:bg-orange-400/15 dark:text-orange-300 dark:border-orange-400/30"
              : tone === "hybrid"
                ? "bg-blue-500/20 text-blue-400 border-blue-500/40 dark:bg-blue-400/15 dark:text-blue-300 dark:border-blue-400/30"
                : tone === "water"
                  ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/40 dark:bg-cyan-400/15 dark:text-cyan-300 dark:border-cyan-400/30"
                  : tone === "vr"
                    ? "bg-purple-500/20 text-purple-400 border-purple-500/40 dark:bg-purple-400/15 dark:text-purple-300 dark:border-purple-400/30"
                    : "bg-white/10 text-white border-white/20";

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] leading-tight ${toneClass}`}
    >
      {children}
    </span>
  );
}

