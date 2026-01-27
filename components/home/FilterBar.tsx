import React, { useState, useEffect, useRef } from 'react';
import { Category } from '../../types';

interface FilterBarProps {
  currentCategory: Category;
  setCategory: (c: Category) => void;
}

export const FilterBar: React.FC<FilterBarProps> = React.memo(({ currentCategory, setCategory }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      // 初始检查
      checkScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* Left Gradient Indicator */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white/80 dark:from-slate-950/80 via-white/40 to-transparent dark:via-slate-950/40 z-10 pointer-events-none" />
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto pb-4 pt-2 px-4 hide-scrollbar flex justify-start md:justify-center gap-3"
      >
        {Object.values(Category).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-xl touch-manipulation active:scale-95 min-h-[44px] ${
              currentCategory === cat
                ? 'bg-slate-900/90 text-white border-slate-900/50 shadow-lg scale-105 dark:bg-white/90 dark:text-slate-900 dark:border-white/50'
                : 'bg-white/70 text-slate-600 border-stone-200/50 hover:border-brand-orange hover:text-brand-orange hover:shadow-md hover:scale-105 dark:bg-slate-800/70 dark:text-stone-400 dark:border-slate-700/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Right Gradient Indicator */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/80 dark:from-slate-950/80 via-white/40 to-transparent dark:via-slate-950/40 z-10 pointer-events-none" />
      )}
    </div>
  );
});

FilterBar.displayName = 'FilterBar';
