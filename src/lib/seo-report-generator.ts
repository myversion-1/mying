/**
 * SEO Health Report Generator
 * Generates reports in various formats (JSON, CSV, HTML)
 */

import type { SEOHealthReport, SEOIssue } from "./seo-health-checker";

/**
 * Generate CSV report
 */
export function generateCSVReport(report: SEOHealthReport): string {
  const lines: string[] = [];
  
  // Header
  lines.push("SEO Health Check Report");
  lines.push(`Domain: ${report.domain}`);
  lines.push(`Checked At: ${report.checkedAt}`);
  lines.push(`Overall Score: ${report.overallScore}/100`);
  lines.push("");
  
  // Summary
  lines.push("Summary");
  lines.push(`Total Issues,${report.summary.totalIssues}`);
  lines.push(`Critical Issues,${report.summary.criticalIssues}`);
  lines.push(`Warnings,${report.summary.warnings}`);
  lines.push("");
  
  // Technical SEO
  lines.push("Technical SEO");
  lines.push(`Status,${report.technicalSEO.status}`);
  lines.push(`Score,${report.technicalSEO.score}`);
  lines.push("");
  lines.push("Issues");
  lines.push("ID,Type,Severity,Title,Description,Recommendation,Affected Pages");
  
  report.technicalSEO.issues.forEach((issue) => {
    lines.push(
      [
        issue.id,
        issue.type,
        issue.severity,
        `"${issue.title.replace(/"/g, '""')}"`,
        `"${issue.description.replace(/"/g, '""')}"`,
        `"${issue.recommendation.replace(/"/g, '""')}"`,
        issue.affectedPages ? issue.affectedPages.join("; ") : "",
      ].join(",")
    );
  });
  
  lines.push("");
  
  // Content SEO
  lines.push("Content SEO");
  lines.push(`Status,${report.contentSEO.status}`);
  lines.push(`Score,${report.contentSEO.score}`);
  lines.push("");
  lines.push("Issues");
  lines.push("ID,Type,Severity,Title,Description,Recommendation,Affected Pages");
  
  report.contentSEO.issues.forEach((issue) => {
    lines.push(
      [
        issue.id,
        issue.type,
        issue.severity,
        `"${issue.title.replace(/"/g, '""')}"`,
        `"${issue.description.replace(/"/g, '""')}"`,
        `"${issue.recommendation.replace(/"/g, '""')}"`,
        issue.affectedPages ? issue.affectedPages.join("; ") : "",
      ].join(",")
    );
  });
  
  lines.push("");
  
  // Recommendations
  lines.push("Recommendations");
  report.summary.recommendations.forEach((rec) => {
    lines.push(`"${rec.replace(/"/g, '""')}"`);
  });
  
  return lines.join("\n");
}

/**
 * Generate HTML report
 */
