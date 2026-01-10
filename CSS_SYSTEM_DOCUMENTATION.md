# Miying Web - CSS System Documentation

## 概述 (Overview)

本文档详细描述了 Miying Web 网站的完整 CSS 系统，包括主题系统、颜色变量、字体配置、响应式设计和国际化支持。所有信息以结构化方式呈现，便于 AI 模型（如 Gemini）理解和处理。

---

## 1. 主题系统 (Theme System)

### 1.1 主题切换机制

网站支持 **Light Mode（日间模式）** 和 **Dark Mode（夜间模式）** 两种主题，通过以下方式实现：

- **切换组件**: `ThemeToggle` 组件 (`src/components/ThemeToggle.tsx`)
- **切换方式**: 在 `<html>` 元素上添加/移除 `dark` 类名
- **持久化**: 使用 `localStorage` 保存用户选择
- **默认模式**: Light Mode（日间模式）
- **系统偏好**: 支持检测系统主题偏好（`prefers-color-scheme`）

### 1.2 CSS 变量作用域

- **Light Mode**: 定义在 `:root` 选择器中
- **Dark Mode**: 定义在 `.dark` 选择器中（当 `<html>` 有 `dark` 类时生效）

---

## 2. CSS 变量系统 (CSS Variables)

### 2.1 背景颜色 (Background Colors)

#### Light Mode (`:root`)
```css
--background: #ffffff;              /* 主背景：纯白色 */
--foreground: #1a1a1a;             /* 前景色：深灰色 */
```

#### Dark Mode (`.dark`)
```css
--background: #0c1014;             /* 主背景：深蓝黑色 */
--foreground: #ffffff;              /* 前景色：白色 */
```

### 2.2 表面颜色 (Surface Colors)

用于卡片、面板等组件的背景色。

#### Light Mode
```css
--surface: #ffffff;                 /* 基础表面：白色 */
--surface-elevated: #f8f9fa;       /* 提升表面：浅灰色 */
--surface-hover: #f0f1f2;          /* 悬停表面：更浅灰色 */
```

#### Dark Mode
```css
--surface: #0c1014;                /* 基础表面：深蓝黑色 */
--surface-elevated: #151920;       /* 提升表面：稍亮的深色 */
--surface-hover: #1a1f26;          /* 悬停表面：更亮的深色 */
```

### 2.3 边框颜色 (Border Colors)

#### Light Mode
```css
--border: rgba(0, 0, 0, 0.08);      /* 基础边框：8% 黑色透明度 */
--border-hover: rgba(0, 0, 0, 0.12); /* 悬停边框：12% 黑色透明度 */
--border-focus: rgba(0, 234, 255, 0.4); /* 焦点边框：40% 青色透明度 */
```

#### Dark Mode
```css
--border: rgba(255, 255, 255, 0.1); /* 基础边框：10% 白色透明度 */
--border-hover: rgba(255, 255, 255, 0.15); /* 悬停边框：15% 白色透明度 */
--border-focus: rgba(0, 234, 255, 0.5); /* 焦点边框：50% 青色透明度 */
```

### 2.4 文字颜色 (Text Colors)

#### Light Mode - 科幻主题配色
```css
--text-primary: #0a1628;            /* 主文字：深海军蓝（科幻感，WCAG AAA） */
--text-secondary: #1e3a5f;          /* 次要文字：中蓝灰色（WCAG AAA） */
--text-tertiary: #3d5a7f;           /* 第三级文字：浅蓝灰色（WCAG AA） */
--text-accent: #00b8d4;             /* 强调文字：青色（接近 Logo） */
--text-inverse: #ffffff;            /* 反色文字：白色（用于深色背景） */
--text-muted: #6b7c93;              /* 静音文字：静音蓝灰色 */
```

#### Dark Mode - Logo 颜色集成
```css
--text-primary: rgba(255, 255, 255, 0.98);    /* 主文字：98% 白色 */
--text-secondary: rgba(125, 246, 255, 0.9);  /* 次要文字：Logo 次要色 */
--text-tertiary: rgba(0, 234, 255, 0.7);      /* 第三级文字：Logo 主色 */
--text-accent: #7df6ff;                       /* 强调文字：Logo 次要色 */
--text-inverse: #0a1628;                      /* 反色文字：深海军蓝（用于浅色背景） */
```

### 2.5 品牌强调色 (Accent Colors - Brand Logo Colors)

**注意**: Logo 颜色在两种模式下保持一致，确保品牌一致性。

