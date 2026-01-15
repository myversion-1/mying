import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      prefetch={false}
      className="flex items-center gap-3 flex-shrink-0 group relative"
    >
      {/* Logo container with gradient background and glow effect */}
      <div className="relative flex items-center justify-center rounded-2xl p-2 transition-all duration-300 group-hover:scale-105">
        {/* Gradient background with subtle glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)]/20 via-[var(--accent-primary)]/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Animated glow ring on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

        {/* Border with gradient */}
        <div className="absolute inset-0 rounded-2xl border border-[var(--accent-primary)]/30 group-hover:border-[var(--accent-primary)]/50 transition-colors duration-300" />

        {/* Logo image with backdrop blur effect */}
        <div className="relative z-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-1.5 border border-white/10">
          <img
            src="/logo.jpg"
            alt="Miying logo"
            width={40}
            height={32}
            className="h-8 w-auto transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
          />
        </div>

        {/* Subtle shine effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Brand name with improved typography - Hidden on mobile */}
      {/* Optimized contrast for dark and light modes */}
      <div className="hidden sm:flex flex-col">
        <div className="text-base font-bold uppercase tracking-[0.1em] text-[var(--text-primary)] dark:text-[rgba(255,255,255,0.98)] whitespace-nowrap group-hover:text-[var(--accent-primary)] transition-colors duration-300">
          Miying
        </div>
        <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--text-secondary)] dark:text-[rgba(255,255,255,0.85)] whitespace-nowrap group-hover:text-[var(--text-primary)] dark:group-hover:text-[rgba(255,255,255,0.98)] transition-colors duration-300">
          Rides
        </div>
      </div>
    </Link>
  );
}

