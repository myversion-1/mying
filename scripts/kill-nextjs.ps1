# Kill all Next.js processes
Write-Host "Stopping Next.js processes..." -ForegroundColor Yellow

$processes = Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -like "*next dev*" -or $_.CommandLine -like "*next-server*"
}

if ($processes) {
    foreach ($proc in $processes) {
        Write-Host "Stopping process $($proc.Id)..." -ForegroundColor Yellow
        Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
    }
    Write-Host "All Next.js processes stopped" -ForegroundColor Green
} else {
    Write-Host "No Next.js processes found" -ForegroundColor Gray
}

# Also try to remove lock file
$lockFile = ".next\dev\lock"
if (Test-Path $lockFile) {
    Remove-Item $lockFile -Force -ErrorAction SilentlyContinue
    Write-Host "Lock file removed" -ForegroundColor Green
}

Write-Host ""
Write-Host "You can now run: npm run dev" -ForegroundColor Cyan







