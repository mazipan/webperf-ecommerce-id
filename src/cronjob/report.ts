import { modifyLatestData } from './utils';
import { writeNewReport, readFileReport } from './file';
import { updateGist } from './gists';

export const updateReport = (name: string, device: string, response: any): void => {
	const onGetLastData = (data) => {
		if (!data) {
			console.warn(`> [REPORT] - empty last report\n`);
		}

		try {
			// @ts-ignore
			const objectData = JSON.parse(data);
			const newValue = modifyLatestData(objectData, response, name, device);

			writeNewReport(newValue);
			setTimeout(() => {
				updateGist(newValue);
			}, 0);
		} catch (e) {
			console.error(`> [REPORT] - failed write report`, e);
		}
	}

	readFileReport(onGetLastData);
};
