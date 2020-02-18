export function median(arr: any[], key: string) {
  const midIndex = Math.floor(arr.length / 2);
  const sortedArray = [...arr].sort((a, b) => a[key] - b[key]);

  return arr.length % 2 !== 0 ? sortedArray[midIndex] : (sortedArray[midIndex - 1] + sortedArray[midIndex]) / 2;
}

export function modifyLatestData(lastDataObj: any, response: any, name: string, device: string) {
  const todayDate = new Date().toISOString().substring(0, 10);
  let newData = lastDataObj[todayDate];

  if (!newData) {
    newData = [
      {
        n: name.toLowerCase(),
        [device]: {
          d: response,
        },
      },
    ];
  } else if (newData) {
    const existing = newData.find(i => i.n.toLowerCase() === name.toLowerCase());
    if (existing) {
      const woExisting = newData.filter(i => i.n.toLowerCase() !== name.toLowerCase());
      newData = [
        ...woExisting,
        {
          n: name.toLowerCase(),
          ...existing,
          [device]: {
            d: response,
          },
        },
      ];
    } else {
      newData = [
        ...newData,
        {
          n: name.toLowerCase(),
          [device]: {
            d: response,
          },
        },
      ];
    }
  }

  const newValue = { ...lastDataObj, ...{ [todayDate]: newData } };

  return newValue;
}
