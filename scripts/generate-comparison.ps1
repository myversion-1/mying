# Generate Performance Comparison Report
$ScriptPath = $MyInvocation.MyCommand.Path
$ScriptDir = Split-Path -Parent $ScriptPath
$ProjectRoot = Split-Path -Parent $ScriptDir
Set-Location $ProjectRoot

$ReportsDir = Join-Path $ProjectRoot "lighthouse-reports"
$BeforePath = Join-Path $ReportsDir "before.json"
$AfterPath = Join-Path $ReportsDir "after.json"

if (-not (Test-Path $BeforePath) -or -not (Test-Path $AfterPath)) {
    Write-Host "Error: Missing report files!" -ForegroundColor Red
    Write-Host "Please run: npm run lighthouse:quick" -ForegroundColor Yellow
    exit 1
}

Write-Host "=== Generating Performance Comparison ===" -ForegroundColor Cyan
Write-Host ""

# Read reports
$before = Get-Content $BeforePath | ConvertFrom-Json
$after = Get-Content $AfterPath | ConvertFrom-Json

# Extract metrics function
function Get-Metric {
    param($report, $metricName)
    return $report.audits.$metricName.numericValue
}

# Extract metrics
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
Write-Host "=== Performance Comparison Results ===" -ForegroundColor Cyan
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
Write-Host "Comparison report saved to: $ComparisonPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tip: Open scripts\generate-performance-chart.html to view charts" -ForegroundColor Yellow
Write-Host ""


























