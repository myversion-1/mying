# 简化的 Lighthouse 测试脚本
# 自动处理路径问题

# 获取脚本所在目录
$ScriptPath = $MyInvocation.MyCommand.Path
$ScriptDir = Split-Path -Parent $ScriptPath
$ProjectRoot = Split-Path -Parent $ScriptDir

# 切换到项目根目录
Set-Location $ProjectRoot

Write-Host "当前工作目录: $ProjectRoot" -ForegroundColor Cyan
Write-Host ""

# 检查 Lighthouse
Write-Host "检查 Lighthouse CLI..." -ForegroundColor Yellow
try {
    $null = Get-Command lighthouse -ErrorAction Stop
    Write-Host "Lighthouse 已安装" -ForegroundColor Green
} catch {
    Write-Host "Lighthouse 未安装，正在安装..." -ForegroundColor Yellow
    npm install -g lighthouse
    Write-Host "安装完成" -ForegroundColor Green
}

# 检查服务器
Write-Host ""
Write-Host "检查开发服务器..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
    Write-Host "服务器正在运行" -ForegroundColor Green
} catch {
    Write-Host "服务器未运行！" -ForegroundColor Red
    Write-Host "请先运行: npm run dev" -ForegroundColor Yellow
    exit 1
}

# 创建报告目录
$ReportsDir = Join-Path $ProjectRoot "lighthouse-reports"
if (-not (Test-Path $ReportsDir)) {
    New-Item -ItemType Directory -Path $ReportsDir | Out-Null
    Write-Host "创建报告目录: $ReportsDir" -ForegroundColor Green
}

# 运行测试
Write-Host ""
Write-Host "=== 运行 Lighthouse 测试 ===" -ForegroundColor Cyan
Write-Host ""

$BeforePath = Join-Path $ReportsDir "before.json"
$AfterPath = Join-Path $ReportsDir "after.json"

Write-Host "1. 运行优化前测试..." -ForegroundColor Yellow
lighthouse "http://localhost:3000/products" --output=json --output-path="$BeforePath" --chrome-flags="--headless" --quiet

if (Test-Path $BeforePath) {
    Write-Host "优化前测试完成" -ForegroundColor Green
} else {
    Write-Host "测试失败" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "等待 3 秒..." -ForegroundColor Gray
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "2. 运行优化后测试..." -ForegroundColor Yellow
lighthouse "http://localhost:3000/products" --output=json --output-path="$AfterPath" --chrome-flags="--headless" --quiet

if (Test-Path $AfterPath) {
    Write-Host "优化后测试完成" -ForegroundColor Green
} else {
    Write-Host "测试失败" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== 生成对比报告 ===" -ForegroundColor Cyan

# 读取报告
$before = Get-Content $BeforePath | ConvertFrom-Json
$after = Get-Content $AfterPath | ConvertFrom-Json

# 提取指标函数
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

# 计算改进
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

# 创建对比对象
$comparison = @{}
$comparison.timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$comparison.before = $beforeMetrics
$comparison.after = $afterMetrics
$comparison.improvements = $improvements

# 保存对比
$ComparisonPath = Join-Path $ReportsDir "comparison.json"
$comparison | ConvertTo-Json -Depth 10 | Out-File $ComparisonPath -Encoding UTF8

# 显示结果
Write-Host ""
Write-Host "=== 性能对比结果 ===" -ForegroundColor Cyan
Write-Host ""
Write-Host ("{0,-25} {1,12} {2,12} {3,12}" -f "指标", "优化前", "优化后", "改进") -ForegroundColor White
Write-Host ("-" * 65) -ForegroundColor Gray

$metrics = @("lcp", "fcp", "cls", "tti", "speedIndex", "totalBlockingTime", "performanceScore")
foreach ($metric in $metrics) {
    $beforeVal = $beforeMetrics[$metric]
    $afterVal = $afterMetrics[$metric]
    $improvement = $improvements[$metric]
    
    $color = if ($improvement -gt 0) { "Green" } else { "Red" }
    $sign = if ($improvement -gt 0) { "+" } else { "" }
    
    $unit = if ($metric -eq "performanceScore") { "" } else { "ms" }
    
    # PowerShell 格式化
    $beforeFormatted = "{0:N2}" -f $beforeVal
    $afterFormatted = "{0:N2}" -f $afterVal
    $improvementFormatted = "{0:N2}" -f $improvement
    
    $metricName = $metric.ToUpper()
    $output = "{0,-25} {1,10}{2} {3,10}{4} {5,10}%" -f $metricName, $beforeFormatted, $unit, $afterFormatted, $unit, "$sign$improvementFormatted"
    Write-Host $output -ForegroundColor $color
}

Write-Host ""
Write-Host "报告已保存到:" -ForegroundColor Cyan
Write-Host "  - 优化前: $BeforePath" -ForegroundColor Gray
Write-Host "  - 优化后: $AfterPath" -ForegroundColor Gray
Write-Host "  - 对比报告: $ComparisonPath" -ForegroundColor Gray
Write-Host ""
Write-Host "提示: 打开 scripts\generate-performance-chart.html 查看可视化图表" -ForegroundColor Yellow
Write-Host ""
