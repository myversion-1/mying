# 清理脚本 - 用于清理构建文件和依赖包
# 使用方法：在 PowerShell 中运行 .\clean.ps1

Write-Host "开始清理..." -ForegroundColor Green

# 切换到脚本所在目录
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# 清理 .next 文件夹（构建缓存）
if (Test-Path ".next") {
    Write-Host "正在删除 .next 文件夹..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .next
    Write-Host "✓ .next 文件夹已删除" -ForegroundColor Green
} else {
    Write-Host "⚠ .next 文件夹不存在（这是正常的，只有在运行过 npm run dev 或 npm run build 后才会生成）" -ForegroundColor Yellow
}

# 清理 node_modules 文件夹（可选，取消注释以启用）
# if (Test-Path "node_modules") {
#     Write-Host "正在删除 node_modules 文件夹..." -ForegroundColor Yellow
#     Remove-Item -Recurse -Force node_modules
#     Write-Host "✓ node_modules 文件夹已删除" -ForegroundColor Green
#     Write-Host "请运行 'npm install' 重新安装依赖" -ForegroundColor Cyan
# } else {
#     Write-Host "⚠ node_modules 文件夹不存在" -ForegroundColor Yellow
# }

Write-Host "`n清理完成！" -ForegroundColor Green
Write-Host "提示：如果需要重新安装依赖，请运行 'npm install'" -ForegroundColor Cyan



































