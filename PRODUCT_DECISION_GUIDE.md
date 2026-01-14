# 产品页决策型内容指南

## 概述

根据外贸最佳实践，我们已经将产品页从"展示型"升级为"决策型"，帮助海外客户快速做出购买决策。

## 核心原则

客户在查看产品时，不是在"选产品"，而是在"选风险"。他们关心5个核心问题：

1. 这台设备适不适合我这个场地/客群？
2. 安不安全？有没有认证？
3. 运输、安装麻不麻烦？
4. 如果出问题，你们靠不靠谱？
5. 我下一步该不该联系你？

## 7个决策型内容模块

### ① 产品一句话定位

**位置**: 产品名称下方第一句话

**错误写法**:
```
XXX Amusement Ride / Model ABC
```

**正确写法**:
```
A family-friendly ride designed for indoor amusement centers
Suitable for small to medium-size venues
```

**目的**: 让客户立刻知道这是不是"给我用的"

**字段**: `positioning: { en: "...", zh: "..." }`

---

### ② 适用场景

**位置**: 定位语句下方

**格式**:
```
Ideal for:
- Indoor amusement parks
- FECs / shopping mall entertainment areas
- Family & kids zones

Not recommended for (可选，但很高级):
- Very limited ceiling height
- Outdoor without shelter
```

**目的**: 帮助客户自我筛选，提高精准询盘率

**字段**: 
- `idealFor: { en: [...], zh: [...] }`
- `notRecommendedFor: { en: [...], zh: [...] }` (可选)

---

### ③ 场地 & 基本要求

**位置**: 参数说明区域

**错误写法**:
```
Required area: 30-50 sqm
Power supply: XXX
```

**正确写法**:
```
Required area: approx. 30–50 sqm
(Suitable for medium-size venues)

Power supply: XXX
(Standard industrial power supported)
```

**目的**: 海外客户不是工程师，他们需要"翻译版参数"

**字段**: 
- `venueRequirements: { en: "...", zh: "..." }`
- `powerSupply: { en: "...", zh: "..." }`

---

### ④ 安全 & 认证

**位置**: 单独一个小区块

**格式**:
```
Safety & Compliance
- Designed according to international safety standards
- CE / ISO / ASTM compliance available upon request
- Tested before delivery
```

**⚠️ 注意**: 
- 不要乱写"全部都有"
- 写"available / supported / provided"更真实、更安全

**字段**: `safetyCompliance: { en: [...], zh: [...] }`

---

### ⑤ 运输、安装、售后

**位置**: 安全认证下方

**格式**:
```
Delivery & Installation
- Standard export packaging
- Installation guidance provided
- Remote technical support available

After-Sales
- Spare parts support
- Online assistance during operation
```

**目的**: 消除"跨国焦虑"，让客户知道"就算我不来中国，也能搞得定"

**字段**: 
- `deliveryInstallation: { en: [...], zh: [...] }`
- `afterSales: { en: [...], zh: [...] }`

---

### ⑥ 视频 & 社媒

**位置**: 产品图片附近

**格式**:
```
▶️ See this ride in operation
(Video available on our YouTube / TikTok)
```

**目的**: 动态信任比静态图更有说服力

**字段**: `videoLinks: { youtube?: "...", tiktok?: "..." }`

---

### ⑦ 明确的"下一步行动"

**位置**: 产品卡片底部

**错误写法**:
```
Contact us
```

**正确写法**:
```
Contact for layout suggestion & quotation
💬 WhatsApp response within 24h
```

**目的**: 告诉客户联系你能得到什么，成本有多低

**字段**: `ctaText: { en: "...", zh: "..." }`

---

## 如何为产品添加决策型内容

### 步骤 1: 打开产品数据文件

编辑 `src/content/products_multilingual.ts`

### 步骤 2: 找到要更新的产品

找到产品对象，例如：

```typescript
{
  name: { en: "Nuclear energy crisis", zh: "核能危机" },
  category: { en: "Family Ride", zh: "家庭游乐设备" },
  // ... 其他基础字段
}
```

### 步骤 3: 添加决策型字段

在基础字段后添加：

```typescript
{
  name: { en: "Nuclear energy crisis", zh: "核能危机" },
  category: { en: "Family Ride", zh: "家庭游乐设备" },
  footprint: { en: "D12M*H5.9M (Including Fence)", zh: "直径12M*高5.9M (含围栏)" },
  height: { en: "5.9 m", zh: "5.9米" },
  riders: "36",
  status: "New",
  image: "/products/xxx.jpeg",
  
  // 决策型内容字段
  positioning: { 
    en: "A family-friendly ride designed for indoor amusement centers. Suitable for small to medium-size venues.", 
    zh: "专为室内娱乐中心设计的家庭友好型游乐设备。适合中小型场地。" 
  },
  idealFor: { 
    en: ["Indoor amusement parks", "FECs / shopping mall entertainment areas", "Family & kids zones"], 
    zh: ["室内游乐园", "家庭娱乐中心/购物中心娱乐区", "家庭和儿童区域"] 
  },
  notRecommendedFor: { 
    en: ["Very limited ceiling height"], 
    zh: ["层高非常有限"] 
  },
  venueRequirements: { 
    en: "Suitable for medium-size venues", 
    zh: "适合中型场地" 
  },
  powerSupply: { 
    en: "Standard industrial power supported", 
    zh: "支持标准工业电源" 
  },
  safetyCompliance: { 
    en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
    zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
  },
  deliveryInstallation: { 
    en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
    zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
  },
  afterSales: { 
    en: ["Spare parts support", "Online assistance during operation"], 
    zh: ["备件支持", "运营期间在线协助"] 
  },
  videoLinks: { 
    youtube: "https://www.youtube.com/@MiyingAmusementEquipment",
    tiktok: "https://www.tiktok.com/@miying_amusements"
  },
  ctaText: { 
    en: "Contact for layout suggestion & quotation", 
    zh: "获取布局建议与报价" 
  },
}
```

### 步骤 4: 保存并测试

保存文件后，产品卡片会自动显示新的决策型内容。

---

## 优先级建议

如果你只能先改 30%，按以下优先级：

### 🥇 第一优先（立刻提升转化）

- ✅ 产品一句话定位 (`positioning`)
- ✅ 适用场景 (`idealFor`)

### 🥈 第二优先（建立信任）

- ✅ Safety & Compliance (`safetyCompliance`)
- ✅ Installation / After-sales (`deliveryInstallation`, `afterSales`)

### 🥉 第三优先（放大已有优势）

- ✅ 视频 / 社媒入口 (`videoLinks`)
- ✅ CTA 行动引导 (`ctaText`)

---

## 示例产品

已为以下产品添加了完整的决策型内容作为示例：

1. **Nuclear energy crisis** (核能危机)
2. **Energy Plan** (能源计划)

可以参考这些示例来为其他产品添加内容。

---

## 注意事项

1. **真实性**: 不要夸大，使用"available upon request"比"all certified"更可信
2. **针对性**: 根据产品特点填写，不要复制粘贴
3. **完整性**: 至少填写第一优先和第二优先的字段
4. **多语言**: 确保中英文都填写，保持一致性

---

## 技术说明

- 所有字段都是可选的（使用 `?` 标记）
- 如果产品没有某个字段，该部分不会显示
- 系统会自动根据用户选择的语言显示对应内容
- 产品卡片会自动适配新的内容结构






















