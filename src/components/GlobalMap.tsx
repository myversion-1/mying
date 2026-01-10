"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseItem } from "../content/types/case";
import { useLanguage } from "./language";

interface GlobalMapProps {
  cases: CaseItem[];
  onCountryClick?: (countryCode: string, cases: CaseItem[]) => void;
  className?: string;
}

/**
 * Global Map Component
 * Displays an interactive world map showing countries where Miying has projects
 * Uses SVG-based world map for lightweight, no external dependencies
 * 
 * Features:
 * - Interactive country highlighting
 * - Click to view cases in that country
 * - Visual indicators for project density
 * - Responsive design with mobile support
 */
export function GlobalMap({ cases, onCountryClick, className = "" }: GlobalMapProps) {
  const { lang } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Group cases by country code
  const casesByCountry = cases.reduce((acc, caseItem) => {
    const code = caseItem.countryCode || caseItem.country;
    if (!acc[code]) {
      acc[code] = [];
    }
    acc[code].push(caseItem);
    return acc;
  }, {} as Record<string, CaseItem[]>);

  // Get country statistics
  const countryStats = Object.entries(casesByCountry).map(([code, countryCases]) => ({
    code,
    count: countryCases.length,
    cases: countryCases,
    country: countryCases[0]?.country || code,
  }));

  // Simplified world map data (major countries where Miying has projects)
  // In production, you might want to use a proper world map SVG or library
  const countries = [
    { code: "AE", name: "UAE", x: 55, y: 25, cases: casesByCountry["AE"] || [] },
    { code: "SG", name: "Singapore", x: 104, y: 2, cases: casesByCountry["SG"] || [] },
    { code: "TH", name: "Thailand", x: 101, y: 15, cases: casesByCountry["TH"] || [] },
    { code: "US", name: "USA", x: -95, y: 40, cases: casesByCountry["US"] || [] },
    { code: "CN", name: "China", x: 105, y: 35, cases: casesByCountry["CN"] || [] },
  ];

  const handleCountryClick = (code: string, countryCases: CaseItem[]) => {
    setSelectedCountry(code);
    onCountryClick?.(code, countryCases);
  };

  // Get color intensity based on project count - using CSS variables
  const getCountryColor = (count: number) => {
    if (count === 0) return "rgba(255, 255, 255, 0.1)";
    if (count === 1) return "rgba(0, 234, 255, 0.3)"; // --accent-primary with opacity
    if (count <= 3) return "rgba(0, 234, 255, 0.5)";
    return "rgba(0, 234, 255, 0.7)";
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Map Container */}
      <div className="relative w-full h-[500px] md:h-[600px] bg-[var(--dark-bg-base)] rounded-2xl border border-white/10 overflow-hidden">
        {/* SVG World Map */}
        <svg
          ref={svgRef}
          viewBox="-180 -90 360 180"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background */}
          <rect width="360" height="180" fill="var(--dark-bg-base)" />
          
          {/* Simplified world map outline (you can replace with a proper world map SVG) */}
          {/* For now, we'll use circles to represent countries */}
          {countries.map((country) => {
            const count = country.cases.length;
            const isSelected = selectedCountry === country.code;
            const isHovered = hoveredCountry === country.code;
            
            return (
              <g key={country.code}>
                {/* Country marker circle */}
                <circle
                  cx={country.x}
                  cy={country.y}
                  r={isSelected || isHovered ? 8 : 6}
                  fill={getCountryColor(count)}
                  stroke={isSelected || isHovered ? "var(--accent-primary)" : "rgba(255, 255, 255, 0.3)"}
                  strokeWidth={isSelected || isHovered ? 2 : 1}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => handleCountryClick(country.code, country.cases)}
                  onMouseEnter={() => setHoveredCountry(country.code)}
                  onMouseLeave={() => setHoveredCountry(null)}
                />
                
                {/* Project count label */}
                {count > 0 && (
                  <text
                    x={country.x}
                    y={country.y + 12}
                    textAnchor="middle"
                    className="text-xs fill-white/80 pointer-events-none"
                    fontSize="10"
                  >
                    {count}
                  </text>
                )}
                
                {/* Country name label (on hover) */}
                {isHovered && (
                  <g>
                    <rect
                      x={country.x - 30}
                      y={country.y - 25}
                      width="60"
                      height="20"
                      fill="rgba(0, 0, 0, 0.8)"
                      rx="4"
                    />
                    <text
                      x={country.x}
                      y={country.y - 12}
                      textAnchor="middle"
                      className="text-xs fill-white pointer-events-none"
                      fontSize="10"
                    >
                      {country.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-auto bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="text-sm font-semibold text-white mb-3">
            {lang === "zh" ? "项目分布" : "Project Distribution"}
          </div>
          <div className="flex flex-wrap gap-4">
            {countryStats.map((stat) => (
              <button
                key={stat.code}
                onClick={() => handleCountryClick(stat.code, stat.cases)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors min-h-[44px] touch-manipulation ${
                  selectedCountry === stat.code
                    ? "bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getCountryColor(stat.count) }}
                />
                <span className="text-sm text-white">
                  {stat.country}: {stat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Panel (when country selected) */}
      {selectedCountry && casesByCountry[selectedCountry] && (
        <div className="mt-6 p-6 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">
              {lang === "zh" ? "项目列表" : "Projects"}
              {casesByCountry[selectedCountry][0]?.country && (
                <span className="ml-2 text-[var(--accent-primary)]">
                  - {casesByCountry[selectedCountry][0].country}
                </span>
              )}
            </h3>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-[var(--dark-bg-text-tertiary)] hover:text-[var(--dark-bg-text)] transition-colors min-h-[44px] min-w-[44px] touch-manipulation"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {casesByCountry[selectedCountry].map((caseItem) => (
              <a
                key={caseItem.id}
                href={`/cases/${caseItem.id}`}
                className="block p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[var(--accent-primary)]/50 transition-colors min-h-[44px] touch-manipulation"
              >
                <h4 className="font-semibold text-white mb-2">{caseItem.title}</h4>
                <p className="text-sm text-[var(--dark-bg-text-tertiary)]">{caseItem.projectType}</p>
                {caseItem.year && (
                  <p className="text-xs text-[var(--dark-bg-text-tertiary)] mt-1">{caseItem.year}</p>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



