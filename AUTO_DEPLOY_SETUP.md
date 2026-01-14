# 自动部署设置指南

## 当前状态

代码已推送到 GitHub: `git@github.com:myversion-1/mying.git`

## 自动部署选项

### 选项 1: Vercel 自动部署（推荐）

如果项目已连接到 Vercel，推送代码到 GitHub 会自动触发部署。

#### 检查是否已连接 Vercel

1. 访问 [vercel.com/dashboard](https://vercel.com/dashboard)
2. 查看是否有名为 `mying` 或 `mying-web` 的项目
3. 如果项目存在，检查是否连接到 GitHub 仓库

#### 如果未连接，设置自动部署：

1. **登录 Vercel**
   ```bash
   cd mying-web
   vercel login
   ```

2. **连接项目到 Vercel**
   ```bash
   vercel link
   ```
   这会提示你：
   - 选择现有项目或创建新项目
   - 确认项目设置

3. **部署到生产环境**
   ```bash
   vercel --prod
   ```

4. **启用自动部署**
   - 在 Vercel 仪表板中，进入项目设置
   - 确保 "Git Integration" 已启用
   - 连接到你的 GitHub 仓库
   - 之后每次推送到 `main` 分支都会自动部署

### 选项 2: 使用 GitHub Actions

如果需要使用 GitHub Actions 自动部署，可以创建以下工作流：

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 选项 3: 手动部署（临时方案）

如果需要立即部署而不设置自动部署：

```bash
cd mying-web
vercel login
vercel --prod
```

## 当前代码状态

✅ 代码已推送到 GitHub
✅ 所有更改已提交
✅ 准备部署

## 下一步

1. **如果 Vercel 已连接 GitHub**：
   - 部署应该已经自动开始
   - 访问 Vercel 仪表板查看部署状态

2. **如果未连接**：
   - 按照上面的步骤连接 Vercel
   - 或使用 `vercel --prod` 手动部署

## 部署后检查

部署完成后，检查：
- [ ] 网站可以正常访问
- [ ] 产品页显示新的决策型内容
- [ ] 英文界面不显示中文产品名
- [ ] 所有功能正常工作






















