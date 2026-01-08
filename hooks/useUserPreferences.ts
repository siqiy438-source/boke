import { useEffect, useState } from 'react';
import { supabase, UserPreferences } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useUserPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  // 加载用户偏好
  useEffect(() => {
    if (!user) {
      setPreferences(null);
      setLoading(false);
      return;
    }

    loadPreferences();
  }, [user]);

  const loadPreferences = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = 没有找到记录
        console.error('Error loading preferences:', error);
      } else if (data) {
        setPreferences(data);
      } else {
        // 创建默认偏好
        await createDefaultPreferences();
      }
    } catch (err) {
      console.error('Error loading preferences:', err);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultPreferences = async () => {
    if (!user) return;

    const defaultPrefs: Omit<UserPreferences, 'created_at' | 'updated_at'> = {
      user_id: user.id,
      dark_mode: false,
      favorite_categories: [],
      bookmarked_posts: [],
      reading_history: [],
    };

    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .insert(defaultPrefs)
        .select()
        .single();

      if (error) {
        console.error('Error creating preferences:', error);
      } else {
        setPreferences(data);
      }
    } catch (err) {
      console.error('Error creating preferences:', err);
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user || !preferences) return;

    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating preferences:', error);
      } else {
        setPreferences(data);
      }
    } catch (err) {
      console.error('Error updating preferences:', err);
    }
  };

  const toggleDarkMode = async (darkMode: boolean) => {
    await updatePreferences({ dark_mode: darkMode });
  };

  const addBookmark = async (postId: string) => {
    if (!preferences) return;
    const bookmarked = [...(preferences.bookmarked_posts || [])];
    if (!bookmarked.includes(postId)) {
      bookmarked.push(postId);
      await updatePreferences({ bookmarked_posts: bookmarked });
    }
  };

  const removeBookmark = async (postId: string) => {
    if (!preferences) return;
    const bookmarked = (preferences.bookmarked_posts || []).filter(id => id !== postId);
    await updatePreferences({ bookmarked_posts: bookmarked });
  };

  const addToReadingHistory = async (postId: string) => {
    if (!preferences) return;
    const history = [...(preferences.reading_history || [])];
    // 移除旧的记录(如果存在)
    const filtered = history.filter(id => id !== postId);
    // 添加到最前面
    filtered.unshift(postId);
    // 只保留最近50条
    const limited = filtered.slice(0, 50);
    await updatePreferences({ reading_history: limited });
  };

  return {
    preferences,
    loading,
    toggleDarkMode,
    addBookmark,
    removeBookmark,
    addToReadingHistory,
    updatePreferences,
  };
};
