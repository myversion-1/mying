# Quick Lighthouse Test - Minimal Version
$ScriptPath = $MyInvocation.MyCommand.Path
$ScriptDir = Split-Path -Parent $ScriptPath
$ProjectRoot = Split-Path -Parent $ScriptDir
Set-Location $ProjectRoot

Write-Host "Working Directory: $ProjectRoot" -ForegroundColor Cyan

# Check Lighthouse
try {
    $null = Get-Command lighthouse -ErrorAction Stop
    Write-Host "Lighthouse OK" -ForegroundColor Green
} catch {
    Write-Host "Installing Lighthouse..." -ForegroundColor Yellow
    npm install -g lighthouse
}

# Check server (try both ports)
$serverUrl = $null
$ports = @(3000, 3001)
foreach ($port in $ports) {
    try {
        $url = "http://localhost:$port"
        $null = Invoke-WebRequest -Uri $url -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
        $serverUrl = $url
        Write-Host "Server OK on port $port" -ForegroundColor Green
        break
    } catch {
        continue
    }
}

if (-not $serverUrl) {
    Write-Host "Server not running! Run: npm run dev" -ForegroundColor Red
    exit 1
}

# Create reports dir
$ReportsDir = Join-Path $ProjectRoot "lighthouse-reports"
if (-not (Test-Path $ReportsDir)) {
    New-Item -ItemType Directory -Path $ReportsDir | Out-Null
}

$BeforePath = Join-Path $ReportsDir "before.json"
$AfterPath = Join-Path $ReportsDir "after.json"

Write-Host ""
Write-Host "Running Lighthouse tests..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Test 1: Before optimization" -ForegroundColor Yellow
$productsUrl = "$serverUrl/products"
lighthouse $productsUrl --output=json --output-path="$BeforePath" --chrome-flags="--headless" --quiet

if (-not (Test-Path $BeforePath)) {
    Write-Host "Test 1 failed" -ForegroundColor Red
    exit 1
}

Start-Sleep -Seconds 3

Write-Host "Test 2: After optimization" -ForegroundColor Yellow
lighthouse $productsUrl --output=json --output-path="$AfterPath" --chrome-flags="--headless" --quiet

if (-not (Test-Path $AfterPath)) {
    Write-Host "Test 2 failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Tests completed!" -ForegroundColor Green
Write-Host "Reports saved to: $ReportsDir" -ForegroundColor Cyan
Write-Host ""

