import React, { useState } from 'react';
import { X, Mail, Lock, User, AlertCircle, CheckCircle } from './Icons';
import { useAuth } from '../contexts/AuthContext';

type AuthMode = 'signin' | 'signup' | 'reset';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { signIn, signUp, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('两次输入的密码不一致');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('密码长度至少为 6 位');
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password);
        if (error) {
          setError(error.message === 'User already registered' ? '该邮箱已被注册' : '注册失败,请重试');
        } else {
          setSuccess('注册成功!请检查您的邮箱以验证账户');
          setTimeout(() => {
            setMode('signin');
            setSuccess(null);
          }, 3000);
        }
      } else if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message === 'Invalid login credentials' ? '邮箱或密码错误' : '登录失败,请重试');
        } else {
          setSuccess('登录成功!');
          setTimeout(() => {
            onClose();
            setEmail('');
            setPassword('');
            setConfirmPassword('');
          }, 1000);
        }
      } else if (mode === 'reset') {
        const { error } = await resetPassword(email);
        if (error) {
          setError('发送重置邮件失败,请重试');
        } else {
          setSuccess('重置密码邮件已发送,请检查您的邮箱');
          setTimeout(() => {
            setMode('signin');
            setSuccess(null);
          }, 3000);
        }
      }
    } catch (err) {
      setError('操作失败,请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setSuccess(null);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors z-10"
        >
          <X size={20} className="text-slate-400" />
        </button>

        {/* 内容区 */}
        <div className="p-8">
          {/* 标题 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {mode === 'signin' ? '欢迎回来' : mode === 'signup' ? '创建账户' : '重置密码'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {mode === 'signin' ? '登录以同步您的阅读数据' : mode === 'signup' ? '注册以保存您的阅读偏好' : '输入邮箱以重置密码'}
            </p>
          </div>

          {/* 错误/成功提示 */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
              <AlertCircle size={18} className="text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
              <CheckCircle size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" />
              <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
            </div>
          )}

          {/* 表单 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 邮箱输入 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                邮箱地址
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* 密码输入 */}
            {mode !== 'reset' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  密码
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* 确认密码输入 (仅注册时) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  确认密码
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* 忘记密码链接 */}
            {mode === 'signin' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => switchMode('reset')}
                  className="text-sm text-brand-orange hover:text-amber-600 transition-colors"
                >
                  忘记密码?
                </button>
              </div>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 text-white font-medium hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? '处理中...' : mode === 'signin' ? '登录' : mode === 'signup' ? '注册' : '发送重置邮件'}
            </button>
          </form>

          {/* 切换模式 */}
          <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            {mode === 'signin' ? (
              <p>
                还没有账户?{' '}
                <button
                  onClick={() => switchMode('signup')}
                  className="text-brand-orange hover:text-amber-600 font-medium transition-colors"
                >
                  立即注册
                </button>
              </p>
            ) : mode === 'signup' ? (
              <p>
                已有账户?{' '}
                <button
                  onClick={() => switchMode('signin')}
                  className="text-brand-orange hover:text-amber-600 font-medium transition-colors"
                >
                  立即登录
                </button>
              </p>
            ) : (
              <p>
                想起密码了?{' '}
                <button
                  onClick={() => switchMode('signin')}
                  className="text-brand-orange hover:text-amber-600 font-medium transition-colors"
                >
                  返回登录
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
