import Table from 'cli-table3';

import data from '../constants/ecommerce';
import runLH from './lh';
import { updateReport } from './report';
import { EcommerceItem } from '../types';
import { quantile } from './utils';

const NUMBER_OF_RUN = 5;
const PERCENTILE_NUM = 0.75;

const runJob = async (name: string, url: string, device: string): Promise<any | null> => {
  const results: any[] = [];
  const tableLog = new Table({
    head: ['Perf', 'FID', 'CLS', 'LCP', 'TTI'],
  });

  for (let i = 0; i < NUMBER_OF_RUN; i++) {
    const response = await runLH(name, url, device);
    if (response) {
      results.push(response);
      tableLog.push([response.perf, response.fid, response.cls, response.lcp, response.tti]);
    }
  }

  console.log(`\nPerformance Result for ${name} - ${device}`);
  console.log(tableLog.toString());
  console.log(`\n`);

  const report = quantile(results, PERCENTILE_NUM, 'perf');
  updateReport(name, device, report);
};

// Main function, will invoked immediatelly
(() => {
  let isSecretNotFound = false;
  if (process.env.PSI_API_KEY) {
    console.log(`> Found env PSI_API_KEY`);
  } else {
    isSecretNotFound = true;
    console.error(`> env PSI_API_KEY not found`);
  }

  if (!isSecretNotFound) {
    data.map(async (item: EcommerceItem) => {
      await runJob(item.name, item.urlMobile, 'mobile');
      await runJob(item.name, item.urlDesktop, 'desktop');
    });
  }
})();
