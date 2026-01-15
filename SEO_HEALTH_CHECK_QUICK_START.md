# SEO Health Check - Quick Start Guide

## 🚀 快速开始

### 1. 访问管理界面

启动开发服务器后，访问：
```
http://localhost:3000/admin/seo-health
```

### 2. 运行健康检查

1. 在"Domain"输入框中输入要检查的域名（默认：`https://www.miyingrides.com`）
2. 可选：勾选"Include Third-Party Data"以包含SEMrush、Ahrefs、Moz数据
3. 点击"Run Health Check"按钮
4. 等待检查完成（通常需要几秒钟）

### 3. 查看报告

报告将显示：
- **总体SEO分数**（0-100分）
- **技术SEO检查**（robots.txt、sitemap.xml等）
- **内容SEO检查**（标题、描述、H1标签等）
- **问题列表**（按严重程度分类）
- **修复建议**

### 4. 导出报告

点击导出按钮可以下载报告：
- **Export CSV** - CSV格式，适合Excel分析
- **Export HTML** - HTML格式，适合打印和分享
- **Export JSON** - JSON格式，适合程序化处理

## 📊 API使用

### 基本API调用

```bash
# 获取健康检查报告
curl "http://localhost:3000/api/seo-health?domain=https://www.miyingrides.com"
```

### 包含第三方数据

```bash
curl "http://localhost:3000/api/seo-health?domain=https://www.miyingrides.com&includeThirdParty=true"
```

### 检查特定页面

```bash
curl "http://localhost:3000/api/seo-health?domain=https://www.miyingrides.com&pages=/,/products,/about"
```

### 导出报告

```bash
# 导出JSON格式
curl "http://localhost:3000/api/seo-health/export?domain=https://www.miyingrides.com&format=json" -o report.json

# 导出CSV格式
curl "http://localhost:3000/api/seo-health/export?domain=https://www.miyingrides.com&format=csv" -o report.csv

# 导出HTML格式
curl "http://localhost:3000/api/seo-health/export?domain=https://www.miyingrides.com&format=html" -o report.html
```

## 🔧 配置第三方API

### SEMrush API

1. 注册 [SEMrush](https://www.semrush.com/) 账号
2. 获取API密钥
3. 在 `.env.local` 中添加：
```env
SEMRUSH_API_KEY=your_api_key_here
SEMRUSH_API_SECRET=your_api_secret_here  # 可选
```

### Ahrefs API

1. 注册 [Ahrefs](https://ahrefs.com/) 账号
2. 获取API密钥
3. 在 `.env.local` 中添加：
```env
AHREFS_API_KEY=your_api_key_here
AHREFS_API_SECRET=your_api_secret_here  # 可选
```

### Moz API

1. 注册 [Moz](https://moz.com/) 账号
2. 获取Access ID和Secret Key
3. 在 `.env.local` 中添加：
```env
MOZ_ACCESS_ID=your_access_id_here
MOZ_SECRET_KEY=your_secret_key_here
```

## 📈 评分说明

### 总体分数计算

- **技术SEO**：30%权重
- **内容SEO**：70%权重

### 问题扣分规则

- **错误（Error）**：每个问题扣10分
- **警告（Warning）**：每个问题扣5分
- **信息（Info）**：每个问题扣2分

### 分数等级

- **80-100分**：优秀 ✅
- **60-79分**：良好 ⚠️
- **0-59分**：需要改进 ❌

## 🐛 常见问题

### 1. 检查失败

**问题**：API返回错误

**解决方案**：
- 检查域名是否正确
- 确保网站可访问
- 检查网络连接

### 2. 第三方API数据缺失

**问题**：第三方数据（SEMrush、Ahrefs、Moz）不显示

**解决方案**：
- 检查环境变量是否配置
- 验证API密钥是否有效
- 检查API配额是否用完

### 3. 报告生成慢

**问题**：健康检查需要很长时间

**解决方案**：
- 减少检查的页面数量
- 使用采样检查（只检查关键页面）
- 检查网络延迟

## 💡 最佳实践

1. **定期检查**：建议每周运行一次健康检查
2. **优先修复**：先修复严重问题（Error），再处理警告（Warning）
3. **跟踪趋势**：保存报告并比较历史数据
4. **使用第三方数据**：定期查看第三方API数据以了解网站权威性变化

## 📚 相关文档

- [完整使用指南](./SEO_HEALTH_CHECK_GUIDE.md)
- [API文档](./API_DOCUMENTATION.md)
- [SEO优化建议](./SEO_OPTIMIZATION.md)

---

**需要帮助？** 查看完整文档或联系开发团队。













