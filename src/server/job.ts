import fetch from 'node-fetch';
import data from './ecommerce';
import { updateGist } from './gists';
import { EcommerceItem } from '../index';

const run = async (name: string, url: string, device: string): Promise<any | null> => {
	const URL = `https://builder-dot-lighthouse-ci.appspot.com/ci`;

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
		console.log(`> Found env GIST_ID: ${process.env.GIST_ID}`);
	} else {
		isSecretNotFound = true;
		console.error(`> env GIST_ID not found`);
	}

	if (!isSecretNotFound) {
		try {
			// @ts-ignore
			const resp = await fetch(URL, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'X-API-KEY': process.env.LIGHTHOUSE_API_KEY,
				},
				body: JSON.stringify({
					output: 'json',
					url: url,
					emulatedFormFactor: device,
				})
			});

			const result = await resp.json();

			if (result) {
				const categories = result?.categories || null;
				const audits = result?.audits || null;
				const resourceItems = audits?.['resource-summary']?.details?.items || [];

				const response = {
					perf: categories?.performance?.score || 0,
					aiiy: categories?.accessibility?.score || 0,
					pwa: categories?.pwa?.score || 0,

					fcp: audits['first-contentful-paint']?.numericValue || 0,
					ttfb: audits['time-to-first-byte']?.numericValue || 0,
					tti: audits['interactive']?.numericValue || 0,
					si: audits['speed-index']?.numericValue || 0,

					reqCount: resourceItems?.[0]?.requestCount || 0,
					reqSize: resourceItems?.[0]?.size || 0,
				}

				console.log(`> Result for ${url}: ${JSON.stringify(response)} \n\n`);
				updateGist(name, device, response);
				return response;
			}
		} catch (e) {
			console.error('> Error job', e);
		}
	}

	return null;
}

const readData = () => {
	data.map(async (item: EcommerceItem) => {
		await run(item.name, item.urlMobile, 'mobile');
		await run(item.name, item.urlDesktop, 'desktop');
	})
}

readData();
