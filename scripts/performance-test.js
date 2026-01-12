/**
 * Performance Testing Script
 * Runs Lighthouse audits and generates comparison reports
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;
const PRODUCTS_URL = `${BASE_URL}/products`;

// Ensure lighthouse is installed
try {
  execSync('lighthouse --version', { stdio: 'ignore' });
} catch (error) {
  console.error('Lighthouse CLI not found. Installing...');
  execSync('npm install -g lighthouse', { stdio: 'inherit' });
}

function runLighthouse(url, outputPath) {
  console.log(`Running Lighthouse audit for ${url}...`);
  try {
    execSync(
      `lighthouse "${url}" --output=json --output-path="${outputPath}" --chrome-flags="--headless --no-sandbox" --quiet`,
      { stdio: 'inherit' }
    );
    console.log(`✓ Lighthouse report saved to ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`✗ Lighthouse audit failed:`, error.message);
    return false;
  }
}

function extractMetrics(reportPath) {
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  const metrics = report.audits;
  
  return {
    lcp: metrics['largest-contentful-paint']?.numericValue || 0,
    fcp: metrics['first-contentful-paint']?.numericValue || 0,
    cls: metrics['cumulative-layout-shift']?.numericValue || 0,
    fid: metrics['max-potential-fid']?.numericValue || 0,
    tti: metrics['interactive']?.numericValue || 0,
    speedIndex: metrics['speed-index']?.numericValue || 0,
    totalBlockingTime: metrics['total-blocking-time']?.numericValue || 0,
    performanceScore: report.categories?.performance?.score * 100 || 0,
  };
}

function generateComparison(beforePath, afterPath) {
  const before = extractMetrics(beforePath);
  const after = extractMetrics(afterPath);
  
  const comparison = {
    before,
    after,
    improvements: {
      lcp: {
        before: before.lcp,
        after: after.lcp,
        improvement: ((before.lcp - after.lcp) / before.lcp * 100).toFixed(2) + '%',
      },
      fcp: {
        before: before.fcp,
        after: after.fcp,
        improvement: ((before.fcp - after.fcp) / before.fcp * 100).toFixed(2) + '%',
      },
      performanceScore: {
        before: before.performanceScore,
        after: after.performanceScore,
        improvement: ((after.performanceScore - before.performanceScore) / before.performanceScore * 100).toFixed(2) + '%',
      },
    },
  };
  
  return comparison;
}

// Main execution
const reportsDir = path.join(__dirname, '../lighthouse-reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const beforePath = path.join(reportsDir, 'before.json');
const afterPath = path.join(reportsDir, 'after.json');

console.log('Starting performance testing...\n');

// Run before audit
console.log('=== BEFORE OPTIMIZATION ===');
runLighthouse(PRODUCTS_URL, beforePath);

// Wait a bit
console.log('\nWaiting 5 seconds before running after audit...\n');
setTimeout(() => {
  // Run after audit
  console.log('=== AFTER OPTIMIZATION ===');
  runLighthouse(PRODUCTS_URL, afterPath);
  
  // Generate comparison
  const comparison = generateComparison(beforePath, afterPath);
  const comparisonPath = path.join(reportsDir, 'comparison.json');
  fs.writeFileSync(comparisonPath, JSON.stringify(comparison, null, 2));
  
  console.log('\n=== PERFORMANCE COMPARISON ===');
  console.log(JSON.stringify(comparison, null, 2));
  console.log(`\nComparison report saved to ${comparisonPath}`);
}, 5000);












