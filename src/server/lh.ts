import fetch from 'node-fetch';
import path from 'path';
import appRootDir from 'app-root-dir'
import { LHResponse } from './types';
import { writeFile } from './file';

export default async (name: string, url: string, device: string, index: number): Promise<LHResponse | null> => {
	const URL = `https://builder-dot-lighthouse-ci.appspot.com/ci`;

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
			const reportFileDir = path.join(path.resolve(appRootDir.get()), `/reports/${new Date().toISOString().substring(0, 10)}-${name.toLowerCase()}-${device.toLowerCase()}-${index}.json`);
			writeFile(reportFileDir, JSON.stringify(result));

			const categories = result?.categories || null;
			const audits = result?.audits || null;

			const response: LHResponse = {
				perf: categories?.performance?.score || 0,
				aiiy: categories?.accessibility?.score || 0,
				pwa: categories?.pwa?.score || 0,

				fcp: audits['first-contentful-paint']?.rawValue || 0,
				ttfb: audits['time-to-first-byte']?.rawValue || 0,
				tti: audits['interactive']?.rawValue || 0,
				si: audits['speed-index']?.rawValue || 0,
				name,
				device,
			}

			console.log(`> Finish run job for ${url}: perf: ${response.perf}`);
			return response;
		}
	} catch (e) {
		console.error('> Error job', e);
	}

	return null;
}