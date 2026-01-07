import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, Moon, Sun, Menu, X, ArrowLeft, ArrowUp,
  BookOpen, TrendingUp, Brain, Briefcase,
  Twitter, Github, Mail, Clock, Calendar
} from './components/Icons';
import { BLOG_POSTS, PERSONAL_INFO } from './constants';
import { BlogPost, Category, ViewState } from './types';

// --- Components ---

// 1. Navigation / Header
const Header = ({ 
  darkMode, 
  toggleDarkMode, 
  setView, 
  view,
  currentCategory, 
  setCurrentCategory,
  searchQuery,
  setSearchQuery
}: { 
  darkMode: boolean; 
  toggleDarkMode: () => void;
  setView: (v: ViewState) => void;
  view: ViewState;
  currentCategory: Category;
  setCurrentCategory: (c: Category) => void;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = Object.values(Category);
  // 导航栏显示顺序：读书笔记、心智成长、商业思考
  const navCategories = [Category.READING, Category.MIND, Category.BUSINESS];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-stone-200/50 dark:border-slate-700/50 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Brand */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center gap-1.5 sm:gap-2"
            onClick={() => {
              setView('LIST');
              setCurrentCategory(Category.ALL);
              setSearchQuery('');
              window.scrollTo(0,0);
            }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-400 to-green-400 shadow-md">
              <img 
                src="/images/podcast-icon.png" 
                alt="播客图标" 
                loading="eager"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // 如果图片加载失败，显示备用图标
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full bg-brand-orange rounded-lg flex items-center justify-center text-white font-bold serif-text text-lg">思</div>';
                  }
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-xl tracking-tight text-slate-900 dark:text-stone-100">
                思奇的创业笔记
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            <button
              onClick={() => {
                setView('LIST');
                setCurrentCategory(Category.ALL);
                setSearchQuery('');
                window.scrollTo(0, 0);
              }}
              className={`text-sm font-medium transition-all duration-200 hover:text-brand-orange hover:scale-105 ${
                currentCategory === Category.ALL && view === 'LIST'
                  ? 'text-brand-orange' 
                  : 'text-slate-600 dark:text-stone-400'
              }`}
            >
              首页
            </button>
            {navCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCurrentCategory(cat);
                  setView('LIST');
                }}
                className={`text-sm font-medium transition-all duration-200 hover:text-brand-orange hover:scale-105 ${
                  currentCategory === cat 
                    ? 'text-brand-orange' 
                    : 'text-slate-600 dark:text-stone-400'
                }`}
              >
                {cat}
              </button>
            ))}
            <button 
               onClick={() => {
                 setView('ABOUT');
                 window.scrollTo(0, 0);
               }}
               className="text-sm font-medium text-slate-600 dark:text-stone-400 hover:text-brand-orange transition-all duration-200 hover:scale-105"
            >
              关于我
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Input (Desktop) */}
            <div className={`hidden md:flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-8'}`}>
              {isSearchOpen ? (
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="搜索文章..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-stone-200/50 dark:border-slate-700/50 rounded-full py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-brand-orange outline-none dark:text-white shadow-lg"
                    autoFocus
                  />
                  <X 
                    size={16} 
                    className="absolute right-3 top-2.5 cursor-pointer text-slate-400 hover:text-brand-orange transition-colors"
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                  />
                </div>
              ) : (
                <Search 
                  size={20} 
                  className="cursor-pointer text-slate-600 dark:text-stone-400 hover:text-brand-orange transition-colors"
                  onClick={() => setIsSearchOpen(true)}
                />
              )}
            </div>

            {/* Search Button (Mobile) */}
             <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-full hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-stone-400"
            >
              <Search size={20} />
            </button>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-110 hover:rotate-12 text-slate-600 dark:text-stone-400 active:scale-95"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 dark:text-stone-400 p-2 rounded-full hover:bg-stone-200 dark:hover:bg-slate-800 transition-all duration-300 active:scale-90"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl animate-in fade-in slide-in-from-top duration-300">
          <div className="p-4">
              <div className="relative">
                  <input
                    type="text"
                placeholder="搜索文章..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-2xl py-4 pl-6 pr-14 text-base focus:ring-2 focus:ring-brand-orange outline-none dark:text-white shadow-xl"
                autoFocus
              />
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X size={20} className="text-slate-400"/>
              </button>
              </div>
           </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-stone-200/50 dark:border-slate-700/50">
          <div className="px-2 pt-4 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => {
                setView('LIST');
                setCurrentCategory(Category.ALL);
                setSearchQuery('');
                setIsMenuOpen(false);
                window.scrollTo(0, 0);
              }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 min-h-[44px] ${
                currentCategory === Category.ALL && view === 'LIST'
                  ? 'text-brand-orange bg-orange-50 dark:bg-slate-800'
                  : 'text-slate-600 dark:text-stone-400 hover:text-brand-orange hover:bg-stone-50 dark:hover:bg-slate-800/50'
              }`}
            >
              首页
            </button>
            {navCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCurrentCategory(cat);
                  setView('LIST');
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 min-h-[44px] ${
                  currentCategory === cat
                    ? 'text-brand-orange bg-orange-50 dark:bg-slate-800'
                    : 'text-slate-600 dark:text-stone-400 hover:text-brand-orange hover:bg-stone-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
             <button
                onClick={() => {
                  setView('ABOUT');
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-stone-400 hover:text-brand-orange transition-all duration-200 hover:scale-[1.02] hover:bg-stone-50 dark:hover:bg-slate-800/50 active:scale-95 min-h-[44px]"
              >
                关于我
              </button>
          </div>
        </div>
      )}
    </header>
  );
};

// 2. Reading Progress Card Component
const ReadingProgressCard = () => {
  // 计算从2025年1月25号开始坚持的天数
  const calculateDaysSinceStart = () => {
    const startDate = new Date('2025-01-25');
    const today = new Date();
    // 将时间设置为当天的00:00:00，确保只计算天数差
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
  };

  const daysCount = calculateDaysSinceStart();

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

// 2. Hero Section
const Hero = () => (
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

// 3. Category Filter Bar (Sticky below header)
const FilterBar = ({ 
  currentCategory, 
  setCategory 
}: { 
  currentCategory: Category, 
  setCategory: (c: Category) => void 
}) => {
  return (
    <div className="w-full overflow-x-auto pb-4 pt-2 px-4 hide-scrollbar flex justify-start md:justify-center gap-3">
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
  );
};

// 4. Blog Card
type BlogCardProps = {
  post: BlogPost;
  onClick: () => void;
};

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  // Mapping categories to icons
  const getIcon = (cat: Category) => {
    switch(cat) {
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
      className="group cursor-pointer flex flex-col bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-stone-200/50 dark:border-slate-700/50 h-full touch-manipulation"
    >
      {/* Image Container */}
      <div className="relative h-40 sm:h-48 overflow-hidden bg-stone-200 dark:bg-slate-700">
        {post.coverImage ? (
          <img 
            src={post.coverImage} 
            alt={post.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
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

        <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-stone-100 mb-3 group-hover:text-brand-orange transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-stone-100/80 dark:bg-slate-700/80 backdrop-blur-sm text-slate-500 dark:text-stone-400 border border-stone-200/50 dark:border-slate-600/50">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// 5. Article Detail View
const ArticleView = ({ post, onBack }: { 
  post: BlogPost; 
  onBack: () => void;
}) => {
  // Simple markdown-to-html simulator for the demo
  const renderContent = (content: string) => {
    return content.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) return <h3 key={idx} className="text-xl sm:text-2xl font-serif font-bold mt-8 mb-4 text-slate-900 dark:text-stone-100">{line.replace('### ', '')}</h3>;
      if (line.startsWith('* ')) return <li key={idx} className="ml-4 list-disc text-slate-700 dark:text-stone-300 mb-3 pl-2 leading-relaxed">{line.replace('* ', '')}</li>;
      if (line.startsWith('> ')) return <blockquote key={idx} className="border-l-4 border-brand-orange pl-4 italic text-slate-600 dark:text-stone-400 my-6 py-2 bg-stone-50/50 dark:bg-slate-800/30 backdrop-blur-sm rounded-r-lg overflow-x-auto">{line.replace('> ', '')}</blockquote>;
      if (line.trim() === '') return <div key={idx} className="h-6"></div>;
      return <p key={idx} className="mb-6 leading-relaxed text-slate-700 dark:text-stone-300 text-base sm:text-lg">{line}</p>;
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-6 sm:mb-8 flex items-center gap-2 text-slate-500 hover:text-brand-orange transition-colors group min-h-[44px]"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
        <span className="text-base">返回列表</span>
      </button>

      <article>
        <div className="mb-8">
           <div className="flex gap-2 mb-4 items-center">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-orange/10 text-brand-orange">
                {post.category}
              </span>
           </div>
           <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-stone-50 mb-6 leading-tight">
             {post.title}
           </h1>
           <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 border-b border-stone-200/50 dark:border-slate-700/50 pb-6 sm:pb-8">
             <span>{post.date}</span>
             <span className="hidden sm:inline">•</span>
             <span>{post.readTime} 阅读</span>
             <span className="hidden sm:inline">•</span>
             <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                {post.tags.map(t => <span key={t} className="text-xs sm:text-sm">#{t}</span>)}
             </div>
           </div>
        </div>

        <div className="prose prose-lg dark:prose-invert prose-stone max-w-none">
          {/* Simulated Image */}
          {post.coverImage && (
             <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-10 shadow-lg bg-stone-200 dark:bg-slate-700">
               <img src={post.coverImage} alt={post.title} loading="lazy" className="w-full h-full object-cover"/>
             </div>
          )}
          
          {/* Content */}
          <div className="font-serif">
             {renderContent(post.content)}
          </div>
        </div>
      </article>

      {/* Footer of article */}
      <div className="mt-16 pt-8 border-t border-stone-200 dark:border-slate-800">
        <p className="text-center text-slate-400 italic">
          感谢阅读，如果这篇笔记对你有启发，欢迎分享。
        </p>
      </div>
    </div>
  );
};

// 6. Scroll to Top Button
const ScrollToTopButton = () => {
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

  return (
    <>
      {isVisible && (
      <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 sm:p-4 rounded-full bg-brand-orange/90 hover:bg-brand-orange text-white shadow-2xl hover:shadow-brand-orange/50 backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 min-h-[48px] min-w-[48px]"
          aria-label="返回顶部"
        >
          <ArrowUp size={20} className="sm:w-6 sm:h-6" />
                 </button>
             )}
    </>
  );
};

// 7. About Section
const AboutSection = () => {
  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case 'Brain': return Brain;
      case 'Briefcase': return Briefcase;
      case 'TrendingUp': return TrendingUp;
      case 'BookOpen': return BookOpen;
      default: return Brain;
    }
  };

  // 防御性检查
  if (!PERSONAL_INFO) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <p className="text-center text-red-500">个人信息配置加载失败，请检查 constants.ts 文件</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white/80 dark:border-slate-800/80 shadow-2xl backdrop-blur-xl">
           <img src={PERSONAL_INFO.avatarUrl} alt={PERSONAL_INFO.name} loading="lazy" className="w-full h-full object-cover"/>
        </div>
        <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2">{PERSONAL_INFO.name}</h2>
        <p className="text-brand-orange font-medium">{PERSONAL_INFO.subtitle}</p>
      </div>

      <div className="space-y-8 text-lg text-slate-700 dark:text-stone-300 leading-relaxed bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-stone-200/50 dark:border-slate-700/50">
        {PERSONAL_INFO.introduction && PERSONAL_INFO.introduction.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        
        <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white mt-8">我的专栏规划</h3>
        <ul className="space-y-4">
          {PERSONAL_INFO.columns && PERSONAL_INFO.columns.map((column, index) => {
            const IconComponent = getIconComponent(column.icon);
            return (
              <li key={index} className="flex items-start gap-3">
                <IconComponent className="mt-1 text-brand-orange shrink-0"/>
                <div>
                  <strong className="text-slate-900 dark:text-stone-100">{column.title}</strong>
                  <span className="block text-sm text-slate-500">{column.description}</span>
                </div>
              </li>
            );
          })}
        </ul>
        
        <div className="flex justify-center gap-6 mt-12 pt-8 border-t border-stone-100/50 dark:border-slate-700/50">
          {PERSONAL_INFO.socialLinks?.twitter && (
            <a href={PERSONAL_INFO.socialLinks.twitter} className="p-3 rounded-full bg-stone-100/50 dark:bg-slate-700/50 backdrop-blur-sm text-slate-400 hover:text-brand-orange hover:bg-brand-orange/10 transition-all hover:scale-110 active:scale-95 touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center">
              <Twitter size={24}/>
            </a>
          )}
          {PERSONAL_INFO.socialLinks?.github && (
            <a href={PERSONAL_INFO.socialLinks.github} className="p-3 rounded-full bg-stone-100/50 dark:bg-slate-700/50 backdrop-blur-sm text-slate-400 hover:text-brand-orange hover:bg-brand-orange/10 transition-all hover:scale-110 active:scale-95 touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center">
              <Github size={24}/>
            </a>
          )}
          {PERSONAL_INFO.socialLinks?.email && (
            <a href={PERSONAL_INFO.socialLinks.email} className="p-3 rounded-full bg-stone-100/50 dark:bg-slate-700/50 backdrop-blur-sm text-slate-400 hover:text-brand-orange hover:bg-brand-orange/10 transition-all hover:scale-110 active:scale-95 touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center">
              <Mail size={24}/>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App Logic ---

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState<ViewState>('LIST');
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category>(Category.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 显示数据状态 - 用于渲染列表，由 Filter 函数更新
  const [displayPosts, setDisplayPosts] = useState<BlogPost[]>(BLOG_POSTS);


  // Filter 函数：根据 currentCategory 和 searchQuery 更新 displayPosts
  useEffect(() => {
    const filtered = BLOG_POSTS.filter(post => {
      const matchesCategory = currentCategory === Category.ALL || post.category === currentCategory;
      const matchesSearch = searchQuery.trim() === '' || 
                            post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
    setDisplayPosts(filtered);
  }, [currentCategory, searchQuery]);

  // Handle Dark Mode Class on Body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Navigation Handlers
  const handleCardClick = (id: string) => {
    setActivePostId(id);
    setView('DETAIL');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setView('LIST');
    setActivePostId(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)} 
        setView={setView}
        view={view}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-grow">
        {view === 'LIST' && (
          <>
            <Hero />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="sticky top-20 z-30 mb-8 bg-white/40 dark:bg-slate-950/30 backdrop-blur-md py-2 rounded-2xl">
                 <FilterBar currentCategory={currentCategory} setCategory={setCurrentCategory} />
              </div>

              {displayPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayPosts.map(post => (
                    <BlogCard 
                      key={post.id} 
                      post={post} 
                      onClick={() => handleCardClick(post.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-slate-500 text-lg">没有找到相关笔记，换个词试试？</p>
                </div>
              )}
            </div>
          </>
        )}

        {view === 'DETAIL' && activePostId && (
          <ArticleView 
            post={BLOG_POSTS.find(p => p.id === activePostId)!} 
            onBack={handleBack}
           />
        )}

        {view === 'ABOUT' && (
          <AboutSection />
        )}
      </main>

      <ScrollToTopButton />

      <footer className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-stone-200/50 dark:border-slate-700/50 py-12 mt-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-serif font-bold text-lg text-slate-800 dark:text-stone-200 mb-2">思奇的创业笔记</p>
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            © {new Date().getFullYear()} Siqi Startup Notes. Built with React & Tailwind.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;