# Lighthouse 性能分析与优化方案

## 📊 当前性能指标分析

根据 Lighthouse 评分计算器，当前性能得分：**64/100**

### 指标详情

| 指标 | 值 | 得分 | 权重 | 状态 |
|------|-----|------|------|------|
| **FCP** (First Contentful Paint) | 1,566 ms | 95 | 10% | ✅ 优秀 |
| **SI** (Speed Index) | 5,679 ms | 52 | 10% | ⚠️ 需要改进 |
| **LCP** (Largest Contentful Paint) | 2,210 ms | 95 | 25% | ✅ 优秀 |
| **TBT** (Total Blocking Time) | 2,955 ms | 3 | 30% | ❌ **严重问题** |
| **CLS** (Cumulative Layout Shift) | 0.00 | 100 | 25% | ✅ 完美 |

### 问题诊断

**主要问题：**
1. **TBT (Total Blocking Time) = 2,955 ms，得分仅 3 分** ⚠️ **最严重**
   - 权重：30%（最高）
   - 这是导致总分低的主要原因
   - 说明主线程被阻塞了近 3 秒

2. **SI (Speed Index) = 5,679 ms，得分 52 分** ⚠️
   - 权重：10%
   - 页面加载速度较慢

**表现良好的指标：**
- ✅ FCP: 1.5 秒（优秀）
- ✅ LCP: 2.2 秒（优秀）
- ✅ CLS: 0.00（完美）

## 🎯 优化优先级

### 优先级 1: 优化 TBT (Total Blocking Time) - 最紧急

**目标：** 将 TBT 从 2,955 ms 降低到 < 200 ms（得分 100）

**TBT 是什么：**
- 测量主线程被阻塞的总时间
- 阻塞时间 = 任务执行时间超过 50ms 的部分
- 影响页面交互响应性

**优化策略：**

#### 1.1 减少 JavaScript 执行时间

**已实施：**
- ✅ 代码分割和动态导入
- ✅ 延迟加载非关键组件

**需要进一步优化：**

```typescript
// 1. 使用 Web Workers 处理重型计算
// 创建 src/utils/worker-utils.ts
export function createWorker(workerScript: string): Worker {
  return new Worker(new URL(workerScript, import.meta.url));
}

// 2. 优化数据过滤和搜索
// 使用防抖和节流
import { debounce, throttle } from "@/utils/main-thread-optimization";

// 3. 减少同步操作
// 将同步操作改为异步
```

#### 1.2 优化第三方脚本

**检查清单：**
- [ ] 延迟加载分析脚本（Google Analytics, Clarity）
- [ ] 使用 `async` 或 `defer` 加载脚本
- [ ] 考虑使用 `rel="preconnect"` 预连接

#### 1.3 优化 React 渲染

**实施：**
- ✅ 已使用 `useMemo` 和 `useCallback`
- ✅ 已使用代码分割

**进一步优化：**
```typescript
// 1. 使用 React.memo 防止不必要的重渲染
export const ProductCard = React.memo(({ product }) => {
  // ...
});

// 2. 优化状态更新
// 使用函数式更新避免依赖
const [count, setCount] = useState(0);
setCount(prev => prev + 1); // 而不是 setCount(count + 1)
```

#### 1.4 优化字体加载

**当前配置：**
```typescript
// 已配置 font-display: swap
const geistSans = Geist({
  display: "swap",
  preload: true,
});
```

**进一步优化：**
- [ ] 考虑使用 `font-display: optional` 对于非关键字体
- [ ] 减少字体文件大小（子集化）

### 优先级 2: 优化 SI (Speed Index)

**目标：** 将 SI 从 5,679 ms 降低到 < 3,400 ms（得分 90+）

**SI 是什么：**
- 测量页面内容视觉加载速度
- 反映用户感知的加载速度

**优化策略：**

#### 2.1 优化首屏内容

**已实施：**
- ✅ 首屏组件启用 SSR
- ✅ 图片使用 `loading="eager"` 对于首屏图片

**进一步优化：**
```typescript
// 1. 预加载关键资源
<link rel="preload" href="/critical.css" as="style" />
<link rel="preload" href="/hero-image.jpg" as="image" />

// 2. 内联关键 CSS
// 将首屏关键 CSS 内联到 HTML

// 3. 优化图片加载
// 使用 srcset 和 sizes 属性
<Image
  src="/hero.jpg"
  srcSet="/hero-640w.jpg 640w, /hero-1280w.jpg 1280w"
  sizes="(max-width: 640px) 100vw, 1280px"
  priority
/>
```

#### 2.2 减少渲染阻塞资源

