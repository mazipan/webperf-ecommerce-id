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

      writeNewReport(newValue);
    } catch (e) {
      console.error(`> [REPORT] - failed write report`, e);
    }
  };

  readFileReport(onGetLastData);
};
