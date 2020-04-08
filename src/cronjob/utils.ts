export default function sortAsc (arr, key?): any[] {
	if (key) return arr.sort((a, b) => parseFloat(a[key] || -1) - parseFloat(b[key] || 0));
	return arr.sort((a, b) => a - b);
};

const _quantile = (sorted, q) => {
	const pos = (sorted.length - 1) * q;
	const base = Math.floor(pos);
	const rest = pos - base;
	if (sorted[base + 1] !== undefined) {
		return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
	} else {
		return sorted[base];
	}
};

export function quantile (arr, q, key) {
	const sorted = sortAsc(arr, key);
	const sortOnlyValue = sorted.map(i => i[key]);
	const res = _quantile(sortOnlyValue, q);

	// findNearestindex
	let idxResult = 0;
	for (let index = 0; index < sorted.length; index++) {
		if (sorted[index][key] >= res) {
			idxResult = index;
			break;
		}
	}

	return sorted[idxResult];
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
