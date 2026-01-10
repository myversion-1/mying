"use client";

interface ComparisonRow {
  metric: string;
  standardAtrium: string;
  miyingCorner: string;
  advantage?: string;
}

interface CornerEquipmentComparisonProps {
  data?: ComparisonRow[];
}

export function CornerEquipmentComparison({ data }: CornerEquipmentComparisonProps) {
  const defaultData: ComparisonRow[] = [
    {
      metric: "Footprint (sqm)",
      standardAtrium: "150-200",
      miyingCorner: "50-80",
      advantage: "67% smaller",
    },
    {
      metric: "Height Requirements",
      standardAtrium: "8-12m",
      miyingCorner: "4-6m",
      advantage: "50% lower",
    },
    {
      metric: "Installation Time",
      standardAtrium: "4-6 weeks",
      miyingCorner: "1-2 weeks",
      advantage: "3x faster",
    },
    {
      metric: "Estimated ROI per sqm",
      standardAtrium: "$500-800",
      miyingCorner: "$1,200-1,800",
      advantage: "2.5x higher",
    },
  ];

  const comparisonData = data || defaultData;

  return (
    <div className="comparison-table my-12 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th className="p-4 text-left font-serif text-lg font-semibold text-[var(--text-primary)]">
              Metric
            </th>
            <th className="p-4 text-left font-serif text-lg font-semibold text-[var(--text-primary)]">
              Standard Atrium Rides
            </th>
            <th className="p-4 text-left font-serif text-lg font-semibold text-[var(--accent-primary)]">
              Miying Corner Units
            </th>
            <th className="p-4 text-left font-serif text-lg font-semibold text-[var(--text-primary)]">
              Advantage
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((row, index) => (
            <tr
              key={index}
              className="border-b border-[var(--border)] transition hover:bg-[var(--surface-hover)]"
            >
              <td className="p-4 font-semibold text-[var(--text-primary)]">{row.metric}</td>
              <td className="p-4 text-[var(--text-secondary)]">{row.standardAtrium}</td>
              <td className="p-4 font-semibold text-[var(--accent-primary)]">
                {row.miyingCorner}
              </td>
              <td className="p-4 text-sm text-[var(--text-tertiary)]">{row.advantage || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

