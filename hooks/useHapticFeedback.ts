import { useCallback } from 'react';

type HapticType = 'light' | 'medium' | 'heavy' | 'selection';

export const useHapticFeedback = () => {
  const vibrate = useCallback((type: HapticType = 'light') => {
    // 检查是否支持震动 API
    if (!navigator.vibrate) return;

    // 根据类型设置震动时长
    const durations: Record<HapticType, number> = {
      light: 10,
      medium: 20,
      heavy: 30,
      selection: 5,
    };

    navigator.vibrate(durations[type]);
  }, []);

  const lightTap = useCallback(() => vibrate('light'), [vibrate]);
  const mediumTap = useCallback(() => vibrate('medium'), [vibrate]);
  const heavyTap = useCallback(() => vibrate('heavy'), [vibrate]);
  const selectionTap = useCallback(() => vibrate('selection'), [vibrate]);

  return {
    vibrate,
    lightTap,
    mediumTap,
    heavyTap,
    selectionTap,
  };
};
