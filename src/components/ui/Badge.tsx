type Props = {
  children: React.ReactNode;
  tone?: "neutral" | "positive" | "warning" | "patent";
};

export function Badge({ children, tone = "neutral" }: Props) {
  const toneClass =
    tone === "positive"
      ? "bg-emerald-400/15 text-emerald-200 border-emerald-400/30"
      : tone === "warning"
        ? "bg-amber-400/15 text-amber-200 border-amber-400/30"
        : tone === "patent"
          ? "bg-[#00eaff]/20 text-[#00eaff] border-[#00eaff]/40 shadow-[0_0_12px_rgba(0,234,255,0.3)]"
          : "bg-white/10 text-white border-white/20";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] ${toneClass}`}
    >
      {children}
    </span>
  );
}

