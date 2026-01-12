import React, { useState, useEffect } from 'react';
import { X, Save, ArrowLeft, Brain, Briefcase, TrendingUp, BookOpen, Check } from './Icons';
import { Category, PersonalInfo, BlogPost } from '../types';
import { PERSONAL_INFO, BLOG_POSTS } from '../constants';

type EditorProps = {
  onClose: () => void;
  onBack: () => void;
};

export const Editor: React.FC<EditorProps> = ({ onClose, onBack }) => {
  // 从 localStorage 加载数据，如果没有则使用默认值
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem('personalInfo');
    return saved ? JSON.parse(saved) : PERSONAL_INFO;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('blogPosts');
    return saved ? JSON.parse(saved) : BLOG_POSTS;
  });

  const [activeTab, setActiveTab] = useState<'columns' | 'posts'>('columns');
  const [saveMessage, setSaveMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // 可用的图标列表
  const availableIcons = [
    { name: 'Brain', component: Brain, label: '大脑（心智成长）' },
    { name: 'Briefcase', component: Briefcase, label: '公文包（商业思考）' },
    { name: 'TrendingUp', component: TrendingUp, label: '上升趋势（财富逻辑）' },
    { name: 'BookOpen', component: BookOpen, label: '书籍（读书笔记）' },
  ];

  // 保存数据
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 保存到 localStorage
      localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
      localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
      
      // 触发 storage 事件以通知其他标签页
      window.dispatchEvent(new Event('storage'));
      
      // 保存成功提示
      setSaveMessage('✓ 保存成功！刷新页面后生效');
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    } catch (error) {
      setSaveMessage('✗ 保存失败，请重试');
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // 更新专栏图标
  const updateColumnIcon = (columnIndex: number, newIcon: 'Brain' | 'Briefcase' | 'TrendingUp' | 'BookOpen') => {
    const updatedColumns = [...personalInfo.columns];
    updatedColumns[columnIndex] = {
      ...updatedColumns[columnIndex],
      icon: newIcon
    };
    setPersonalInfo({
      ...personalInfo,
      columns: updatedColumns
    });
  };

  // 更新文章分类
  const updatePostCategory = (postId: string, newCategory: Category) => {
    const updatedPosts = blogPosts.map(post =>
      post.id === postId ? { ...post, category: newCategory } : post
    );
    setBlogPosts(updatedPosts);
  };

  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case 'Brain': return Brain;
      case 'Briefcase': return Briefcase;
      case 'TrendingUp': return TrendingUp;
      case 'BookOpen': return BookOpen;
      default: return Brain;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-brand-orange transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
            <span className="text-base">返回</span>
          </button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-stone-100">配置编辑器</h1>
        </div>
        <div className="flex items-center gap-2">
          {saveMessage && (
            <span className="text-sm text-green-600 dark:text-green-400 mr-2">{saveMessage}</span>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-orange to-amber-500 text-white text-sm font-medium hover:shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            {isSaving ? '保存中...' : '保存配置'}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-stone-400"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* 标签切换 */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('columns')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'columns'
              ? 'bg-brand-orange text-white'
              : 'bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-stone-200 dark:hover:bg-slate-700'
          }`}
        >
          专栏配置
        </button>
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'posts'
              ? 'bg-brand-orange text-white'
              : 'bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-stone-200 dark:hover:bg-slate-700'
          }`}
        >
          文章分类
        </button>
      </div>

      {/* 专栏配置 */}
      {activeTab === 'columns' && (
        <div className="space-y-4">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              专栏图标配置
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              点击图标可以为每个专栏选择不同的图标
            </p>
            
            <div className="space-y-4">
              {personalInfo.columns.map((column, columnIndex) => (
                <div key={columnIndex} className="border border-stone-200 dark:border-slate-700 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <IconWrapper icon={column.icon} />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">{column.title}</div>
                        <div className="text-sm text-slate-500">{column.description}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 图标选择器 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {availableIcons.map((icon) => {
                      const IconComponent = icon.component;
                      const isSelected = column.icon === icon.name;
                      return (
                        <button
                          key={icon.name}
                          onClick={() => updateColumnIcon(columnIndex, icon.name as any)}
                          className={`flex items-center gap-2 p-3 rounded-xl transition-all ${
                            isSelected
                              ? 'bg-brand-orange text-white border-2 border-brand-orange'
                              : 'bg-stone-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 border-2 border-transparent hover:border-brand-orange/50'
                          }`}
                        >
                          <IconComponent size={20} />
                          <span className="text-sm">{icon.label}</span>
                          {isSelected && <Check size={16} className="ml-auto" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 文章分类配置 */}
      {activeTab === 'posts' && (
        <div className="space-y-4">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              文章分类配置
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              为每篇文章选择正确的分类
            </p>

            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="border border-stone-200 dark:border-slate-700 rounded-2xl p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{post.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-2">{post.excerpt}</p>
                      <div className="mt-2 text-xs text-slate-400">
                        {post.date} • {post.readTime}
                      </div>
                    </div>
                    
                    {/* 分类选择器 */}
                    <div className="flex flex-col gap-2 sm:w-48">
                      <label className="text-xs font-medium text-slate-500">选择分类</label>
                      <select
                        value={post.category}
                        onChange={(e) => updatePostCategory(post.id, e.target.value as Category)}
                        className="px-3 py-2 rounded-lg bg-stone-100 dark:bg-slate-700 text-slate-900 dark:text-white border border-stone-200 dark:border-slate-600 focus:ring-2 focus:ring-brand-orange outline-none text-sm"
                      >
                        <option value={Category.MIND}>心智成长</option>
                        <option value={Category.BUSINESS}>商业思考</option>
                        <option value={Category.WEALTH}>财富逻辑</option>
                        <option value={Category.READING}>读书笔记</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 图标包装组件
const IconWrapper: React.FC<{ icon: string }> = ({ icon }) => {
  const getIconComponent = () => {
    switch(icon) {
      case 'Brain': return Brain;
      case 'Briefcase': return Briefcase;
      case 'TrendingUp': return TrendingUp;
      case 'BookOpen': return BookOpen;
      default: return Brain;
    }
  };

  const IconComponent = getIconComponent();
  return (
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center text-white shadow-md">
      <IconComponent size={24} />
    </div>
  );
};
