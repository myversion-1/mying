# Bundle 分析指南 (Bundle Analysis Guide)

## 使用方法

### 1. 安装依赖

```bash
npm install
```

### 2. 运行 Bundle 分析

```bash
npm run analyze
```

这将：
1. 构建生产版本的应用
2. 自动打开浏览器显示 bundle 分析报告
3. 显示每个 chunk 的大小和组成

### 3. 分析结果

分析工具会显示：
- **总 bundle 大小**
- **各个 chunk 的大小**
- **每个模块的大小**
- **重复的依赖**

## 优化建议

### 识别大型依赖

查找占用空间最大的依赖：
1. 检查是否有未使用的依赖
2. 考虑使用更轻量的替代方案
3. 使用动态导入延迟加载

### 代码分割

对于大型组件，使用动态导入：

```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <Loading />,
  ssr: false, // 如果不需要 SSR
});
```

### 优化图片

- 使用 Next.js Image 组件（已实施）
- 优化图片格式（WebP, AVIF）
- 使用适当的 `sizes` 属性

### 移除未使用的代码

- 使用 Tree Shaking
- 移除未使用的导入
- 检查 Tailwind CSS 的 purge 配置

## 目标指标

- **初始 JS Bundle**: < 200 KB (gzipped)
- **总 Bundle 大小**: < 500 KB (gzipped)
- **首屏 JS**: < 100 KB (gzipped)

## 持续监控

建议：
- 每次发布前运行 bundle 分析
- 设置 bundle 大小预算
- 在 CI/CD 中集成检查









