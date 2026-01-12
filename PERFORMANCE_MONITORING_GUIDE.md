# 性能监控指南 (Performance Monitoring Guide)

**创建日期：** 2025-01-06  
**状态：** ✅ 监控工具已配置

---

## 📊 性能监控工具

### 快速开始

运行性能监控：
```powershell
npm run perf:monitor
```

这将检查：
- ✅ Bundle 大小
- ✅ 图片优化状态
- ✅ ISR 配置
- ✅ 代码分割
- ✅ Next.js 配置

---

## 🔍 监控指标

### 1. Bundle 大小监控

**检查项：**
- 总 bundle 大小
- 主 bundle 大小
- Chunk 数量

**目标：**
- 总 bundle：< 500 KB
- 主 bundle：< 200 KB (gzipped)

**报告位置：**
- `performance-reports/performance_YYYY-MM-DD_HH-mm-ss.json`

### 2. 图片优化监控

**检查项：**
- 使用 `unoptimized` 的文件数量
- 图片优化配置

**目标：**
- 0 个文件使用 `unoptimized`

### 3. ISR 配置监控

**检查项：**
- `revalidate = 60` 配置
- ISR 文件存在

**目标：**
- 所有产品页面配置 ISR

### 4. 代码分割监控

**检查项：**
- 动态导入数量
- 代码分割效果

**目标：**
- > 0 个动态导入

### 5. Next.js 配置监控

**检查项：**
- 图片优化配置（AVIF/WebP）
- 压缩配置
- SWC 压缩配置

**目标：**
- 所有优化配置已启用

---

## 📈 定期监控

### 每日监控

```powershell
# 运行性能检查
npm run perf:monitor

# 查看最新报告
Get-ChildItem performance-reports | Sort-Object LastWriteTime -Descending | Select-Object -First 1
```

### 每周监控

```powershell
# 运行 Lighthouse 测试
npm run lighthouse:quick

# 生成对比报告
npm run lighthouse:compare
```

### 每月监控

```powershell
# Bundle 分析
npm run analyze

# 完整性能审计
npm run perf:monitor
npm run lighthouse:quick
```

---

## 📊 性能基准

### 当前基准（2025-01-06）

| 指标 | 当前值 | 目标 | 状态 |
|------|--------|------|------|
| **LCP** | 8.46s | < 2.5s | ⚠️ |
| **FCP** | 1.45s | < 1.8s | ✅ |
| **CLS** | 0.000 | < 0.1 | ✅ |
| **Performance Score** | 43 | > 80 | ⚠️ |
| **Bundle Size** | 219 KB | < 200 KB | ✅ |
| **Unoptimized Images** | 0 | 0 | ✅ |

---

## 🎯 性能目标

### 短期目标（1个月）

- **LCP：** < 5s（当前：8.46s）
- **Performance Score：** > 60（当前：43）
- **Bundle Size：** < 200 KB gzipped（当前：~70-80 KB）

### 中期目标（3个月）

- **LCP：** < 2.5s
- **Performance Score：** > 80
- **Bundle Size：** < 150 KB gzipped

---

## 📝 监控报告

### 报告格式

性能监控报告保存在：
```
performance-reports/
└── performance_YYYY-MM-DD_HH-mm-ss.json
```

### 报告内容

```json
{
  "timestamp": "2025-01-06T10:00:00Z",
  "server": "http://localhost:3000",
  "checks": [
    {
      "name": "bundle_size",
      "status": "pass",
      "value": 219.25,
      "unit": "KB",
      "target": "< 500 KB"
    },
    {
      "name": "image_optimization",
      "status": "pass",
      "value": 0,
      "target": "0 files with unoptimized"
    }
  ]
}
```

---

## 🔧 故障排除

### 问题：监控脚本无法运行

**解决方案：**
```powershell
# 检查 PowerShell 执行策略
Get-ExecutionPolicy

# 如果需要，设置执行策略
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 问题：服务器未运行

**说明：**
- 监控脚本可以在服务器未运行时检查配置
- 某些检查（如 Lighthouse）需要服务器运行

---

## ✅ 最佳实践

### 1. 定期监控

- **每日：** 运行 `npm run perf:monitor`
- **每周：** 运行 Lighthouse 测试
- **每月：** 完整性能审计

### 2. 版本控制

- 提交性能报告到 Git（可选）
- 跟踪性能趋势
- 识别性能回归

### 3. CI/CD 集成

**建议：**
- 在 CI/CD 中集成性能检查
- 设置性能预算
- 自动告警性能下降

---

## 📁 相关文件

- `scripts/performance-monitor.ps1` - 监控脚本
- `performance-reports/` - 报告目录
- `lighthouse-reports/` - Lighthouse 报告

---

**指南创建时间：** 2025-01-06  
**状态：** ✅ 监控工具已配置  
**下一步：** 定期运行监控，跟踪性能趋势










