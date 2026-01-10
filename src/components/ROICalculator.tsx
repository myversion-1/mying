"use client";

import { useMemo } from "react";
import { useLanguage } from "./language";
import type { Product } from "../content/copy";

interface ROICalculatorProps {
  products: Product[];
}

/**
 * ROI Calculator Component
 * Calculates potential annual revenue based on:
 * - Product capacity (riders)
 * - Industry average turnover rate
 * - Average ticket price
 * 
 * Displays revenue growth curve over time
 */
export function ROICalculator({ products }: ROICalculatorProps) {
  const { lang } = useLanguage();

  // Industry average metrics
  const AVERAGE_TICKET_PRICE = 5; // USD per ride
  const DAILY_OPERATING_HOURS = 10;
  const DAYS_PER_YEAR = 365;
  const TURNOVER_RATE = 0.7; // 70% capacity utilization on average
  const ANNUAL_GROWTH_RATE = 0.15; // 15% annual growth

  // Calculate total capacity from filtered products
  const totalCapacity = useMemo(() => {
    return products.reduce((sum, product) => {
      const riders = parseInt(product.riders) || 0;
      return sum + riders;
    }, 0);
  }, [products]);

  // Calculate annual revenue projections
  const revenueProjections = useMemo(() => {
    const projections = [];
    const baseDailyRevenue =
      totalCapacity * AVERAGE_TICKET_PRICE * TURNOVER_RATE * DAILY_OPERATING_HOURS;
    const baseAnnualRevenue = baseDailyRevenue * DAYS_PER_YEAR;

    for (let year = 1; year <= 5; year++) {
      const revenue = baseAnnualRevenue * Math.pow(1 + ANNUAL_GROWTH_RATE, year - 1);
      projections.push({
        year,
        revenue: Math.round(revenue),
      });
    }

    return projections;
  }, [totalCapacity]);

  const maxRevenue = Math.max(...revenueProjections.map((p) => p.revenue));

  if (totalCapacity === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-[var(--accent-primary)]/30 bg-[var(--accent-primary-light)] p-6">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-white mb-2">
          {lang === "zh" ? "ROI 预估" : "ROI Projection"}
        </h4>
        <p className="text-sm text-[var(--dark-bg-text-secondary)]">
          {lang === "zh"
            ? "基于设备容量和行业平均周转率的年度营收预估"
            : "Annual revenue projection based on capacity and industry average turnover"}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg bg-white/5 p-4 border border-white/10">
          <div className="text-xs text-[var(--dark-bg-text-tertiary)] mb-1">
            {lang === "zh" ? "总容量" : "Total Capacity"}
          </div>
          <div className="text-2xl font-bold text-[var(--accent-primary)]">{totalCapacity}</div>
          <div className="text-xs text-[var(--dark-bg-text-tertiary)] mt-1">
            {lang === "zh" ? "乘客/次" : "riders/cycle"}
          </div>
        </div>
        <div className="rounded-lg bg-white/5 p-4 border border-white/10">
          <div className="text-xs text-[var(--dark-bg-text-tertiary)] mb-1">
            {lang === "zh" ? "设备数量" : "Products"}
          </div>
          <div className="text-2xl font-bold text-[var(--accent-primary)]">{products.length}</div>
          <div className="text-xs text-[var(--dark-bg-text-tertiary)] mt-1">
            {lang === "zh" ? "个设备" : "products"}
          </div>
        </div>
      </div>

      {/* Revenue Growth Chart */}
      <div className="mb-4">
        <h5 className="text-sm font-medium text-white/90 mb-4">
          {lang === "zh" ? "5年营收增长曲线" : "5-Year Revenue Growth Curve"}
        </h5>
        <div className="space-y-3">
          {revenueProjections.map((projection, index) => {
            const percentage = (projection.revenue / maxRevenue) * 100;
            return (
              <div
                key={projection.year}
                className="relative transition-opacity"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-medium text-[var(--dark-bg-text-secondary)] w-12">
                    {lang === "zh" ? `第${projection.year}年` : `Year ${projection.year}`}
                  </span>
                  <div className="flex-1 h-6 bg-white/10 rounded-lg overflow-hidden relative">
                    <div
                      style={{ width: `${percentage}%` }}
                      className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-lg flex items-center justify-end pr-2 transition-all"
                    >
                      <span className="text-xs font-semibold text-[var(--text-inverse)]">
                        ${(projection.revenue / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[var(--accent-primary)] w-20 text-right">
                    ${projection.revenue.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Assumptions */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="text-xs text-[var(--dark-bg-text-tertiary)]">
          {lang === "zh" ? (
            <>
              <strong>假设条件：</strong>
              平均票价 ${AVERAGE_TICKET_PRICE}，日运营 {DAILY_OPERATING_HOURS} 小时，
              容量利用率 {Math.round(TURNOVER_RATE * 100)}%，年增长率{" "}
              {Math.round(ANNUAL_GROWTH_RATE * 100)}%。实际结果可能因市场条件而异。
            </>
          ) : (
            <>
              <strong>Assumptions:</strong> Average ticket ${AVERAGE_TICKET_PRICE},{" "}
              {DAILY_OPERATING_HOURS}h daily operation, {Math.round(TURNOVER_RATE * 100)}%
              capacity utilization, {Math.round(ANNUAL_GROWTH_RATE * 100)}% annual growth.
              Actual results may vary based on market conditions.
            </>
          )}
        </p>
      </div>
    </div>
  );
}



