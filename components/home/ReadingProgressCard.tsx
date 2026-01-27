import React from 'react';
import { useDaysCount } from '../../hooks/useDaysCount';

export const ReadingProgressCard: React.FC = () => {
  const daysCount = useDaysCount('2025-01-25');

  return (
    <div className="mt-12 max-w-2xl mx-auto relative group">
      {/* 背景装饰层 - 创造深度感 */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-amber-300/20 to-blue-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>

      {/* 主卡片 - 磨砂玻璃效果 */}
      <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 dark:border-slate-700/60 p-8 sm:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 hover:shadow-3xl hover:scale-[1.02] transition-all">
        {/* 内部光晕效果 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-3xl"></div>

        <div className="text-center relative z-10">
          <h4 className="text-2xl font-bold font-serif text-slate-900 dark:text-white mb-3">
            阅读与成长
          </h4>
          <p className="text-base text-slate-600 dark:text-stone-300 mb-6">
            从 2025年1月25日 开始，我已经坚持了
          </p>

          {/* 数字展示区 - 增强视觉冲击 */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-amber-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-brand-orange to-amber-600 bg-clip-text text-transparent">
              <div className="text-7xl sm:text-8xl font-black mb-2 tracking-tight">
                {daysCount}
              </div>
            </div>
          </div>

          <p className="text-lg text-slate-600 dark:text-stone-300 mt-4 font-medium">
            天
          </p>

          {/* 底部装饰线 */}
          <div className="mt-6 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-orange/60 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500/60 animate-pulse delay-100"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500/60 animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
