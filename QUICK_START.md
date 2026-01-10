# 快速开始指南 (Quick Start Guide)

## 🚀 运行性能测试

### 方法 1: 使用 npm 脚本（推荐）

```powershell
# 1. 导航到项目目录（注意路径中的空格需要用引号）
cd "C:\Users\Administrator\Desktop\Miying Web\mying-web"

# 2. 启动开发服务器（第一个终端）
npm run dev

# 3. 运行 Lighthouse 测试（第二个终端，新开一个 PowerShell）
cd "C:\Users\Administrator\Desktop\Miying Web\mying-web"
npm run lighthouse:test
```

### 方法 2: 直接运行 PowerShell 脚本

```powershell
# 1. 导航到项目目录
cd "C:\Users\Administrator\Desktop\Miying Web\mying-web"

# 2. 运行脚本
powershell -ExecutionPolicy Bypass -File scripts\lighthouse-test.ps1
```

### 方法 3: 手动运行 Lighthouse

```powershell
# 确保开发服务器正在运行
npm run dev

# 在另一个终端运行
cd "C:\Users\Administrator\Desktop\Miying Web\mying-web"

# Before test
npm run lighthouse:before

# After test
npm run lighthouse:after
```

---

## 📊 查看结果

### JSON 报告
位置：`mying-web\lighthouse-reports\comparison.json`

### 可视化图表
1. 打开 `mying-web\scripts\generate-performance-chart.html`
2. 确保 `lighthouse-reports\comparison.json` 存在
3. 图表会自动加载数据

---

## 🔧 故障排除

### 问题 1: "Missing script: lighthouse:test"
**解决方案：** 确保在 `mying-web` 目录下运行命令
```powershell
cd "C:\Users\Administrator\Desktop\Miying Web\mying-web"
npm run lighthouse:test
```

### 问题 2: 路径包含空格导致错误
**解决方案：** 使用引号包裹路径
```powershell
cd "C:\Users\Administrator\Desktop\Miying Web\mying-web"
```

### 问题 3: Lighthouse CLI 未安装
**解决方案：** 脚本会自动安装，或手动安装
```powershell
npm install -g lighthouse
```

### 问题 4: 服务器未运行
**解决方案：** 先启动开发服务器
```powershell
npm run dev
```

---

## 📝 常用命令

```powershell
# Bundle 分析
npm run analyze

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 运行 Lighthouse 测试
npm run lighthouse:test
```

---

**提示：** 如果遇到路径问题，始终使用引号包裹包含空格的路径！






