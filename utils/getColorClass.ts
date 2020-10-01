export const getPerfColorClass = (value: number): string => {
  if (value <= 0.49) {
    return 'text-red-600';
  }
  if (value <= 0.89) {
    return 'text-orange-500';
  }

  return 'text-green-500';
};

export const getWebVitalColorClass = (value: number, good: number, avg: number): string => {
  if (value <= good) {
    return 'text-green-500';
  }

  if (value <= avg) {
    return 'text-orange-500';
  }

  return 'text-red-600';
};

export const getLCPColorClass = (value: number): string => {
  return getWebVitalColorClass(value, 2500, 4000);
};

export const getFIDColorClass = (value: number): string => {
  return getWebVitalColorClass(value, 100, 300);
};

export const getCLSColorClass = (value: number): string => {
  return getWebVitalColorClass(value, 0.1, 0.25);
};
