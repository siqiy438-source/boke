import React, { useState, useEffect } from 'react';

interface ReadingProgressBarProps {
  isVisible?: boolean;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({ isVisible = true }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      // 计算滚动进度百分比
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolledHeight = window.scrollY;
      const scrollPercent = documentHeight > 0 ? (scrolledHeight / documentHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-0 right-0 h-1 z-40 bg-stone-200/50 dark:bg-slate-800/50">
      <div
        className="h-full bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
};
