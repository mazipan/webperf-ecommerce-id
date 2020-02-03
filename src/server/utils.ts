export function median(arr: any[], key: string) {
  const midIndex = Math.floor(arr.length / 2);
  const sortedArray = [...arr].sort((a, b) => a[key] - b[key]);

  return arr.length % 2 !== 0 ? sortedArray[midIndex] : (sortedArray[midIndex - 1] + sortedArray[midIndex]) / 2;
}

export const asc = (arr, key?): any[] => {
  if (key) return arr.sort((a, b) => parseFloat(a[key]) - parseFloat(b[key]));
  return arr.sort((a, b) => a - b);
};

export const sum = (arr, key?) =>
  arr.reduce((accumulator, currentValue) => {
    if (key) return accumulator + currentValue[key];
    return accumulator + currentValue;
  }, 0);

export const mean = (arr, key?) => {
  if (key) return sum(arr, key) / arr.length;
  return sum(arr) / arr.length;
};

export const std = (arr, key?) => {
  const mu = mean(arr, key);
  const diffArr = arr.map(a => (parseFloat(a[key]) - mu) ** 2);
  return Math.sqrt(sum(diffArr) / (arr.length - 1));
};

export const quantile = (arr, q, key) => {
  const sorted = asc(arr, key);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;

  if (sorted[base + 1][key] !== undefined) {
    return sorted[base][key] + rest * (sorted[base + 1][key] - sorted[base][key]);
  }
  return sorted[base][key];
};
