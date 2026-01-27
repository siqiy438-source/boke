import React from 'react';
import { ArrowLeft } from '../Icons';
import { BlogPost } from '../../types';
import { ReadingProgressBar } from './ReadingProgressBar';
import { useKeyboardNav } from '../../hooks/useKeyboardNav';

interface ArticleViewProps {
  post: BlogPost;
  onBack: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ post, onBack }) => {
  // 使用键盘导航 Hook
  useKeyboardNav({
    onEscape: onBack,
    enabled: true,
  });
  // Simple markdown-to-html simulator for the demo
  const renderContent = (content: string) => {
    return content.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) return <h3 key={idx} className="text-xl sm:text-2xl font-serif font-bold mt-8 mb-4 text-slate-900 dark:text-stone-100">{line.replace('### ', '')}</h3>;
      if (line.startsWith('* ')) return <li key={idx} className="ml-4 list-disc text-slate-700 dark:text-stone-300 mb-3 pl-2 leading-relaxed">{line.replace('* ', '')}</li>;
      if (line.startsWith('> ')) return <blockquote key={idx} className="border-l-4 border-brand-orange pl-4 italic text-slate-600 dark:text-stone-400 my-6 py-2 bg-stone-50/50 dark:bg-slate-800/30 backdrop-blur-sm rounded-r-lg overflow-x-auto">{line.replace('> ', '')}</blockquote>;
      if (line.trim() === '') return <div key={idx} className="h-6"></div>;
      return <p key={idx} className="mb-6 leading-relaxed text-slate-700 dark:text-stone-300 text-base sm:text-lg">{line}</p>;
    });
  };

  return (
    <>
      <ReadingProgressBar isVisible={true} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={onBack}
        className="mb-6 sm:mb-8 flex items-center gap-2 text-slate-500 hover:text-brand-orange transition-colors group min-h-[44px]"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
        <span className="text-base">返回列表</span>
      </button>

      <article>
        <div className="mb-8">
          <div className="flex gap-2 mb-4 items-center">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-orange/10 text-brand-orange">
              {post.category}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-stone-50 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 border-b border-stone-200/50 dark:border-slate-700/50 pb-6 sm:pb-8">
            <span>{post.date}</span>
            <span className="hidden sm:inline">•</span>
            <span>{post.readTime} 阅读</span>
            <span className="hidden sm:inline">•</span>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              {post.tags.map(t => <span key={t} className="text-xs sm:text-sm">#{t}</span>)}
            </div>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert prose-stone max-w-none">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-10 shadow-lg bg-stone-200 dark:bg-slate-700">
              <img
                src={post.coverImage}
                alt={post.title}
                loading="lazy"
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="font-serif">
            {renderContent(post.content)}
          </div>
        </div>
      </article>

      {/* Footer of article */}
      <div className="mt-16 pt-8 border-t border-stone-200 dark:border-slate-800">
        <p className="text-center text-slate-400 italic">
          感谢阅读，如果这篇笔记对你有启发，欢迎分享。
        </p>
      </div>
      </div>
    </>
  );
};
