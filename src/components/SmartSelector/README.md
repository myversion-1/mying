# SmartSelector Component - 场地-设备匹配器

## 概述 (Overview)

`SmartSelector` 是一个智能产品选型工具组件，允许用户根据场地空间约束（净高和可用面积）实时过滤产品列表。该组件实现了"场地-设备匹配"的核心逻辑，帮助用户快速找到符合其场地条件的产品。

## 组件位置

```
src/components/SmartSelector.tsx
```

## 数据接口格式 (Data Interface)

### Props 接口

```typescript
interface SmartSelectorProps {
  products: Product[];
  onFilteredProductsChange?: (filtered: Product[]) => void;
}
```

### Product 类型定义

```typescript
type Product = {
  name: string;                    // 产品名称
  category: string;                 // 产品类别
  footprint: string;                // 占地面积（字符串格式）
  height: string;                   // 高度（字符串格式）
  riders: string;                   // 载客量
  status: "New" | "Used";          // 产品状态
  year?: string;                    // 生产年份（可选）
  badge?: string;                  // 徽章标签（可选）
  image?: string;                  // 图片路径（可选）
  // ... 其他可选字段
};
```

## 产品属性映射逻辑 (Product Property Mapping)

### 1. 高度属性 (Height Property)

**字段**: `product.height`

**支持的格式**:
- `"5.9 m"` - 标准米制格式（带空格）
- `"11米"` - 中文格式
- `"12M"` - 紧凑格式
- `"15 ft"` - 英尺格式（自动转换为米）
- `"高度: 5.9 m"` - 带前缀文本

**解析逻辑**:
```typescript
parseHeight(heightStr: string): number | null
```

**处理流程**:
1. 检查空值或 "N/A" → 返回 `null`
2. 移除常见前缀（"高度"、"Height"、"H"等）
3. 提取数字（支持小数）
4. 检测单位（"ft" 或 "feet"）→ 转换为米（× 0.3048）
5. 返回数值（米）或 `null`

**示例映射**:
```
"5.9 m"     → 5.9
"11米"      → 11
"15 ft"     → 4.572 (15 × 0.3048)
"N/A"       → null
"invalid"   → null
```

### 2. 占地面积属性 (Footprint Property)

**字段**: `product.footprint`

**支持的格式**:
- `"D12M*H5.9M"` - 直径格式
- `"L16M*W10.5M*H11M"` - 长宽高格式
- `"12M x 8M"` - 乘号格式
- `"20M x 15M x 10M"` - 多维度格式

**解析逻辑**:
```typescript
parseFootprint(footprintStr: string): number | null
```

**处理流程**:
1. 检查空值或 "N/A" → 返回 `null`
2. 提取所有数字（支持小数）
3. 找出最大尺寸（length, width, diameter 中的最大值）
4. 返回最大尺寸（米）或 `null`

**示例映射**:
```
"D12M*H5.9M"           → 12 (直径最大)
"L16M*W10.5M*H11M"    → 16 (长度最大)
"12M x 8M"            → 12 (第一个值最大)
"8M x 12M"            → 12 (第二个值最大)
"N/A"                 → null
```

### 3. 约束匹配逻辑 (Constraint Matching)

**函数**: `productFitsConstraints()`

**参数**:
```typescript
productFitsConstraints(
  productHeight: string,      // 产品高度字符串
  productFootprint: string,   // 产品占地面积字符串
  maxCeilingHeight: number | null,  // 最大净高约束（米）
  maxFootprint: number | null       // 最大占地面积约束（米）
): boolean
```

**匹配规则**:
1. **无约束**: 如果两个约束都为 `null`，返回 `true`
2. **高度约束**: 
   - 解析产品高度
   - 如果无法解析 → 返回 `false`（保守策略）
   - 如果产品高度 > 最大净高 → 返回 `false`
   - 否则继续检查
3. **占地面积约束**:
   - 解析产品占地面积
   - 如果无法解析 → 返回 `false`（保守策略）
   - 如果产品占地面积 > 最大占地面积 → 返回 `false`
   - 否则继续检查
4. **组合约束**: 必须同时满足高度和占地面积约束

**边缘情况处理**:
- **零值约束**: `maxCeilingHeight = 0` 或 `maxFootprint = 0` → 所有产品都不符合
- **负值约束**: `maxCeilingHeight < 0` 或 `maxFootprint < 0` → 所有产品都不符合
- **无法解析**: 如果产品高度或占地面积无法解析 → 保守策略，排除该产品

## 组件状态管理

### 内部状态

```typescript
const [ceilingHeight, setCeilingHeight] = useState<number | null>(null);
const [footprint, setFootprint] = useState<number | null>(null);
const [isExpanded, setIsExpanded] = useState(false);
```

### 过滤逻辑

```typescript
const filteredProducts = useMemo(() => {
  if (ceilingHeight === null && footprint === null) {
    return products; // 无约束时返回所有产品
  }

  return products.filter((product) =>
    productFitsConstraints(
      product.height,
      product.footprint,
      ceilingHeight,
      footprint
    )
  );
}, [products, ceilingHeight, footprint]);
```

## 输入验证

### 净高输入 (Ceiling Height)

- **范围**: 2-20 米
- **步进**: 0.1 米
- **默认值**: 5 米（滑块）
- **验证**: HTML5 `min="2" max="20"` 约束

