import React, { useState, useEffect } from 'react';
import { ArrowUp } from '../Icons';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 p-3 sm:p-4 rounded-full bg-brand-orange/90 hover:bg-brand-orange text-white shadow-2xl hover:shadow-brand-orange/50 backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 min-h-[48px] min-w-[48px]"
      aria-label="返回顶部"
    >
      <ArrowUp size={20} className="sm:w-6 sm:h-6" />
    </button>
  );
};
