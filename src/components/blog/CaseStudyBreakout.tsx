"use client";

interface CaseStudyBreakoutProps {
  title?: string;
  children: React.ReactNode;
}

export function CaseStudyBreakout({
  title = "Case Study",
  children,
}: CaseStudyBreakoutProps) {
  return (
    <div className="case-study-breakout my-12 rounded-xl border-l-4 border-[var(--accent-primary)] bg-gradient-to-r from-[var(--accent-primary-light)] to-transparent p-6 md:p-8">
      {title && (
        <h3 className="mb-4 font-serif text-xl font-semibold text-[var(--text-primary)] md:text-2xl">
          {title}
        </h3>
      )}
      <div className="text-[var(--text-primary)] leading-relaxed">{children}</div>
    </div>
  );
}

