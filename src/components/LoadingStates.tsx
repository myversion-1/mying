"use client";

import React from "react";
import { Skeleton } from "./Skeleton";

/**
 * Enhanced Loading States for Better UX
 *
 * Provides consistent loading patterns across the application
 * Prevents layout shift with fixed dimensions
 */

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Loading Spinner Component
 * Used for inline loading states
 */
export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        className={`animate-spin ${sizeClasses[size]} text-[var(--accent-primary)]`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="status"
        aria-label="Loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

interface PageLoadingProps {
  message?: string;
}

/**
 * Full Page Loading State
 * Used for initial page loads or route transitions
 */
export function PageLoading({ message }: PageLoadingProps) {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        {message && (
          <p className="text-sm text-[var(--text-secondary)]">{message}</p>
        )}
      </div>
    </div>
  );
}

interface CardSkeletonProps {
  count?: number;
  variant?: "product" | "blog" | "case" | "default";
}

/**
 * Card Skeleton Loading State
 * Prevents layout shift with fixed dimensions
 */
export function CardSkeleton({ count = 3, variant = "default" }: CardSkeletonProps) {
  const heights = {
    product: "h-[450px]",
    blog: "h-[400px]",
    case: "h-[380px]",
    default: "h-[300px]",
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] overflow-hidden ${heights[variant]} animate-pulse`}
          style={{
            containIntrinsicSize: `auto ${heights[variant].replace('h-', '')}`,
          }}
          aria-label="Loading content"
        >
          {/* Image placeholder */}
          <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5" />

          {/* Content placeholder */}
          <div className="p-6 space-y-4">
            {/* Title skeleton */}
            <div className="h-6 bg-white/10 rounded w-3/4" />

            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-white/10 rounded w-full" />
              <div className="h-4 bg-white/10 rounded w-2/3" />
            </div>

            {/* Button skeleton */}
            <div className="h-12 bg-white/10 rounded w-full" />
          </div>
        </div>
      ))}
    </>
  );
}

interface ListSkeletonProps {
  count?: number;
  showAvatar?: boolean;
}

/**
 * List Skeleton Loading State
 */
export function ListSkeleton({ count = 5, showAvatar = true }: ListSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] animate-pulse"
          style={{ minHeight: "72px", containIntrinsicSize: "auto 72px" }}
          aria-label="Loading item"
        >
          {showAvatar && (
            <div className="h-12 w-12 rounded-full bg-white/10 shrink-0" />
          )}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-3 bg-white/10 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

/**
 * Table Skeleton Loading State
 */
export function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-[var(--border)]">
      {/* Header */}
      <div className="flex gap-4 p-4 border-b border-[var(--border)] bg-[var(--surface)]">
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className="h-6 bg-white/10 rounded flex-1" />
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-[var(--border)]">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 p-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="h-4 bg-white/10 rounded flex-1 animate-pulse" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

interface InlineLoadingProps {
  text?: string;
  showSpinner?: boolean;
}

/**
 * Inline Loading State
 * For buttons, form submissions, etc.
 */
export function InlineLoading({ text, showSpinner = true }: InlineLoadingProps) {
  return (
    <div className="flex items-center gap-2">
      {showSpinner && <LoadingSpinner size="sm" />}
      {text && (
        <span className="text-sm text-[var(--text-secondary)]">{text}</span>
      )}
    </div>
  );
}

/**
 * Lazy Loading Component with Intersection Observer
 * Delays loading of components until they're near viewport
 */
interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function LazyLoad({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = "50px",
  triggerOnce = true,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasLoaded(true);
          }
        } else if (!triggerOnce) {
          setIsVisible(entry.isIntersecting);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasLoaded]);

  return (
    <div ref={ref} style={{ minHeight: "200px" }}>
      {isVisible ? children : fallback || <Skeleton variant="rectangular" className="w-full h-48" />}
    </div>
  );
}

/**
 * Progressive Image Loading
 * Shows a blur-up effect while loading
 */
interface ProgressiveImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  width?: number;
  height?: number;
}

export function ProgressiveImage({
  src,
  alt,
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23e5e7eb'/%3E%3C/svg%3E",
  className = "",
  width,
  height,
}: ProgressiveImageProps) {
  const [imgSrc, setImgSrc] = React.useState(placeholder);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-all duration-500 ${isLoading ? "blur-xl scale-110" : "blur-0 scale-100"}`}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
