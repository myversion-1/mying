# 百度云 API Key 配置指南

## API Key 信息

已配置百度云（Baidu Cloud Engine）API Key，用于支持以下服务：

- **百度翻译 API**：支持 12 种语言的自动翻译
- **百度地图 API**：案例展示中的全球地图功能
- **百度云存储**：图片和资源存储服务

## API Key 格式

```
bce-v3/ALTAK-yuuMsh8AZCukZ1jQUyBG6/45bbc60643930bcd5304b3ae731a426817a02667
```

## 配置方法

### 方式 1: 本地开发环境（.env.local）

在项目根目录创建或编辑 `.env.local` 文件：

```bash
# 百度云 API Key
BAIDU_API_KEY=bce-v3/ALTAK-yuuMsh8AZCukZ1jQUyBG6/45bbc60643930bcd5304b3ae731a426817a02667
```

### 方式 2: Vercel 生产环境

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择项目：**Miying Web**
3. 进入 **Settings** → **Environment Variables**
4. 添加新变量：
   - **Name**: `BAIDU_API_KEY`
   - **Value**: `bce-v3/ALTAK-yuuMsh8AZCukZ1jQUyBG6/45bbc60643930bcd5304b3ae731a426817a02667`
   - **Environment**: 选择所有环境（Production, Preview, Development）
5. 点击 **Save**
6. **重要**：重新部署应用以使环境变量生效

### 方式 3: 使用 Vercel CLI

```bash
cd mying-web
vercel env add BAIDU_API_KEY
# 输入 API key: bce-v3/ALTAK-yuuMsh8AZCukZ1jQUyBG6/45bbc60643930bcd5304b3ae731a426817a02667
# 选择环境: Production, Preview, Development
```

## 验证配置

### 检查环境变量

在代码中检查 API key 是否已正确配置：

```typescript
import { hasEnv, getEnv } from '@/lib/env';

// 检查是否已配置
if (hasEnv('BAIDU_API_KEY')) {
  const apiKey = getEnv('BAIDU_API_KEY');
  console.log('✅ 百度云 API Key 已配置');
} else {
  console.warn('⚠️ 百度云 API Key 未配置');
}
```

### 测试 API 连接

创建测试脚本验证 API key 是否有效：

```typescript
// test-baidu-api.ts
async function testBaiduAPI() {
  const apiKey = process.env.BAIDU_API_KEY;
  if (!apiKey) {
    console.error('❌ BAIDU_API_KEY 未设置');
    return;
  }

  // 测试百度翻译 API
  try {
    const response = await fetch('https://fanyi-api.baidu.com/api/trans/vip/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: 'Hello',
        from: 'en',
        to: 'zh',
        appid: apiKey.split('/')[1], // 提取 App ID
        salt: Date.now(),
        sign: '', // 需要根据百度 API 文档生成签名
      }),
    });
    
    if (response.ok) {
      console.log('✅ 百度 API 连接成功');
    } else {
      console.error('❌ 百度 API 连接失败:', response.statusText);
    }
  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}
```

## 安全注意事项

### ⚠️ 重要安全提示

1. **不要提交 API Key 到 Git**
   - `.env.local` 文件已在 `.gitignore` 中
   - 确保 API key 不会出现在代码仓库中

2. **使用环境变量**
   - 永远不要在代码中硬编码 API key
   - 始终使用 `process.env.BAIDU_API_KEY` 访问

3. **限制 API Key 权限**
   - 在百度云控制台中设置最小权限
   - 定期轮换 API key

4. **监控使用情况**
   - 定期检查 API 使用量
   - 设置使用量告警

## 使用示例

### 在代码中使用

```typescript
// src/lib/baidu.ts
import { getEnv } from './env';

export function getBaiduAPIKey(): string {
  return getEnv('BAIDU_API_KEY', '');
}

export async function translateText(
  text: string,
  from: string = 'en',
  to: string = 'zh'
): Promise<string> {
  const apiKey = getBaiduAPIKey();
  if (!apiKey) {
    throw new Error('BAIDU_API_KEY is not configured');
  }

  // 实现翻译逻辑
  // ...
}
```

## 故障排除

### 问题 1: API Key 未生效

**解决方案**:
1. 确认环境变量已正确设置
2. 重启开发服务器：`npm run dev`
3. 在 Vercel 中重新部署应用

### 问题 2: API 调用失败

**可能原因**:
- API key 格式错误
- API key 已过期或被禁用
- 网络连接问题

**解决方案**:
1. 检查 API key 格式是否正确
2. 在百度云控制台验证 API key 状态
3. 检查网络连接和防火墙设置

### 问题 3: 环境变量在构建时未找到

**解决方案**:
1. 确保 `.env.local` 文件在项目根目录
2. 在 Vercel 中确认环境变量已添加到所有环境
3. 检查环境变量名称拼写是否正确

## 相关文档

- [百度云 API 文档](https://cloud.baidu.com/doc/index.html)
- [百度翻译 API 文档](https://fanyi-api.baidu.com/doc/21)
- [百度地图 API 文档](https://lbsyun.baidu.com/index.php?title=jspopularGL)

## 支持

如有问题，请联系：
- 技术团队：miyingyoule@gmail.com
- WhatsApp：+86-131-1295-9561

---

**配置日期**: 2025-01-27  
**状态**: ✅ 已配置















