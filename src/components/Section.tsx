type SectionProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function Section({ id, title, eyebrow, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {(title || subtitle) && (
          <div className="mb-8 max-w-3xl space-y-2">
            {eyebrow && (
              <div className="inline-flex rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7df6ff]">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-2xl font-semibold text-white md:text-3xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-white/70 md:text-lg">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