### 可用面积输入 (Footprint)

- **范围**: 3-30 米
- **步进**: 0.1 米
- **默认值**: 10 米（滑块）
- **验证**: HTML5 `min="3" max="30"` 约束

## 边缘情况处理

### 1. 零值或负值输入

**场景**: 用户输入 0 或负数

**处理**:
- 组件允许输入（HTML5 输入框限制）
- `productFitsConstraints()` 函数会正确处理：
  - 零值 → 所有产品都不符合（高度/面积必须 > 0）
  - 负值 → 所有产品都不符合（无效约束）

**测试覆盖**: ✅ 已包含在单元测试中

### 2. 无匹配产品

**场景**: 过滤后没有产品符合条件

**处理**:
- 显示过滤状态: "显示 0 / X 个产品"
- 不显示 ROI 计算器（需要至少一个产品）
- 提供"清除筛选"按钮

**测试覆盖**: ✅ 已包含在单元测试中

### 3. 无法解析的产品数据

**场景**: 产品高度或占地面积格式无法解析

**处理**:
- `parseHeight()` 或 `parseFootprint()` 返回 `null`
- `productFitsConstraints()` 采用保守策略，返回 `false`
- 该产品会被排除在过滤结果之外

**测试覆盖**: ✅ 已包含在单元测试中

## 多语言支持

### 支持的 12 种语言

1. `en` - 英语 (English)
2. `zh` - 中文 (Chinese)
3. `ar` - 阿拉伯语 (Arabic)
4. `ru` - 俄语 (Russian)
5. `ja` - 日语 (Japanese)
6. `ko` - 韩语 (Korean)
7. `th` - 泰语 (Thai)
8. `vi` - 越南语 (Vietnamese)
9. `id` - 印尼语 (Indonesian)
10. `hi` - 印地语 (Hindi)
11. `es` - 西班牙语 (Spanish)
12. `fr` - 法语 (French)

### 数值格式化

**实现**: 使用 `toFixed(1)` 进行数值格式化

**原因**: 
- `toFixed()` 是语言无关的，始终使用点号作为小数分隔符
- 确保在所有语言环境下数值显示一致
- 避免因语言环境导致的格式化差异

**示例**:
```typescript
ceilingHeight.toFixed(1) // "5.5" (所有语言)
```

### 测试覆盖

✅ **英语环境**: 数值格式化测试通过  
✅ **泰语环境**: 数值格式化测试通过  
✅ **所有语言**: 标签文本正确显示

## 使用示例

### 基本使用

```tsx
import { SmartSelector } from "@/components/SmartSelector";
import { getProducts } from "@/content/copy";

function ProductsPage() {
  const products = getProducts("en");
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <div>
      <SmartSelector
        products={products}
        onFilteredProductsChange={setFilteredProducts}
      />
      <ProductGrid items={filteredProducts} />
    </div>
  );
}
```

### 处理过滤结果

```tsx
const handleFilteredProductsChange = (filtered: Product[]) => {
  console.log(`Filtered products: ${filtered.length}`);
  // 更新产品列表显示
  setDisplayedProducts(filtered);
};
```

## 依赖组件

- `ROICalculator`: ROI 预估计算器（当有过滤结果时显示）
- `useLanguage`: 语言切换 Hook
- `productFitsConstraints`: 产品约束匹配函数（来自 `utils/product-dimensions.ts`）

## 性能优化

1. **useMemo**: 过滤计算使用 `useMemo` 缓存结果
2. **useEffect**: 过滤结果变化时通知父组件
3. **条件渲染**: ROI 计算器仅在需要时渲染

## 测试文件

- **单元测试**: `src/utils/__tests__/product-dimensions.test.ts`
- **组件测试**: `src/components/__tests__/SmartSelector.test.tsx`

## 维护指南

### 添加新的产品格式支持

1. 更新 `parseHeight()` 或 `parseFootprint()` 函数
2. 添加相应的单元测试
3. 更新本文档的"支持的格式"部分

### 修改约束逻辑

1. 更新 `productFitsConstraints()` 函数
2. 确保边缘情况测试通过
3. 更新本文档的"约束匹配逻辑"部分

### 添加新语言

1. 在 `src/content/locales/` 中添加翻译文件
2. 更新 `useLanguage` Hook 支持
3. 测试组件在新语言下的显示

## 常见问题 (FAQ)

### Q: 为什么无法解析的产品会被排除？

**A**: 采用保守策略，确保用户只看到确定符合条件的产品。如果无法确定产品尺寸，为了安全起见，将其排除。

### Q: 如何处理产品数据格式不一致？

**A**: 解析函数支持多种格式，但如果遇到无法解析的格式，该产品会被排除。建议统一产品数据格式。

### Q: 零值或负值约束的处理是否合理？

**A**: 是的。零值或负值表示无效约束，所有产品都不符合是合理的。用户应该输入有效的正数值。

### Q: 为什么使用 `toFixed(1)` 而不是 `toLocaleString()`？

**A**: `toFixed(1)` 是语言无关的，确保在所有语言环境下数值显示一致。`toLocaleString()` 会根据语言环境改变格式（如使用逗号作为小数分隔符），可能导致不一致。

---

**最后更新**: 2025-01-27  
**维护者**: Miying Web Team  
**版本**: 1.0.0