```css
/* Light Mode & Dark Mode 相同 */
--accent-primary: #00eaff;                    /* Logo 主色：青色 */
--accent-primary-hover: #7df6ff;             /* Logo 悬停色：浅青色 */
--accent-primary-light: rgba(0, 234, 255, 0.1); /* Logo 浅色：10% 透明度（Light Mode）*/
--accent-primary-light: rgba(0, 234, 255, 0.15); /* Logo 浅色：15% 透明度（Dark Mode）*/
--accent-secondary: #7df6ff;                  /* Logo 次要色：浅青色 */
```

### 2.6 玻璃面板 (Glass Panel)

用于毛玻璃效果组件。

#### Light Mode
```css
--glass-bg: rgba(255, 255, 255, 0.8);         /* 玻璃背景：80% 白色 */
--glass-border: rgba(0, 0, 0, 0.08);          /* 玻璃边框：8% 黑色 */
```

#### Dark Mode
```css
--glass-bg: rgba(12, 16, 20, 0.9);            /* 玻璃背景：90% 深色 */
--glass-border: rgba(255, 255, 255, 0.1);     /* 玻璃边框：10% 白色 */
```

### 2.7 背景渐变 (Background Gradients)

用于页面背景的渐变叠加效果。

#### Light Mode
```css
--gradient-overlay-1: rgba(0, 234, 255, 0.03);    /* 渐变叠加 1：3% Logo 主色 */
--gradient-overlay-2: rgba(0, 234, 255, 0.02);    /* 渐变叠加 2：2% Logo 主色 */
--gradient-overlay-base: rgba(255, 255, 255, 0.8); /* 渐变基础：80% 白色 */
```

#### Dark Mode
```css
--gradient-overlay-1: rgba(0, 234, 255, 0.05);     /* 渐变叠加 1：5% Logo 主色 */
--gradient-overlay-2: rgba(0, 234, 255, 0.03);     /* 渐变叠加 2：3% Logo 主色 */
--gradient-overlay-base: rgba(12, 16, 20, 0.95);   /* 渐变基础：95% 深色 */
```

---

## 3. 字体系统 (Typography System)

### 3.1 字体定义

通过 Next.js 的 `next/font/google` 加载以下字体：

```typescript
// 字体变量定义（在 layout.tsx 中）
--font-geist-sans: Geist Sans (无衬线字体，用于正文)
--font-geist-mono: Geist Mono (等宽字体，用于代码)
--font-inter: Inter (无衬线字体，备用)
--font-serif: Crimson Text (衬线字体，用于标题和博客内容)
```

### 3.2 字体使用规则

- **正文**: `var(--font-geist-sans)` 或 `system-ui, -apple-system, sans-serif`
- **标题**: `var(--font-serif)` 或 `"Times New Roman", Times, serif`
- **代码**: `var(--font-geist-mono)`
- **博客内容**: 标题使用衬线字体，正文使用无衬线字体

### 3.3 字体大小和行高

```css
/* 基础字体 */
body {
  font-size: 16px;
  line-height: 1.6;
  letter-spacing: -0.01em;
  font-weight: 400;
}

/* 标题 */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* 段落 */
p {
  line-height: 1.7;
}

/* 博客内容 */
.blog-content {
  line-height: 1.7;
}

.blog-content h1 {
  font-size: 2.5rem;
  line-height: 1.2;
}

.blog-content h2 {
  font-size: 2rem;
  line-height: 1.3;
}

.blog-content h3 {
  font-size: 1.5rem;
  line-height: 1.4;
}
```

---

## 4. 特殊布局样式 (Special Layout Styles)

### 4.1 博客内容样式 (Blog Content)

#### 基础样式
```css
.blog-content {
  font-family: var(--font-geist-sans);
  line-height: 1.7;
  color: var(--text-primary);
}
```

#### 标题样式
- 使用衬线字体 (`var(--font-serif)`)
- 标题颜色：`var(--text-primary)`
- 标题间距：`margin-top: 2rem; margin-bottom: 1rem;`

#### 引用样式 (Pull Quote)
```css
.pull-quote {
  margin: 3rem 0;
  padding: 2rem;
  border-left: 4px solid var(--accent-primary);
  background: var(--accent-primary-light);
  font-style: italic;
  font-size: 1.25rem;
  line-height: 1.8;
  text-align: center;
  color: var(--text-primary);
  font-family: var(--font-serif);
}
```

### 4.2 白皮书布局 (White Paper Layout)

```css
.white-paper-layout {
  max-width: 1200px;
}

.white-paper-layout .blog-content {
  line-height: 1.6;
}
```

