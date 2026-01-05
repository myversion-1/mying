# 快速部署指南

## 🚀 一键部署到 Vercel

### 步骤 1: 登录 Vercel

在 PowerShell 中运行：

```powershell
cd "C:\Users\Administrator\Desktop\Miying Web\mying-web"
vercel login
```

这会打开浏览器，让你登录 Vercel 账户（如果没有账户，可以免费注册）。

### 步骤 2: 部署项目

**选项 A: 使用部署脚本（推荐）**
```powershell
.\deploy.ps1
```

**选项 B: 手动部署**
```powershell
# 预览部署（测试）
vercel

# 生产部署（正式上线）
vercel --prod
```

### 步骤 3: 配置环境变量

部署后，在 Vercel 网站中配置环境变量：

1. 访问 [vercel.com/dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 进入 Settings → Environment Variables
4. 添加以下变量：

**必需：**
- `NEXT_PUBLIC_SITE_URL` = `https://你的项目名.vercel.app`

**可选（用于联系表单）：**
- `CONTACT_EMAIL` = `miyingyoule@gmail.com`
- `WEBHOOK_URL` = （如果使用 Formspree）

### 步骤 4: 重新部署

配置环境变量后，在 Vercel 仪表板中点击 "Redeploy" 使变量生效。

## 📝 部署后检查

- [ ] 访问你的 Vercel URL 确认网站正常
- [ ] 检查首页的新标题和按钮
- [ ] 测试语言切换功能
- [ ] 测试 WhatsApp 按钮
- [ ] 测试联系表单（如果配置了邮件服务）

## 🔗 获取部署 URL

部署成功后，Vercel 会显示：
- **Preview URL**: 预览环境链接（每次推送代码都会更新）
- **Production URL**: 生产环境链接（使用 `vercel --prod` 部署）

## 💡 提示

- 首次部署可能需要 2-3 分钟
- 后续部署通常只需 30-60 秒
- 所有更改会自动触发重新部署（如果连接了 Git 仓库）








