# Supabase 集成设置指南

## 📋 概述

本项目已成功集成 Supabase 数据库，提供以下功能：
- ✅ 邮箱注册和登录
- ✅ 用户认证状态管理
- ✅ 用户偏好设置同步（深色模式、收藏、阅读历史）
- ✅ 跨设备数据同步

## 🚀 快速开始

### 1. Supabase 项目配置

你的 Supabase 项目信息：
- **项目 URL**: `https://qbblaukbjvrgkoyeukou.supabase.co`
- **Anon Key**: 已配置在 `lib/supabase.ts` 中

### 2. 数据库设置

请按照以下步骤设置数据库：

#### 步骤 1: 登录 Supabase Dashboard
1. 访问 [Supabase Dashboard](https://app.supabase.com)
2. 选择你的项目 `qbblaukbjvrgkoyeukou`

#### 步骤 2: 运行 SQL 脚本
1. 在左侧菜单中点击 **SQL Editor**
2. 点击 **New Query**
3. 复制 `supabase-setup.sql` 文件中的所有内容
4. 粘贴到 SQL 编辑器中
5. 点击 **Run** 按钮执行脚本

#### 步骤 3: 配置邮箱认证（重要！）
1. 在左侧菜单中点击 **Authentication** → **Providers**
2. 找到 **Email** 提供商
3. 确保以下设置：
   - ✅ **Enable Email provider** 已开启
   - ✅ **Confirm email** 可选（建议开启以验证邮箱）
   - ✅ **Secure email change** 建议开启
   - ✅ **Secure password change** 建议开启

#### 步骤 4: 配置邮件模板（可选）
1. 在 **Authentication** → **Email Templates** 中
2. 可以自定义以下邮件模板：
   - 确认注册邮件
   - 重置密码邮件
   - 邮箱变更确认邮件

#### 步骤 5: 配置站点 URL
1. 在 **Authentication** → **URL Configuration** 中
2. 设置 **Site URL** 为你的应用地址：
   - 开发环境: `http://localhost:5173`
   - 生产环境: 你的实际域名（例如 `https://yourdomain.com`）
3. 在 **Redirect URLs** 中添加允许的重定向地址

### 3. 验证设置

运行以下命令启动开发服务器：

```bash
npm run dev
```

然后测试以下功能：
1. ✅ 点击右上角"登录"按钮
2. ✅ 尝试注册新账户
3. ✅ 检查邮箱是否收到验证邮件（如果启用了邮箱确认）
4. ✅ 尝试登录
5. ✅ 登录后查看用户菜单

## 📁 项目结构

```
个人播客/
├── lib/
│   └── supabase.ts              # Supabase 客户端配置
├── contexts/
│   └── AuthContext.tsx          # 认证上下文和 Hook
├── components/
│   └── AuthModal.tsx            # 登录/注册模态框
├── hooks/
│   └── useUserPreferences.ts    # 用户偏好管理 Hook
├── App.tsx                      # 主应用（已集成认证）
├── supabase-setup.sql           # 数据库设置脚本
└── SUPABASE_SETUP.md           # 本文档
```

## 🔧 核心功能说明

### 1. 认证功能

**注册**
```typescript
const { signUp } = useAuth();
await signUp(email, password);
```

**登录**
```typescript
const { signIn } = useAuth();
await signIn(email, password);
```

**登出**
```typescript
const { signOut } = useAuth();
await signOut();
```

**重置密码**
```typescript
const { resetPassword } = useAuth();
await resetPassword(email);
```

### 2. 用户偏好同步

```typescript
const { 
  preferences,           // 当前用户偏好
  toggleDarkMode,       // 切换深色模式
  addBookmark,          // 添加收藏
  removeBookmark,       // 移除收藏
  addToReadingHistory   // 添加阅读历史
} = useUserPreferences();
```

### 3. 数据库表结构

**user_profiles** - 用户资料表
- `id`: 用户 ID（主键）
- `email`: 邮箱
- `display_name`: 显示名称
- `avatar_url`: 头像 URL
- `created_at`: 创建时间
- `updated_at`: 更新时间

**user_preferences** - 用户偏好表
- `user_id`: 用户 ID（主键）
- `dark_mode`: 深色模式开关
- `favorite_categories`: 收藏的分类
- `bookmarked_posts`: 收藏的文章
- `reading_history`: 阅读历史
- `created_at`: 创建时间
- `updated_at`: 更新时间

## 🔐 安全性

- ✅ 使用 Row Level Security (RLS) 保护数据
- ✅ 用户只能访问和修改自己的数据
- ✅ 密码使用 bcrypt 加密存储
- ✅ JWT Token 自动刷新
- ✅ Session 持久化

## 🌐 环境变量（可选）

如果你想使用环境变量管理配置，可以创建 `.env` 文件：

```env
VITE_SUPABASE_URL=https://qbblaukbjvrgkoyeukou.supabase.co
VITE_SUPABASE_ANON_KEY=你的_anon_key
```

然后修改 `lib/supabase.ts`：

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

## 📱 跨设备同步

用户在任何设备上登录后，都可以：
- 同步深色模式偏好
- 同步收藏的文章
- 同步阅读历史
- 保持登录状态

## 🐛 常见问题

### Q: 注册后没有收到邮件？
A: 
1. 检查 Supabase Dashboard 中 **Authentication** → **Providers** 是否启用了 Email
2. 检查垃圾邮件文件夹
3. 在开发环境中，可以在 Supabase Dashboard 的 **Authentication** → **Users** 中手动确认用户

### Q: 登录失败？
A:
1. 确保邮箱和密码正确
2. 如果启用了邮箱确认，确保已点击确认链接
3. 检查浏览器控制台的错误信息

### Q: 数据没有同步？
A:
1. 确保已运行 `supabase-setup.sql` 脚本
2. 检查 Supabase Dashboard 中表是否创建成功
3. 检查 RLS 策略是否正确设置

### Q: 如何查看数据库数据？
A:
1. 在 Supabase Dashboard 中点击 **Table Editor**
2. 选择 `user_profiles` 或 `user_preferences` 表
3. 可以查看和编辑数据

## 🚀 部署到生产环境

1. 在 Supabase Dashboard 中更新 **Site URL** 为生产域名
2. 在 **Redirect URLs** 中添加生产环境的回调地址
3. 考虑启用邮箱确认功能
4. 配置自定义邮件模板
5. 设置合适的密码策略

## 📚 相关资源

- [Supabase 官方文档](https://supabase.com/docs)
- [Supabase Auth 文档](https://supabase.com/docs/guides/auth)
- [Row Level Security 指南](https://supabase.com/docs/guides/auth/row-level-security)

## 💡 下一步优化建议

1. **社交登录**: 添加 Google、GitHub 等第三方登录
2. **用户资料页**: 允许用户编辑个人信息和头像
3. **评论系统**: 为文章添加评论功能
4. **点赞功能**: 记录用户对文章的点赞
5. **阅读进度**: 保存用户的阅读进度
6. **推荐系统**: 基于阅读历史推荐相关文章

---

如有问题，请查看 Supabase Dashboard 的日志或联系技术支持。
