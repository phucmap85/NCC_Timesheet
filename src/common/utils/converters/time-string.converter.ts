export const convertTimeStringToMinutes = (timeString: string): number => {
  if (!timeString) return 0;
  const [hours, minutes] = timeString.split(':').map(Number);
  return (hours * 60) + minutes;
}

export const convertMinutesToTimeString = (minutes: number): string => {
  if (minutes < 0) return '00:00';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}