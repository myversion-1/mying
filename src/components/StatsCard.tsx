"use client";

type StatsCardProps = {
  number: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
};

export function StatsCard({ number, label, description, icon, className = "" }: StatsCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 transition hover:border-[#7df6ff]/30 hover:bg-white/10 ${className}`}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7df6ff]/10 text-[#7df6ff]">
            {icon}
          </div>
        )}
        <div className="flex-1 space-y-2">
          <div className="space-y-1">
            <div className="text-3xl font-bold text-[#00eaff]">{number}</div>
            <div className="text-lg font-semibold text-white">{label}</div>
          </div>
          {description && (
            <p className="text-sm text-white/70">{description}</p>
          )}
        </div>
      </div>
      {/* Hover effect */}
      <div className="absolute inset-0 bg-[#7df6ff]/0 transition-colors group-hover:bg-[#7df6ff]/5 pointer-events-none" />
    </div>
  );
}

