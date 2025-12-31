# 内容管理系统说明

## 架构概述

Miying 网站采用**内容与组件分离**的架构，所有内容都集中在 `src/content/` 目录下管理。

## 文件结构

```
src/content/
├── copy.ts                    # UI 文案（导航、按钮、标题等）
├── products_multilingual.ts   # 产品数据（多语言）
└── services_multilingual.ts   # 服务数据（多语言）
```

## 内容类型

### 1. UI 文案 (`copy.ts`)

**位置**: `src/content/copy.ts`

**功能**: 存储所有界面文本，包括：
- 导航菜单
- 按钮文字
- 页面标题和副标题
- 表单标签
- 页脚文本
- 产品标签（Footprint, Height, Riders 等）

**使用方式**:
```typescript
import { copy } from "../content/copy";
import { useLanguage } from "../components/language";

const { lang } = useLanguage();
const c = copy(lang);
// 使用: c.nav.home, c.servicesTitle, c.productLabels.footprint 等
```

**支持语言**: 11 种语言（en, zh, ar, ru, ja, ko, th, vi, id, hi, es）

### 2. 产品数据 (`products_multilingual.ts`)

**位置**: `src/content/products_multilingual.ts`

**功能**: 存储所有产品信息，支持中英文双语

**数据结构**:
```typescript
type ProductMultilingual = {
  name: { en: string; zh: string };
  category: { en: string; zh: string };
  footprint: { en: string; zh: string };
  height: { en: string; zh: string };
  riders: string;
  status: "New" | "Used";
  year?: string;
  badge?: string;
  image?: string;
};
```

**使用方式**:
```typescript
import { getProducts } from "../content/copy";
import { useLanguage } from "../components/language";

const { lang } = useLanguage();
const products = getProducts(lang);
```

### 3. 服务数据 (`services_multilingual.ts`)

**位置**: `src/content/services_multilingual.ts`

**功能**: 存储所有服务信息，支持中英文双语

**数据结构**:
```typescript
type ServiceMultilingual = {
  title: { en: string; zh: string };
  desc: { en: string; zh: string };
};
```

**使用方式**:
```typescript
import { getServices } from "../content/copy";
import { useLanguage } from "../components/language";

const { lang } = useLanguage();
const services = getServices(lang);
```

## 内容更新流程

### 更新产品数据

1. 编辑 `src/content/products_multilingual.ts`
2. 在 `productsMultilingual` 数组中添加或修改产品
3. 确保每个产品都有 `en` 和 `zh` 字段

### 更新服务数据

1. 编辑 `src/content/services_multilingual.ts`
2. 在 `servicesMultilingual` 数组中添加或修改服务
3. 确保每个服务都有 `en` 和 `zh` 字段

### 更新 UI 文案

1. 编辑 `src/content/copy.ts`
2. 在对应的语言块中添加或修改字段
3. 确保所有语言块都包含相同的字段结构

## 多语言支持

### 当前支持的语言

- **en**: 英语（默认）
- **zh**: 中文
- **ar**: 阿拉伯语
- **ru**: 俄语
- **ja**: 日语
- **ko**: 韩语
- **th**: 泰语
- **vi**: 越南语
- **id**: 印尼语
- **hi**: 印地语
- **es**: 西班牙语

### 添加新语言

1. 在 `copy.ts` 的 `copy()` 函数中添加新的语言块
2. 确保包含所有必需的字段（参考英语块的结构）
3. 对于产品和服务，目前仅支持中英文，如需添加其他语言，需要扩展 `ProductMultilingual` 和 `ServiceMultilingual` 类型

## 最佳实践

1. **不要硬编码文本**: 所有文本都应该从 `copy.ts` 获取
2. **保持一致性**: 确保所有语言块包含相同的字段
3. **使用类型安全**: 利用 TypeScript 类型检查确保字段存在
4. **向后兼容**: 使用默认值（`||` 操作符）处理缺失的字段
5. **集中管理**: 所有内容修改都在 `src/content/` 目录下进行

## 示例

### 在组件中使用内容

```typescript
"use client";

import { copy, getProducts, getServices } from "../content/copy";
import { useLanguage } from "../components/language";

export default function MyComponent() {
  const { lang } = useLanguage();
  const c = copy(lang);
  const products = getProducts(lang);
  const services = getServices(lang);

  return (
    <div>
      <h1>{c.servicesTitle}</h1>
      <p>{c.servicesSubtitle}</p>
      {services.map(service => (
        <div key={service.title}>
          <h3>{service.title}</h3>
          <p>{service.desc}</p>
        </div>
      ))}
    </div>
  );
}
```

## 优势

1. ✅ **集中管理**: 所有内容在一个地方，易于维护
2. ✅ **类型安全**: TypeScript 确保类型正确
3. ✅ **多语言支持**: 轻松切换语言
4. ✅ **组件复用**: 组件逻辑与内容分离
5. ✅ **易于扩展**: 添加新内容或语言很简单