export function generateHTMLReport(report: SEOHealthReport): string {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981"; // green
    if (score >= 60) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };
  
  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pass: "#10b981",
      warning: "#f59e0b",
      fail: "#ef4444",
      not_checked: "#6b7280",
    };
    return colors[status] || colors.not_checked;
  };
  
  const getSeverityBadge = (severity: string) => {
    const colors: Record<string, string> = {
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
    };
    return colors[severity] || colors.info;
  };
  
  const formatIssues = (issues: SEOIssue[]) => {
    if (issues.length === 0) {
      return "<p>No issues found. Great job! ✅</p>";
    }
    
    return issues
      .map(
        (issue) => `
      <div style="margin-bottom: 16px; padding: 16px; background: #f9fafb; border-radius: 8px; border-left: 4px solid ${getSeverityBadge(issue.severity)};">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <h4 style="margin: 0; font-weight: 600; color: #111827;">${issue.title}</h4>
          <span style="padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; background: ${getSeverityBadge(issue.severity)}20; color: ${getSeverityBadge(issue.severity)};">
            ${issue.severity.toUpperCase()}
          </span>
        </div>
        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${issue.description}</p>
        ${issue.affectedPages && issue.affectedPages.length > 0
          ? `<p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 12px;">Affected: ${issue.affectedPages.join(", ")}</p>`
          : ""}
        <p style="margin: 0; color: #3b82f6; font-size: 14px;">💡 ${issue.recommendation}</p>
      </div>
    `
      )
      .join("");
  };
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SEO Health Check Report - ${report.domain}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #111827;
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
      background: #ffffff;
    }
    h1 { color: #111827; margin-bottom: 8px; }
    h2 { color: #111827; margin-top: 32px; margin-bottom: 16px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
    h3 { color: #374151; margin-top: 24px; margin-bottom: 12px; }
    .header { margin-bottom: 32px; }
    .score-circle { 
      display: inline-block; 
      width: 120px; 
      height: 120px; 
      border-radius: 50%; 
      background: ${getScoreColor(report.overallScore)}20;
      color: ${getScoreColor(report.overallScore)};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      font-weight: bold;
      margin: 16px 0;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 24px 0;
    }
    .summary-card {
      padding: 16px;
      background: #f9fafb;
      border-radius: 8px;
      text-align: center;
    }
    .summary-card .number {
      font-size: 32px;
      font-weight: bold;
      color: #111827;
    }
    .summary-card .label {
      font-size: 14px;
      color: #6b7280;
      margin-top: 8px;
    }
    .section {
      margin: 32px 0;
      padding: 24px;
      background: #f9fafb;
      border-radius: 8px;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .status-badge {
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      color: white;
    }
    .recommendations {
      list-style: none;
      padding: 0;
    }
    .recommendations li {
      padding: 8px 0;
      padding-left: 24px;
      position: relative;
    }
    .recommendations li:before {
      content: "•";
      position: absolute;
      left: 8px;
      color: #3b82f6;
      font-weight: bold;
    }
    .footer {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>SEO Health Check Report</h1>
    <p style="color: #6b7280;">Domain: <strong>${report.domain}</strong></p>
    <p style="color: #6b7280;">Checked At: ${new Date(report.checkedAt).toLocaleString()}</p>
  </div>
  
  <div style="text-align: center; margin: 32px 0;">
    <div class="score-circle">${report.overallScore}</div>
    <p style="color: #6b7280; margin-top: 8px;">Overall SEO Score out of 100</p>
  </div>
  
  <div class="summary-grid">
    <div class="summary-card">
      <div class="number">${report.summary.totalIssues}</div>
      <div class="label">Total Issues</div>
    </div>
    <div class="summary-card">
      <div class="number" style="color: #ef4444;">${report.summary.criticalIssues}</div>
      <div class="label">Critical Issues</div>
    </div>
    <div class="summary-card">
      <div class="number" style="color: #f59e0b;">${report.summary.warnings}</div>
      <div class="label">Warnings</div>
    </div>
  </div>
  
  <div class="section">
    <div class="section-header">
      <h3>Technical SEO</h3>
      <div>
        <span class="status-badge" style="background: ${getStatusBadge(report.technicalSEO.status)};">
          ${report.technicalSEO.status.toUpperCase()}
        </span>
        <span style="margin-left: 16px; font-size: 24px; font-weight: bold; color: ${getScoreColor(report.technicalSEO.score)};">
          ${report.technicalSEO.score}
        </span>
      </div>
    </div>
    ${formatIssues(report.technicalSEO.issues)}
  </div>
  
  <div class="section">
    <div class="section-header">
      <h3>Content SEO</h3>
      <div>
        <span class="status-badge" style="background: ${getStatusBadge(report.contentSEO.status)};">
          ${report.contentSEO.status.toUpperCase()}
        </span>
        <span style="margin-left: 16px; font-size: 24px; font-weight: bold; color: ${getScoreColor(report.contentSEO.score)};">
          ${report.contentSEO.score}
        </span>
      </div>
    </div>
    ${formatIssues(report.contentSEO.issues)}
  </div>
  
  ${report.summary.recommendations.length > 0 ? `
  <div class="section">
    <h3>Recommendations</h3>
    <ul class="recommendations">
      ${report.summary.recommendations.map((rec) => `<li>${rec}</li>`).join("")}
    </ul>
  </div>
  ` : ""}
  
  <div class="footer">
    <p>Generated by SEO Health Check Tool</p>
    <p>Report Date: ${new Date(report.checkedAt).toLocaleString()}</p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate JSON report (pretty-printed)
 */
export function generateJSONReport(report: SEOHealthReport): string {
  return JSON.stringify(report, null, 2);
}

/**
 * Download report as file
 */
export function downloadReport(
  content: string,
  filename: string,
  mimeType: string = "text/plain"
) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}













