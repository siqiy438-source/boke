import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from '../Icons';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  threshold = 80,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startYRef = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const scrollTop = window.scrollY;
      if (scrollTop === 0) {
        startYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isRefreshing) return;

      const scrollTop = window.scrollY;
      if (scrollTop !== 0) {
        setPullDistance(0);
        return;
      }

      const currentY = e.touches[0].clientY;
      const distance = Math.max(0, currentY - startYRef.current);
      setPullDistance(Math.min(distance, threshold * 1.5));
    };

    const handleTouchEnd = async () => {
      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
          setPullDistance(0);
        }
      } else {
        setPullDistance(0);
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance, isRefreshing, onRefresh, threshold]);

  return (
    <div ref={contentRef}>
      {/* Pull to Refresh Indicator */}
      <div
        className="fixed top-16 left-0 right-0 flex justify-center items-center transition-all duration-300 overflow-hidden pointer-events-none"
        style={{
          height: `${pullDistance}px`,
          opacity: pullDistance / threshold,
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className="transition-transform duration-300"
            style={{
              transform: `rotate(${Math.min((pullDistance / threshold) * 180, 180)}deg)`,
            }}
          >
            <ArrowUp size={20} className="text-brand-orange" />
          </div>
          {isRefreshing && (
            <div className="text-xs text-brand-orange font-medium">刷新中...</div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ transform: `translateY(${pullDistance}px)` }}>
        {children}
      </div>
    </div>
  );
};
