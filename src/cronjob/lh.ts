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

			const fcp = audits?.['first-contentful-paint']?.numericValue || 0;
			const lcp = audits?.['largest-contentful-paint']?.numericValue || 0;
			const cls = audits?.['cumulative-layout-shift']?.numericValue || 0;
			const ttfb = audits?.['time-to-first-byte']?.numericValue || 0;
			const fci = audits?.['first-cpu-idle']?.numericValue || 0;
			const tti = audits?.['interactive']?.numericValue || 0;
			const si = audits?.['speed-index']?.numericValue || 0;
			const perf = categories?.performance?.score || 0;
			const req = totalResources?.requestCount || 0;
			const size = totalResources?.size || 0;

      const response: LHResponse = {
        perf,
        fcp,
        lcp,
        cls,
        ttfb,
        fci,
        tti,
				si,
				size,
				req,
        name,
        device,
      };

      return response;
    }
  } catch (e) {
    console.error('> Error job', e);
  }

  return null;
};