### 4.3 边角策略布局 (Corner Strategy Layout)

#### 桌面端（Light Mode）
```css
.corner-strategy-layout {
  background: #fafafa;              /* 浅米色背景 */
  padding: 2rem 0;
  border-radius: 1rem;
}

/* 文字颜色强制深色 */
.corner-strategy-layout .blog-content * {
  color: #0a0a0a !important;        /* 深色文字 */
}

.corner-strategy-layout .blog-content h1,
.corner-strategy-layout .blog-content h2 {
  color: #000000 !important;        /* 纯黑标题 */
  font-weight: 700 !important;
}
```

#### 移动端（Dark Mode）
```css
@media (max-width: 767px) {
  .corner-strategy-layout {
    background: #0c1014;            /* 深色背景 */
  }
  
  .corner-strategy-layout .blog-content * {
    color: rgba(255, 255, 255, 0.95) !important; /* 浅色文字 */
  }
  
  .corner-strategy-layout .blog-content h1,
  .corner-strategy-layout .blog-content h2 {
    color: rgba(255, 255, 255, 1) !important; /* 纯白标题 */
  }
}
```

---

## 5. 响应式设计 (Responsive Design)

### 5.1 断点 (Breakpoints)

使用 Tailwind CSS 默认断点：
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### 5.2 移动端优化

#### 背景图片
```css
/* 桌面端：显示背景图片 */
body {
  background-image: url('/background.jpg');
  background-attachment: fixed;
}

/* 移动端：隐藏背景图片，仅显示渐变 */
@media (max-width: 767px) {
  body {
    background-image: /* 仅渐变，无图片 */;
    background-attachment: scroll;
  }
}
```

#### 触摸目标优化
```css
/* 确保所有交互元素满足 44x44px 最小触摸目标 */
button, a, input[type="button"], input[type="submit"], select {
  min-height: 44px;
  min-width: 44px;
}

/* 触摸操作优化 */
button, a, input, select {
  touch-action: manipulation;
  -webkit-tap-highlight-color: rgba(0, 234, 255, 0.2);
}
```

### 5.3 容器查询 (Container Queries)

使用 Tailwind CSS 4 的容器查询功能：
```css
/* 产品卡片使用容器查询 */
@container (min-width: 300px) {
  /* 响应式样式 */
}
```

---

## 6. 国际化支持 (Internationalization)

### 6.1 RTL 语言支持（阿拉伯语）

```css
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

[dir="rtl"] .text-left {
  text-align: right;
}

[dir="rtl"] .text-right {
  text-align: left;
}

[dir="rtl"] .ml-auto {
  margin-left: 0;
  margin-right: auto;
}

[dir="rtl"] .mr-auto {
  margin-right: 0;
  margin-left: auto;
}
```

### 6.2 复杂脚本支持（泰语、印地语等）

```css
[lang="th"],
[lang="hi"] {
  font-feature-settings: "kern" 1, "liga" 1, "clig" 1;
  line-height: 1.6;
  word-spacing: 0.1em;
}

[lang="ar"],
[lang="th"],
[lang="hi"],
[lang="vi"] {
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}
```

---

## 7. 动画和过渡效果 (Animations & Transitions)

### 7.1 淡入缩放动画 (Fade-in Zoom)

```css
@keyframes fadeInZoom {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.blog-content img,
.case-study-breakout,
.comparison-table,
.before-after-slider {
  animation: fadeInZoom 0.6s ease-out;
}
```

### 7.2 滚动触发动画

```css
@media (prefers-reduced-motion: no-preference) {
  .blog-content img,
  .case-study-breakout,
  .comparison-table {
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .blog-content img.visible,
  .case-study-breakout.visible {
    opacity: 1;
    transform: scale(1);
  }
}
```

### 7.3 主题切换过渡

```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.glass-panel {
  transition: background 0.3s ease, border-color 0.3s ease;
}
```

---

## 8. 可访问性 (Accessibility)

### 8.1 颜色对比度

所有颜色组合符合 **WCAG 2.1 AA 级标准**：
- **正常文本**（18pt 以下）：文本与背景对比度 ≥ 4.5:1
- **大文本**（18pt 以上或 14pt 粗体）：文本与背景对比度 ≥ 3:1
- **交互元素**（链接、按钮）：对比度 ≥ 4.5:1

### 8.2 焦点样式

```css
--border-focus: rgba(0, 234, 255, 0.4);  /* Light Mode */
--border-focus: rgba(0, 234, 255, 0.5);   /* Dark Mode */
```

### 8.3 减少动画偏好

