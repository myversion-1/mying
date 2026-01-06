# 管理员身份验证设置指南 (Admin Authentication Setup)

## 概述

管理员面板现在已添加密码保护。所有 SEO tracker API 路由和管理员页面都需要身份验证才能访问。

## 设置步骤

### 1. 设置环境变量

在 Vercel 中设置 `ADMIN_PASSWORD` 环境变量：

1. 前往 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 进入 **Settings** → **Environment Variables**
4. 添加新变量：
   - **Key**: `ADMIN_PASSWORD`
   - **Value**: 设置一个强密码（建议使用随机字符串）
   - **Environment**: 选择所有环境（Production, Preview, Development）
5. 点击 **Save**

### 2. 生成安全密码

你可以使用以下方法生成安全密码：

**方法 1: 使用 Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**方法 2: 使用 OpenSSL**
```bash
openssl rand -hex 32
```

**方法 3: 使用在线生成器**
- 访问: https://randomkeygen.com/
- 使用 "CodeIgniter Encryption Keys" 或类似选项

### 3. 重新部署

设置环境变量后，需要重新部署：

1. 前往 **Deployments** 标签
2. 点击最新部署的 **⋯** 菜单
3. 选择 **Redeploy**
4. 或者推送新的 commit 触发自动部署

## 使用方法

### 访问管理员面板

1. 访问 `/admin/seo-tracker`
2. 系统会显示登录界面
3. 输入你设置的 `ADMIN_PASSWORD`
4. 点击 **Login**

### 自动登录

- 密码会保存在浏览器的 localStorage 中
- 下次访问时会自动验证
- 如果密码在服务器端更改，需要重新登录

### 登出

- 点击页面顶部的 **Logout** 按钮
- 或者清除浏览器的 localStorage

## 安全说明

### 开发环境

- 如果未设置 `ADMIN_PASSWORD`，开发环境会自动允许访问
- 生产环境必须设置密码，否则会拒绝所有访问

### 密码安全

- **不要**将密码提交到 Git 仓库
- **不要**在代码中硬编码密码
- 定期更换密码
- 使用强密码（至少 32 个字符）

### API 路由保护

所有以下 API 路由现在都需要身份验证：

- `GET /api/seo-tracker/backlinks`
- `POST /api/seo-tracker/backlinks`
- `PUT /api/seo-tracker/backlinks`
- `DELETE /api/seo-tracker/backlinks`
- `POST /api/seo-tracker/check`
- `GET /api/seo-tracker/product-urls`

### 身份验证方式

API 请求需要在 `Authorization` header 中包含密码：

```
Authorization: Bearer YOUR_ADMIN_PASSWORD
```

## 故障排除

### 无法登录

1. **检查环境变量**：
   - 确认 `ADMIN_PASSWORD` 已在 Vercel 中设置
   - 确认已重新部署应用

2. **检查密码**：
   - 确认输入的密码与 Vercel 中的完全一致
   - 注意大小写和特殊字符

3. **清除缓存**：
   - 清除浏览器 localStorage
   - 尝试使用无痕模式

### API 返回 401 错误

- 确认请求中包含 `Authorization: Bearer <password>` header
- 确认密码正确
- 确认环境变量已设置并已重新部署

### 开发环境无法访问

如果开发环境中无法访问：

1. 检查 `.env.local` 文件（如果使用）
2. 或者设置 `ADMIN_PASSWORD` 环境变量
3. 或者依赖开发模式的自动允许（不推荐用于生产）

## 技术实现

### 身份验证流程

1. **客户端**：用户输入密码
2. **验证**：发送到 `/api/admin/auth/verify` 验证
3. **存储**：验证成功后，密码存储在 localStorage
4. **后续请求**：所有 API 请求自动包含 `Authorization` header
5. **服务器验证**：每个 API 路由验证 `Authorization` header

### 文件结构

- `src/lib/auth.ts` - 身份验证工具函数
- `src/components/AdminAuth.tsx` - 登录界面组件
- `src/app/api/admin/auth/verify/route.ts` - 密码验证 API
- `src/app/api/seo-tracker/*` - 受保护的 API 路由

## 升级建议

对于更高级的需求，可以考虑：

1. **多用户支持**：使用数据库存储用户账户
2. **会话管理**：使用 JWT tokens 替代密码
3. **角色权限**：不同用户不同权限级别
4. **审计日志**：记录所有管理员操作

但对于当前需求，简单的密码保护已经足够。




