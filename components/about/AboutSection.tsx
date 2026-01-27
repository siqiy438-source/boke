import React, { useState, useCallback } from 'react';
import { Brain, Briefcase, TrendingUp, BookOpen } from '../Icons';
import { BlogPost, Category, ViewState, PersonalInfo } from '../../types';
import { useDaysCount } from '../../hooks/useDaysCount';

interface AboutSectionProps {
  personalInfo: PersonalInfo;
  blogPosts: BlogPost[];
  setView: (v: ViewState) => void;
  setCurrentCategory: (c: Category) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  personalInfo,
  blogPosts,
  setView,
  setCurrentCategory
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const daysCount = useDaysCount('2025-01-25');
  const postsCount = blogPosts.length;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return Brain;
      case 'Briefcase': return Briefcase;
      case 'TrendingUp': return TrendingUp;
      case 'BookOpen': return BookOpen;
      default: return Brain;
    }
  };

  const getCategoryFromIcon = (iconName: string): Category => {
    switch (iconName) {
      case 'Brain': return Category.MIND;
      case 'Briefcase': return Category.BUSINESS;
      case 'TrendingUp': return Category.WEALTH;
      case 'BookOpen': return Category.READING;
      default: return Category.MIND;
    }
  };

  const handleColumnClick = useCallback((iconName: string) => {
    const category = getCategoryFromIcon(iconName);
    setCurrentCategory(category);
    setView('LIST');
    window.scrollTo(0, 0);
  }, [setCurrentCategory, setView]);

  // 防御性检查
  if (!personalInfo) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16">
        <p className="text-center text-red-500">个人信息配置加载失败，请检查 constants.ts 文件</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 核心层：头像 + 姓名 + 副标题 */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white/80 dark:border-slate-800/80 shadow-xl backdrop-blur-xl">
          <img src={personalInfo.avatarUrl} alt={personalInfo.name} loading="lazy" className="w-full h-full object-cover"/>
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">{personalInfo.name}</h2>
        <p className="text-slate-500">{personalInfo.subtitle}</p>
      </div>

      {/* 核心数据卡片 */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 mb-6 shadow-lg">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-brand-orange">{daysCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">坚持天数</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-orange">{postsCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">已发布笔记</div>
          </div>
        </div>
      </div>

      {/* 交互层：更多/收起按钮 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-4 mb-6 rounded-2xl bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium transition-all active:scale-95 hover:bg-stone-200 dark:hover:bg-slate-700"
      >
        {isExpanded ? '收起' : '更多'}
      </button>

      {/* 详细层：展开内容 */}
      {isExpanded && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* 个人介绍卡片 */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8">
            <div className="space-y-8">
              {/* 引言 */}
              <p className="text-xl font-medium text-slate-900 dark:text-white leading-relaxed text-center">
                如果你在未来的某一天点开这里，希望你还记得：
              </p>

              {/* 核心内容 - 引用风格 */}
              <div className="space-y-6 pl-6 border-l-4 border-brand-orange/50">
                <p className="text-lg text-slate-700 dark:text-stone-300 leading-loose">
                  当初你写下这些东西的时候，并不确定结果，只是选择了继续走下去。
                </p>
                <p className="text-lg text-slate-700 dark:text-stone-300 leading-loose">
                  这些文字不是成功的证据，而是你在不确定中，依然愿意思考和记录的痕迹。
                </p>
              </div>

              {/* 结尾强调 */}
              <div className="pt-4 border-t border-stone-200/50 dark:border-slate-700/50">
                <p className="text-lg text-brand-orange leading-relaxed text-center font-semibold">
                  无论现在你走到哪一步，都别轻易否定那个阶段的自己。
                </p>
              </div>
            </div>
          </div>

          {/* 专栏规划卡片 */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">专栏规划</h3>
            <div className="space-y-2">
              {personalInfo.columns && personalInfo.columns.map((column, index) => {
                const IconComponent = getIconComponent(column.icon);
                return (
                  <button
                    key={index}
                    onClick={() => handleColumnClick(column.icon)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-slate-700/50 transition-all hover:scale-[1.02] active:scale-95 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="text-brand-orange shrink-0" size={20}/>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-stone-100">{column.title}</div>
                        <div className="text-sm text-slate-500">{column.description}</div>
                      </div>
                    </div>
                    <span className="text-slate-400">→</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
