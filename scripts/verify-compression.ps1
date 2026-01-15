# 验证 Gzip 压缩是否正常工作
# 使用方法: .\scripts\verify-compression.ps1 [url]

param(
    [string]$Url = "http://localhost:3000"
)

Write-Host "🔍 验证 Gzip 压缩配置..." -ForegroundColor Cyan
Write-Host ""

# 检查的路径
$paths = @(
    "/",
    "/_next/static/css/app.css",
    "/_next/static/chunks/main.js"
)

$allPassed = $true

foreach ($path in $paths) {
    $fullUrl = "$Url$path"
    Write-Host "检查: $fullUrl" -ForegroundColor Yellow
    
    try {
        # 发送请求，要求 gzip 压缩
        $response = Invoke-WebRequest -Uri $fullUrl -Headers @{
            "Accept-Encoding" = "gzip, deflate, br"
        } -UseBasicParsing -ErrorAction Stop
        
        # 检查响应头
        $contentEncoding = $response.Headers["Content-Encoding"]
        $vary = $response.Headers["Vary"]
        $contentLength = $response.Headers["Content-Length"]
        
        Write-Host "  Content-Encoding: " -NoNewline
        if ($contentEncoding -match "gzip|br|deflate") {
            Write-Host $contentEncoding -ForegroundColor Green
        } else {
            Write-Host "未压缩" -ForegroundColor Red
            $allPassed = $false
        }
        
        Write-Host "  Vary: " -NoNewline
        if ($vary -match "Accept-Encoding") {
            Write-Host $vary -ForegroundColor Green
        } else {
            Write-Host "未设置" -ForegroundColor Yellow
        }
        
        Write-Host "  Content-Length: $contentLength bytes"
        Write-Host ""
        
    } catch {
        Write-Host "  ❌ 错误: $_" -ForegroundColor Red
        $allPassed = $false
        Write-Host ""
    }
}

Write-Host ""
if ($allPassed) {
    Write-Host "✅ 压缩配置正常！" -ForegroundColor Green
} else {
    Write-Host "⚠️  部分检查失败，请检查配置" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "💡 提示: 在生产环境（Vercel）上，压缩会自动启用" -ForegroundColor Cyan
Write-Host "   如果本地测试失败，这是正常的，因为 Next.js dev 服务器可能不启用压缩" -ForegroundColor Cyan













