import React from 'react';
import { BookOpen, Timeline, User } from '../Icons';
import { ViewState } from '../../types';

interface BottomNavProps {
  view: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const BottomNav: React.FC<BottomNavProps> = React.memo(({
  view,
  onNavigate,
}) => {
  const navItems: Array<{
    view: ViewState;
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      view: 'LIST',
      label: '首页',
      icon: <BookOpen size={24} />,
    },
    {
      view: 'TIMELINE',
      label: '时间线',
      icon: <Timeline size={24} />,
    },
    {
      view: 'ABOUT',
      label: '关于',
      icon: <User size={24} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-stone-200/50 dark:border-slate-700/50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className={`flex flex-col items-center justify-center w-full h-16 transition-all duration-200 gap-1 ${
              view === item.view
                ? 'text-brand-orange'
                : 'text-slate-600 dark:text-stone-400 hover:text-brand-orange'
            }`}
            aria-label={item.label}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
});

BottomNav.displayName = 'BottomNav';
