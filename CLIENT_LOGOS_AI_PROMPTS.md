# 客户 Logo AI 生成提示词

## 使用说明

这些提示词可以直接用于以下 AI 文生图工具：
- **Midjourney**
- **DALL-E 3** (通过 ChatGPT Plus)
- **Stable Diffusion**
- **Canva AI**

## 5 个客户 Logo 提示词

### 1. Theme Park Inc. (美国主题公园)

```
Professional theme park company logo, modern minimalist design, 
theme park icon with roller coaster silhouette, blue (#0066CC) and white color scheme, 
clean sans-serif typography "Theme Park Inc.", transparent background, 
400x200px, vector style, corporate identity, B2B professional, 
high quality, detailed, 4k
```

**风格参考**：现代企业 Logo，简洁专业

---

### 2. Dubai Entertainment Group (阿联酋娱乐集团)

```
Luxury entertainment company logo, Middle Eastern design elements, 
gold (#FFD700) and dark blue (#003366) colors, elegant serif typography "Dubai Entertainment Group", 
palm tree or star icon, transparent background, 400x200px, premium feel, 
high-end brand identity, luxurious, sophisticated, 4k
```

**风格参考**：奢华品牌 Logo，中东风格

---

### 3. Shanghai Mall Group (中国购物中心集团)

```
Modern shopping mall group logo, Chinese design aesthetic, 
red (#DC143C) and gold (#FFD700) colors, shopping bag or modern building icon, 
clean modern typography "Shanghai Mall Group", transparent background, 
400x200px, contemporary Chinese business style, professional, 4k
```

**风格参考**：现代中式商业 Logo

---

### 4. Family Fun Centers (美国家庭娱乐中心)

```
Family-friendly entertainment center logo, playful but professional, 
bright colors (blue #4A90E2, green #50C878, orange #FF6B35), 
fun icon (balloon or star), friendly rounded typography "Family Fun Centers", 
transparent background, 400x200px, approachable brand, cheerful, 4k
```

**风格参考**：友好活泼的娱乐品牌 Logo

---

### 5. Tokyo Amusement Co. (日本娱乐公司)

```
Japanese amusement company logo, modern minimalist design, 
red (#DC143C) and white color scheme, geometric shapes or cherry blossom icon, 
clean typography "Tokyo Amusement Co.", transparent background, 
400x200px, Japanese aesthetic, modern corporate identity, elegant, 4k
```

**风格参考**：日式极简企业 Logo

---

## 通用参数（所有 Logo）

在提示词末尾添加：

```
--ar 2:1 --v 6 --style raw
```

或对于 DALL-E 3：
```
Aspect ratio: 2:1, Style: Professional logo design
```

## 生成后处理

1. **下载图片**：保存为 PNG 格式
2. **检查尺寸**：确保为 400x200px 或 2:1 比例
3. **优化透明背景**：使用 Photoshop 或在线工具（如 remove.bg）
4. **压缩文件**：使用 TinyPNG 压缩到 < 100KB
5. **重命名文件**：
   - `theme-park-inc.png`
   - `dubai-entertainment.png`
   - `shanghai-mall.png`
   - `family-fun-centers.png`
   - `tokyo-amusement.png`

## 文件保存位置

将生成的图片保存到：
```
mying-web/public/partners/
```

## 更新代码

生成图片后，在 `src/content/partners.ts` 中将占位符 URL 替换为本地路径：

```typescript
// 替换前（占位符）
logo: `https://via.placeholder.com/400x200/1a1a1a/00eaff?text=...`

// 替换后（实际 Logo）
logo: "/partners/theme-park-inc.png"
```

---

**提示**：如果 AI 工具不支持透明背景，可以使用 [remove.bg](https://www.remove.bg/) 等工具移除背景。






