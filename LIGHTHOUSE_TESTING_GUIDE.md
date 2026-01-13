# Lighthouse 测试指南 (Lighthouse Testing Guide)

**更新日期：** 2025-01-06

---

## 🚀 快速开始

### 步骤 1: 启动开发服务器

在运行 Lighthouse 测试之前，需要先启动开发服务器：

```powershell
cd "C:\Users\Administrator\Desktop\Miying Web\mying-web"
npm run dev
```

**等待服务器启动：**
- 服务器通常会在 `http://localhost:3000` 启动
- 如果 3000 端口被占用，会自动使用 3001
- 等待看到 "Ready" 消息

### 步骤 2: 运行 Lighthouse 测试

在**新的终端窗口**中运行：

```powershell
cd "C:\Users\Administrator\Desktop\Miying Web\mying-web"
npm run lighthouse:quick
```

---

## 📊 可用的 Lighthouse 命令

### 快速测试
```powershell
npm run lighthouse:quick
```
- 快速测试产品列表页
- 自动检测端口（3000 或 3001）
- 生成 JSON 报告

### 完整测试
```powershell
npm run lighthouse:simple
```
- 更详细的测试
- 包含更多指标

### 对比测试
```powershell
npm run lighthouse:compare
```
- 生成优化前后对比
- 需要先运行 `lighthouse:before` 和 `lighthouse:after`

---

## 🔍 检查服务器状态

### 方法 1: 检查端口

```powershell
# 检查 3000 端口
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue

# 检查 3001 端口
Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue
```

### 方法 2: 访问浏览器

打开浏览器访问：
- `http://localhost:3000`
- 或 `http://localhost:3001`

如果页面正常加载，说明服务器正在运行。

---

## ⚠️ 常见问题

### 问题 1: "Server not running!"

**原因：** 开发服务器没有启动

**解决方案：**
1. 打开新的终端窗口
2. 运行 `npm run dev`
3. 等待服务器启动完成
4. 在另一个终端运行 Lighthouse 测试

### 问题 2: 端口被占用

**原因：** 3000 或 3001 端口已被使用

**解决方案：**
```powershell
# 终止占用端口的进程
npm run kill:nextjs

# 或手动终止
Get-Process -Name node | Stop-Process -Force
```

### 问题 3: Lighthouse 找不到服务器

**原因：** 服务器在不同的端口或地址

**解决方案：**
- Lighthouse 脚本会自动检测 3000 和 3001 端口
- 如果使用其他端口，需要修改脚本

---

## 📈 测试结果

### 报告位置

Lighthouse 报告保存在：
```
lighthouse-reports/
├── before.json      # 优化前报告
├── after.json       # 优化后报告
├── comparison.json  # 对比报告
└── PERFORMANCE_SUMMARY.md
```

### 查看报告

#### JSON 报告
```powershell
# 查看 JSON 报告
Get-Content lighthouse-reports\after.json | ConvertFrom-Json | Select-Object -ExpandProperty categories
```

#### 对比报告
```powershell
# 生成对比报告
npm run lighthouse:compare
```

---

## 🎯 性能指标

### Core Web Vitals

Lighthouse 测试会检查：

1. **LCP (Largest Contentful Paint)**
   - 目标：< 2.5s
   - 当前：7.9s（需优化）

2. **FCP (First Contentful Paint)**
   - 目标：< 1.8s
   - 当前：1.3s ✅

3. **Performance Score**
   - 目标：> 80
   - 当前：46（需优化）

### 优化效果

**已实施的优化：**
- ✅ ISR 迁移（60s revalidation）
- ✅ 图片优化（priority, WebP）
- ✅ 代码分割（TechnicalCertification, react-countup）
- ✅ Bundle 优化（219 KB 主 bundle）

**预期改善：**
- LCP：从 7.9s 降至 2.5s 以下
- Performance Score：从 46 提升至 80+

---

## 🔧 测试流程

### 完整测试流程

1. **启动服务器**
   ```powershell
   npm run dev
   ```

2. **等待服务器就绪**
   - 看到 "Ready" 消息
   - 确认端口（3000 或 3001）

3. **运行 Lighthouse 测试**
   ```powershell
   # 在新终端窗口
   npm run lighthouse:quick
   ```

4. **查看结果**
   - 检查终端输出
   - 查看 `lighthouse-reports/` 目录

5. **生成对比报告**（可选）
   ```powershell
   npm run lighthouse:compare
   ```

---

## 📝 最佳实践

### 测试时机

1. **优化前：** 运行基准测试
2. **优化后：** 运行对比测试
3. **定期：** 持续监控性能

### 测试环境

- 使用生产构建：`npm run build && npm start`
- 或开发环境：`npm run dev`
- 确保网络条件一致

### 测试页面

**主要测试页面：**
- `/products` - 产品列表页（ISR 优化）
- `/products/[id]` - 产品详情页（图片优化）

---

## ✅ 检查清单

运行 Lighthouse 测试前：

- [ ] 开发服务器已启动
- [ ] 服务器端口已确认（3000 或 3001）
- [ ] 浏览器可以访问 `http://localhost:3000`
- [ ] 终端在正确的目录（mying-web）

---

**指南生成时间：** 2025-01-06  
**状态：** ✅ 测试工具已配置  
**下一步：** 启动服务器并运行测试













