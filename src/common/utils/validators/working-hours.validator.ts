import { parseTime } from 'src/common/utils/validators/time-format.validator';

export const validateWorkingHours = (
  morningWorking: number,
  morningStartAt: string,
  morningEndAt: string,
  afternoonWorking: number,
  afternoonStartAt: string,
  afternoonEndAt: string
): void => {
  try {
    const diffHours = (start: string, end: string) => {
      const s = parseTime(start);
      const e = parseTime(end);
      if (s === null || e === null) return null;
      if (e <= s) throw new Error(`End time ${end} must be after start time ${start}`);
      return (e - s) / 60;
    };
    
    const nearlyEqual = (a: number, b: number, eps = 0.01) => Math.abs(a - b) < eps;

    if (morningStartAt && morningEndAt) {
      const morningHours = diffHours(morningStartAt, morningEndAt);
      if (morningHours !== null && !nearlyEqual(morningHours, morningWorking)) {
        throw new Error(`Morning working time (${morningWorking}h) does not match duration between ${morningStartAt} and ${morningEndAt}`);
      }
    }

    if (afternoonStartAt && afternoonEndAt) {
      const afternoonHours = diffHours(afternoonStartAt, afternoonEndAt);
      if (afternoonHours !== null && !nearlyEqual(afternoonHours, afternoonWorking)) {
        throw new Error(`Afternoon working time (${afternoonWorking}h) does not match duration between ${afternoonStartAt} and ${afternoonEndAt}`);
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}