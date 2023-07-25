import { modifyLatestData } from './utils';
import { writeNewReport, readFileReport } from './file';

export const updateReport = (name: string, device: string, response: any): void => {
  const onGetLastData = (data) => {
    if (!data) {
      console.warn(`> [REPORT] - empty last report\n`);
    }

    try {
      const objectData = JSON.parse(data);
      const newValue = modifyLatestData(objectData, response, name, device);

      const currentYear = new Date().getFullYear();
      const onlyCurrentYear = {};
      const allDates = Object.keys(newValue);
      for (let index = 0; index < allDates.length; index++) {
        const theDate = allDates[index];
        if (theDate.indexOf(`${currentYear}-`) >= 0) {
          onlyCurrentYear[theDate] = newValue[theDate];
        }
      }

      writeNewReport(onlyCurrentYear);
    } catch (e) {
      console.error(`> [REPORT] - failed write report`, e);
    }
  };

  readFileReport(onGetLastData);
};
