# Vercel Speed Insights 集成指南

## ✅ 已完成的集成

### 1. 安装包
- ✅ `@vercel/speed-insights` 已添加到 `package.json`
- ✅ 版本：`^1.3.1`

### 2. 集成到应用
- ✅ 已导入到 `src/app/layout.tsx`
- ✅ 已添加到组件树中

---

## 功能说明

Vercel Speed Insights 提供：
- 📊 **真实用户监控 (RUM)** - 收集真实用户的性能数据
- ⚡ **Core Web Vitals** - 监控 LCP, FID, CLS 等指标
- 📈 **性能趋势** - 跟踪性能变化趋势
- 🎯 **页面级分析** - 识别慢速页面

---

## 使用方法

### 自动工作

Speed Insights 会自动：
- ✅ 收集性能数据
- ✅ 发送到 Vercel Dashboard
- ✅ 显示在 Vercel 项目设置中

### 查看数据

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 进入 **Analytics** 或 **Speed Insights** 标签
4. 查看性能数据

---

## 代码集成

### layout.tsx

```typescript
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights /> {/* ✅ 已添加 */}
      </body>
    </html>
  );
}
```

---

## 配置选项

### 基本使用（默认）

```typescript
<SpeedInsights />
```

### 自定义配置

```typescript
<SpeedInsights
  sampleRate={1.0}  // 采样率 (0.0 - 1.0)
  framework="nextjs" // 框架名称
/>
```

---

## 性能影响

- 📦 **脚本大小：** ~2 KB（压缩后）
- ⚡ **加载时间：** < 10ms
- 🚀 **性能影响：** 最小化，异步加载
- 💾 **数据收集：** 智能采样

---

## 与 Analytics 的区别

| 功能 | Analytics | Speed Insights |
|------|-----------|----------------|
| 页面浏览 | ✅ | ❌ |
| 性能指标 | ❌ | ✅ |
| Core Web Vitals | ❌ | ✅ |
| 真实用户监控 | ❌ | ✅ |
| 事件跟踪 | ✅ | ❌ |

**建议：** 同时使用两者以获得完整的分析数据。

---

## 验证安装

### 方法 1: 检查代码

确认 `layout.tsx` 中包含：
```typescript
import { SpeedInsights } from "@vercel/speed-insights/next";
// ...
<SpeedInsights />
```

### 方法 2: 浏览器检查

1. 打开网站
2. 打开浏览器开发者工具（F12）
3. 切换到 Network 标签
4. 刷新页面
5. 查找对 `vercel-insights.com` 的请求

### 方法 3: Vercel Dashboard

1. 部署到 Vercel
2. 等待几分钟（数据需要时间同步）
3. 在 Vercel Dashboard 中查看 Speed Insights 数据

---

## 故障排除

### 没有数据

**问题：** Vercel Dashboard 中没有数据

**解决方案：**
1. 确保已部署到 Vercel（本地开发可能不显示数据）
2. 等待几分钟（数据同步需要时间）
3. 检查是否有访问者
4. 验证 Speed Insights 组件已正确添加

### 开发环境

**注意：** Speed Insights 主要在**生产环境**工作：
- 本地开发：可能不收集数据
- Vercel Preview：会收集数据
- Vercel Production：会收集数据

---

## 最佳实践

### 1. 同时使用 Analytics 和 Speed Insights

```typescript
<Analytics />
<SpeedInsights />
```

### 2. 监控关键页面

Speed Insights 会自动监控所有页面，但可以：
- 关注高流量页面
- 监控关键转化路径
- 跟踪性能趋势

### 3. 定期检查

- 每周查看性能报告
- 识别性能回归
- 优化慢速页面

---

## 相关资源

- [Vercel Speed Insights 文档](https://vercel.com/docs/speed-insights)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Core Web Vitals](https://web.dev/vitals/)

---

**最后更新：** 2025-01-27  
**状态：** ✅ 已集成并可用


