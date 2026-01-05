# Production URL Testing Script
# Tests all language variants of a product page

param(
    [string]$BaseUrl = "https://mying-web.vercel.app",
    [string]$ProductSlug = "nuclear-energy-crisis",
    [switch]$Local = $false
)

# Ensure URL has https:// prefix
if ($BaseUrl -notmatch "^https?://") {
    $BaseUrl = "https://$BaseUrl"
}

# If Local flag is set, use localhost
if ($Local) {
    $BaseUrl = "http://localhost:3000"
    Write-Host "Using LOCALHOST mode" -ForegroundColor Yellow
}

$languages = @("en", "zh", "ar", "ru", "ja", "ko", "th", "vi", "id", "hi", "es")

Write-Host "========================================" -ForegroundColor Cyan
if ($Local) {
    Write-Host "Local Development URL Testing Script" -ForegroundColor Cyan
} else {
    Write-Host "Production URL Testing Script" -ForegroundColor Cyan
}
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Base URL: $BaseUrl" -ForegroundColor White
Write-Host "Product Slug: $ProductSlug" -ForegroundColor White
Write-Host ""
Write-Host "Note: If you get 404 errors, the site may not be deployed yet." -ForegroundColor Yellow
Write-Host "      Use -Local flag to test localhost: .\test-production.ps1 -Local" -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0

# Test default (English)
$defaultUrl = "$BaseUrl/products/$ProductSlug"
Write-Host "Testing Default (English):" -ForegroundColor Yellow
Write-Host "  URL: $defaultUrl" -ForegroundColor Gray
try {
    $response = Invoke-WebRequest -Uri $defaultUrl -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "  ✓ Status: $($response.StatusCode) OK" -ForegroundColor Green
        $successCount++
        
        # Check for hreflang tags (case-insensitive)
        $hreflangCount = ([regex]::Matches($response.Content, 'hrefLang="[^"]*"', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)).Count
        Write-Host "  ✓ Hreflang tags found: $hreflangCount" -ForegroundColor Green
        
        # Check for structured data
        $jsonLdCount = ([regex]::Matches($response.Content, 'application/ld\+json')).Count
        Write-Host "  ✓ JSON-LD blocks found: $jsonLdCount" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Status: $($response.StatusCode)" -ForegroundColor Red
        $failCount++
    }
} catch {
    Write-Host "  ✗ Error: $($_.Exception.Message)" -ForegroundColor Red
    $failCount++
}
Write-Host ""

# Test language variants
Write-Host "Testing Language Variants:" -ForegroundColor Yellow
foreach ($lang in $languages) {
    $url = "$BaseUrl/products/$ProductSlug?lang=$lang"
    Write-Host "  Testing: $lang" -ForegroundColor Gray
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Host "    ✓ Status: $($response.StatusCode) OK" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "    ✗ Status: $($response.StatusCode)" -ForegroundColor Red
            $failCount++
        }
    } catch {
        Write-Host "    ✗ Error: $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total URLs tested: $($successCount + $failCount)" -ForegroundColor White
Write-Host "Successful: $successCount" -ForegroundColor Green
Write-Host "Failed: $failCount" -ForegroundColor $(if ($failCount -eq 0) { "Green" } else { "Red" })
Write-Host ""

if ($failCount -eq 0) {
    Write-Host "✓ All tests passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Test with Google Rich Results Test:" -ForegroundColor White
    Write-Host "   https://search.google.com/test/rich-results" -ForegroundColor Cyan
    Write-Host "2. Test URL: $BaseUrl/products/$ProductSlug" -ForegroundColor Cyan
    Write-Host "3. Verify all 12 hreflang tags are present" -ForegroundColor White
    Write-Host "4. Verify Product and BreadcrumbList schemas are detected" -ForegroundColor White
} else {
    Write-Host "✗ Some tests failed. Please check the errors above." -ForegroundColor Red
}

Write-Host ""


