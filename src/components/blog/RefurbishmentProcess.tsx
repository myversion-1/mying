"use client";

interface ProcessItem {
  icon: string;
  title: string;
  description: string;
}

interface RefurbishmentProcessProps {
  items: ProcessItem[];
}

export function RefurbishmentProcess({ items }: RefurbishmentProcessProps) {
  return (
    <div className="refurbishment-process my-8 grid gap-6 md:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="process-item rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 transition hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]"
        >
          <div className="process-icon mb-4 text-4xl">{item.icon}</div>
          <h3 className="mb-2 font-serif text-xl font-semibold text-[var(--text-primary)]">
            {item.title}
          </h3>
          <p className="text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

