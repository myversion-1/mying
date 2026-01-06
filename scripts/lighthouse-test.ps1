# Lighthouse Performance Testing Script
# Runs before and after audits and generates comparison report

# Get script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir

# Set working directory to project root
Set-Location $ProjectRoot

$PORT = 3000
$BASE_URL = "http://localhost:$PORT"
$PRODUCTS_URL = "$BASE_URL/products"
$REPORTS_DIR = Join-Path $ProjectRoot "lighthouse-reports"

# Create reports directory
if (-not (Test-Path $REPORTS_DIR)) {
    New-Item -ItemType Directory -Path $REPORTS_DIR | Out-Null
}

$BEFORE_PATH = Join-Path $REPORTS_DIR "before.json"
$AFTER_PATH = Join-Path $REPORTS_DIR "after.json"
$COMPARISON_PATH = Join-Path $REPORTS_DIR "comparison.json"

Write-Host "=== Lighthouse Performance Testing ===" -ForegroundColor Cyan
Write-Host ""

# Check if lighthouse is installed
try {
    $null = Get-Command lighthouse -ErrorAction Stop
    Write-Host "✓ Lighthouse CLI found" -ForegroundColor Green
} catch {
    Write-Host "✗ Lighthouse CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g lighthouse
}

# Check if server is running
Write-Host "Checking if dev server is running on port $PORT..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri $BASE_URL -TimeoutSec 2 -UseBasicParsing
    Write-Host "✓ Server is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Server is not running. Please start it with: npm run dev" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Running BEFORE Optimization Audit ===" -ForegroundColor Yellow
lighthouse "$PRODUCTS_URL" --output=json --output-path="$BEFORE_PATH" --chrome-flags="--headless" --quiet

if (Test-Path $BEFORE_PATH) {
    Write-Host "✓ Before audit completed" -ForegroundColor Green
} else {
    Write-Host "✗ Before audit failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Waiting 3 seconds before running after audit..." -ForegroundColor Cyan
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "=== Running AFTER Optimization Audit ===" -ForegroundColor Yellow
lighthouse "$PRODUCTS_URL" --output=json --output-path="$AFTER_PATH" --chrome-flags="--headless" --quiet

if (Test-Path $AFTER_PATH) {
    Write-Host "✓ After audit completed" -ForegroundColor Green
} else {
    Write-Host "✗ After audit failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Generating Comparison Report ===" -ForegroundColor Cyan

# Read and parse reports
$before = Get-Content $BEFORE_PATH | ConvertFrom-Json
$after = Get-Content $AFTER_PATH | ConvertFrom-Json

# Extract metrics
function Get-Metric($report, $metricName) {
    return $report.audits.$metricName.numericValue
}

$beforeMetrics = @{
    lcp = Get-Metric $before "largest-contentful-paint"
    fcp = Get-Metric $before "first-contentful-paint"
    cls = Get-Metric $before "cumulative-layout-shift"
    tti = Get-Metric $before "interactive"
    speedIndex = Get-Metric $before "speed-index"
    totalBlockingTime = Get-Metric $before "total-blocking-time"
    performanceScore = [math]::Round($before.categories.performance.score * 100, 2)
}

$afterMetrics = @{
    lcp = Get-Metric $after "largest-contentful-paint"
    fcp = Get-Metric $after "first-contentful-paint"
    cls = Get-Metric $after "cumulative-layout-shift"
    tti = Get-Metric $after "interactive"
    speedIndex = Get-Metric $after "speed-index"
    totalBlockingTime = Get-Metric $after "total-blocking-time"
    performanceScore = [math]::Round($after.categories.performance.score * 100, 2)
}

# Calculate improvements
$improvements = @{}
foreach ($key in $beforeMetrics.Keys) {
    $beforeVal = $beforeMetrics[$key]
    $afterVal = $afterMetrics[$key]
    
    if ($beforeVal -gt 0) {
        if ($key -eq "performanceScore") {
            # For score, higher is better
            $improvement = [math]::Round((($afterVal - $beforeVal) / $beforeVal) * 100, 2)
        } else {
            # For time metrics, lower is better
            $improvement = [math]::Round((($beforeVal - $afterVal) / $beforeVal) * 100, 2)
        }
    } else {
        $improvement = 0
    }
    
    $improvements[$key] = $improvement
}

# Create comparison object
$comparison = @{
    timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    before = $beforeMetrics
    after = $afterMetrics
    improvements = $improvements
}

# Save comparison
$comparison | ConvertTo-Json -Depth 10 | Out-File $COMPARISON_PATH -Encoding UTF8

Write-Host ""
Write-Host "=== PERFORMANCE COMPARISON ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Metric                    Before      After       Improvement" -ForegroundColor White
Write-Host "─────────────────────────────────────────────────────────────" -ForegroundColor Gray

$metrics = @("lcp", "fcp", "cls", "tti", "speedIndex", "totalBlockingTime", "performanceScore")
foreach ($metric in $metrics) {
    $beforeVal = $beforeMetrics[$metric]
    $afterVal = $afterMetrics[$metric]
    $improvement = $improvements[$metric]
    
    $color = if ($improvement -gt 0) { "Green" } else { "Red" }
    $sign = if ($improvement -gt 0) { "+" } else { "" }
    
    Write-Host ("{0,-25} {1,10:N2}   {2,10:N2}   {3,8:N2}%" -f $metric.ToUpper(), $beforeVal, $afterVal, "$sign$improvement") -ForegroundColor $color
}

Write-Host ""
Write-Host "Reports saved to:" -ForegroundColor Cyan
Write-Host "  - Before: $BEFORE_PATH" -ForegroundColor Gray
Write-Host "  - After:  $AFTER_PATH" -ForegroundColor Gray
Write-Host "  - Comparison: $COMPARISON_PATH" -ForegroundColor Gray
Write-Host ""


