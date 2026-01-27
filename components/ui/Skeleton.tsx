import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-stone-200/80 via-stone-300/80 to-stone-200/80 dark:from-slate-700/80 dark:via-slate-600/80 dark:to-slate-700/80 rounded-lg ${className}`}
    />
  );
};

export const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-stone-200/50 dark:border-slate-700/50 h-full">
      {/* Image Skeleton */}
      <Skeleton className="h-40 sm:h-48" />

      {/* Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Date and read time */}
        <div className="mb-3 flex items-center gap-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Title */}
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-3" />

        {/* Excerpt */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
      </div>
    </div>
  );
};
