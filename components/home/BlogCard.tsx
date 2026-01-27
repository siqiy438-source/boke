import React, { useState } from 'react';
import { BookOpen, TrendingUp, Brain, Briefcase, Calendar, Clock } from '../Icons';
import { BlogPost, Category } from '../../types';
import { Skeleton } from '../ui/Skeleton';

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

export const BlogCard: React.FC<BlogCardProps> = React.memo(({ post, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getIcon = (cat: Category) => {
    switch (cat) {
      case Category.MIND: return <Brain size={14} />;
      case Category.BUSINESS: return <Briefcase size={14} />;
      case Category.WEALTH: return <TrendingUp size={14} />;
      case Category.READING: return <BookOpen size={14} />;
      default: return <BookOpen size={14} />;
    }
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer flex flex-col bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] hover:rotate-1 active:scale-[0.98] transition-all duration-500 border border-stone-200/50 dark:border-slate-700/50 h-full touch-manipulation will-change-transform"
    >
      {/* Image Container */}
      <div className="relative h-40 sm:h-48 overflow-hidden bg-stone-200 dark:bg-slate-700">
        {post.coverImage && !imageError ? (
          <>
            {/* 骨架屏占位 */}
            {!imageLoaded && (
              <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
            )}
            <img
              src={post.coverImage}
              alt={post.title}
              loading="lazy"
              width={400}
              height={200}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <BookOpen size={48} />
          </div>
        )}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-stone-200 backdrop-blur-sm shadow-sm">
            {getIcon(post.category)}
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-3 flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 select-none">
          <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
          <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-stone-100 mb-3 group-hover:text-brand-orange transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-stone-100/80 dark:bg-slate-700/80 backdrop-blur-sm text-slate-500 dark:text-stone-400 border border-stone-200/50 dark:border-slate-600/50 hover:scale-110 hover:bg-brand-orange/10 hover:text-brand-orange transition-all duration-300 cursor-default">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

BlogCard.displayName = 'BlogCard';
