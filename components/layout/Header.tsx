import React, { useState, useEffect, useCallback } from 'react';
import { Search, Moon, Sun, Menu, X, User, LogOut, Settings, Timeline } from '../Icons';
import { useAuth } from '../../contexts/AuthContext';
import { Category, ViewState } from '../../types';

interface HeaderProps {
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
}

export const Header: React.FC<HeaderProps> = React.memo(({
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
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  // 菜单外点击关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
      if (showUserMenu && !target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    if (isMenuOpen || showUserMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen, showUserMenu]);

  // 菜单打开时禁止背景滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleLogoClick = useCallback(() => {
    setView('LIST');
    setCurrentCategory(Category.ALL);
    setSearchQuery('');
    window.scrollTo(0, 0);
  }, [setView, setCurrentCategory, setSearchQuery]);

  const handleNavClick = useCallback((targetView: ViewState) => {
    setView(targetView);
    if (targetView === 'LIST') {
      setCurrentCategory(Category.ALL);
      setSearchQuery('');
    }
    window.scrollTo(0, 0);
  }, [setView, setCurrentCategory, setSearchQuery]);

  const handleMobileNavClick = useCallback((targetView: ViewState) => {
    handleNavClick(targetView);
    setIsMenuOpen(false);
  }, [handleNavClick]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-stone-200/50 dark:border-slate-700/50 transition-all duration-300 shadow-sm pt-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo / Brand */}
          <div
            className="flex-shrink-0 cursor-pointer flex items-center gap-1.5 sm:gap-2"
            onClick={handleLogoClick}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-400 to-green-400 shadow-md">
              <img
                src="/images/podcast-icon.png"
                alt="播客图标"
                loading="eager"
                className="w-full h-full object-cover"
                onError={(e) => {
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
              onClick={() => handleNavClick('LIST')}
              className={`text-sm font-medium transition-all duration-200 hover:text-brand-orange hover:scale-105 ${
                view === 'LIST'
                  ? 'text-brand-orange'
                  : 'text-slate-600 dark:text-stone-400'
              }`}
            >
              首页
            </button>
            <button
              onClick={() => handleNavClick('ABOUT')}
              className="text-sm font-medium text-slate-600 dark:text-stone-400 hover:text-brand-orange transition-all duration-200 hover:scale-105"
            >
              关于我
            </button>
            <button
              onClick={() => handleNavClick('TIMELINE')}
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
              <div className="relative user-menu-container">
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
            <div className="md:hidden mobile-menu-container">
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
              onClick={() => handleMobileNavClick('LIST')}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 min-h-[44px] ${
                view === 'LIST'
                  ? 'text-brand-orange bg-orange-50 dark:bg-slate-800'
                  : 'text-slate-600 dark:text-stone-400 hover:text-brand-orange hover:bg-stone-50 dark:hover:bg-slate-800/50'
              }`}
            >
              首页
            </button>
            <button
              onClick={() => handleMobileNavClick('ABOUT')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-stone-400 hover:text-brand-orange transition-all duration-200 hover:scale-[1.02] hover:bg-stone-50 dark:hover:bg-slate-800/50 active:scale-95 min-h-[44px]"
            >
              关于我
            </button>
            <button
              onClick={() => handleMobileNavClick('TIMELINE')}
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
});

Header.displayName = 'Header';
