# 客户 Logo 生成指南

## 概述

本文档说明如何为首页"我们的客户"部分生成 5 张客户 Logo 示意图。

## 当前配置

在 `src/content/partners.ts` 中已配置了 5 个客户：

1. **Theme Park Inc.** (美国) - 主题公园
2. **Dubai Entertainment Group** (阿联酋) - 主题公园
3. **Shanghai Mall Group** (中国) - 购物中心
4. **Family Fun Centers** (美国) - FEC
5. **Tokyo Amusement Co.** (日本) - FEC

## 图片生成方案

### 方案 1：使用 AI 文生图工具

#### 推荐工具
- **Midjourney**: 专业 Logo 设计
- **DALL-E 3**: 通过 ChatGPT Plus 使用
- **Stable Diffusion**: 开源方案
- **Canva AI**: 简单易用

#### 详细提示词

##### 1. Theme Park Inc. Logo
```
Professional theme park company logo, modern minimalist design, 
theme park icon with roller coaster silhouette, blue (#0066CC) and white color scheme, 
clean sans-serif typography "Theme Park Inc.", transparent background, 
400x200px, vector style, corporate identity, B2B professional
```

##### 2. Dubai Entertainment Group Logo
```
Luxury entertainment company logo, Middle Eastern design elements, 
gold (#FFD700) and dark blue (#003366) colors, elegant serif typography "Dubai Entertainment Group", 
palm tree or star icon, transparent background, 400x200px, premium feel, 
high-end brand identity
```

##### 3. Shanghai Mall Group Logo
```
Modern shopping mall group logo, Chinese design aesthetic, 
red (#DC143C) and gold (#FFD700) colors, shopping bag or modern building icon, 
clean modern typography "Shanghai Mall Group", transparent background, 
400x200px, contemporary Chinese business style
```

##### 4. Family Fun Centers Logo
```
Family-friendly entertainment center logo, playful but professional, 
bright colors (blue #4A90E2, green #50C878, orange #FF6B35), 
fun icon (balloon or star), friendly rounded typography "Family Fun Centers", 
transparent background, 400x200px, approachable brand
```

##### 5. Tokyo Amusement Co. Logo
```
Japanese amusement company logo, modern minimalist design, 
red (#DC143C) and white color scheme, geometric shapes or cherry blossom icon, 
clean typography "Tokyo Amusement Co.", transparent background, 
400x200px, Japanese aesthetic, modern corporate identity
```

### 方案 2：使用占位符服务（临时）

如果暂时无法生成 Logo，可以使用占位符：

```typescript
// 在 src/content/partners.ts 中临时使用
logo: "https://via.placeholder.com/400x200/1a1a1a/ffffff?text=Theme+Park+Inc."
```

### 方案 3：使用 Logo 生成器网站

推荐网站：
- **LogoMaker**: https://www.logomaker.com/
- **Canva Logo Maker**: https://www.canva.com/logos/
- **Hatchful (Shopify)**: https://www.shopify.com/tools/logo-maker
- **FreeLogoDesign**: https://www.freelogodesign.org/

## 图片规格

### 技术要求
- **尺寸**：400x200px（2:1 宽高比）
- **格式**：PNG（透明背景）或 SVG
- **文件大小**：< 100KB
- **分辨率**：72-150 DPI（网页使用）

### 设计规范
- **背景**：透明（推荐）或白色
- **颜色**：适合深色背景显示（避免纯白色）
- **风格**：简洁、专业、现代
- **文字**：清晰可读，避免过小

## 实施步骤

### 1. 生成图片
使用上述任一方案生成 5 张 Logo 图片。

### 2. 保存文件
将图片保存到 `public/partners/` 目录，使用以下文件名：
- `theme-park-inc.png`
- `dubai-entertainment.png`
- `shanghai-mall.png`
- `family-fun-centers.png`
- `tokyo-amusement.png`

### 3. 优化图片
- 使用 [TinyPNG](https://tinypng.com/) 压缩 PNG 文件
- 确保文件大小 < 100KB
- 检查透明背景是否正确

### 4. 验证显示
- 启动开发服务器：`npm run dev`
- 访问首页，检查"我们的客户"部分
- 确认 Logo 正确显示且适配深色背景

## 代码已就绪

代码已经配置好，图片路径在 `src/content/partners.ts` 中：

```typescript
{
  id: "theme-park-inc",
  name: "Theme Park Inc.",
  logo: "/partners/theme-park-inc.png", // 只需添加此文件
  // ...
}
```

## 注意事项

1. **版权**：确保生成的 Logo 不侵犯任何商标或版权
2. **一致性**：所有 Logo 应保持相似的设计风格和尺寸
3. **可读性**：在深色背景上测试 Logo 的可读性
4. **响应式**：Logo 会在不同屏幕尺寸下显示，确保在小屏幕上仍清晰

## 临时占位符方案

如果需要快速测试，可以使用以下占位符 URL：

```typescript
// 在 src/content/partners.ts 中临时替换
logo: `https://via.placeholder.com/400x200/1a1a1a/00eaff?text=${encodeURIComponent(partner.name)}`
```

这将显示带有客户名称的占位符图片。

---

**最后更新**：2025-01-27  
**状态**：等待图片生成和上传



