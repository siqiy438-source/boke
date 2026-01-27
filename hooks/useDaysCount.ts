import { useMemo } from 'react';
import { calculateDaysSinceStart } from '../utils/dateUtils';

/**
 * 计算从指定日期开始的天数的 Hook
 * @param startDate 开始日期字符串，格式：YYYY-MM-DD
 * @returns 天数
 */
export const useDaysCount = (startDate?: string): number => {
  return useMemo(() => calculateDaysSinceStart(startDate), [startDate]);
};
