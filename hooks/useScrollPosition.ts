import { useCallback } from 'react';

const SCROLL_POSITION_PREFIX = 'scroll_position_';

export const useScrollPosition = () => {
  const savePosition = useCallback((key: string) => {
    const position = window.scrollY;
    sessionStorage.setItem(`${SCROLL_POSITION_PREFIX}${key}`, position.toString());
  }, []);

  const restorePosition = useCallback((key: string) => {
    const saved = sessionStorage.getItem(`${SCROLL_POSITION_PREFIX}${key}`);
    if (saved) {
      const position = parseInt(saved, 10);
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, position);
      });
    }
  }, []);

  const clearPosition = useCallback((key: string) => {
    sessionStorage.removeItem(`${SCROLL_POSITION_PREFIX}${key}`);
  }, []);

  return { savePosition, restorePosition, clearPosition };
};
