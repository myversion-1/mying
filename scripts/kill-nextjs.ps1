# Kill all Next.js dev server processes
# Fixes "Unable to acquire lock" error

Write-Host "Killing Next.js processes..." -ForegroundColor Cyan
Write-Host ""

# Find and kill Node.js processes running Next.js
$processes = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -like "*next dev*" -or $_.CommandLine -like "*next-server*"
}

if ($processes) {
    foreach ($process in $processes) {
        Write-Host "Killing process: $($process.Id) - $($process.ProcessName)" -ForegroundColor Yellow
        Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
    }
    Write-Host "Done: Killed $($processes.Count) process(es)" -ForegroundColor Green
} else {
    Write-Host "No Next.js processes found" -ForegroundColor Gray
}

# Remove lock file if exists
$lockFile = ".next/dev/lock"
if (Test-Path $lockFile) {
    Write-Host "Removing lock file..." -ForegroundColor Yellow
    Remove-Item -Path $lockFile -Force -ErrorAction SilentlyContinue
    Write-Host "Done: Lock file removed" -ForegroundColor Green
} else {
    Write-Host "No lock file found" -ForegroundColor Gray
}

Write-Host ""
Write-Host "You can now run: npm run dev" -ForegroundColor Cyan
