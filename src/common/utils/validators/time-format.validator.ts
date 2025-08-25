export const parseTime = (t: string) => {
  try {
    if(!t) throw new Error('Time string is empty');
    const parts = t.split(':').map(Number);
    const [h, m, s = 0] = parts; // Default seconds to 0 if not provided
    if (parts.length < 2 || parts.length > 3 || 
        isNaN(h) || isNaN(m) || isNaN(s) || 
        h < 0 || h > 23 || m < 0 || m > 59 || s < 0 || s > 59) 
      throw new Error('Invalid time value');
    return h * 60 + m + s / 60; // Convert to minutes with seconds as fraction
  } catch (error) {
    throw new Error(error.message);
  }
}