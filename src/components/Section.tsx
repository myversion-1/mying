type SectionProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function Section({ id, title, eyebrow, subtitle, children }: SectionProps) {
  return (
    <section 
      id={id} 
      className="py-16 md:py-20 lg:py-24"
      style={{
        // Prevent layout shift by reserving minimum space
        minHeight: '1px',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
        {(title || subtitle) && (
          <div className="mb-8 max-w-3xl space-y-2">
            {eyebrow && (
              <div className="inline-flex rounded-full bg-[var(--accent-primary-light)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-primary)]">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[var(--text-secondary)] md:text-lg">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

