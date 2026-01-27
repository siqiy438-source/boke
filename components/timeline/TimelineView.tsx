import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../../types';

interface TimelineViewProps {
  posts: BlogPost[];
  onCardClick: (id: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ posts, onCardClick }) => {
  // 按日期分组文章
  const groupPostsByDate = (posts: BlogPost[]) => {
    const grouped: Record<string, BlogPost[]> = {};

    posts.forEach(post => {
      const date = new Date(post.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const key = `${year}年${month}月`;

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(post);
    });

    // 对每个组内的文章按日期排序（新的在前）
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    // 返回排序后的年月组（新的在前）
    return Object.entries(grouped).sort((a, b) => {
      const parseYearMonth = (str: string) => {
        const match = str.match(/(\d+)年(\d+)月/);
        if (match) {
          return { year: parseInt(match[1]), month: parseInt(match[2]) };
        }
        return { year: 0, month: 0 };
      };
      const aDate = parseYearMonth(a[0]);
      const bDate = parseYearMonth(b[0]);

      if (aDate.year !== bDate.year) return bDate.year - aDate.year;
      return bDate.month - aDate.month;
    });
  };

  const groupedPosts = groupPostsByDate(posts);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-stone-100 mb-4">
          成长时间线
        </h1>
        <p className="text-lg text-slate-600 dark:text-stone-400">
          记录每一步思考，见证成长轨迹
        </p>
      </div>

      <div className="relative">
        {/* 桌面端：垂直时间线 */}
        <div className="hidden md:block">
          {groupedPosts.map(([month, monthPosts], groupIndex) => (
            <div key={month} className="mb-12 relative">
              <div className="absolute left-4 w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center shadow-lg z-10">
                <Calendar size={16} className="text-white" />
              </div>

              <div className="ml-16">
                <h2 className="text-2xl font-bold text-brand-orange mb-6 font-serif">{month}</h2>

                <div className="space-y-8">
                  {monthPosts.map((post, index) => (
                    <div key={post.id} className="relative group">
                      {/* 时间线上的小圆点 - 渐变发光效果 */}
                      <div className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 group-hover:scale-125 transition-all duration-300">
                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-brand-orange blur-md opacity-60 group-hover:opacity-80"></div>
                        <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-brand-orange via-orange-500 to-amber-500 shadow-lg shadow-brand-orange/40 border-2 border-white dark:border-slate-800"></div>
                      </div>

                      <div
                        onClick={() => onCardClick(post.id)}
                        className="pl-6 cursor-pointer group-hover:translate-x-2 transition-transform duration-300"
                      >
                        <div className="flex items-center gap-2 mb-2 text-sm text-slate-500 dark:text-slate-400">
                          <Clock size={12} />
                          {post.date}
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          {post.readTime}
                        </div>

                        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-stone-200/50 dark:border-slate-700/50 group-hover:border-brand-orange/50">
                          <div className="flex items-start gap-4">
                            {post.coverImage && (
                              <img
                                src={post.coverImage}
                                alt={post.title}
                                width={96}
                                height={96}
                                className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                              />
                            )}
                            <div className="flex-1">
                              <span className="inline-block px-2 py-1 rounded-md text-xs font-semibold bg-brand-orange/10 text-brand-orange mb-2">
                                {post.category}
                              </span>
                              <h3 className="text-lg font-bold text-slate-900 dark:text-stone-100 mb-2 group-hover:text-brand-orange transition-colors font-serif">
                                {post.title}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-stone-400 line-clamp-2">
                                {post.excerpt}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 移动端：水平时间线 */}
        <div className="md:hidden space-y-8">
          {groupedPosts.map(([month, monthPosts]) => (
            <div key={month} className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-8 bg-gradient-to-b from-brand-orange to-amber-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-brand-orange font-serif">{month}</h2>
              </div>

              <div className="space-y-4 pl-4 border-l-2 border-stone-200 dark:border-slate-700">
                {monthPosts.map((post) => (
                  <div key={post.id} className="relative group">
                    <div
                      onClick={() => onCardClick(post.id)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-1 text-xs text-slate-500 dark:text-slate-400">
                        <Calendar size={10} />
                        {post.date}
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <Clock size={10} />
                        {post.readTime}
                      </div>

                      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-stone-200/50 dark:border-slate-700/50">
                        <span className="inline-block px-2 py-0.5 rounded-md text-xs font-semibold bg-brand-orange/10 text-brand-orange mb-2">
                          {post.category}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-stone-100 mb-1 group-hover:text-brand-orange transition-colors font-serif">
                          {post.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-stone-400 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
