import React from 'react';
import { ReadingProgressCard } from './ReadingProgressCard';

export const Hero: React.FC = () => (
  <div className="relative py-16 sm:py-24 px-4 bg-gradient-to-br from-orange-100 via-amber-50 to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 transition-colors duration-300">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 dark:text-stone-100 mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
        记录阅读、<br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-500 to-amber-500 animate-gradient">
          创业与投资
        </span>的底层思考
      </h1>
      <p className="mt-4 text-xl text-slate-600 dark:text-stone-400 max-w-2xl mx-auto font-light animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
        一个年轻创业者的长期成长笔记
      </p>
      <ReadingProgressCard />
    </div>
  </div>
);
