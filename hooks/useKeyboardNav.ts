import { useEffect, useCallback } from 'react';

interface UseKeyboardNavOptions {
  onEscape?: () => void;
  enabled?: boolean;
}

export const useKeyboardNav = ({
  onEscape,
  enabled = true,
}: UseKeyboardNavOptions = {}) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // 检查是否在输入框或 textarea 中
      const target = event.target as HTMLElement;
      const isInInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true';

      // 如果在输入框中，不处理键盘快捷键
      if (isInInput) return;

      // Escape 键返回
      if (event.key === 'Escape' && onEscape) {
        event.preventDefault();
        onEscape();
      }
    },
    [onEscape, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
};
