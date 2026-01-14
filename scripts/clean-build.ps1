# Clean Next.js build cache
# Fixes 404 errors and build issues

Write-Host "Cleaning Next.js build cache..." -ForegroundColor Cyan
Write-Host ""

# Check if .next directory exists
if (Test-Path ".next") {
    Write-Host "Removing .next directory..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .next
    Write-Host "Done: .next directory removed" -ForegroundColor Green
} else {
    Write-Host "Info: .next directory does not exist, skipping" -ForegroundColor Gray
}

# Check if node_modules/.cache directory exists
if (Test-Path "node_modules/.cache") {
    Write-Host "Removing node_modules/.cache directory..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force node_modules/.cache
    Write-Host "Done: node_modules/.cache removed" -ForegroundColor Green
} else {
    Write-Host "Info: node_modules/.cache does not exist, skipping" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Cleanup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Restart dev server: npm run dev" -ForegroundColor White
Write-Host "2. If issues persist, run: npm run build" -ForegroundColor White

