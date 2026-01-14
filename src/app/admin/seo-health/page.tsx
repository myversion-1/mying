/**
 * SEO Health Check Admin Dashboard
 * Displays comprehensive SEO health report similar to SEMrush, Ahrefs, Moz
 */

"use client";

import { useState, useEffect } from "react";
import type { SEOHealthReport } from "@/lib/seo-health-checker";
import {
  generateCSVReport,
  generateHTMLReport,
  generateJSONReport,
  downloadReport,
} from "@/lib/seo-report-generator";

export default function SEOHealthPage() {
  const [report, setReport] = useState<SEOHealthReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [domain, setDomain] = useState("https://www.miyingrides.com");
  const [includeThirdParty, setIncludeThirdParty] = useState(false);

  const fetchHealthReport = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        domain,
        includeThirdParty: includeThirdParty.toString(),
      });
      
      const response = await fetch(`/api/seo-health?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch health report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthReport();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pass: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      fail: "bg-red-100 text-red-800",
      not_checked: "bg-gray-100 text-gray-800",
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${colors[status as keyof typeof colors] || colors.not_checked}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      error: "bg-red-100 text-red-800",
      warning: "bg-yellow-100 text-yellow-800",
      info: "bg-blue-100 text-blue-800",
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${colors[severity as keyof typeof colors] || colors.info}`}>
        {severity.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            SEO Health Check Dashboard
          </h1>
          <p className="text-[var(--text-secondary)]">
            Comprehensive SEO health analysis similar to SEMrush, Ahrefs, and Moz
          </p>
        </div>

        {/* Controls */}
        <div className="bg-[var(--surface-elevated)] rounded-lg p-6 mb-8 border border-[var(--border)]">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Domain
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)]"
                placeholder="https://www.miyingrides.com"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="thirdParty"
                checked={includeThirdParty}
                onChange={(e) => setIncludeThirdParty(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="thirdParty" className="text-sm text-[var(--text-secondary)]">
                Include Third-Party Data (SEMrush, Ahrefs, Moz)
              </label>
            </div>
            <button
              onClick={fetchHealthReport}
              disabled={loading}
              className="px-6 py-2 bg-[var(--action-primary)] text-[var(--action-primary-text)] rounded-lg font-semibold hover:bg-[var(--action-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation"
            >
              {loading ? "Checking..." : "Run Health Check"}
            </button>
          </div>
          
          {/* Export Buttons */}
          {report && (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  const csv = generateCSVReport(report);
                  downloadReport(csv, `seo-health-report-${new Date().toISOString().split("T")[0]}.csv`, "text/csv");
                }}
                className="px-4 py-2 bg-[var(--surface-elevated)] text-[var(--text-primary)] rounded-lg border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors min-h-[44px] touch-manipulation"
              >
                Export CSV
              </button>
              <button
                onClick={() => {
                  const html = generateHTMLReport(report);
                  downloadReport(html, `seo-health-report-${new Date().toISOString().split("T")[0]}.html`, "text/html");
                }}
                className="px-4 py-2 bg-[var(--surface-elevated)] text-[var(--text-primary)] rounded-lg border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors min-h-[44px] touch-manipulation"
              >
                Export HTML
              </button>
              <button
                onClick={() => {
                  const json = generateJSONReport(report);
                  downloadReport(json, `seo-health-report-${new Date().toISOString().split("T")[0]}.json`, "application/json");
                }}
                className="px-4 py-2 bg-[var(--surface-elevated)] text-[var(--text-primary)] rounded-lg border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors min-h-[44px] touch-manipulation"
              >
                Export JSON
              </button>
            </div>
          )}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && !report && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--action-primary)]"></div>
            <p className="mt-4 text-[var(--text-secondary)]">Running SEO health check...</p>
          </div>
        )}

        {/* Report */}
        {report && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="bg-[var(--surface-elevated)] rounded-lg p-8 border border-[var(--border)]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                    Overall SEO Score
                  </h2>
                  <p className="text-[var(--text-secondary)]">
                    Last checked: {new Date(report.checkedAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <div className={`text-6xl font-bold ${getScoreColor(report.overallScore)}`}>
                    {report.overallScore}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)] mt-2">out of 100</div>
                </div>
              </div>
              
              {/* Summary */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[var(--background)] rounded-lg p-4">
                  <div className="text-2xl font-bold text-[var(--text-primary)]">
                    {report.summary.totalIssues}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">Total Issues</div>
                </div>
                <div className="bg-[var(--background)] rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-500">
                    {report.summary.criticalIssues}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">Critical Issues</div>
                </div>
                <div className="bg-[var(--background)] rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-500">
                    {report.summary.warnings}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">Warnings</div>
                </div>
              </div>
            </div>

            {/* Technical SEO */}
            <div className="bg-[var(--surface-elevated)] rounded-lg p-6 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  Technical SEO
                </h3>
                <div className="flex items-center gap-4">
                  {getStatusBadge(report.technicalSEO.status)}
                  <span className={`text-2xl font-bold ${getScoreColor(report.technicalSEO.score)}`}>
                    {report.technicalSEO.score}
                  </span>
                </div>
              </div>
              
              {report.technicalSEO.issues.length > 0 ? (
                <div className="space-y-3">
                  {report.technicalSEO.issues.map((issue) => (
                    <div
                      key={issue.id}
                      className="bg-[var(--background)] rounded-lg p-4 border border-[var(--border)]"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-[var(--text-primary)]">
                              {issue.title}
                            </h4>
                            {getSeverityBadge(issue.severity)}
                          </div>
                          <p className="text-sm text-[var(--text-secondary)] mb-2">
                            {issue.description}
                          </p>
                          <p className="text-sm text-[var(--accent-primary)]">
                            💡 {issue.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[var(--text-secondary)]">No issues found. Great job! ✅</p>
              )}
            </div>

            {/* Content SEO */}
            <div className="bg-[var(--surface-elevated)] rounded-lg p-6 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  Content SEO
                </h3>
                <div className="flex items-center gap-4">
                  {getStatusBadge(report.contentSEO.status)}
                  <span className={`text-2xl font-bold ${getScoreColor(report.contentSEO.score)}`}>
                    {report.contentSEO.score}
                  </span>
                </div>
              </div>
              
              {report.contentSEO.issues.length > 0 ? (
                <div className="space-y-3">
                  {report.contentSEO.issues.map((issue) => (
                    <div
                      key={issue.id}
                      className="bg-[var(--background)] rounded-lg p-4 border border-[var(--border)]"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-[var(--text-primary)]">
                              {issue.title}
                            </h4>
                            {getSeverityBadge(issue.severity)}
                          </div>
                          <p className="text-sm text-[var(--text-secondary)] mb-2">
                            {issue.description}
                          </p>
                          {issue.affectedPages && issue.affectedPages.length > 0 && (
                            <p className="text-xs text-[var(--text-tertiary)] mb-2">
                              Affected: {issue.affectedPages.join(", ")}
                            </p>
                          )}
                          <p className="text-sm text-[var(--accent-primary)]">
                            💡 {issue.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[var(--text-secondary)]">No issues found. Great job! ✅</p>
              )}
            </div>

            {/* Third-Party Data */}
            {report.thirdParty && (
              <div className="bg-[var(--surface-elevated)] rounded-lg p-6 border border-[var(--border)]">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Third-Party SEO Data
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {report.thirdParty.semrush && (
                    <div className="bg-[var(--background)] rounded-lg p-4 border border-[var(--border)]">
                      <h4 className="font-semibold text-[var(--text-primary)] mb-3">SEMrush</h4>
                      <div className="space-y-2 text-sm">
                        {report.thirdParty.semrush.domainAuthority && (
                          <div>
                            <span className="text-[var(--text-secondary)]">Domain Authority: </span>
                            <span className="font-semibold text-[var(--text-primary)]">
                              {report.thirdParty.semrush.domainAuthority}
                            </span>
                          </div>
                        )}
                        {report.thirdParty.semrush.organicKeywords && (
                          <div>
                            <span className="text-[var(--text-secondary)]">Organic Keywords: </span>
                            <span className="font-semibold text-[var(--text-primary)]">
                              {report.thirdParty.semrush.organicKeywords.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {report.thirdParty.semrush.backlinks && (
                          <div>
                            <span className="text-[var(--text-secondary)]">Backlinks: </span>
                            <span className="font-semibold text-[var(--text-primary)]">
                              {report.thirdParty.semrush.backlinks.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {report.thirdParty.ahrefs && (
                    <div className="bg-[var(--background)] rounded-lg p-4 border border-[var(--border)]">
                      <h4 className="font-semibold text-[var(--text-primary)] mb-3">Ahrefs</h4>
                      <div className="space-y-2 text-sm">
                        {report.thirdParty.ahrefs.domainRating && (
                          <div>
                            <span className="text-[var(--text-secondary)]">Domain Rating: </span>
                            <span className="font-semibold text-[var(--text-primary)]">
                              {report.thirdParty.ahrefs.domainRating}
                            </span>
                          </div>
                        )}
                        {report.thirdParty.ahrefs.organicKeywords && (
                          <div>
                            <span className="text-[var(--text-secondary)]">Organic Keywords: </span>
                            <span className="font-semibold text-[var(--text-primary)]">
                              {report.thirdParty.ahrefs.organicKeywords.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {report.thirdParty.ahrefs.backlinks && (
                          <div>
                            <span className="text-[var(--text-secondary)]">Backlinks: </span>
                            <span className="font-semibold text-[var(--text-primary)]">
                              {report.thirdParty.ahrefs.backlinks.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {report.thirdParty.moz && (
                    <div className="bg-[var(--background)] rounded-lg p-4 border border-[var(--border)]">
                      <h4 className="font-semibold text-[var(--text-primary)] mb-3">Moz</h4>
                      <div className="space-y-2 text-sm">
                        {report.thirdParty.moz.domainAuthority && (
                          <div>
                            <span className="text-[var(--text-secondary)]">Domain Authority: </span>
                            <span className="font-semibold text-[var(--text-primary)]">
                              {report.thirdParty.moz.domainAuthority}
                            </span>
                          </div>
                        )}
                        {report.thirdParty.moz.linkingRootDomains && (
                          <div>
                            <span className="text-[var(--text-secondary)]">Linking Root Domains: </span>
                            <span className="font-semibold text-[var(--text-primary)]">
                              {report.thirdParty.moz.linkingRootDomains.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {report.summary.recommendations.length > 0 && (
              <div className="bg-[var(--surface-elevated)] rounded-lg p-6 border border-[var(--border)]">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {report.summary.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-[var(--text-secondary)]">
                      <span className="text-[var(--accent-primary)] mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