**检查清单：**
- [ ] 检查是否有阻塞渲染的 CSS
- [ ] 使用 `media` 属性延迟加载非关键 CSS
- [ ] 内联关键 CSS

#### 2.3 优化图片加载

**已实施：**
- ✅ 使用 Next.js Image 组件
- ✅ 图片格式优化（AVIF, WebP）

**进一步优化：**
- [ ] 确保所有首屏图片使用 `priority` 属性
- [ ] 使用 `fetchPriority="high"` 对于 LCP 图片

## 🔧 立即实施的优化

### 优化 1: 延迟加载分析脚本

```typescript
// src/components/AnalyticsProvider.tsx
"use client";

import { useEffect } from "react";
import { onIdle } from "@/utils/main-thread-optimization";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 延迟加载分析脚本到空闲时间
    onIdle(() => {
      // 加载 Google Analytics
      // 加载 Microsoft Clarity
    });
  }, []);

  return <>{children}</>;
}
```

### 优化 2: 优化 ProductGrid 过滤逻辑

```typescript
// src/components/ProductGrid.tsx
import { useMemo, useCallback } from "react";
import { debounce } from "@/utils/main-thread-optimization";

export function ProductGrid({ items, initialSearchQuery }: Props) {
  // 使用防抖优化搜索
  const debouncedFilter = useMemo(
    () => debounce((query: string) => {
      // 过滤逻辑
    }, 300),
    []
  );

  // 使用 useMemo 缓存过滤结果
  const filteredItems = useMemo(() => {
    // 过滤逻辑
  }, [items, searchQuery, categoryFilter]);
}
```

### 优化 3: 优化字体加载策略

```typescript
// src/app/layout.tsx
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  // 考虑使用 subset 减少字体大小
  // adjustFontFallback: false, // 如果不需要回退字体
});
```

### 优化 4: 使用 React.memo 优化组件

```typescript
// src/components/ProductCard.tsx
import React from "react";

export const ProductCard = React.memo(function ProductCard({ 
  product, 
  index 
}: ProductCardProps) {
  // 组件代码
}, (prevProps, nextProps) => {
  // 自定义比较函数
  return prevProps.product.id === nextProps.product.id &&
         prevProps.index === nextProps.index;
});
```

## 📈 预期改善

### TBT 优化预期

**当前：** 2,955 ms（得分 3）

**优化后预期：**
- 延迟加载分析脚本：-500 ms
- 优化过滤逻辑：-300 ms
- 使用 React.memo：-200 ms
- 优化字体加载：-100 ms
- **总计：** ~1,855 ms（得分 ~50）

**进一步优化：**
- 使用 Web Workers：-500 ms
- 优化第三方脚本：-300 ms
- **最终目标：** < 200 ms（得分 100）

### SI 优化预期

**当前：** 5,679 ms（得分 52）

**优化后预期：**
- 优化首屏内容：-1,000 ms
- 减少渲染阻塞：-500 ms
- 优化图片加载：-300 ms
- **总计：** ~3,879 ms（得分 ~85）

## ✅ 实施检查清单

### 立即实施（今天）

- [ ] 延迟加载分析脚本（Google Analytics, Clarity）
- [ ] 优化 ProductGrid 过滤逻辑（使用防抖）
- [ ] 为关键组件添加 React.memo
- [ ] 检查并优化字体加载

### 短期实施（本周）

- [ ] 使用 Web Workers 处理重型计算
- [ ] 优化第三方脚本加载
- [ ] 内联关键 CSS
- [ ] 优化首屏图片加载（priority 属性）

### 中期实施（本月）

- [ ] 实施 Service Worker 缓存策略
- [ ] 优化数据获取逻辑
- [ ] 考虑使用 React Server Components（如果适用）
- [ ] 性能监控和持续优化

## 🔍 监控和验证

### 使用 Lighthouse CI

```bash
# 安装 Lighthouse CI
npm install -g @lhci/cli

# 运行 Lighthouse
lhci autorun --collect.url=https://www.miyingrides.com
```

### 使用 Vercel Analytics

- 查看 Web Vitals 报告
- 监控真实用户性能数据
- 识别性能瓶颈

### 定期检查

- 每周运行 Lighthouse 测试
- 监控 Core Web Vitals
- 跟踪 TBT 和 SI 指标

## 📚 相关资源

- [Web Vitals](https://web.dev/vitals/)
- [Total Blocking Time](https://web.dev/tbt/)
- [Speed Index](https://web.dev/speed-index/)
- [Optimize Long Tasks](https://web.dev/optimize-long-tasks/)

---

**最后更新：** 2025-01-27  
**当前得分：** 64/100  
**目标得分：** 90+/100  
**主要问题：** TBT (Total Blocking Time) = 2,955 ms

