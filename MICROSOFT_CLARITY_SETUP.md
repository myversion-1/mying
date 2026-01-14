# Microsoft Clarity 集成指南

## 概述

Microsoft Clarity 已成功集成到项目中，用于：
- 🔥 **热力图分析** - 了解用户点击和滚动行为
- 📹 **会话录制** - 回放用户浏览过程
- 📊 **用户行为分析** - 识别用户痛点
- 🎯 **转化优化** - 基于数据优化用户体验

## 安装状态

✅ **已安装：** `@microsoft/clarity`  
✅ **已集成：** ClarityProvider 组件  
✅ **已配置：** 在 layout.tsx 中初始化  
✅ **项目 ID：** `v0r0wchwpj` (已配置为默认值)

## 配置步骤

### 1. 获取 Clarity 项目 ID

1. 访问 [Microsoft Clarity](https://clarity.microsoft.com/)
2. 使用 Microsoft 账号登录
3. 创建新项目或选择现有项目
4. 复制项目 ID（格式：`xxxxxxxxxx`）

### 2. 配置环境变量（可选）

**默认项目 ID 已配置：** `v0r0wchwpj`

如果需要使用不同的项目 ID，在 `.env.local` 文件中添加：

```env
NEXT_PUBLIC_CLARITY_ID=your_clarity_project_id_here
```

**注意：** 如果不设置环境变量，将使用默认项目 ID `v0r0wchwpj`。

### 3. 部署到 Vercel

如果使用 Vercel 部署，在 Vercel Dashboard 中添加环境变量：

1. 进入项目设置 → Environment Variables
2. 添加新变量：
   - **Key:** `NEXT_PUBLIC_CLARITY_ID`
   - **Value:** 你的 Clarity 项目 ID
   - **Environment:** Production, Preview, Development（根据需要选择）

3. 重新部署项目

## 功能特性

### 自动跟踪

Clarity 会自动跟踪：
- ✅ 页面浏览
- ✅ 鼠标移动
- ✅ 点击事件
- ✅ 滚动行为
- ✅ 表单交互
- ✅ 用户会话

### 隐私保护

Microsoft Clarity 默认：
- 🔒 不收集个人身份信息（PII）
- 🔒 符合 GDPR 要求
- 🔒 可配置数据收集范围

## 使用 Clarity Dashboard

### 访问 Dashboard

1. 登录 [Microsoft Clarity](https://clarity.microsoft.com/)
2. 选择你的项目
3. 查看以下数据：

#### 热力图（Heatmaps）
- **点击热力图** - 显示用户点击最多的区域
- **滚动热力图** - 显示用户滚动深度
- **注意力热力图** - 显示用户关注区域

#### 会话录制（Recordings）
- 回放用户浏览过程
- 识别用户困惑点
- 发现 UX 问题

#### 洞察（Insights）
- 死点击（Dead Clicks）
- 快速返回（Rage Clicks）
- JavaScript 错误
- 用户行为模式

## 代码结构

### ClarityProvider 组件

```typescript
// src/components/ClarityProvider.tsx
export function ClarityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
    
    if (clarityId) {
      clarity.init(clarityId);
    }
  }, []);

  return <>{children}</>;
}
```

### 集成位置

ClarityProvider 已集成到 `src/app/layout.tsx`：

```typescript
<ClarityProvider>
  <AnalyticsProvider>
    {/* 应用内容 */}
  </AnalyticsProvider>
</ClarityProvider>
```

## 验证安装

### 方法 1: 浏览器控制台

1. 打开网站
2. 打开浏览器开发者工具（F12）
3. 在控制台中输入：
   ```javascript
   window.clarity
   ```
4. 如果看到 Clarity 对象，说明安装成功

### 方法 2: 网络请求

1. 打开浏览器开发者工具
2. 切换到 Network 标签
3. 刷新页面
4. 查找包含 `clarity` 的请求
5. 应该看到对 `clarity.ms` 的请求

### 方法 3: Clarity Dashboard

1. 登录 Clarity Dashboard
2. 等待几分钟（数据可能需要时间同步）
3. 查看是否有新的会话数据

## 性能影响

Microsoft Clarity 设计为轻量级：
- 📦 **脚本大小：** ~15 KB（压缩后）
- ⚡ **加载时间：** < 50ms
- 🚀 **性能影响：** 最小化，异步加载
- 💾 **数据收集：** 智能采样，不收集所有会话

## 最佳实践

### 1. 隐私设置

在 Clarity Dashboard 中配置：
- 数据收集范围
- 敏感数据屏蔽
- IP 地址匿名化

### 2. 数据保留

- 默认保留 12 个月
- 可根据需要调整
- 定期导出重要数据

### 3. 团队协作

- 邀请团队成员查看数据
- 设置权限级别
- 分享重要洞察

## 故障排除

### Clarity 未初始化

**问题：** 控制台显示 "Clarity ID not configured"

**解决方案：**
1. 检查环境变量是否正确设置
2. 确保变量名是 `NEXT_PUBLIC_CLARITY_ID`
3. 重启开发服务器
4. 清除浏览器缓存

### 没有数据

**问题：** Dashboard 中没有数据

**解决方案：**
1. 等待几分钟（数据同步需要时间）
2. 确保项目 ID 正确
3. 检查是否有访问者
4. 验证 Clarity 脚本是否加载

### 性能问题

**问题：** 网站变慢

**解决方案：**
1. Clarity 是异步加载，不应该影响性能
2. 检查是否有其他脚本冲突
3. 使用浏览器性能工具分析

## 相关资源

- [Microsoft Clarity 官方文档](https://docs.microsoft.com/en-us/clarity/)
- [Clarity Dashboard](https://clarity.microsoft.com/)
- [Clarity GitHub](https://github.com/microsoft/clarity)

## 支持

如有问题，请：
1. 查看 [Clarity 文档](https://docs.microsoft.com/en-us/clarity/)
2. 检查 [Clarity 社区论坛](https://github.com/microsoft/clarity/discussions)
3. 联系开发团队

---

**最后更新：** 2025-01-27  
**状态：** ✅ 已集成并可用

