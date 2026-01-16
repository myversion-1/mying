"use client";

import { useState, useMemo } from "react";
import type { Lang } from "./language";
import { Calculator, TrendingUp, DollarSign, Calendar, FileText } from "lucide-react";
import Link from "next/link";

interface ROICalculatorProps {
  lang: Lang;
  className?: string;
}

/**
 * ROI Calculator Component - B2B Decision Support Tool
 * 
 * Helps B2B decision-makers calculate:
 * - Annual Revenue Projection
 * - Payback Period
 * - 5-Year Net Present Value (NPV)
 * 
 * Features:
 * - Real-time calculation
 * - Professional B2B design
 * - Export financial analysis report
 */
export function ROICalculator({ lang, className = "" }: ROICalculatorProps) {
  const isZh = lang === "zh";
  
  // Input state
  const [venueArea, setVenueArea] = useState("");
  const [dailyVisitors, setDailyVisitors] = useState("");
  const [avgTicketPrice, setAvgTicketPrice] = useState("");
  const [operatingDays, setOperatingDays] = useState("");
  const [equipmentInvestment, setEquipmentInvestment] = useState("");
  const [operatingCost, setOperatingCost] = useState(""); // Annual operating cost as % of revenue
  const [discountRate, setDiscountRate] = useState("10"); // Default 10% discount rate

  // Calculate results
  const results = useMemo(() => {
    const area = parseFloat(venueArea) || 0;
    const visitors = parseFloat(dailyVisitors) || 0;
    const ticketPrice = parseFloat(avgTicketPrice) || 0;
    const days = parseFloat(operatingDays) || 0;
    const investment = parseFloat(equipmentInvestment) || 0;
    const opCostPercent = parseFloat(operatingCost) || 30; // Default 30%
    const discount = parseFloat(discountRate) || 10;

    if (!area || !visitors || !ticketPrice || !days || !investment) {
      return null;
    }

    // Annual Revenue Calculation
    const annualRevenue = visitors * ticketPrice * days;

    // Annual Operating Cost (as % of revenue)
    const annualOperatingCost = annualRevenue * (opCostPercent / 100);

    // Annual Net Profit
    const annualNetProfit = annualRevenue - annualOperatingCost;

    // Payback Period (years)
    const paybackPeriod = investment > 0 ? investment / annualNetProfit : 0;

    // 5-Year NPV Calculation
    let npv = 0;
    for (let year = 1; year <= 5; year++) {
      const yearCashFlow = annualNetProfit;
      const discountedCashFlow = yearCashFlow / Math.pow(1 + discount / 100, year);
      npv += discountedCashFlow;
    }
    npv -= investment; // Subtract initial investment

    return {
      annualRevenue,
      annualOperatingCost,
      annualNetProfit,
      paybackPeriod,
      npv,
    };
  }, [venueArea, dailyVisitors, avgTicketPrice, operatingDays, equipmentInvestment, operatingCost, discountRate]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(isZh ? "zh-CN" : "en-US", {
      style: "currency",
      currency: isZh ? "CNY" : "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Export report
  const handleExportReport = () => {
    if (!results) return;

    const report = `
${isZh ? "投资回报分析报告" : "ROI Analysis Report"}
${isZh ? "生成时间" : "Generated"}: ${new Date().toLocaleDateString(isZh ? "zh-CN" : "en-US")}

${isZh ? "输入参数" : "Input Parameters"}:
${isZh ? "场地面积" : "Venue Area"}: ${venueArea} ${isZh ? "平方米" : "m²"}
${isZh ? "每日客流量" : "Daily Visitors"}: ${dailyVisitors}
${isZh ? "平均票价" : "Average Ticket Price"}: ${formatCurrency(parseFloat(avgTicketPrice))}
${isZh ? "运营天数" : "Operating Days"}: ${operatingDays} ${isZh ? "天/年" : "days/year"}
${isZh ? "设备投资" : "Equipment Investment"}: ${formatCurrency(parseFloat(equipmentInvestment))}
${isZh ? "运营成本占比" : "Operating Cost %"}: ${operatingCost}%
${isZh ? "贴现率" : "Discount Rate"}: ${discountRate}%

${isZh ? "计算结果" : "Results"}:
${isZh ? "预计年收入" : "Projected Annual Revenue"}: ${formatCurrency(results.annualRevenue)}
${isZh ? "年运营成本" : "Annual Operating Cost"}: ${formatCurrency(results.annualOperatingCost)}
${isZh ? "年净利润" : "Annual Net Profit"}: ${formatCurrency(results.annualNetProfit)}
${isZh ? "投资回报周期" : "Payback Period"}: ${results.paybackPeriod.toFixed(1)} ${isZh ? "年" : "years"}
${isZh ? "5年净现值 (NPV)" : "5-Year Net Present Value (NPV)"}: ${formatCurrency(results.npv)}

${isZh ? "如需更详细的财务分析，请联系我们的财务顾问团队。" : "For more detailed financial analysis, please contact our financial advisory team."}
    `.trim();

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ROI-Analysis-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 md:p-8 ${className}`}>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent-primary-light)] text-[var(--accent-primary)]">
          <Calculator className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            {isZh ? "ROI 计算器" : "ROI Calculator"}
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            {isZh ? "计算您的投资回报率和净现值" : "Calculate your return on investment and net present value"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {isZh ? "输入参数" : "Input Parameters"}
          </h3>
          
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              {isZh ? "场地面积 (平方米)" : "Venue Area (m²)"}
            </label>
            <input
              type="number"
              value={venueArea}
              onChange={(e) => setVenueArea(e.target.value)}
              placeholder={isZh ? "例如: 1000" : "e.g., 1000"}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              {isZh ? "目标客流量 (每日)" : "Target Visitors (Daily)"}
            </label>
            <input
              type="number"
              value={dailyVisitors}
              onChange={(e) => setDailyVisitors(e.target.value)}
              placeholder={isZh ? "例如: 500" : "e.g., 500"}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              {isZh ? "平均票价 (美元)" : "Average Ticket Price (USD)"}
            </label>
            <input
              type="number"
              value={avgTicketPrice}
              onChange={(e) => setAvgTicketPrice(e.target.value)}
              placeholder={isZh ? "例如: 25" : "e.g., 25"}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              {isZh ? "运营天数 (每年)" : "Operating Days (Per Year)"}
            </label>
            <input
              type="number"
              value={operatingDays}
              onChange={(e) => setOperatingDays(e.target.value)}
              placeholder={isZh ? "例如: 300" : "e.g., 300"}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              {isZh ? "设备投资预算 (美元)" : "Equipment Investment Budget (USD)"}
            </label>
            <input
              type="number"
              value={equipmentInvestment}
              onChange={(e) => setEquipmentInvestment(e.target.value)}
              placeholder={isZh ? "例如: 500000" : "e.g., 500000"}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              {isZh ? "运营成本占比 (%)" : "Operating Cost % (of revenue)"}
            </label>
            <input
              type="number"
              value={operatingCost}
              onChange={(e) => setOperatingCost(e.target.value)}
              placeholder={isZh ? "例如: 30" : "e.g., 30"}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              {isZh ? "贴现率 (%)" : "Discount Rate (%)"}
            </label>
            <input
              type="number"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              placeholder="10"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {isZh ? "计算结果" : "Results"}
          </h3>

          {results ? (
            <>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--text-tertiary)]">
                  <TrendingUp className="h-4 w-4" />
                  {isZh ? "预计年收入" : "Projected Annual Revenue"}
                </div>
                <div className="text-2xl font-bold text-[var(--accent-primary)]">
                  {formatCurrency(results.annualRevenue)}
                </div>
              </div>

              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--text-tertiary)]">
                  <Calendar className="h-4 w-4" />
                  {isZh ? "投资回报周期" : "Payback Period"}
                </div>
                <div className="text-2xl font-bold text-[var(--accent-primary)]">
                  {results.paybackPeriod.toFixed(1)} {isZh ? "年" : "years"}
                </div>
              </div>

              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--text-tertiary)]">
                  <DollarSign className="h-4 w-4" />
                  {isZh ? "5年净现值 (NPV)" : "5-Year Net Present Value (NPV)"}
                </div>
                <div className={`text-2xl font-bold ${results.npv >= 0 ? "text-[var(--accent-primary)]" : "text-red-500"}`}>
                  {formatCurrency(results.npv)}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <button
                  onClick={handleExportReport}
                  className="w-full rounded-xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--accent-primary)] px-5 py-3 sm:px-7 sm:py-3 text-sm sm:text-base font-semibold shadow-lg shadow-[var(--action-primary)]/30 hover:shadow-xl hover:shadow-[var(--action-primary)]/50 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-95 min-h-[44px] touch-manipulation flex items-center justify-center gap-2 text-[var(--action-primary-text)] border border-[var(--action-primary)]/20"
                >
                  <FileText className="h-4 w-4" />
                  <span>{isZh ? "下载财务分析报告" : "Download Financial Analysis Report"}</span>
                </button>
                <Link
                  href="/contact?type=financial-consultation"
                  className="block w-full rounded-xl border-2 border-[var(--action-primary)] bg-[var(--action-primary)]/5 px-5 py-3 sm:px-7 sm:py-3 text-center text-sm sm:text-base font-semibold text-[var(--action-primary)] shadow-md hover:shadow-lg hover:shadow-[var(--action-primary)]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--action-primary)]/15 active:scale-95 min-h-[44px] touch-manipulation"
                >
                  {isZh ? "预约财务顾问咨询" : "Schedule Financial Advisor Consultation"}
                </Link>
              </div>
            </>
          ) : (
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
              <p className="text-[var(--text-secondary)]">
                {isZh ? "填写左侧参数以查看计算结果" : "Fill in the parameters on the left to see results"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
