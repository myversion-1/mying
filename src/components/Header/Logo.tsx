import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link
      href="/"
      prefetch={false}
      className="flex items-center gap-3 flex-shrink-0"
    >
      {/* Brand Logo */}
      <Image
        src="/logo.svg"
        alt="Miying logo"
        width={122}
        height={71}
        priority
        className="h-8 w-auto"
      />

      {/* Brand name - Professional typography */}
      <div className="hidden sm:flex flex-col items-baseline">
        <div className="text-base font-semibold text-[var(--text-primary)] tracking-tight">
          Miying
        </div>
        <div className="text-xs font-medium text-[var(--text-secondary)]">
          Rides
        </div>
      </div>
    </Link>
  );
}

