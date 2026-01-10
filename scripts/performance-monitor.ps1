# Performance Monitoring Script
# Monitors key performance metrics and generates reports

$ScriptPath = $MyInvocation.MyCommand.Path
$ScriptDir = Split-Path -Parent $ScriptPath
$ProjectRoot = Split-Path -Parent $ScriptDir
Set-Location $ProjectRoot

Write-Host "=== Performance Monitor ===" -ForegroundColor Cyan
Write-Host ""

# Create reports directory
$ReportsDir = Join-Path $ProjectRoot "performance-reports"
if (-not (Test-Path $ReportsDir)) {
    New-Item -ItemType Directory -Path $ReportsDir | Out-Null
}

# Check if server is running
$serverUrl = $null
$ports = @(3000, 3001)
foreach ($port in $ports) {
    try {
        $url = "http://localhost:$port"
        $null = Invoke-WebRequest -Uri $url -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
        $serverUrl = $url
        Write-Host "Server detected on port $port" -ForegroundColor Green
        break
    } catch {
        continue
    }
}

if (-not $serverUrl) {
    Write-Host "Server not running. Starting performance check without server..." -ForegroundColor Yellow
}

# Get current timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$reportFile = Join-Path $ReportsDir "performance_$timestamp.json"

# Performance metrics
$metrics = @{
    timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
    server = if ($serverUrl) { $serverUrl } else { "not_running" }
    checks = @()
}

# Check 1: Bundle size
Write-Host "Checking bundle size..." -ForegroundColor Yellow
$chunksDir = Join-Path $ProjectRoot ".next\static\chunks"
if (Test-Path $chunksDir) {
    $chunks = Get-ChildItem $chunksDir -File -Filter "*.js" | Where-Object { $_.Name -notlike "*.map" }
    $totalSize = ($chunks | Measure-Object -Property Length -Sum).Sum
    $mainBundle = $chunks | Sort-Object Length -Descending | Select-Object -First 1
    
    $metrics.checks += @{
        name = "bundle_size"
        status = if ($totalSize -lt 500000) { "pass" } else { "warning" }
        value = [math]::Round($totalSize / 1KB, 2)
        unit = "KB"
        target = "< 500 KB"
        details = @{
            totalChunks = $chunks.Count
            mainBundleSize = [math]::Round($mainBundle.Length / 1KB, 2)
            mainBundleName = $mainBundle.Name
        }
    }
    Write-Host "  Total bundle: $([math]::Round($totalSize / 1KB, 2)) KB" -ForegroundColor $(if ($totalSize -lt 500000) { "Green" } else { "Yellow" })
} else {
    $metrics.checks += @{
        name = "bundle_size"
        status = "skip"
        message = "Build not found. Run 'npm run build' first."
    }
}

# Check 2: Image optimization
Write-Host "Checking image optimization..." -ForegroundColor Yellow
$unoptimizedCount = (Select-String -Path "$ProjectRoot\src\**\*.tsx" -Pattern "unoptimized" -ErrorAction SilentlyContinue | Measure-Object).Count
$metrics.checks += @{
    name = "image_optimization"
    status = if ($unoptimizedCount -eq 0) { "pass" } else { "fail" }
    value = $unoptimizedCount
    unit = "files"
    target = "0 files with unoptimized"
    message = if ($unoptimizedCount -eq 0) { "All images optimized" } else { "$unoptimizedCount files still use unoptimized" }
}
Write-Host "  Unoptimized images: $unoptimizedCount" -ForegroundColor $(if ($unoptimizedCount -eq 0) { "Green" } else { "Red" })

# Check 3: ISR configuration
Write-Host "Checking ISR configuration..." -ForegroundColor Yellow
$isrFiles = @(
    "$ProjectRoot\src\app\products\page.tsx",
    "$ProjectRoot\src\app\products\layout.tsx"
)
$isrConfigured = $true
foreach ($file in $isrFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -notmatch "export const revalidate\s*=\s*60") {
            $isrConfigured = $false
            break
        }
    }
}
$metrics.checks += @{
    name = "isr_configuration"
    status = if ($isrConfigured) { "pass" } else { "fail" }
    value = if ($isrConfigured) { "configured" } else { "not_configured" }
    target = "revalidate = 60"
}
Write-Host "  ISR configured: $isrConfigured" -ForegroundColor $(if ($isrConfigured) { "Green" } else { "Red" })

# Check 4: Code splitting
Write-Host "Checking code splitting..." -ForegroundColor Yellow
$dynamicImports = (Select-String -Path "$ProjectRoot\src\**\*.tsx" -Pattern "dynamic\s*\(" -ErrorAction SilentlyContinue | Measure-Object).Count
$metrics.checks += @{
    name = "code_splitting"
    status = if ($dynamicImports -gt 0) { "pass" } else { "warning" }
    value = $dynamicImports
    unit = "dynamic imports"
    target = "> 0"
    message = "$dynamicImports components use dynamic imports"
}
Write-Host "  Dynamic imports: $dynamicImports" -ForegroundColor $(if ($dynamicImports -gt 0) { "Green" } else { "Yellow" })

# Check 5: Next.js config
Write-Host "Checking Next.js configuration..." -ForegroundColor Yellow
$configFile = Join-Path $ProjectRoot "next.config.ts"
if (Test-Path $configFile) {
    $configContent = Get-Content $configFile -Raw
    $hasImageOptimization = $configContent -match "formats.*avif.*webp"
    $hasCompression = $configContent -match "compress.*true"
    $hasSwcMinify = $configContent -match "swcMinify.*true"
    
    $metrics.checks += @{
        name = "nextjs_config"
        status = if ($hasImageOptimization -and $hasCompression -and $hasSwcMinify) { "pass" } else { "warning" }
        details = @{
            imageOptimization = $hasImageOptimization
            compression = $hasCompression
            swcMinify = $hasSwcMinify
        }
    }
    Write-Host "  Image optimization: $hasImageOptimization" -ForegroundColor $(if ($hasImageOptimization) { "Green" } else { "Yellow" })
    Write-Host "  Compression: $hasCompression" -ForegroundColor $(if ($hasCompression) { "Green" } else { "Yellow" })
    Write-Host "  SWC Minify: $hasSwcMinify" -ForegroundColor $(if ($hasSwcMinify) { "Green" } else { "Yellow" })
} else {
    $metrics.checks += @{
        name = "nextjs_config"
        status = "fail"
        message = "next.config.ts not found"
    }
}

# Save report
$metrics | ConvertTo-Json -Depth 10 | Out-File -FilePath $reportFile -Encoding UTF8

Write-Host ""
Write-Host "Performance check completed!" -ForegroundColor Green
Write-Host "Report saved to: $reportFile" -ForegroundColor Cyan
Write-Host ""

# Summary
$passCount = ($metrics.checks | Where-Object { $_.status -eq "pass" }).Count
$failCount = ($metrics.checks | Where-Object { $_.status -eq "fail" }).Count
$warnCount = ($metrics.checks | Where-Object { $_.status -eq "warning" }).Count

Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Pass: $passCount" -ForegroundColor Green
Write-Host "  Warning: $warnCount" -ForegroundColor Yellow
Write-Host "  Fail: $failCount" -ForegroundColor $(if ($failCount -eq 0) { "Green" } else { "Red" })
Write-Host ""







