# 本地代码维护指南

## 日常操作

### 1. 保持代码同步
```bash
# 拉取远程最新代码
git pull origin main

# 查看当前状态
git status
```

### 2. 清理构建文件（定期执行）
```bash
# 清理 Next.js 构建缓存
rm -rf .next
# Windows PowerShell:
Remove-Item -Recurse -Force .next

# 清理 node_modules（如果需要重新安装）
rm -rf node_modules
npm install
```

### 3. 更新依赖包（定期执行）
```bash
# 检查过时的包
npm outdated

# 更新所有包到最新版本（谨慎使用）
npm update

# 或者更新特定包
npm install package-name@latest
```

### 4. 验证项目状态
```bash
# 检查代码是否有错误
npm run build

# 运行开发服务器
npm run dev
```

## 文件管理

### 不需要提交到 Git 的文件
以下文件/文件夹已经在 `.gitignore` 中，不需要手动管理：
- `node_modules/` - 依赖包（运行 `npm install` 会自动生成）
- `.next/` - Next.js 构建缓存（运行 `npm run build` 或 `npm run dev` 会自动生成）
- `.env*` - 环境变量文件（包含敏感信息）
- `*.log` - 日志文件

### 可以安全删除的文件（如果需要清理空间）
- `.next/` - 构建缓存，可以随时删除，下次构建会重新生成
- `node_modules/` - 依赖包，可以删除，运行 `npm install` 会重新安装

### 重要文件（不要删除）
- `src/` - 源代码
- `public/` - 静态资源
- `package.json` - 项目配置
- `.git/` - Git 仓库信息
- 所有 `.ts`, `.tsx`, `.css` 等源代码文件

## 备份建议

### 1. Git 备份（推荐）
- 所有代码已经通过 Git 推送到 GitHub
- 定期执行 `git push` 确保远程备份是最新的

### 2. 本地备份（可选）
- 定期复制整个项目文件夹到其他位置
- 或者使用云同步服务（OneDrive、Dropbox 等）

## 常见问题

### Q: 如果本地代码和远程不一致怎么办？
```bash
# 查看差异
git diff origin/main

# 拉取并合并远程更改
git pull origin main

# 如果有冲突，解决冲突后：
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

### Q: 如何回退到之前的版本？
```bash
# 查看提交历史
git log --oneline

# 回退到特定提交（谨慎使用）
git reset --hard <commit-hash>

# 或者创建新分支来测试
git checkout -b test-branch <commit-hash>
```

### Q: 如何清理未跟踪的文件？
```bash
# 查看未跟踪的文件
git status

# 删除未跟踪的文件（谨慎使用）
git clean -fd
```

## 开发环境维护

### 定期检查
1. **依赖更新**：每月检查一次 `npm outdated`
2. **构建测试**：每次重要更改后运行 `npm run build`
3. **代码质量**：运行 `npm run lint`（如果有配置）

### 性能优化
- 定期清理 `.next` 文件夹
- 如果 `node_modules` 太大，可以删除后重新安装
- 使用 `npm ci` 而不是 `npm install` 来获得更可靠的安装

## 部署相关

### Vercel 自动部署
- 每次 `git push` 到 `main` 分支会自动触发部署
- 无需手动操作，Vercel 会自动构建和部署

### 本地测试部署
```bash
# 构建生产版本
npm run build

# 本地运行生产版本
npm start
```