```css
@media (prefers-reduced-motion: reduce) {
  /* 动画会被禁用 */
}
```

---

## 9. 组件样式规范 (Component Style Guidelines)

### 9.1 使用 CSS 变量的最佳实践

**✅ 正确示例**:
```css
/* 使用 CSS 变量 */
.text-primary {
  color: var(--text-primary);
}

.bg-surface {
  background-color: var(--surface);
}

.border-default {
  border-color: var(--border);
}
```

**❌ 错误示例**:
```css
/* 避免硬编码颜色 */
.text-primary {
  color: #0a1628;  /* 不推荐 */
}

.bg-surface {
  background-color: #ffffff;  /* 不推荐 */
}
```

### 9.2 主题感知组件

所有组件应使用 CSS 变量，确保在 Light/Dark 模式下自动适配：

```css
.component {
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  color: var(--text-primary);
}

.component:hover {
  background: var(--surface-hover);
  border-color: var(--border-hover);
}
```

### 9.3 特殊背景组件

对于需要深色背景的组件（如 Testimonials、Contact Form），在 Light Mode 下使用深色背景：

```css
.dark-bg-component {
  background: linear-gradient(to bottom right, #0a1628, #0c1014);
  color: white;
}

.dark .dark-bg-component {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
}
```

---

## 10. Tailwind CSS 集成

### 10.1 主题配置

通过 `@theme inline` 将 CSS 变量映射到 Tailwind：

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-serif: var(--font-serif);
}
```

### 10.2 Tailwind 类名使用

```html
<!-- 使用 CSS 变量 -->
<div class="bg-[var(--surface-elevated)] text-[var(--text-primary)] border-[var(--border)]">
  Content
</div>

<!-- 使用 Tailwind 主题颜色（如果已映射） -->
<div class="bg-background text-foreground">
  Content
</div>
```

---

## 11. 文件结构 (File Structure)

```
mying-web/
├── src/
│   ├── app/
│   │   ├── globals.css          # 全局 CSS 文件（包含所有变量和样式）
│   │   └── layout.tsx           # 根布局（字体加载）
│   └── components/
│       ├── ThemeToggle.tsx      # 主题切换组件
│       └── ...
└── ...
```

---

## 12. 关键设计原则 (Key Design Principles)

1. **品牌一致性**: Logo 颜色（`#00eaff`, `#7df6ff`）在所有模式下保持一致
2. **科幻高级感**: 使用深海军蓝和青色营造科幻氛围
3. **高对比度**: 所有文字颜色符合 WCAG 2.1 AA 标准
4. **主题感知**: 所有组件自动适配 Light/Dark 模式
5. **响应式优先**: 移动端优化，触摸目标 ≥ 44x44px
6. **国际化友好**: 支持 RTL 语言和复杂脚本

---

## 13. 快速参考 (Quick Reference)

### 常用颜色变量

| 用途 | Light Mode | Dark Mode |
|------|-----------|-----------|
| 主背景 | `var(--background)` | `var(--background)` |
| 主文字 | `var(--text-primary)` | `var(--text-primary)` |
| 次要文字 | `var(--text-secondary)` | `var(--text-secondary)` |
| 强调色 | `var(--accent-primary)` | `var(--accent-primary)` |
| 表面背景 | `var(--surface-elevated)` | `var(--surface-elevated)` |
| 边框 | `var(--border)` | `var(--border)` |

### 常用字体变量

- `var(--font-geist-sans)` - 正文字体
- `var(--font-serif)` - 标题字体
- `var(--font-geist-mono)` - 代码字体

---

## 14. 更新日志 (Changelog)

### 最新更新（2025-01-27）

- ✅ 优化 Light Mode 文字颜色，使用深海军蓝调色板
- ✅ 统一所有组件使用 CSS 变量
- ✅ 修复 Testimonials、Contact Form 等模块的 Light Mode 可读性
- ✅ 添加深色背景组件支持（Light Mode 下使用深色背景 + 浅色文字）
- ✅ 优化移动端响应式设计

---

## 15. 注意事项 (Important Notes)

1. **不要硬编码颜色**: 始终使用 CSS 变量
2. **测试两种模式**: 确保所有组件在 Light/Dark 模式下都正常显示
3. **对比度检查**: 使用工具验证颜色对比度（如 WebAIM Contrast Checker）
4. **性能优化**: 移动端隐藏背景图片，使用渐变替代
5. **可访问性**: 确保所有交互元素满足最小触摸目标大小

---

**文档版本**: 1.0  
**最后更新**: 2025-01-27  
**维护者**: Miying Web Development Team





