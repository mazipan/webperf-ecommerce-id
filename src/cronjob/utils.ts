// https://gist.github.com/harish2704/d0ee530e6ee75bad6fd30c98e5ad9dab#gistcomment-2339206
export function _get (object: any, path: any, defaultVal?: any) {
  const _path = Array.isArray(path)
    ? path
    : path.split('.').filter(i => i.length)

  if (!_path.length) {
    return object === undefined ? defaultVal : object
  }

  return _get(object[_path.shift()], _path, defaultVal)
}

export default function sortAsc (arr, key?): any[] {
  if (key) return arr.sort((a, b) => parseFloat(_get(a, key, -1)) - parseFloat(_get(b, key, 0)));
  return arr.sort((a, b) => a - b);
};

export function quantile (arr, q, key) {
  const sorted = sortAsc(arr, key);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;

  if (_get(sorted[base + 1], key, '')) {
    return _get(sorted[base], key) + rest * (_get(sorted[base + 1], key) - _get(sorted[base], key));
  }
  return _get(sorted[base], key);
};

export const cleanStr = (str) => str.toLowerCase().trim();

export function modifyLatestData(lastDataObj: any, response: any, name: string, device: string) {
  const todayDate = new Date().toISOString().substring(0, 10);
	let newData = lastDataObj[todayDate];
	const cleanName = cleanStr(name);
	const deviceKey = device === 'desktop' ? 'd' : 'm';

  if (!newData) {
    newData = [
      {
        n: cleanName,
        [deviceKey]: {
          r: response,
        },
      },
    ];
  } else if (newData) {
    const existing = newData.find(i => cleanStr(i.n) === cleanName);
    if (existing) {
      const woExisting = newData.filter(i => cleanStr(i.n) !== cleanName);
      newData = [
        ...woExisting,
        {
          n: cleanName,
          ...existing,
          [deviceKey]: {
            r: response,
          },
        },
      ];
    } else {
      newData = [
        ...newData,
        {
          n: cleanName,
          [deviceKey]: {
            r: response,
          },
        },
      ];
    }
  }

  const newValue = { ...lastDataObj, ...{ [todayDate]: newData } };
  return newValue;
}
