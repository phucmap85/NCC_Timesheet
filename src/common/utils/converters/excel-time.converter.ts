export const convertExcelTimeToString = (excelTime: number | string): string => {
  if (typeof excelTime === 'string') {
    return excelTime;
  }

  const totalMinutes = Math.round(excelTime * 24 * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Format as HH:MM
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}