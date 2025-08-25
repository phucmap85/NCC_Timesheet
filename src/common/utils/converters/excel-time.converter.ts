export const convertExcelTimeToString = (excelTime: number | string): string => {
  if (typeof excelTime === 'string') {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
    if (timeRegex.test(excelTime)) return excelTime;
    
    const numericValue = parseFloat(excelTime);
    if (isNaN(numericValue)) return excelTime;
    
    excelTime = numericValue;
  }

  const totalMinutes = Math.round(excelTime * 24 * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Format as HH:MM
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}