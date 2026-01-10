"use client";
import Image from "next/image";

interface BeforeAfterProps {
  beforeImage?: string;
  afterImage?: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export function BeforeAfter({
  beforeImage,
  afterImage,
  beforeAlt = "Equipment before refurbishment",
  afterAlt = "Equipment after refurbishment",
}: BeforeAfterProps) {
  return (
    <div className="before-after my-12 grid gap-6 md:grid-cols-2">
      <div className="before-section rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
        <h3 className="mb-4 font-serif text-xl font-semibold text-[var(--text-primary)]">
          Before Refurbishment
        </h3>
        {beforeImage ? (
          <div className="relative h-64 w-full overflow-hidden rounded-lg">
            <Image
              src={beforeImage}
              alt={beforeAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--text-tertiary)]">
            <span>Worn, outdated equipment image</span>
          </div>
        )}
      </div>
      <div className="after-section rounded-xl border border-[var(--accent-primary)]/30 bg-gradient-to-br from-[var(--accent-primary-light)] to-[var(--accent-primary-light)] p-6">
        <h3 className="mb-4 font-serif text-xl font-semibold text-[var(--text-primary)]">
          After Refurbishment
        </h3>
        {afterImage ? (
          <div className="relative h-64 w-full overflow-hidden rounded-lg">
            <Image
              src={afterImage}
              alt={afterAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center rounded-lg bg-[var(--accent-primary-light)] text-[var(--text-primary)]">
            <span>Modern, refreshed equipment with industrial aesthetic</span>
          </div>
        )}
      </div>
    </div>
  );
}

