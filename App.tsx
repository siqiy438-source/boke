import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, Moon, Sun, Menu, X, ArrowLeft, 
  BookOpen, TrendingUp, Brain, Briefcase,
  Twitter, Github, Mail, Clock, Calendar,
  PenTool, Save, Trash2, Download, FileJson, Plus,
  Shuffle, Upload
} from './components/Icons';
import { BLOG_POSTS } from './constants';
import { BlogPost, Category, ViewState } from './types';

// --- Components ---

// 1. Navigation / Header
const Header = ({ 
  darkMode, 
  toggleDarkMode, 
  setView, 
  currentCategory, 
  setCurrentCategory,
  searchQuery,
  setSearchQuery
}: { 
  darkMode: boolean; 
  toggleDarkMode: () => void;
  setView: (v: ViewState) => void;
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
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-brand-paper/90 dark:bg-brand-navy/90 border-b border-stone-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Brand */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center gap-2"
            onClick={() => {
              setView('LIST');
              setCurrentCategory(Category.ALL);
              window.scrollTo(0,0);
            }}
          >
            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white font-bold serif-text">
              思
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl tracking-tight text-slate-900 dark:text-stone-100">
                思奇的创业笔记
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCurrentCategory(cat);
                  setView('LIST');
                }}
                className={`text-sm font-medium transition-colors hover:text-brand-orange ${
                  currentCategory === cat 
                    ? 'text-brand-orange' 
                    : 'text-slate-600 dark:text-stone-400'
                }`}
              >
                {cat}
              </button>
            ))}
            <button 
               onClick={() => setView('ABOUT')}
               className="text-sm font-medium text-slate-600 dark:text-stone-400 hover:text-brand-orange transition-colors"
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
                    className="w-full bg-stone-100 dark:bg-slate-800 border-none rounded-full py-1.5 pl-4 pr-8 text-sm focus:ring-2 focus:ring-brand-orange outline-none dark:text-white"
                    autoFocus
                  />
                  <X 
                    size={14} 
                    className="absolute right-3 top-2.5 cursor-pointer text-slate-400 hover:text-brand-orange"
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                  />
                </div>
              ) : (
                <Search 
                  size={20} 
                  className="cursor-pointer text-slate-600 dark:text-stone-400 hover:text-brand-orange"
                  onClick={() => setIsSearchOpen(true)}
                />
              )}
            </div>

             {/* Editor Mode Button */}
             <button 
              onClick={() => setView('EDITOR')}
              className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors text-brand-orange bg-orange-50 dark:bg-orange-900/20"
              title="写文章"
            >
              <PenTool size={18} />
            </button>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-stone-400"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 dark:text-stone-400"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-paper dark:bg-slate-900 border-t border-stone-200 dark:border-slate-800">
           <div className="px-4 pt-4 pb-2">
              <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-stone-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-brand-orange outline-none dark:text-white"
                  />
                  <Search size={16} className="absolute right-3 top-2.5 text-slate-400"/>
              </div>
           </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCurrentCategory(cat);
                  setView('LIST');
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentCategory === cat
                    ? 'text-brand-orange bg-orange-50 dark:bg-slate-800'
                    : 'text-slate-600 dark:text-stone-400 hover:text-brand-orange'
                }`}
              >
                {cat}
              </button>
            ))}
             <button
                onClick={() => {
                  setView('ABOUT');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-stone-400 hover:text-brand-orange"
              >
                关于我
              </button>
              <button
                onClick={() => {
                  setView('EDITOR');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-brand-orange hover:bg-orange-50 dark:hover:bg-slate-800"
              >
                写文章
              </button>
          </div>
        </div>
      )}
    </header>
  );
};

// 2. Hero Section
const Hero = () => (
  <div className="relative py-16 sm:py-24 px-4 bg-brand-paper dark:bg-brand-navy transition-colors duration-300">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 dark:text-stone-100 mb-6 tracking-tight">
        探索读书笔记、<br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">
          创业与投资
        </span>的底层逻辑
      </h1>
      <p className="mt-4 text-xl text-slate-600 dark:text-stone-400 max-w-2xl mx-auto font-light">
        一个23岁创业者的思考记录。关于心智成长、商业实战与财富积累。
      </p>
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
          className={`whitespace-nowrap px-5 py-2 rounded-full text-sm transition-all duration-300 border ${
            currentCategory === cat
              ? 'bg-slate-900 text-white border-slate-900 dark:bg-stone-100 dark:text-slate-900 dark:border-stone-100'
              : 'bg-white text-slate-600 border-stone-200 hover:border-brand-orange hover:text-brand-orange dark:bg-slate-800 dark:text-stone-400 dark:border-slate-700'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

// 4. Blog Card
const BlogCard = ({ post, onClick, onUpdateCategory }: { 
  post: BlogPost; 
  onClick: () => void;
  onUpdateCategory?: (postId: string, category: Category) => void;
}) => {
  const isLocalPost = post.id.startsWith('local-');
  
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation(); // 阻止触发卡片点击
    if (onUpdateCategory) {
      onUpdateCategory(post.id, e.target.value as Category);
    }
  };

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-stone-100 dark:border-slate-700 h-full"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-stone-200 dark:bg-slate-700">
        {post.coverImage ? (
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <BookOpen size={48} />
          </div>
        )}
        <div className="absolute top-3 left-3 flex items-center gap-2">
           {isLocalPost && onUpdateCategory ? (
             <select
               value={post.category}
               onChange={handleCategoryChange}
               onClick={(e) => e.stopPropagation()}
               className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-stone-200 backdrop-blur-sm shadow-sm border-0 cursor-pointer hover:bg-white dark:hover:bg-slate-800 focus:ring-2 focus:ring-brand-orange outline-none"
             >
               {Object.values(Category).filter(c => c !== Category.ALL).map(c => (
                 <option key={c} value={c}>{c}</option>
               ))}
             </select>
           ) : (
             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-stone-200 backdrop-blur-sm shadow-sm">
               {getIcon(post.category)}
               {post.category}
             </span>
           )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-3 flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
          <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
        </div>

        <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-stone-100 mb-3 group-hover:text-brand-orange transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-slate-600 dark:text-stone-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-1 rounded-md bg-stone-100 dark:bg-slate-700 text-slate-500 dark:text-stone-400">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// 5. Article Detail View
const ArticleView = ({ post, onBack, onUpdateCategory }: { 
  post: BlogPost; 
  onBack: () => void;
  onUpdateCategory?: (postId: string, category: Category) => void;
}) => {
  const isLocalPost = post.id.startsWith('local-');
  // Simple markdown-to-html simulator for the demo
  const renderContent = (content: string) => {
    return content.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) return <h3 key={idx} className="text-2xl font-serif font-bold mt-8 mb-4 text-slate-900 dark:text-stone-100">{line.replace('### ', '')}</h3>;
      if (line.startsWith('* ')) return <li key={idx} className="ml-4 list-disc text-slate-700 dark:text-stone-300 mb-2 pl-2">{line.replace('* ', '')}</li>;
      if (line.startsWith('> ')) return <blockquote key={idx} className="border-l-4 border-brand-orange pl-4 italic text-slate-600 dark:text-stone-400 my-6 py-1 bg-stone-50 dark:bg-slate-800/50 rounded-r-lg">{line.replace('> ', '')}</blockquote>;
      if (line.trim() === '') return <div key={idx} className="h-4"></div>;
      return <p key={idx} className="mb-4 leading-loose text-slate-700 dark:text-stone-300 text-lg">{line}</p>;
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-brand-orange transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
        返回列表
      </button>

      <article>
        <div className="mb-8">
           <div className="flex gap-2 mb-4 items-center">
            {isLocalPost && onUpdateCategory ? (
              <select
                value={post.category}
                onChange={(e) => onUpdateCategory(post.id, e.target.value as Category)}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-orange/10 text-brand-orange border-0 cursor-pointer hover:bg-brand-orange/20 focus:ring-2 focus:ring-brand-orange outline-none"
              >
                {Object.values(Category).filter(c => c !== Category.ALL).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-orange/10 text-brand-orange">
                {post.category}
              </span>
            )}
           </div>
           <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-stone-50 mb-6 leading-tight">
             {post.title}
           </h1>
           <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 border-b border-stone-200 dark:border-slate-800 pb-8">
             <span>{post.date}</span>
             <span>•</span>
             <span>{post.readTime} 阅读</span>
             <span>•</span>
             <div className="flex gap-2">
                {post.tags.map(t => <span key={t}>#{t}</span>)}
             </div>
           </div>
        </div>

        <div className="prose prose-lg dark:prose-invert prose-stone max-w-none">
          {/* Simulated Image */}
          {post.coverImage && (
             <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-10 shadow-lg bg-stone-200 dark:bg-slate-700">
               <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover"/>
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

// 6. Editor View (New)
const EditorView = ({ 
  onSave, 
  localPosts,
  onUpdate,
  onClear,
  onBack
}: { 
  onSave: (post: BlogPost) => void;
  localPosts: BlogPost[];
  onUpdate: (postId: string, updates: Partial<BlogPost>) => void;
  onClear: () => void;
  onBack: () => void;
}) => {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    category: Category.MIND,
    tags: [],
    readTime: '5 min',
    coverImage: 'https://picsum.photos/800/600?random=' + Math.floor(Math.random() * 100),
    content: `### 小标题\n\n正文内容...\n\n> 引用`
  });
  
  const [tagInput, setTagInput] = useState('');
  const [copyStatus, setCopyStatus] = useState('复制代码');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof BlogPost, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRandomImage = () => {
    const randomId = Math.floor(Math.random() * 1000);
    handleChange('coverImage', `https://picsum.photos/800/600?random=${randomId}`);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500000) { // 500KB limit
         alert("图片太大，建议小于 500KB 以免影响页面性能");
         return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('coverImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if(!formData.title || !formData.content) return alert('标题和内容不能为空');
    
    const newPost: BlogPost = {
      id: 'local-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: formData.title!,
      excerpt: formData.excerpt || '',
      category: formData.category as Category,
      tags: formData.tags || [],
      readTime: formData.readTime || '5 min',
      coverImage: formData.coverImage || '',
      content: formData.content || ''
    };
    
    onSave(newPost);
    alert('已保存到本地！请返回列表查看。');
  };

  const generateJSON = () => {
    return JSON.stringify(localPosts, null, 2);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateJSON());
    setCopyStatus('已复制！');
    setTimeout(() => setCopyStatus('复制代码'), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-brand-orange transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
        返回列表
      </button>

      <div className="flex justify-between items-center mb-8">
         <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PenTool className="text-brand-orange"/> 写作模式
         </h2>
         <div className="flex gap-2">
             {localPosts.length > 0 && (
                 <button 
                  onClick={onClear}
                  className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm"
                 >
                   <Trash2 size={16}/> 清空草稿
                 </button>
             )}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Editor Form */}
        <div className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-stone-200 dark:border-slate-700">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-stone-300 mb-1">标题</label>
            <input 
              type="text" 
              className="w-full p-2 rounded-lg border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 dark:text-stone-300 mb-2">封面图片</label>
             
             {/* Image Preview */}
             <div className="mb-3 w-full h-48 rounded-lg overflow-hidden bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-600 relative group">
                {formData.coverImage ? (
                  <img src={formData.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">无图片</div>
                )}
             </div>

             {/* Image Controls */}
             <div className="flex gap-2">
               <input 
                  type="text" 
                  className="flex-1 p-2 rounded-lg border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-sm"
                  placeholder="输入图片 URL"
                  value={formData.coverImage}
                  onChange={(e) => handleChange('coverImage', e.target.value)}
                />
                <button 
                  onClick={handleRandomImage}
                  className="p-2 bg-stone-100 dark:bg-slate-700 rounded-lg hover:bg-stone-200 dark:hover:bg-slate-600 text-slate-600 dark:text-stone-300 transition-colors"
                  title="随机图片"
                >
                  <Shuffle size={20}/>
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 bg-stone-100 dark:bg-slate-700 rounded-lg hover:bg-stone-200 dark:hover:bg-slate-600 text-slate-600 dark:text-stone-300 transition-colors"
                  title="上传本地图片"
                >
                  <Upload size={20}/>
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
             </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 dark:text-stone-300 mb-1">摘要</label>
             <textarea 
               className="w-full p-2 rounded-lg border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white h-24"
               value={formData.excerpt}
               onChange={(e) => handleChange('excerpt', e.target.value)}
             />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-stone-300 mb-1">分类</label>
              <select 
                className="w-full p-2 rounded-lg border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                {Object.values(Category).filter(c => c !== Category.ALL).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-stone-300 mb-1">阅读时间</label>
              <input 
                type="text" 
                className="w-full p-2 rounded-lg border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                value={formData.readTime}
                onChange={(e) => handleChange('readTime', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-stone-300 mb-1">标签 (逗号分隔)</label>
            <input 
              type="text" 
              placeholder="例如: 创业, 思考"
              className="w-full p-2 rounded-lg border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              value={tagInput}
              onChange={(e) => {
                setTagInput(e.target.value);
                handleChange('tags', e.target.value.split(/[,，]/).map(t => t.trim()).filter(Boolean));
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-stone-300 mb-1">内容 (Markdown)</label>
            <textarea 
              className="w-full p-2 rounded-lg border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white h-64 font-mono text-sm"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-2">支持 ### 标题, * 列表, &gt; 引用</p>
          </div>

          <button 
            onClick={handleSave}
            className="w-full py-3 bg-brand-orange text-white rounded-lg font-bold shadow-md hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save size={18} /> 保存到本地 (预览)
          </button>
        </div>

        {/* Right: Export Area */}
        <div className="space-y-6">
           {/* 已保存文章快速编辑 */}
           {localPosts.length > 0 && (
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-stone-200 dark:border-slate-700">
               <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                 <BookOpen size={18}/> 已保存文章 ({localPosts.length})
               </h3>
               <div className="space-y-3 max-h-64 overflow-y-auto">
                 {localPosts.map((post) => (
                   <div key={post.id} className="p-3 bg-stone-50 dark:bg-slate-900 rounded-lg border border-stone-200 dark:border-slate-700">
                     <div className="flex items-start justify-between gap-2 mb-2">
                       <p className="text-sm font-medium text-slate-900 dark:text-stone-100 line-clamp-2 flex-1">
                         {post.title}
                       </p>
                     </div>
                     <div className="flex items-center gap-2">
                       <span className="text-xs text-slate-500 dark:text-slate-400">分类：</span>
                       <select
                         value={post.category}
                         onChange={(e) => onUpdate(post.id, { category: e.target.value as Category })}
                         className="flex-1 text-xs px-2 py-1 rounded border border-stone-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-brand-orange outline-none"
                       >
                         {Object.values(Category).filter(c => c !== Category.ALL).map(c => (
                           <option key={c} value={c}>{c}</option>
                         ))}
                       </select>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           <div className="bg-stone-100 dark:bg-slate-900 p-6 rounded-xl border border-stone-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                 <FileJson size={18}/> 导出数据
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                 当你写好后，点击复制下方的 JSON 代码，替换代码文件 <code>constants.ts</code> 中的 <code>BLOG_POSTS</code> 数组即可发布。
              </p>
              
              <div className="relative">
                 <pre className="bg-white dark:bg-slate-800 p-4 rounded-lg text-xs h-64 overflow-y-auto font-mono text-slate-600 dark:text-stone-300 border border-stone-200 dark:border-slate-700">
                    {localPosts.length > 0 ? generateJSON() : '// 还没有保存的文章...'}
                 </pre>
                 <button 
                  onClick={copyToClipboard}
                  disabled={localPosts.length === 0}
                  className="absolute top-2 right-2 px-3 py-1 bg-brand-orange text-white text-xs rounded shadow hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                 >
                   {copyStatus}
                 </button>
              </div>
           </div>

           <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900">
             <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm mb-2">使用说明</h4>
             <ul className="list-disc list-inside text-xs text-blue-800 dark:text-blue-200 space-y-1">
               <li>在这里写文章，点击“保存”后会立刻在首页看到。</li>
               <li>保存是**暂时的**（存在浏览器缓存里），清除缓存会消失。</li>
               <li>要永久保存，请复制上面的代码，让工程师更新到网站里。</li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
}

// 7. About Section
const AboutSection = () => (
  <div className="max-w-2xl mx-auto px-4 py-12 animate-in fade-in duration-500">
    <div className="text-center mb-12">
      <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
         <img src="https://picsum.photos/400/400?grayscale" alt="Siqi" className="w-full h-full object-cover"/>
      </div>
      <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2">我是思奇</h2>
      <p className="text-brand-orange font-medium">23岁 / 连续创业者 / 终身学习者</p>
    </div>

    <div className="space-y-8 text-lg text-slate-700 dark:text-stone-300 leading-relaxed bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-stone-100 dark:border-slate-700">
      <p>
        你好，欢迎来到我的精神角落。
      </p>
      <p>
        在这个信息爆炸的时代，我试图通过**写作**来对抗遗忘和焦虑。
        目前的我专注于实体店创业，同时对金融投资有着浓厚的兴趣。
      </p>
      <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white mt-8">我的专栏规划</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <Brain className="mt-1 text-brand-orange shrink-0"/>
          <div>
            <strong className="text-slate-900 dark:text-stone-100">心智成长：</strong>
            <span className="block text-sm text-slate-500">探索潜意识、元认知与情绪力，向内求索。</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <Briefcase className="mt-1 text-brand-orange shrink-0"/>
          <div>
            <strong className="text-slate-900 dark:text-stone-100">商业思考：</strong>
            <span className="block text-sm text-slate-500">记录我在女装店实战中的经验、教训与价值重排方法论。</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <TrendingUp className="mt-1 text-brand-orange shrink-0"/>
          <div>
            <strong className="text-slate-900 dark:text-stone-100">财富逻辑：</strong>
            <span className="block text-sm text-slate-500">反脆弱投资笔记，建立属于年轻人的金融风控体系。</span>
          </div>
        </li>
      </ul>
      
      <div className="flex justify-center gap-6 mt-12 pt-8 border-t border-stone-100 dark:border-slate-700">
        <a href="#" className="text-slate-400 hover:text-brand-orange transition-colors"><Twitter size={24}/></a>
        <a href="#" className="text-slate-400 hover:text-brand-orange transition-colors"><Github size={24}/></a>
        <a href="#" className="text-slate-400 hover:text-brand-orange transition-colors"><Mail size={24}/></a>
      </div>
    </div>
  </div>
);

// --- Main App Logic ---

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState<ViewState>('LIST');
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category>(Category.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local Storage for new posts
  const [localPosts, setLocalPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load local posts on mount
    const saved = localStorage.getItem('local_blog_posts');
    if (saved) {
      try {
        setLocalPosts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local posts");
      }
    }
  }, []);

  const handleSaveLocalPost = (post: BlogPost) => {
    const updated = [post, ...localPosts];
    setLocalPosts(updated);
    localStorage.setItem('local_blog_posts', JSON.stringify(updated));
  };
  
  const handleUpdateLocalPost = (postId: string, updates: Partial<BlogPost>) => {
    const updated = localPosts.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    );
    setLocalPosts(updated);
    localStorage.setItem('local_blog_posts', JSON.stringify(updated));
  };
  
  const handleClearLocalPosts = () => {
    if(window.confirm("确定要清空所有本地草稿吗？此操作不可恢复。")) {
       setLocalPosts([]);
       localStorage.removeItem('local_blog_posts');
    }
  };

  // Handle Dark Mode Class on Body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Combine static posts and local posts
  const allPosts = useMemo(() => {
    return [...localPosts, ...BLOG_POSTS];
  }, [localPosts]);

  // Filter Logic
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesCategory = currentCategory === Category.ALL || post.category === currentCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [currentCategory, searchQuery, allPosts]);

  // Navigation Handlers
  const handleCardClick = (id: string) => {
    setActivePostId(id);
    setView('DETAIL');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setView('LIST');
    setActivePostId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-paper dark:bg-brand-darkPaper transition-colors duration-300">
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)} 
        setView={setView}
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
              <div className="sticky top-20 z-30 mb-8 bg-brand-paper/50 dark:bg-brand-navy/50 backdrop-blur-sm py-2">
                 <FilterBar currentCategory={currentCategory} setCategory={setCurrentCategory} />
              </div>

              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map(post => (
                    <BlogCard 
                      key={post.id} 
                      post={post} 
                      onClick={() => handleCardClick(post.id)}
                      onUpdateCategory={post.id.startsWith('local-') ? (postId, category) => handleUpdateLocalPost(postId, { category }) : undefined}
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
            post={allPosts.find(p => p.id === activePostId)!} 
            onBack={handleBack}
            onUpdateCategory={(postId, category) => handleUpdateLocalPost(postId, { category })}
          />
        )}
        
        {view === 'EDITOR' && (
           <EditorView 
             onSave={handleSaveLocalPost}
             localPosts={localPosts}
             onUpdate={handleUpdateLocalPost}
             onClear={handleClearLocalPosts}
             onBack={() => setView('LIST')}
           />
        )}

        {view === 'ABOUT' && (
          <AboutSection />
        )}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-stone-200 dark:border-slate-800 py-12 mt-12 transition-colors duration-300">
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