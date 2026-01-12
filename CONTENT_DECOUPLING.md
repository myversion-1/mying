# 内容解耦说明

## 概述

内容管理系统已从单一的大文件 (`copy.ts`) 解耦为独立的多语言文件结构，提高了可维护性和可扩展性。

## 新结构

```
src/content/
├── types.ts                    # 内容类型定义
├── copy.ts                     # 主入口（向后兼容）
├── locales/                    # 多语言文件目录
│   ├── index.ts               # 统一导出和加载器
│   ├── en.ts                  # 英语 ✅
│   ├── zh.ts                  # 中文 ✅
│   ├── ar.ts                  # 阿拉伯语 ✅
│   ├── ru.ts                  # 俄语 ✅
│   ├── ja.ts                  # 日语 (待迁移)
│   ├── ko.ts                  # 韩语 (待迁移)
│   ├── th.ts                  # 泰语 (待迁移)
│   ├── vi.ts                  # 越南语 (待迁移)
│   ├── id.ts                  # 印尼语 (待迁移)
│   ├── hi.ts                  # 印地语 (待迁移)
│   └── es.ts                  # 西班牙语 (待迁移)
├── products_multilingual.ts   # 产品数据
└── services_multilingual.ts    # 服务数据
```

## 已完成迁移的语言

- ✅ 英语 (en)
- ✅ 中文 (zh)
- ✅ 阿拉伯语 (ar)
- ✅ 俄语 (ru)

## 待迁移的语言

以下语言仍使用 `copy.ts` 中的旧实现，将在后续逐步迁移：

- ⏳ 日语 (ja)
- ⏳ 韩语 (ko)
- ⏳ 泰语 (th)
- ⏳ 越南语 (vi)
- ⏳ 印尼语 (id)
- ⏳ 印地语 (hi)
- ⏳ 西班牙语 (es)

## 如何迁移剩余语言

### 步骤 1: 创建语言文件

在 `src/content/locales/` 目录下创建新的语言文件，例如 `ja.ts`:

```typescript
import type { CopyContent } from "./types";

export const ja: CopyContent = {
  nav: {
    home: "ホーム",
    about: "会社概要",
    // ... 其他字段
  },
  // ... 完整的内容对象
};
```

### 步骤 2: 更新 index.ts

在 `src/content/locales/index.ts` 中导入并添加新语言：

```typescript
import { ja } from "./ja";

const locales: Partial<Record<Lang, CopyContent>> = {
  en,
  zh,
  ar,
  ru,
  ja, // 添加新语言
  // ...
};
```

### 步骤 3: 测试

确保新语言文件正常工作，然后可以从 `copy.ts` 中移除对应的旧实现。

## 优势

1. **模块化**: 每种语言独立文件，易于管理
2. **类型安全**: 统一的类型定义确保内容结构一致
3. **易于维护**: 修改某种语言不影响其他语言
4. **向后兼容**: 旧代码继续工作，无需立即修改所有引用
5. **渐进式迁移**: 可以逐步迁移，不影响现有功能

## 使用方式

使用方式保持不变：

```typescript
import { copy } from "../content/copy";

const c = copy(lang);
// 使用 c.nav.home, c.hero.title 等
```

系统会自动选择新的解耦文件（如果存在）或回退到旧实现。

## 注意事项

- 所有语言文件必须符合 `CopyContent` 类型定义
- 确保所有必需字段都已包含
- 迁移完成后，可以从 `copy.ts` 中移除 `copyLegacy` 函数




















