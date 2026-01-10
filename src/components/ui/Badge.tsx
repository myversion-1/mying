type Props = {
  children: React.ReactNode;
  tone?: "neutral" | "positive" | "warning" | "patent" | "electric" | "mechanical" | "hybrid";
};

export function Badge({ children, tone = "neutral" }: Props) {
  const toneClass =
    tone === "positive"
      ? "bg-emerald-400/15 text-emerald-200 border-emerald-400/30"
      : tone === "warning"
        ? "bg-amber-400/15 text-amber-200 border-amber-400/30"
        : tone === "patent"
          ? "bg-[#00eaff]/20 text-[#00eaff] border-[#00eaff]/40 shadow-[0_0_12px_rgba(0,234,255,0.3)]"
          : tone === "electric"
            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 dark:bg-emerald-400/15 dark:text-emerald-300 dark:border-emerald-400/30"
            : tone === "mechanical"
              ? "bg-orange-500/20 text-orange-400 border-orange-500/40 dark:bg-orange-400/15 dark:text-orange-300 dark:border-orange-400/30"
              : tone === "hybrid"
                ? "bg-blue-500/20 text-blue-400 border-blue-500/40 dark:bg-blue-400/15 dark:text-blue-300 dark:border-blue-400/30"
                : "bg-white/10 text-white border-white/20";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] ${toneClass}`}
    >
      {children}
    </span>
  );
}

