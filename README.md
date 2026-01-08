# 思奇的创业笔记 📝

一个现代化的个人博客应用，记录阅读、创业与投资的底层思考。

## ✨ 特性

- 📱 响应式设计，完美支持手机和电脑
- 🌙 深色模式支持
- 🔐 完整的用户认证系统（邮箱注册/登录）
- 💾 用户数据跨设备同步
- 🎨 精美的 UI 设计
- ⚡ 快速加载和流畅动画
- 🔍 文章搜索功能
- 📚 分类浏览（读书笔记、心智成长、商业思考）

## 🚀 快速开始

### 前置要求

- Node.js 16+
- npm 或 yarn
- Supabase 账号（用于数据库和认证）

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <your-repo-url>
   cd 个人播客
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置 Supabase**
   - 查看 `快速开始.md` 获取详细步骤
   - 或查看 `SUPABASE_SETUP.md` 获取完整指南

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **访问应用**
   - 打开 http://localhost:5173

## 📁 项目结构

```
个人播客/
├── components/          # React 组件
│   ├── AuthModal.tsx   # 登录/注册模态框
│   └── Icons.tsx       # 图标组件
├── contexts/           # React Context
│   └── AuthContext.tsx # 认证上下文
├── hooks/              # 自定义 Hooks
│   └── useUserPreferences.ts
├── lib/                # 工具库
│   └── supabase.ts    # Supabase 配置
├── App.tsx            # 主应用组件
├── constants.ts       # 常量配置
├── types.ts          # TypeScript 类型定义
└── index.tsx         # 应用入口
```

## 🔧 技术栈

- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **部署**: Vercel

## 📖 文档

- [快速开始指南](./快速开始.md) - 10分钟快速上手
- [Supabase 设置指南](./SUPABASE_SETUP.md) - 详细的数据库配置
- [使用说明](./使用说明.md) - 功能使用说明
- [集成总结](./集成总结.md) - 技术架构和实现细节
- [部署检查清单](./部署检查清单.md) - 上线前检查

## 🎯 核心功能

### 用户认证
- ✅ 邮箱注册
- ✅ 邮箱登录
- ✅ 密码重置
- ✅ 自动登录保持
- ✅ 安全的用户会话管理

### 内容管理
- ✅ 文章列表展示
- ✅ 文章详情页
- ✅ 分类筛选
- ✅ 搜索功能
- ✅ 阅读时间显示

### 用户体验
- ✅ 深色/浅色模式切换
- ✅ 响应式布局
- ✅ 流畅的页面过渡
- ✅ 加载状态提示
- ✅ 错误提示

### 数据同步
- ✅ 用户偏好设置同步
- ✅ 跨设备数据一致性
- ✅ 实时状态更新

## 🔐 安全性

- Row Level Security (RLS) 数据保护
- 密码加密存储
- JWT Token 认证
- 防止 SQL 注入
- XSS 防护

## 🚀 部署

### Vercel 部署

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量（如果使用）
4. 部署！

### 环境变量（可选）

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 📝 自定义配置

### 修改个人信息

编辑 `constants.ts` 文件中的 `PERSONAL_INFO` 对象：

```typescript
export const PERSONAL_INFO = {
  name: '你的名字',
  avatarUrl: '你的头像链接',
  subtitle: '你的简介',
  // ...
};
```

### 添加文章

在 `constants.ts` 的 `BLOG_POSTS` 数组中添加新文章：

```typescript
{
  id: 'unique-id',
  title: '文章标题',
  excerpt: '文章摘要',
  category: Category.MIND,
  tags: ['标签1', '标签2'],
  date: '2025-01-01',
  readTime: '5 min',
  coverImage: '封面图片链接',
  content: `文章内容...`
}
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👨‍💻 作者

袁思奇 - 23岁创业者 / 终身学习者

---

**如果这个项目对你有帮助，请给个 Star ⭐️**
