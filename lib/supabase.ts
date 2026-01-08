import { createClient } from '@supabase/supabase-js';

// Supabase 配置
const supabaseUrl = 'https://qbblaukbjvrgkoyeukou.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiYmxhdWtianZyZ2tveWV1a291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNDMzNzIsImV4cCI6MjA4MjkxOTM3Mn0.3PVXDdTiQTJMVZmavAlLl45bsT11CkLcFynm1lrUXA8';

// 创建 Supabase 客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// 数据库类型定义
export type UserProfile = {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  display_name?: string;
  avatar_url?: string;
};

export type UserPreferences = {
  user_id: string;
  dark_mode: boolean;
  favorite_categories: string[];
  bookmarked_posts: string[];
  reading_history: string[];
  created_at: string;
  updated_at: string;
};
