"use client";

/**
 * Skeleton loading component
 * Provides placeholder content while data is loading
 */

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

/**
 * Base Skeleton component
 */
export function Skeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
}: SkeletonProps) {
  const baseStyles = "bg-white/10 rounded";
  const variantStyles = {
    text: "h-4",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };
  const animationStyles = {
    pulse: "animate-pulse",
    wave: "animate-[shimmer_2s_infinite]",
    none: "",
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${animationStyles[animation]} ${className}`}
      style={style}
      aria-busy="true"
      aria-label="Loading"
    />
  );
}

/**
 * Text Skeleton - for loading text content
 */
export function TextSkeleton({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? "75%" : "100%"}
          animation="pulse"
        />
      ))}
    </div>
  );
}

/**
 * Card Skeleton - for loading card components
 */
export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${className}`}>
      <Skeleton variant="rectangular" height={200} className="mb-4" />
      <Skeleton variant="text" width="60%" className="mb-2" />
      <Skeleton variant="text" width="80%" />
    </div>
  );
}

/**
 * Product Card Skeleton
 */
export function ProductCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-white/0 p-4 ${className}`}>
      <Skeleton variant="rectangular" height={192} className="mb-3 rounded-xl" />
      <Skeleton variant="text" width="70%" className="mb-2" />
      <Skeleton variant="text" width="50%" />
    </div>
  );
}

/**
 * Grid of Product Card Skeletons
 */
export function ProductGridSkeleton({
  count = 6,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}














