# B2B CSS 增强实现

## 语义化颜色变量

### Action Colors
```css
--action-primary: #00eaff              /* Primary conversion action */
--action-primary-hover: #7df6ff
--action-primary-text: #0a1628         /* Text on primary action */
--action-secondary: transparent         /* Secondary action (outline) */
--action-secondary-border: rgba(...)
--action-secondary-text: #0a1628
--action-secondary-hover-bg: #f0f1f2
--action-informational: rgba(0, 234, 255, 0.1)  /* Info badges */
--action-informational-text: #00eaff
--action-risk: #dc2626                 /* Error states */
--action-risk-text: #ffffff
```

### Dark Background Component Text Hierarchy
```css
--dark-bg-text: #ffffff                /* Level 1: Primary */
--dark-bg-text-secondary: rgba(255, 255, 255, 0.85)  /* Level 2: Secondary */
--dark-bg-text-tertiary: rgba(255, 255, 255, 0.6)   /* Level 3: Meta */
```

## 已优化的组件

### 转化组件（Form / CTA）
- ContactForm.tsx - 移除装饰性渐变，使用语义化变量
- VerificationGate.tsx - 移除阴影和位移动画
- QuoteForm.tsx - 简化 hover 效果
- CADDownloadForm.tsx - 使用 action-primary
- ConsultationBooking.tsx - 使用 action-primary
- SpatialAuditForm.tsx - 移除装饰性效果
- PDFDownloadCTA.tsx - 移除渐变背景

### 导航组件
- PageHero.tsx - 移除装饰性渐变，明确 Primary/Secondary CTA 区分
- Header.tsx - 移除阴影和位移动画
- MobileStickyNav.tsx - 使用语义化变量

### 信任组件
- ProductCard.tsx - 移除阴影和位移动画，简化 hover
- CaseCard.tsx - 移除缩放动画
- BlogPostCard.tsx - 移除缩放动画

## 设计原则应用

### 1. 降低认知负担
- 移除装饰性渐变背景
- 移除不必要的阴影效果
- 简化 hover 动画（仅颜色变化）

### 2. 提升专业可信度
- 统一使用语义化颜色变量
- 明确的 CTA 视觉层次
- 控制对比层级 ≤ 3 层

### 3. 减少操作摩擦
- 所有按钮保持 min-h-[44px]
- 移除位移动画（hover:-translate-y）
- 移除缩放动画（hover:scale）

### 4. 支持线索转化
- 单一 Primary CTA 原则
- 明确的 Primary/Secondary 区分
- 决策支持组件优先清晰度

## 深色背景组件规则

```css
.dark-bg-component {
  /* 自动应用 3 层文本层级 */
  /* 避免过多高饱和强调色 */
  /* 控制对比层级 */
}
```

## CTA 商业一致性

### Primary CTA
- 使用 `bg-[var(--action-primary)]`
- 文本使用 `text-[var(--action-primary-text)]`
- 仅颜色过渡，无装饰效果

### Secondary CTA
- 使用 `bg-[var(--action-secondary)]`
- 边框使用 `border-[var(--action-secondary-border)]`
- 文本使用 `text-[var(--action-secondary-text)]`

## 禁止的装饰效果

- ❌ `shadow-[...]` 发光阴影
- ❌ `hover:-translate-y-[1px]` 位移动画
- ❌ `hover:scale-105` 缩放动画
- ❌ 装饰性渐变背景（决策支持组件）
- ❌ 多个 Primary CTA 同权出现

## 允许的交互效果

- ✅ `transition-colors` 颜色过渡
- ✅ `hover:bg-[var(--action-primary-hover)]` 颜色变化
- ✅ `transition-opacity` 透明度过渡（图片）

---

**更新日期**: 2025-01-27  
**状态**: ✅ 核心转化组件已优化


