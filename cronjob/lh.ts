import fetch from 'node-fetch';
import { LHResponse } from '../types';

export default async (name: string, url: string, device: string): Promise<LHResponse | null> => {
  const URL = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${
    process.env.PSI_API_KEY
  }&strategy=${device}`;

  try {
    const resp = await fetch(URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const result = await resp.json();

    if (result) {
      const loadingExperience = result?.loadingExperience || {};
      const lighthouseResult = result?.lighthouseResult || {};
      const categories = lighthouseResult?.categories || {};
      const audits = lighthouseResult?.audits || {};

      const totalResources = audits['resource-summary']?.details?.items?.[0] || {};

      const fieldData = loadingExperience.metrics || {};

      const fid = fieldData['FIRST_INPUT_DELAY_MS']?.percentile || 0;
      const fmp = audits['first-meaningful-paint']?.numericValue || 0;
      const fcp = audits['first-contentful-paint']?.numericValue || 0;
      const lcp = audits['largest-contentful-paint']?.numericValue || 0;
      const cls = audits['cumulative-layout-shift']?.numericValue || 0;
      const fci = audits['first-cpu-idle']?.numericValue || 0;
      const tbt = audits['total-blocking-time']?.numericValue || 0;
      const tti = audits['interactive']?.numericValue || 0;
      const si = audits['speed-index']?.numericValue || 0;

      const perf = categories?.performance?.score || 0;
      const req = totalResources.requestCount || 0;
      const size = totalResources.size || totalResources.transferSize || 0;

      const response: LHResponse = {
        perf,
        fid,
        lcp,
        cls,
        fmp,
        fcp,
        fci,
        tbt,
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
