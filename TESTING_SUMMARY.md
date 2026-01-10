# SmartSelector Component - Testing Summary

## 测试覆盖 (Test Coverage)

已为"场地-设备匹配器"（SmartSelector）组件及其相关工具函数编写了完整的 Jest 单元测试。

## 测试文件

### 1. 工具函数测试 (`product-dimensions.test.ts`)

**文件位置**: `src/utils/__tests__/product-dimensions.test.ts`

**测试覆盖**:

#### `parseHeight()` 函数
- ✅ 有效高度字符串解析（米制、中文、英尺）
- ✅ 带前缀文本的高度字符串
- ✅ 空值和 "N/A" 处理
- ✅ 无效格式处理
- ✅ null/undefined 处理

#### `parseFootprint()` 函数
- ✅ 直径格式解析 (`D12M*H5.9M`)
- ✅ 长宽高格式解析 (`L16M*W10.5M*H11M`)
- ✅ 乘号格式解析 (`12M x 8M`)
- ✅ 多维度格式解析
- ✅ 小数支持
- ✅ 空值和 "N/A" 处理
- ✅ 无效格式处理

#### `productFitsConstraints()` 函数
- ✅ 无约束情况（返回 true）
- ✅ 仅高度约束
- ✅ 仅占地面积约束
- ✅ 组合约束
- ✅ **边缘情况：零值约束**
- ✅ **边缘情况：负值约束**
- ✅ 无法解析的产品数据（保守策略）

### 2. 组件测试 (`SmartSelector.test.tsx`)

**文件位置**: `src/components/__tests__/SmartSelector.test.tsx`

**测试覆盖**:

#### 初始渲染
- ✅ 组件正确渲染
- ✅ 无过滤时显示所有产品

#### 过滤器展开/收起
- ✅ 展开过滤器
- ✅ 收起过滤器

#### 高度过滤
- ✅ 根据净高过滤产品
- ✅ **边缘情况：零值输入**
- ✅ **边缘情况：负值输入**

#### 占地面积过滤
- ✅ 根据可用面积过滤产品
- ✅ **边缘情况：零值输入**
- ✅ **边缘情况：负值输入**

#### 空状态处理
- ✅ **无匹配产品时的友好提示**
- ✅ 无匹配产品时不显示 ROI 计算器

#### 清除筛选
- ✅ 清除所有筛选条件

#### 多语言支持
- ✅ **英语环境下的数值格式化**
- ✅ **泰语环境下的数值格式化**
- ✅ 中文标签显示
- ✅ 英文标签显示

#### 组合过滤
- ✅ 同时应用高度和占地面积约束

## 边缘情况测试详情

### 1. 零值或负值输入处理

**测试场景**:
```typescript
// 零值约束
productFitsConstraints("5.9 m", "D12M", 0, null) → false

// 负值约束
productFitsConstraints("5.9 m", "D12M", -5, null) → false
```

**预期行为**:
- 零值约束：所有产品都不符合（高度/面积必须 > 0）
- 负值约束：所有产品都不符合（无效约束）

**测试状态**: ✅ 已通过

### 2. 无匹配产品时的友好提示

**测试场景**:
- 设置非常严格的约束（如 1 米净高）
- 过滤后没有产品符合条件

**预期行为**:
- 显示 "显示 0 / X 个产品"
- 不显示 ROI 计算器
- 提供"清除筛选"按钮

**测试状态**: ✅ 已通过

### 3. 多语言数值格式化

**测试场景**:
- 英语环境：输入 5.5 → 显示 "5.5 m"
- 泰语环境：输入 5.5 → 显示 "5.5 m"

**预期行为**:
- 使用 `toFixed(1)` 进行格式化（语言无关）
- 所有语言环境下数值显示一致
- 避免因语言环境导致的格式化差异（如逗号作为小数分隔符）

**测试状态**: ✅ 已通过

## 运行测试

### 运行所有测试

```bash
npm test
```

### 运行特定测试文件

```bash
# 工具函数测试
npm test -- product-dimensions.test.ts

# 组件测试
npm test -- SmartSelector.test.tsx
```

### 运行测试并查看覆盖率

```bash
npm run test:coverage
```

### 监视模式

```bash
npm run test:watch
```

## 测试数据

### Mock 产品数据

测试使用的模拟产品数据：

```typescript
const mockProducts: Product[] = [
  {
    name: "Small Ride",
    footprint: "D8M*H4M",    // 最大尺寸: 8m
    height: "4 m",           // 高度: 4m
    riders: "12",
    // ...
  },
  {
    name: "Medium Ride",
    footprint: "D12M*H5.9M", // 最大尺寸: 12m
    height: "5.9 m",         // 高度: 5.9m
    riders: "24",
    // ...
  },
  {
    name: "Large Ride",
    footprint: "L16M*W10.5M*H11M", // 最大尺寸: 16m
    height: "11 m",                 // 高度: 11m
    riders: "36",
    // ...
  },
];
```

## Mock 配置

### useLanguage Hook

```typescript
jest.mock("../language", () => ({
  useLanguage: jest.fn(),
}));
```

### Framer Motion

```typescript
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));
```

### ROICalculator

```typescript
jest.mock("../ROICalculator", () => ({
  ROICalculator: () => <div data-testid="roi-calculator">ROI Calculator</div>,
}));
```

## 测试统计

### 工具函数测试
- **测试套件**: 3 个 (`parseHeight`, `parseFootprint`, `productFitsConstraints`)
- **测试用例**: 30+ 个
- **边缘情况**: 10+ 个

### 组件测试
- **测试套件**: 7 个
- **测试用例**: 15+ 个
- **边缘情况**: 5+ 个

## 已知限制

1. **UI 交互测试**: 部分测试使用 DOM 查询，可能在某些情况下不够稳定
2. **动画测试**: Framer Motion 动画已 mock，不测试实际动画效果
3. **语言切换**: 测试中 mock 了 `useLanguage`，不测试实际的语言切换逻辑

## 未来改进

1. **集成测试**: 添加端到端测试，测试完整的用户流程
2. **性能测试**: 测试大量产品数据下的过滤性能
3. **可访问性测试**: 添加可访问性相关的测试
4. **视觉回归测试**: 使用视觉回归测试工具

---

**测试编写日期**: 2025-01-27  
**测试框架**: Jest + React Testing Library  
**覆盖率目标**: > 80%






