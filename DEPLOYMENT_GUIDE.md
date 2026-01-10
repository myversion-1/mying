# Deployment Guide - Miying Web

## 构建状态

✅ **构建成功** - 所有代码已通过构建检查

## 部署方式

### 方式 1: Vercel 自动部署（推荐）

如果项目已连接到 Vercel，推送代码到 Git 仓库后会自动触发部署。

#### 步骤：

1. **提交所有更改到 Git**:
   ```bash
   git add .
   git commit -m "feat: Add mobile usability improvements, tests, and documentation"
   git push origin main
   ```

2. **Vercel 会自动检测并部署**
   - 访问 Vercel Dashboard 查看部署状态
   - 部署完成后，网站会自动更新

### 方式 2: Vercel CLI 手动部署

1. **安装 Vercel CLI**（如果尚未安装）:
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**:
   ```bash
   vercel login
   ```

3. **部署到生产环境**:
   ```bash
   cd mying-web
   vercel --prod
   ```

### 方式 3: 通过 Vercel Dashboard

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择项目
3. 点击 "Deployments" 标签
4. 点击 "Redeploy" 按钮
5. 选择最新的提交并确认部署

## 环境变量配置

### 必需的环境变量

在 Vercel Dashboard → Settings → Environment Variables 中设置：

```
NEXT_PUBLIC_SITE_URL=https://mying.vercel.app
CONTACT_EMAIL=miyingyoule@gmail.com
```

### 可选的环境变量

```
BAIDU_API_KEY=bce-v3/ALTAK-yuuMsh8AZCukZ1jQUyBG6/45bbc60643930bcd5304b3ae731a426817a02667
ADMIN_PASSWORD=your-admin-password
RESEND_API_KEY=your-resend-key
SENDGRID_API_KEY=your-sendgrid-key
```

**注意**: 百度云 API Key 已配置，用于支持翻译和地图服务。详细配置说明请参考 `BAIDU_API_SETUP.md`。

## 部署前检查清单

- [x] ✅ 代码构建成功（`npm run build`）
- [x] ✅ 所有 TypeScript 类型检查通过
- [x] ✅ 所有测试通过（如果适用）
- [x] ✅ 环境变量已配置
- [x] ✅ 代码已提交到 Git 仓库

## 本次部署包含的功能

### 1. 移动端可用性优化
- ✅ 触摸目标优化（44×44 像素）
- ✅ 移动端粘性导航条
- ✅ 装饰性图像隐藏
- ✅ 技术参数表移动端优化
- ✅ 多语言字体渲染优化

### 2. 测试和文档
- ✅ SmartSelector 组件单元测试
- ✅ 产品尺寸解析工具测试
- ✅ 完整的 README 文档

### 3. 代码修复
- ✅ Footer 组件语法错误修复
- ✅ Cases 页面类型错误修复

## 部署后验证

部署完成后，请验证以下功能：

### 移动端测试
1. [ ] 触摸目标大小符合 44×44 像素标准
2. [ ] 移动端粘性导航条正常显示
3. [ ] 技术参数表在移动端无横向滚动
4. [ ] 所有语言字体渲染正常

### 功能测试
1. [ ] 智能选型工具正常工作
2. [ ] 产品过滤功能正常
3. [ ] 案例展示页面正常
4. [ ] 所有 CTA 按钮正常

### 性能测试
1. [ ] 页面加载速度正常
2. [ ] Lighthouse 评分符合预期
3. [ ] 移动端性能优化生效

## 回滚步骤

如果部署后出现问题，可以快速回滚：

1. 访问 Vercel Dashboard
2. 进入项目的 "Deployments" 页面
3. 找到之前的成功部署
4. 点击 "..." 菜单 → "Promote to Production"

## 监控和日志

### 查看部署日志
- Vercel Dashboard → Deployments → 选择部署 → "View Function Logs"

### 性能监控
- 使用 Lighthouse 测试工具
- 查看 Vercel Analytics（如果已启用）

## 故障排除

### 构建失败
1. 检查环境变量是否配置正确
2. 查看构建日志中的错误信息
3. 确保所有依赖已正确安装

### 运行时错误
1. 检查浏览器控制台错误
2. 查看 Vercel Function Logs
3. 验证 API 路由是否正常工作

## 联系支持

如有问题，请联系：
- 技术团队：miyingyoule@gmail.com
- WhatsApp：+86-131-1295-9561

---

**最后更新**: 2025-01-27  
**部署状态**: ✅ 准备就绪
