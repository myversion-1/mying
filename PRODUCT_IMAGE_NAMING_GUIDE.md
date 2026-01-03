# 产品图片多语言命名指南

## 概述

已为所有产品生成11种语言的推荐图片文件名和Alt标签映射表。

## 文件名格式

**格式**: `[产品名]-[核心关键词]-[国家名]-[语言代码].jpg`

**示例**:
- `carousel-ride-manufacturer-thailand-th.jpg`
- `meow-nuclear-carousel-carousel-ride-manufacturer-thailand-th.jpg`
- `lucky-carousel-carousel-ride-manufacturer-india-hi.jpg`

## 生成的文件

1. **`product_image_mapping.json`** - 完整映射表
   - 包含所有产品的所有语言版本
   - 每个文件名包含11种语言的Alt标签
   - 总文件数：737个文件名

2. **`product_image_mapping_summary.json`** - 摘要文件
   - 统计信息
   - 示例条目

## 数据结构

### 每个文件名条目包含：

```json
{
  "product_name_en": "Meow Nuclear Carousel",
  "product_name_zh": "星核旋转木马",
  "category": "Family Ride",
  "target_language": "th",
  "country_code": "thailand",
  "alt_texts": {
    "en": "Meow Nuclear Carousel - Premium Amusement Ride Equipment by Miying Manufacturer",
    "zh": "星核旋转木马 - 米盈优质游乐设备制造商",
    "ar": "Meow Nuclear Carousel - معدات ألعاب ترفيهية عالية الجودة من شركة Miying",
    "ru": "Meow Nuclear Carousel - Премиальное оборудование для аттракционов от производителя Miying",
    "ja": "Meow Nuclear Carousel - Miyingメーカーのプレミアムアトラクション設備",
    "ko": "Meow Nuclear Carousel - Miying 제조사의 프리미엄 놀이기구 장비",
    "th": "Meow Nuclear Carousel - อุปกรณ์เครื่องเล่นคุณภาพสูงจากผู้ผลิต Miying",
    "vi": "Meow Nuclear Carousel - Thiết bị trò chơi giải trí cao cấp từ nhà sản xuất Miying",
    "id": "Meow Nuclear Carousel - Peralatan Wahana Hiburan Premium dari Produsen Miying",
    "hi": "Meow Nuclear Carousel - Miying निर्माता द्वारा प्रीमियम मनोरंजन सवारी उपकरण",
    "es": "Meow Nuclear Carousel - Equipamiento de Atracciones Premium del Fabricante Miying"
  }
}
```

## 11种语言支持

| 语言代码 | 国家代码 | 国家名称 | 示例文件名 |
|---------|---------|---------|-----------|
| en | usa | USA | `carousel-ride-manufacturer-usa-en.jpg` |
| zh | china | 中国 | `carousel-ride-manufacturer-china-zh.jpg` |
| ar | saudi | السعودية | `carousel-ride-manufacturer-saudi-ar.jpg` |
| ru | russia | Россия | `carousel-ride-manufacturer-russia-ru.jpg` |
| ja | japan | 日本 | `carousel-ride-manufacturer-japan-ja.jpg` |
| ko | korea | 한국 | `carousel-ride-manufacturer-korea-ko.jpg` |
| th | thailand | ไทย | `carousel-ride-manufacturer-thailand-th.jpg` |
| vi | vietnam | Việt Nam | `carousel-ride-manufacturer-vietnam-vi.jpg` |
| id | indonesia | Indonesia | `carousel-ride-manufacturer-indonesia-id.jpg` |
| hi | india | भारत | `carousel-ride-manufacturer-india-hi.jpg` |
| es | spain | España | `carousel-ride-manufacturer-spain-es.jpg` |

## 核心关键词规则

根据产品类型自动生成核心关键词：

- **Carousel**: `carousel-ride-manufacturer`
- **Bumper Car**: `bumper-car-manufacturer`
- **Train**: `mini-train-manufacturer`
- **Go Kart**: `go-kart-manufacturer`
- **Trampoline**: `trampoline-manufacturer`
- **Ferris Wheel**: `ferris-wheel-manufacturer`
- **Pirate Ship**: `pirate-ship-manufacturer`
- **Water Ride**: `water-ride-manufacturer`
- **Swing**: `swing-ride-manufacturer`
- **Tank**: `tank-ride-manufacturer`
- **Adventure**: `adventure-ride-manufacturer`
- **Family Ride** (默认): `family-ride-manufacturer`
- **其他**: `amusement-ride-manufacturer`

## 使用示例

### 在HTML中使用

```html
<!-- 英语版本 -->
<img 
  src="/products/meow-nuclear-carousel-carousel-ride-manufacturer-usa-en.jpg" 
  alt="Meow Nuclear Carousel - Premium Amusement Ride Equipment by Miying Manufacturer"
/>

<!-- 泰语版本 -->
<img 
  src="/products/meow-nuclear-carousel-carousel-ride-manufacturer-thailand-th.jpg" 
  alt="Meow Nuclear Carousel - อุปกรณ์เครื่องเล่นคุณภาพสูงจากผู้ผลิต Miying"
/>
```

### 在Next.js中使用

```typescript
import { useLanguage } from "@/components/language";
import imageMapping from "@/data/product_image_mapping.json";

function ProductImage({ productName }: { productName: string }) {
  const { lang } = useLanguage();
  const countryCode = LANG_TO_COUNTRY[lang];
  const filename = `${slugify(productName)}-carousel-ride-manufacturer-${countryCode}-${lang}.jpg`;
  const entry = imageMapping.mapping[filename];
  
  return (
    <img 
      src={`/products/${filename}`}
      alt={entry?.alt_texts[lang] || `${productName} - Miying`}
    />
  );
}
```

## 统计信息

- **总产品数**: 69个
- **总文件名数**: 737个（69产品 × 11语言 - 部分重复）
- **每种语言**: 69个文件名
- **Alt标签**: 每个文件名包含11种语言的Alt文本

## 文件位置

- **完整映射表**: `product_image_mapping.json`
- **摘要文件**: `product_image_mapping_summary.json`
- **生成脚本**: `generate_product_image_mapping.py`

## 更新说明

如需更新映射表：
1. 修改 `generate_product_image_mapping.py` 中的产品数据
2. 运行: `python generate_product_image_mapping.py`
3. 新的映射表将覆盖现有文件

---

**生成时间**: 2025-01-28
**版本**: 1.0

