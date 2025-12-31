# 部署指南

## 快速部署到 Vercel

### 方法 1: 使用 Vercel CLI（推荐）

1. **登录 Vercel**（如果还没有登录）：
   ```bash
   cd mying-web
   vercel login
   ```

2. **部署项目**：
   ```bash
   vercel
   ```
   
   首次部署会提示：
   - 是否链接到现有项目？选择 `N`（新建项目）
   - 项目名称：输入 `mying-web` 或使用默认名称
   - 项目目录：确认是 `./mying-web` 或 `.`
   - 是否覆盖设置：选择 `N`

3. **部署到生产环境**：
   ```bash
   vercel --prod
   ```

### 方法 2: 通过 Vercel 网站

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub/GitLab/Bitbucket 登录
3. 点击 "Add New Project"
4. 导入你的 Git 仓库
5. Vercel 会自动检测 Next.js 项目并配置

### 环境变量配置

在 Vercel 项目设置中（Settings → Environment Variables）添加：

**必需变量：**
- `NEXT_PUBLIC_SITE_URL`: 你的生产环境 URL（例如：`https://mying.vercel.app`）

**可选变量（用于联系表单）：**
- `CONTACT_EMAIL`: 接收表单提交的邮箱地址
- `WEBHOOK_URL`: 如果使用 Formspree 或 webhook.site
- `RESEND_API_KEY`: 如果使用 Resend 邮件服务
- `GMAIL_USER` 和 `GMAIL_APP_PASSWORD`: 如果使用 Gmail SMTP
- `SENDGRID_API_KEY`: 如果使用 SendGrid

**其他变量：**
- `NEXT_PUBLIC_VERIFICATION_CODE`: 工厂参观验证码（默认：VISIT2025）

### 部署后检查清单

- [ ] 网站可以正常访问
- [ ] 首页显示新的标题和 CTA 按钮
- [ ] 所有页面正常加载
- [ ] 语言切换功能正常
- [ ] 联系表单可以提交（如果配置了邮件服务）
- [ ] WhatsApp 按钮链接正确
- [ ] 响应式设计在移动设备上正常显示

## 其他部署选项

### Netlify

1. 访问 [netlify.com](https://netlify.com)
2. 拖拽 `mying-web` 文件夹到 Netlify
3. 或连接 Git 仓库自动部署

**构建设置：**
- Build command: `npm run build`
- Publish directory: `.next`

### 自托管

如果需要自托管：

```bash
# 构建项目
npm run build

# 启动生产服务器
npm run start
```

需要配置：
- Node.js 服务器（推荐使用 PM2）
- 反向代理（Nginx 或 Apache）
- SSL 证书（Let's Encrypt）

## 故障排除

### 构建失败
- 检查 Node.js 版本（需要 18+）
- 确保所有依赖已安装：`npm install`
- 检查 TypeScript 错误：`npm run lint`

### 环境变量未生效
- 确保在 Vercel 中设置了环境变量
- 重新部署项目
- 检查变量名是否正确（区分大小写）

### 图片不显示
- 确保图片在 `public` 文件夹中
- 检查图片路径是否正确
- 清除浏览器缓存


