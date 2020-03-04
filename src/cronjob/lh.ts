import fetch from 'node-fetch';
import { LHResponse } from './types';
import { getFileByNameAndDevice, writeFile } from './file'

export default async (name: string, url: string, device: string, index: number): Promise<LHResponse | null> => {
	const URL = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${process.env.PSI_API_KEY}&strategy=${device}`;

  try {
    const resp = await fetch(URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });

    const result = await resp.json();

    if (result) {
			writeFile(getFileByNameAndDevice(name, device, index), result)
      const categories = result?.lighthouseResult?.categories || null;
      const audits = result?.lighthouseResult?.audits || null;

			const totalResources = audits?.['resource-summary']?.details?.items?.[0] || null;

      const response: LHResponse = {
        perf: categories?.performance?.score || 0,

        fcp: audits['first-contentful-paint']?.numericValue || 0,
        ttfb: audits['time-to-first-byte']?.numericValue || 0,
        fci: audits['first-cpu-idle']?.numericValue || 0,
        tti: audits['interactive']?.numericValue || 0,
				si: audits['speed-index']?.numericValue || 0,

				size: totalResources?.size || 0,
				req: totalResources?.requestCount || 0,

        name,
        device,
      };

      console.log(`> Finish run job for ${url}: perf: ${response.perf}`);
      return response;
    }
  } catch (e) {
    console.error('> Error job', e);
  }

  return null;
};
