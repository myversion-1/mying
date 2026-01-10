"use client";

interface TechnicalSpotlightProps {
  children?: React.ReactNode;
}

export function TechnicalSpotlight({ children }: TechnicalSpotlightProps) {
  return (
    <aside className="technical-spotlight rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
      <h3 className="mb-4 font-serif text-xl font-semibold text-[var(--text-primary)]">
        Technical Spotlight
      </h3>
      <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
        {children}
      </div>
    </aside>
  );
}

