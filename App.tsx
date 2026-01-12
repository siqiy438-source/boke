import React, { useState, useEffect } from 'react';
import { 
  Search, Moon, Sun, Menu, X, ArrowLeft, ArrowUp,
  BookOpen, TrendingUp, Brain, Briefcase,
  Twitter, Github, Mail, Clock, Calendar, User, LogOut, Settings, Timeline, Network
} from './components/Icons';
import { BLOG_POSTS, PERSONAL_INFO } from './constants';
import { BlogPost, Category, ViewState, PersonalInfo } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';
import { Editor } from './components/Editor';

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
  setSearchQuery,
  onAuthClick,
  onEditorClick
}: { 
  darkMode: boolean; 
  toggleDarkMode: () => void;
  setView: (v: ViewState) => void;
  view: ViewState;
  currentCategory: Category;
  setCurrentCategory: (c: Category) => void;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  onAuthClick: () => void;
  onEditorClick: () => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

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
                view === 'LIST'
                  ? 'text-brand-orange'
                  : 'text-slate-600 dark:text-stone-400'
              }`}
            >
              首页
            </button>
            <button
               onClick={() => {
                 setView('ABOUT');
                 window.scrollTo(0, 0);
               }}
               className="text-sm font-medium text-slate-600 dark:text-stone-400 hover:text-brand-orange transition-all duration-200 hover:scale-105"
            >
              关于我
            </button>
            <button
               onClick={() => {
                 setView('TIMELINE');
                 window.scrollTo(0, 0);
               }}
               className="text-sm font-medium text-slate-600 dark:text-stone-400 hover:text-brand-orange transition-all duration-200 hover:scale-105"
            >
              <span className="flex items-center gap-1.5">
                <Timeline size={16} />
                时间线
              </span>
              </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* User Menu / Login Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-stone-400"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center text-white text-sm font-medium">
                    {user.email?.[0].toUpperCase()}
                  </div>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-stone-200 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-stone-200 dark:border-slate-700">
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        onEditorClick();
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                    >
                      <Settings size={16} />
                      编辑配置
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-orange to-amber-500 text-white text-sm font-medium hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <User size={16} />
                登录
              </button>
            )}

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
            {/* Mobile Login Button */}
            {!user && (
              <button
                onClick={() => {
                  onAuthClick();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 min-h-[44px] mb-2"
              >
                <div className="flex items-center gap-2">
                  <User size={18} />
                  登录 / 注册
                </div>
              </button>
            )}
            {user && (
              <div className="mb-2 px-3 py-2 rounded-md bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">已登录</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 truncate mb-2">{user.email}</p>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-stone-100 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 justify-center"
                >
                  <LogOut size={16} />
                  退出登录
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setView('LIST');
                setCurrentCategory(Category.ALL);
                setSearchQuery('');
                setIsMenuOpen(false);
                window.scrollTo(0, 0);
              }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 min-h-[44px] ${
                view === 'LIST'
                  ? 'text-brand-orange bg-orange-50 dark:bg-slate-800'
                  : 'text-slate-600 dark:text-stone-400 hover:text-brand-orange hover:bg-stone-50 dark:hover:bg-slate-800/50'
              }`}
            >
              首页
            </button>
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
             <button
                onClick={() => {
                  setView('TIMELINE');
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-stone-400 hover:text-brand-orange transition-all duration-200 hover:scale-[1.02] hover:bg-stone-50 dark:hover:bg-slate-800/50 active:scale-95 min-h-[44px]"
              >
                <div className="flex items-center gap-2">
                  <Timeline size={18} />
                  时间线
                </div>
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
      className="group cursor-pointer flex flex-col bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] hover:rotate-1 active:scale-[0.98] transition-all duration-500 border border-stone-200/50 dark:border-slate-700/50 h-full touch-manipulation will-change-transform"
    >
      {/* Image Container */}
      <div className="relative h-40 sm:h-48 overflow-hidden bg-stone-200 dark:bg-slate-700">
        {post.coverImage ? (
          <img 
            src={post.coverImage} 
            alt={post.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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

        <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-stone-100 mb-3 group-hover:text-brand-orange transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-stone-100/80 dark:bg-slate-700/80 backdrop-blur-sm text-slate-500 dark:text-stone-400 border border-stone-200/50 dark:border-slate-600/50 hover:scale-110 hover:bg-brand-orange/10 hover:text-brand-orange transition-all duration-300 cursor-default">
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

// 7. About Section (iOS Style)
const AboutSection = ({ personalInfo, blogPosts, setView, setCurrentCategory }: { 
  personalInfo: PersonalInfo;
  blogPosts: BlogPost[];
  setView: (v: ViewState) => void;
  setCurrentCategory: (c: Category) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case 'Brain': return Brain;
      case 'Briefcase': return Briefcase;
      case 'TrendingUp': return TrendingUp;
      case 'BookOpen': return BookOpen;
      default: return Brain;
    }
  };

  // 将 icon 映射到对应的 Category
  const getCategoryFromIcon = (iconName: string): Category => {
    switch(iconName) {
      case 'Brain': return Category.MIND;
      case 'Briefcase': return Category.BUSINESS;
      case 'TrendingUp': return Category.WEALTH;
      case 'BookOpen': return Category.READING;
      default: return Category.MIND;
    }
  };

  // 处理专栏点击
  const handleColumnClick = (iconName: string) => {
    const category = getCategoryFromIcon(iconName);
    setCurrentCategory(category);
    setView('LIST');
    window.scrollTo(0, 0);
  };

  // 计算坚持天数（复用 ReadingProgressCard 的逻辑）
  const calculateDaysSinceStart = () => {
    const startDate = new Date('2025-01-25');
    const today = new Date();
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
  };

  const daysCount = calculateDaysSinceStart();
  const postsCount = blogPosts.length;

  // 防御性检查
  if (!personalInfo) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16">
        <p className="text-center text-red-500">个人信息配置加载失败，请检查 constants.ts 文件</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 核心层：头像 + 姓名 + 副标题 */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white/80 dark:border-slate-800/80 shadow-xl backdrop-blur-xl">
           <img src={personalInfo.avatarUrl} alt={personalInfo.name} loading="lazy" className="w-full h-full object-cover"/>
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">{personalInfo.name}</h2>
        <p className="text-slate-500">{personalInfo.subtitle}</p>
      </div>

      {/* 核心数据卡片 */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 mb-6 shadow-lg">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-brand-orange">{daysCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">坚持天数</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-orange">{postsCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">已发布笔记</div>
          </div>
        </div>
      </div>

      {/* 交互层：更多/收起按钮 */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-4 mb-6 rounded-2xl bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium transition-all active:scale-95 hover:bg-stone-200 dark:hover:bg-slate-700"
      >
        {isExpanded ? '收起' : '更多'}
      </button>

      {/* 详细层：展开内容 */}
      {isExpanded && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* 个人介绍卡片 */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8">
            <div className="space-y-8">
              {/* 引言 */}
              <p className="text-xl font-medium text-slate-900 dark:text-white leading-relaxed text-center">
                如果你在未来的某一天点开这里，希望你还记得：
              </p>
              
              {/* 核心内容 - 引用风格 */}
              <div className="space-y-6 pl-6 border-l-4 border-brand-orange/50">
                <p className="text-lg text-slate-700 dark:text-stone-300 leading-loose">
                  当初你写下这些东西的时候，并不确定结果，只是选择了继续走下去。
                </p>
                <p className="text-lg text-slate-700 dark:text-stone-300 leading-loose">
                  这些文字不是成功的证据，而是你在不确定中，依然愿意思考和记录的痕迹。
                </p>
              </div>
              
              {/* 结尾强调 */}
              <div className="pt-4 border-t border-stone-200/50 dark:border-slate-700/50">
                <p className="text-lg text-brand-orange leading-relaxed text-center font-semibold">
                  无论现在你走到哪一步，都别轻易否定那个阶段的自己。
                </p>
              </div>
            </div>
          </div>

          {/* 专栏规划卡片 */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">专栏规划</h3>
            <div className="space-y-2">
              {personalInfo.columns && personalInfo.columns.map((column, index) => {
                const IconComponent = getIconComponent(column.icon);
                return (
                  <button 
                    key={index} 
                    onClick={() => handleColumnClick(column.icon)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-slate-700/50 transition-all hover:scale-[1.02] active:scale-95 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="text-brand-orange shrink-0" size={20}/>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-stone-100">{column.title}</div>
                        <div className="text-sm text-slate-500">{column.description}</div>
                      </div>
                    </div>
                    <span className="text-slate-400">→</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

// 8. Timeline View
const TimelineView = ({ posts, onCardClick }: { 
  posts: BlogPost[]; 
  onCardClick: (id: string) => void;
}) => {
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
      const [aYear, aMonth] = a[0].split('年').map(Number);
      const [bYear, bMonth] = b[0].split('年').map(Number);
      
      if (aYear !== bYear) return bYear - aYear;
      return bMonth - aMonth;
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
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-orange via-amber-500 to-blue-500"></div>
          
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
                      {/* 时间线上的小圆点 - 对齐到卡片中心 */}
                      <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-slate-800 border-4 border-brand-orange shadow-md z-10"></div>
                      
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

// --- Main App Logic ---

const AppContent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState<ViewState>('LIST');
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category>(Category.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // 从 localStorage 加载数据，如果没有则使用默认值
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem('personalInfo');
    return saved ? JSON.parse(saved) : PERSONAL_INFO;
  });
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('blogPosts');
    return saved ? JSON.parse(saved) : BLOG_POSTS;
  });
  
  // 显示数据状态 - 用于渲染列表，由 Filter 函数更新
  const [displayPosts, setDisplayPosts] = useState<BlogPost[]>(blogPosts);

  // 监听 localStorage 的变化
  useEffect(() => {
    const handleStorageChange = () => {
      const savedPersonalInfo = localStorage.getItem('personalInfo');
      const savedBlogPosts = localStorage.getItem('blogPosts');
      
      if (savedPersonalInfo) {
        setPersonalInfo(JSON.parse(savedPersonalInfo));
      }
      
      if (savedBlogPosts) {
        const newPosts = JSON.parse(savedBlogPosts);
        setBlogPosts(newPosts);
        // 更新显示的文章列表
        const filtered = newPosts.filter(post => {
          const matchesCategory = currentCategory === Category.ALL || post.category === currentCategory;
          const matchesSearch = searchQuery.trim() === '' || 
                                post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
          return matchesCategory && matchesSearch;
        });
        setDisplayPosts(filtered);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [currentCategory, searchQuery]);


  // Filter 函数：根据 currentCategory 和 searchQuery 更新 displayPosts
  useEffect(() => {
    const filtered = blogPosts.filter(post => {
      const matchesCategory = currentCategory === Category.ALL || post.category === currentCategory;
      const matchesSearch = searchQuery.trim() === '' || 
                            post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
    setDisplayPosts(filtered);
  }, [currentCategory, searchQuery, blogPosts]);

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

  const handleEditorClick = () => {
    setView('EDITOR');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="animated-gradient-bg fixed inset-0 -z-10" />
      <div className="main-content flex-1 flex flex-col">
        <Header 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)} 
        setView={setView}
        view={view}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onEditorClick={handleEditorClick}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
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

        {view === 'TIMELINE' && (
          <TimelineView 
            posts={blogPosts} 
            onCardClick={handleCardClick}
          />
        )}

        {view === 'DETAIL' && activePostId && (
          <ArticleView 
            post={blogPosts.find(p => p.id === activePostId)!} 
            onBack={handleBack}
           />
        )}

        {view === 'ABOUT' && (
          <AboutSection personalInfo={personalInfo} blogPosts={blogPosts} setView={setView} setCurrentCategory={setCurrentCategory} />
        )}

        {view === 'EDITOR' && (
          <Editor 
            onClose={() => setView('LIST')} 
            onBack={handleBack}
          />
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
    </div>
  );
};

// Wrap with AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;