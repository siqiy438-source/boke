/**
 * 计算从指定日期开始的天数
 * @param startDateString 开始日期字符串，格式：YYYY-MM-DD
 * @returns 天数
 */
export const calculateDaysSinceStart = (startDateString: string = '2025-01-25'): number => {
  const startDate = new Date(startDateString);
  const today = new Date();
  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diffTime = today.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? diffDays : 0;
};
