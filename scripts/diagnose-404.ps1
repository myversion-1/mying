# Diagnose 404 errors in Next.js application
# Helps identify missing resources and provides fixes

Write-Host "Diagnosing 404 errors..." -ForegroundColor Cyan
Write-Host ""

# Check common issues
$issues = @()

# 1. Check if .next directory exists
if (-not (Test-Path ".next")) {
    $issues += "Missing .next directory - need to run 'npm run build' or 'npm run dev'"
}

# 2. Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    $issues += "Missing node_modules - need to run 'npm install'"
}

# 3. Check for common missing files
$commonFiles = @(
    "public/logo.jpg",
    "public/favicon.ico"
)

foreach ($file in $commonFiles) {
    if (-not (Test-Path $file)) {
        $issues += "Missing file: $file"
    }
}

# 4. Check package.json
if (-not (Test-Path "package.json")) {
    $issues += "Missing package.json - not in project root?"
    Write-Host "Error: Not in project root directory" -ForegroundColor Red
    exit 1
}

# Display results
if ($issues.Count -eq 0) {
    Write-Host "No obvious issues found." -ForegroundColor Green
    Write-Host ""
    Write-Host "Common 404 causes:" -ForegroundColor Yellow
    Write-Host "1. Build cache issues - run: npm run clean" -ForegroundColor White
    Write-Host "2. Missing static files in public/ directory" -ForegroundColor White
    Write-Host "3. Dynamic import chunk not found - restart dev server" -ForegroundColor White
    Write-Host "4. Image optimization issues - check next.config.ts" -ForegroundColor White
    Write-Host ""
    Write-Host "To see specific 404 errors:" -ForegroundColor Cyan
    Write-Host "1. Open browser DevTools (F12)" -ForegroundColor White
    Write-Host "2. Go to Network tab" -ForegroundColor White
    Write-Host "3. Filter by 'Failed' or '404'" -ForegroundColor White
    Write-Host "4. Check the failed request URL" -ForegroundColor White
} else {
    Write-Host "Found issues:" -ForegroundColor Yellow
    foreach ($issue in $issues) {
        Write-Host "  - $issue" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Recommended fixes:" -ForegroundColor Cyan
    Write-Host "1. Run: npm run clean" -ForegroundColor White
    Write-Host "2. Run: npm install" -ForegroundColor White
    Write-Host "3. Run: npm run dev" -ForegroundColor White
}

Write-Host ""


