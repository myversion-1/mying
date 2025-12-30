# 测试指南 - 首页更新

## 快速测试步骤

### 1. 启动开发服务器

在项目根目录（`mying-web`）下运行：

```bash
npm run dev
```

或者如果你使用 yarn：

```bash
yarn dev
```

开发服务器通常会在 `http://localhost:3000` 启动。

### 2. 在浏览器中查看

打开浏览器访问：`http://localhost:3000`

## 需要检查的内容

### ✅ 首页 Hero 区域

1. **标题检查**
   - [ ] 英文：应显示 "Reliable Amusement Equipment Manufacturer for FECs & Theme Parks"
   - [ ] 中文：切换到中文后应显示 "面向家庭娱乐中心和主题公园的可靠游乐设备制造商"

2. **客户痛点（Highlights）**
   - [ ] 应显示三个亮点卡片：
     - "Worldwide Delivery" / "全球交付"
     - "Safety Certified" / "安全认证"
     - "Custom Solutions" / "定制解决方案"

3. **三个 CTA 按钮**
   - [ ] **Request Quote** 按钮（青色高亮）
     - 点击后应跳转到 `/contact` 页面
     - 按钮文本：英文 "Request Quote"，中文 "请求报价"
   
   - [ ] **WhatsApp Chat Now** 按钮（绿色）
     - 点击后应在新标签页打开 WhatsApp（链接：`https://wa.me/8613112959561`）
     - 按钮文本：英文 "WhatsApp Chat Now"，中文 "WhatsApp 立即聊天"
     - 按钮应有 WhatsApp 图标
   
   - [ ] **View Products** 按钮（边框样式）
     - 点击后应跳转到 `/products` 页面
     - 按钮文本：英文 "View Products"，中文 "查看产品"

### ✅ 语言切换测试

1. [ ] 点击语言切换按钮（通常在 Header 中）
2. [ ] 检查所有文本是否正确翻译
3. [ ] 检查按钮功能在不同语言下是否正常工作

### ✅ 响应式设计测试

1. [ ] 在桌面浏览器中查看（1920x1080 或更大）
2. [ ] 在平板设备中查看（768px 宽度）
3. [ ] 在手机设备中查看（375px 宽度）
4. [ ] 检查按钮布局是否适配不同屏幕尺寸

### ✅ 功能测试

1. **Request Quote 按钮**
   - [ ] 点击后跳转到联系页面
   - [ ] 联系表单可以正常使用

2. **WhatsApp 按钮**
   - [ ] 点击后在新标签页打开 WhatsApp
   - [ ] WhatsApp 链接格式正确

3. **View Products 按钮**
   - [ ] 点击后跳转到产品页面
   - [ ] 产品列表正常显示

## 浏览器控制台检查

打开浏览器开发者工具（F12），检查：

1. [ ] 没有 JavaScript 错误（Console 标签页）
2. [ ] 没有 TypeScript 类型错误
3. [ ] 网络请求正常（Network 标签页）

## 构建测试（可选）

如果你想测试生产构建：

```bash
npm run build
npm run start
```

然后访问 `http://localhost:3000` 检查生产版本。

## 常见问题排查

### 如果页面没有更新：
1. 清除浏览器缓存（Ctrl+Shift+R 或 Cmd+Shift+R）
2. 重启开发服务器
3. 检查是否有编译错误

### 如果按钮不工作：
1. 检查浏览器控制台是否有错误
2. 确认链接路径正确
3. 检查 WhatsApp 链接格式

### 如果样式不对：
1. 检查 Tailwind CSS 是否正确编译
2. 清除 `.next` 缓存文件夹（如果存在）
3. 重启开发服务器

