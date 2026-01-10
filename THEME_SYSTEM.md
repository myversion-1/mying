# 日夜间模式主题系统使用指南

## 概述

已实现统一的日夜间模式配色系统，确保整个网站的一致性和美观性。Logo 颜色保持不变（#00eaff 和 #7df6ff）。

## CSS 变量系统

### 基础颜色变量

```css
/* 背景颜色 */
--background: 主背景色
--surface: 表面颜色
--surface-elevated: 提升的表面颜色
--surface-hover: 悬停时的表面颜色

/* 边框颜色 */
--border: 默认边框
--border-hover: 悬停时的边框
--border-focus: 焦点时的边框

/* 文本颜色 */
--text-primary: 主要文本
--text-secondary: 次要文本
--text-tertiary: 第三级文本
--text-inverse: 反色文本（用于深色背景上的浅色文本）

/* 强调色（Logo 颜色 - 保持不变） */
--accent-primary: #00eaff
--accent-primary-hover: #7df6ff
--accent-primary-light: 半透明版本
--accent-secondary: #7df6ff
```

## 使用方法

### 在组件中使用 CSS 变量

```tsx
// ✅ 正确：使用 CSS 变量
<div className="bg-[var(--background)] text-[var(--text-primary)]">
  <button className="bg-[var(--accent-primary)] text-[var(--text-inverse)]">
    Button
  </button>
</div>

// ❌ 错误：硬编码颜色
<div className="bg-white text-black">
  <button className="bg-[#00eaff] text-white">
    Button
  </button>
</div>
```

### 常用模式

```tsx
// 卡片/面板
<div className="bg-[var(--surface)] border border-[var(--border)]">
  
// 悬停效果
<button className="hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)]">

// 文本层次
<p className="text-[var(--text-primary)]">主要文本</p>
<span className="text-[var(--text-secondary)]">次要文本</span>
<small className="text-[var(--text-tertiary)]">第三级文本</small>

// 强调按钮
<button className="bg-[var(--accent-primary)] text-[var(--text-inverse)] hover:bg-[var(--accent-primary-hover)]">
```

## Logo 保护

Logo 图片 (`/logo.jpg`) 不受主题切换影响，始终显示原始颜色。

## 主题切换

用户可以通过 Header 中的主题切换按钮在日夜间模式之间切换。选择会保存在 localStorage 中。

## 已更新的组件

- ✅ Header
- ✅ Footer
- ✅ ThemeToggle
- ✅ Layout (body)

## 待更新的组件

以下组件需要逐步迁移到 CSS 变量系统：

- ProductCard
- BlogPostCard
- CaseCard
- SmartSelector
- ProductGrid
- 其他使用硬编码颜色的组件

## 迁移步骤

1. 查找硬编码颜色（如 `bg-white`, `text-black`, `bg-[#0c1014]`）
2. 替换为对应的 CSS 变量
3. 测试日夜间模式切换
4. 确保对比度符合 WCAG 2.1 AA 标准




