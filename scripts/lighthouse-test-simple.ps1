# Simple Lighthouse Test Script
# Fixed version without encoding issues

$ScriptPath = $MyInvocation.MyCommand.Path
$ScriptDir = Split-Path -Parent $ScriptPath
$ProjectRoot = Split-Path -Parent $ScriptDir
Set-Location $ProjectRoot

Write-Host "Working Directory: $ProjectRoot" -ForegroundColor Cyan
Write-Host ""

# Check Lighthouse
Write-Host "Checking Lighthouse CLI..." -ForegroundColor Yellow
try {
    $null = Get-Command lighthouse -ErrorAction Stop
    Write-Host "Lighthouse installed" -ForegroundColor Green
} catch {
    Write-Host "Installing Lighthouse..." -ForegroundColor Yellow
    npm install -g lighthouse
    Write-Host "Installation complete" -ForegroundColor Green
}

# Check server
Write-Host ""
Write-Host "Checking dev server..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
    Write-Host "Server is running" -ForegroundColor Green
} catch {
    Write-Host "Server is not running!" -ForegroundColor Red
    Write-Host "Please run: npm run dev" -ForegroundColor Yellow
    exit 1
}

# Create reports directory
$ReportsDir = Join-Path $ProjectRoot "lighthouse-reports"
if (-not (Test-Path $ReportsDir)) {
    New-Item -ItemType Directory -Path $ReportsDir | Out-Null
    Write-Host "Created reports directory: $ReportsDir" -ForegroundColor Green
}

# Run tests
Write-Host ""
Write-Host "=== Running Lighthouse Tests ===" -ForegroundColor Cyan
Write-Host ""

$BeforePath = Join-Path $ReportsDir "before.json"
$AfterPath = Join-Path $ReportsDir "after.json"

Write-Host "1. Running before test..." -ForegroundColor Yellow
lighthouse "http://localhost:3000/products" --output=json --output-path="$BeforePath" --chrome-flags="--headless" --quiet

if (Test-Path $BeforePath) {
    Write-Host "Before test completed" -ForegroundColor Green
} else {
    Write-Host "Test failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Waiting 3 seconds..." -ForegroundColor Gray
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "2. Running after test..." -ForegroundColor Yellow
lighthouse "http://localhost:3000/products" --output=json --output-path="$AfterPath" --chrome-flags="--headless" --quiet

if (Test-Path $AfterPath) {
    Write-Host "After test completed" -ForegroundColor Green
} else {
    Write-Host "Test failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Generating Comparison Report ===" -ForegroundColor Cyan

# Read reports
$before = Get-Content $BeforePath | ConvertFrom-Json
$after = Get-Content $AfterPath | ConvertFrom-Json

# Extract metrics
function Get-Metric {
    param($report, $metricName)
    return $report.audits.$metricName.numericValue
}

$beforeMetrics = @{}
$beforeMetrics.lcp = Get-Metric $before "largest-contentful-paint"
$beforeMetrics.fcp = Get-Metric $before "first-contentful-paint"
$beforeMetrics.cls = Get-Metric $before "cumulative-layout-shift"
$beforeMetrics.tti = Get-Metric $before "interactive"
$beforeMetrics.speedIndex = Get-Metric $before "speed-index"
$beforeMetrics.totalBlockingTime = Get-Metric $before "total-blocking-time"
$beforeMetrics.performanceScore = [math]::Round($before.categories.performance.score * 100, 2)

$afterMetrics = @{}
$afterMetrics.lcp = Get-Metric $after "largest-contentful-paint"
$afterMetrics.fcp = Get-Metric $after "first-contentful-paint"
$afterMetrics.cls = Get-Metric $after "cumulative-layout-shift"
$afterMetrics.tti = Get-Metric $after "interactive"
$afterMetrics.speedIndex = Get-Metric $after "speed-index"
$afterMetrics.totalBlockingTime = Get-Metric $after "total-blocking-time"
$afterMetrics.performanceScore = [math]::Round($after.categories.performance.score * 100, 2)

# Calculate improvements
$improvements = @{}
foreach ($key in $beforeMetrics.Keys) {
    $beforeVal = $beforeMetrics[$key]
    $afterVal = $afterMetrics[$key]
    
    if ($beforeVal -gt 0) {
        if ($key -eq "performanceScore") {
            $improvement = [math]::Round((($afterVal - $beforeVal) / $beforeVal) * 100, 2)
        } else {
            $improvement = [math]::Round((($beforeVal - $afterVal) / $beforeVal) * 100, 2)
        }
    } else {
        $improvement = 0
    }
    
    $improvements[$key] = $improvement
}

# Create comparison object
$comparison = @{}
$comparison.timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$comparison.before = $beforeMetrics
$comparison.after = $afterMetrics
$comparison.improvements = $improvements

# Save comparison
$ComparisonPath = Join-Path $ReportsDir "comparison.json"
$comparison | ConvertTo-Json -Depth 10 | Out-File $ComparisonPath -Encoding UTF8

# Display results
Write-Host ""
Write-Host "=== Performance Comparison ===" -ForegroundColor Cyan
Write-Host ""
Write-Host ("{0,-25} {1,12} {2,12} {3,12}" -f "Metric", "Before", "After", "Improvement") -ForegroundColor White
Write-Host ("-" * 65) -ForegroundColor Gray

$metrics = @("lcp", "fcp", "cls", "tti", "speedIndex", "totalBlockingTime", "performanceScore")
foreach ($metric in $metrics) {
    $beforeVal = $beforeMetrics[$metric]
    $afterVal = $afterMetrics[$metric]
    $improvement = $improvements[$metric]
    
    $color = if ($improvement -gt 0) { "Green" } else { "Red" }
    $sign = if ($improvement -gt 0) { "+" } else { "" }
    
    $unit = if ($metric -eq "performanceScore") { "" } else { "ms" }
    
    $beforeFormatted = "{0:N2}" -f $beforeVal
    $afterFormatted = "{0:N2}" -f $afterVal
    $improvementFormatted = "{0:N2}" -f $improvement
    
    $metricName = $metric.ToUpper()
    $output = "{0,-25} {1,10}{2} {3,10}{4} {5,10}%" -f $metricName, $beforeFormatted, $unit, $afterFormatted, $unit, "$sign$improvementFormatted"
    Write-Host $output -ForegroundColor $color
}

Write-Host ""
Write-Host "Reports saved to:" -ForegroundColor Cyan
Write-Host "  - Before: $BeforePath" -ForegroundColor Gray
Write-Host "  - After: $AfterPath" -ForegroundColor Gray
Write-Host "  - Comparison: $ComparisonPath" -ForegroundColor Gray
Write-Host ""
Write-Host "Tip: Open scripts\generate-performance-chart.html to view charts" -ForegroundColor Yellow
Write-Host ""










