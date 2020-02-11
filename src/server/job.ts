import Table from 'cli-table';

import data from './ecommerce';
import runLH from './lh';
import { updateGist } from './gists';
import { EcommerceItem } from './types';
import { median } from './utils';

const NUMBER_OF_RUN = 5;

const run = async (name: string, url: string, device: string): Promise<any | null> => {
	let results: any[] = [];
	const tableLog = new Table();

	for(let i = 0; i < NUMBER_OF_RUN; i++) {
		const response = await runLH(name, url, device);
		if (response) {
			results.push(response);
			tableLog.push(response);
		}
	}

	console.log(tableLog.toString());
	const report = median(results, 'perf');
	updateGist(name, device, report);
}

const readData = () => {
	let isSecretNotFound = false;
	if (process.env.LIGHTHOUSE_API_KEY) {
		console.log(`> Found env LIGHTHOUSE_API_KEY`);
	} else {
		isSecretNotFound = true;
		console.error(`> env LIGHTHOUSE_API_KEY not found`);
	}

	if (process.env.GIST_TOKEN) {
		console.log(`> Found env GIST_TOKEN`);
	} else {
		isSecretNotFound = true;
		console.error(`> env GIST_TOKEN not found`);
	}

	if (process.env.GIST_ID) {
		console.log(`> Found env GIST_ID`);
	} else {
		isSecretNotFound = true;
		console.error(`> env GIST_ID not found`);
	}

	if (!isSecretNotFound) {
		data.map(async (item: EcommerceItem) => {
			await run(item.name, item.urlMobile, 'mobile');
			await run(item.name, item.urlDesktop, 'desktop');
		})
	}
}

readData();
