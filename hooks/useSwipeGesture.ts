import { useState, useRef, useCallback } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

interface SwipeState {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  swiping: boolean;
  swipeDirection: 'left' | 'right' | null;
}

export const useSwipeGesture = (
  handlers: SwipeHandlers,
  threshold: number = 50
): SwipeState => {
  const [swiping, setSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isSwipingRef = useRef(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    isSwipingRef.current = false;
    setSwiping(false);
    setSwipeDirection(null);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startXRef.current;
    const diffY = currentY - startYRef.current;

    // 只有水平滑动距离大于垂直滑动距离时才认为是滑动手势
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 20) {
      isSwipingRef.current = true;
      setSwiping(true);
      setSwipeDirection(diffX > 0 ? 'right' : 'left');
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!isSwipingRef.current) {
      setSwiping(false);
      setSwipeDirection(null);
      return;
    }

    const diffX = startXRef.current;

    // 根据滑动方向触发回调
    if (swipeDirection === 'left' && handlers.onSwipeLeft) {
      handlers.onSwipeLeft();
    } else if (swipeDirection === 'right' && handlers.onSwipeRight) {
      handlers.onSwipeRight();
    }

    setSwiping(false);
    setSwipeDirection(null);
    isSwipingRef.current = false;
  }, [swipeDirection, handlers]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    swiping,
    swipeDirection,
  };
};
