"use client";

interface RetailStatsSidebarProps {
  children?: React.ReactNode;
}

export function RetailStatsSidebar({ children }: RetailStatsSidebarProps) {
  return (
    <aside className="retail-stats-sidebar rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
      <h4 className="mb-4 font-serif text-lg font-semibold text-[var(--text-primary)]">
        Retail Impact Data
      </h4>
      <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
        {children || (
          <p>
            According to recent retail trends, interactive zones can increase
            nearby store sales by up to <strong className="text-[var(--accent-primary)]">18%</strong>.
            This directly impacts B2B decision-makers' revenue calculations.
          </p>
        )}
      </div>
    </aside>
  );
}

