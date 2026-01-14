"use client";

import { useState } from "react";
import { tradeShows, getUpcomingTradeShows, getLocalizedTradeShow } from "../../content/trade-shows";
import type { TradeShow } from "../../content/types/trade-show";
import { useLanguage } from "../../components/language";

export default function TradeShowsPage() {
  const { lang } = useLanguage();
  const [selectedStatus, setSelectedStatus] = useState<"all" | "upcoming" | "past">("all");

  const upcomingShows = getUpcomingTradeShows();
  const pastShows = tradeShows.filter((show) => show.status === "past").sort((a, b) => 
    b.date.start.localeCompare(a.date.start)
  );

  const displayedShows = selectedStatus === "all" 
    ? [...upcomingShows, ...pastShows]
    : selectedStatus === "upcoming"
    ? upcomingShows
    : pastShows;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: TradeShow["status"]) => {
    if (status === "upcoming") {
      return (
        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400 border border-green-500/30">
          {lang === "zh" ? "即将到来" : "Upcoming"}
        </span>
      );
    } else if (status === "current") {
      return (
        <span className="rounded-full bg-[var(--surface-elevated)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)] border border-[var(--accent-primary)]/30">
          {lang === "zh" ? "进行中" : "Current"}
        </span>
      );
    } else {
      return (
        <span className="rounded-full bg-[var(--text-tertiary)]/20 px-3 py-1 text-xs font-semibold text-[var(--text-tertiary)] border border-[var(--text-tertiary)]/30">
          {lang === "zh" ? "已结束" : "Past"}
        </span>
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-12 md:px-8 md:py-16">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
          {lang === "zh" ? "展会信息" : "Trade Shows"}
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          {lang === "zh" 
            ? "了解 Miying 参与的全球游乐园和娱乐设备展会，欢迎前来我们的展位参观交流" 
            : "Discover global amusement park and entertainment equipment trade shows where Miying participates. Visit our booth to learn more."}
        </p>
      </div>

      {/* Status Filter */}
      <div className="mb-8 flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setSelectedStatus("all")}
          className={`rounded-lg border px-6 py-2 text-sm font-semibold transition min-h-[44px] touch-manipulation ${
            selectedStatus === "all"
              ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-[var(--action-primary-text)]"
              : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]"
          }`}
        >
          {lang === "zh" ? "全部" : "All"}
        </button>
        <button
          onClick={() => setSelectedStatus("upcoming")}
          className={`rounded-lg border px-6 py-2 text-sm font-semibold transition min-h-[44px] touch-manipulation ${
            selectedStatus === "upcoming"
              ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-[var(--action-primary-text)]"
              : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]"
          }`}
        >
          {lang === "zh" ? "即将到来" : "Upcoming"}
        </button>
        <button
          onClick={() => setSelectedStatus("past")}
          className={`rounded-lg border px-6 py-2 text-sm font-semibold transition min-h-[44px] touch-manipulation ${
            selectedStatus === "past"
              ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-[var(--action-primary-text)]"
              : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]"
          }`}
        >
          {lang === "zh" ? "历史展会" : "Past"}
        </button>
      </div>

      {/* Trade Shows List */}
      <div className="space-y-6">
        {displayedShows.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-12 text-center">
            <p className="text-[var(--text-secondary)]">
              {lang === "zh" 
                ? "暂无展会信息" 
                : "No trade shows available at the moment."}
            </p>
          </div>
        ) : (
          displayedShows.map((show) => {
            const localized = getLocalizedTradeShow(show, lang);
            return (
              <div
                key={show.id}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 transition hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                        {localized.name}
                      </h3>
                      {getStatusBadge(show.status)}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{localized.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                          {formatDate(show.date.start)}
                          {show.date.start !== show.date.end && ` - ${formatDate(show.date.end)}`}
                        </span>
                      </div>
                      
                      {show.booth && (
                        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>{show.booth}</span>
                        </div>
                      )}
                    </div>

                    {localized.description && (
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        {localized.description}
                      </p>
                    )}
                  </div>

                  {show.website && (
                    <div className="flex-shrink-0">
                      <a
                        href={show.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-hover)] hover:border-[var(--accent-primary)]/30 min-h-[44px] touch-manipulation"
                      >
                        <span>{lang === "zh" ? "访问官网" : "Visit Website"}</span>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Contact CTA */}
      <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">
          {lang === "zh" ? "想在我们的展位见面？" : "Want to meet us at our booth?"}
        </h2>
        <p className="mb-6 text-[var(--text-secondary)]">
          {lang === "zh" 
            ? "联系我们预约展会期间的会面时间" 
            : "Contact us to schedule a meeting during the trade show"}
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-6 py-3 font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
        >
          <span>{lang === "zh" ? "联系我们" : "Contact Us"}</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}



