# Vercel 部署脚本
# 使用方法：在 PowerShell 中运行 .\deploy.ps1

Write-Host "=== Miying Web 部署到 Vercel ===" -ForegroundColor Cyan
Write-Host ""

# 检查是否已登录
Write-Host "检查 Vercel 登录状态..." -ForegroundColor Yellow
$loginCheck = vercel whoami 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "需要先登录 Vercel..." -ForegroundColor Yellow
    Write-Host "请按照以下步骤操作：" -ForegroundColor Yellow
    Write-Host "1. 运行: vercel login" -ForegroundColor Green
    Write-Host "2. 在浏览器中完成登录" -ForegroundColor Green
    Write-Host "3. 然后重新运行此脚本" -ForegroundColor Green
    Write-Host ""
    Write-Host "或者直接运行: vercel login" -ForegroundColor Cyan
    exit 1
}

Write-Host "已登录为: $loginCheck" -ForegroundColor Green
Write-Host ""

# 部署到预览环境
Write-Host "开始部署到预览环境..." -ForegroundColor Yellow
vercel

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "预览部署成功！" -ForegroundColor Green
    Write-Host ""
    Write-Host "要部署到生产环境，运行：" -ForegroundColor Cyan
    Write-Host "  vercel --prod" -ForegroundColor Yellow
} else {
    Write-Host "部署失败，请检查错误信息" -ForegroundColor Red
    exit 1
}



















