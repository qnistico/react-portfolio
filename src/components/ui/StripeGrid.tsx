"use client";

import { ReactNode } from "react";

/**
 * StripeGrid - A grid system inspired by Stripe's layout
 *
 * The key insight: Both the vertical guide lines AND the content columns
 * share the exact same CSS grid. This ensures perfect alignment.
 *
 * The grid has 4 equal columns (1fr each), and guide lines are positioned
 * at the left edge of each column using CSS grid placement.
 */

interface StripeGridProps {
  children: ReactNode;
  className?: string;
  /** Whether to show the vertical guide lines (default: true) */
  showGuides?: boolean;
  /** Number of columns on large screens (default: 4) */
  columns?: 4 | 2;
}

export function StripeGrid({
  children,
  className = "",
  showGuides = true,
  columns = 4
}: StripeGridProps) {
  return (
    <div className={`stripe-grid stripe-grid--${columns}-col ${className}`}>
      {/* Guide lines - positioned within the same grid */}
      {showGuides && (
        <div className="stripe-grid__guides" aria-hidden="true">
          <div className="stripe-grid__guide stripe-grid__guide--1" />
          <div className="stripe-grid__guide stripe-grid__guide--2" />
          <div className="stripe-grid__guide stripe-grid__guide--3" />
          <div className="stripe-grid__guide stripe-grid__guide--4" />
          <div className="stripe-grid__guide stripe-grid__guide--5" />
        </div>
      )}

      {/* Content - lives in the same grid */}
      <div className="stripe-grid__content">
        {children}
      </div>
    </div>
  );
}

/**
 * StripeGridItem - A single item within the stripe grid
 * Each item gets consistent padding from its column edges
 */
interface StripeGridItemProps {
  children: ReactNode;
  className?: string;
}

export function StripeGridItem({ children, className = "" }: StripeGridItemProps) {
  return (
    <div className={`stripe-grid__item ${className}`}>
      {children}
    </div>
  );
}
