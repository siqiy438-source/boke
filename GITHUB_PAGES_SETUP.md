# GitHub Pages 部署指南

本指南将帮助你将项目部署到 GitHub Pages。

## 📋 前置要求

1. 一个 GitHub 仓库
2. 已配置的 GitHub Actions（工作流文件已包含在项目中）

## 🚀 部署步骤

### 1. 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings** (设置)
3. 在左侧菜单中找到 **Pages** (页面)
4. 在 **Source** (来源) 部分：
   - 选择 **GitHub Actions** 作为部署源
   - （如果看到 "Build and deployment" 部分，选择 "GitHub Actions"）

### 2. 检查工作流文件

项目已包含 GitHub Actions 工作流文件：`.github/workflows/deploy.yml`

该工作流会在以下情况自动触发：
- 推送到 `main` 分支（如果使用 `master` 分支，请修改工作流文件）
- 手动触发（在 Actions 页面点击 "Run workflow"）

### 3. 推送代码

```bash
git add .
git commit -m "配置 GitHub Pages"
git push origin main
```

### 4. 查看部署状态

1. 进入仓库的 **Actions** 标签页
2. 查看工作流运行状态
3. 等待构建和部署完成

### 5. 访问你的网站

部署完成后，你的网站将在以下地址可用：
- 如果仓库名是 `username.github.io`：`https://username.github.io`
- 如果仓库名是其他名称：`https://username.github.io/仓库名/`

你可以在仓库的 **Settings > Pages** 中查看准确的 URL。

## ⚙️ 配置说明

### Base 路径配置

项目已自动配置 base 路径：
- `username.github.io` 仓库 → base: `/`
- 其他仓库 → base: `/仓库名/`

如果需要手动修改，可以：
1. 编辑 `.github/workflows/deploy.yml` 中的 `BASE_PATH` 环境变量
2. 或者编辑 `vite.config.ts` 中的 `base` 配置

### 环境变量（可选）

如果你的项目需要环境变量（如 Supabase 配置），可以在 GitHub 仓库中添加 Secrets：

1. 进入仓库的 **Settings > Secrets and variables > Actions**
2. 点击 **New repository secret**
3. 添加你的环境变量，例如：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. 在 `.github/workflows/deploy.yml` 的 Build 步骤中取消注释相应的环境变量

```yaml
env:
  VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
  VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
  BASE_PATH: ${{ steps.base_path.outputs.base_path }}
```

## 🔧 故障排除

### 构建失败

1. 检查 **Actions** 标签页中的错误日志
2. 确认所有依赖都已正确安装
3. 检查 Node.js 版本是否兼容（项目使用 Node.js 18+）

### 404 错误

1. 确认 base 路径配置正确
2. 如果使用子路径（非 `username.github.io` 仓库），确保 base 路径以 `/` 开头和结尾
3. 检查 GitHub Pages 设置中是否选择了正确的部署源

### 资源加载失败

1. 确认所有静态资源（图片、CSS、JS）路径正确
2. 检查 base 路径是否正确应用到所有资源路径

## 📝 注意事项

1. **分支名称**：默认工作流监听 `main` 分支，如果使用 `master` 分支，请修改 `.github/workflows/deploy.yml` 中的分支名称
2. **构建时间**：首次部署可能需要几分钟，后续部署会更快
3. **自定义域名**：可以在 **Settings > Pages** 中配置自定义域名
4. **HTTPS**：GitHub Pages 自动启用 HTTPS

## 🔗 相关文档

- [GitHub Pages 官方文档](https://docs.github.com/zh/pages)
- [GitHub Actions 文档](https://docs.github.com/zh/actions)
- [Vite 部署指南](https://cn.vitejs.dev/guide/static-deploy.html#github-pages)
