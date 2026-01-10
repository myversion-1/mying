"use client";

interface ComparisonData {
  category: string;
  newPurchase: number;
  refurbishment: number;
  unit: string;
}

interface RefurbishmentComparisonProps {
  data: ComparisonData[];
}

export function RefurbishmentComparison({ data }: RefurbishmentComparisonProps) {
  const maxValue = Math.max(
    ...data.flatMap((d) => [d.newPurchase, d.refurbishment])
  );

  return (
    <div className="comparison-chart my-12 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 md:p-8">
      <h3 className="mb-6 font-serif text-2xl font-semibold text-[var(--text-primary)]">
        New Purchase vs. Professional Refurbishment
      </h3>
      <div className="space-y-6">
        {data.map((item, index) => {
          const newWidth = (item.newPurchase / maxValue) * 100;
          const refWidth = (item.refurbishment / maxValue) * 100;
          const savings = ((item.newPurchase - item.refurbishment) / item.newPurchase) * 100;

          return (
            <div key={index} className="comparison-item">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold text-[var(--text-primary)]">{item.category}</span>
                <span className="text-sm text-[var(--text-tertiary)]">
                  {savings.toFixed(0)}% savings
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-32 text-sm text-[var(--text-secondary)]">New Purchase</span>
                  <div className="flex-1">
                    <div
                      className="h-6 rounded bg-gradient-to-r from-[var(--accent-primary)]/30 to-[var(--accent-secondary)]/30"
                      style={{ width: `${newWidth}%` }}
                    >
                      <span className="ml-2 flex h-full items-center text-xs font-semibold text-[var(--text-primary)]">
                        {item.newPurchase} {item.unit}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-32 text-sm text-[var(--text-secondary)]">Refurbishment</span>
                  <div className="flex-1">
                    <div
                      className="h-6 rounded bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                      style={{ width: `${refWidth}%` }}
                    >
                      <span className="ml-2 flex h-full items-center text-xs font-semibold text-[var(--text-inverse)]">
                        {item.refurbishment} {item.unit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

