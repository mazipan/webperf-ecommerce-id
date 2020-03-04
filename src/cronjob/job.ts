import Table from 'cli-table3';

import data from './ecommerce';
import runLH from './lh';
import { updateReport } from './report';
import { EcommerceItem } from './types';
import { quantile } from './utils';

const NUMBER_OF_RUN = 5;
const PERCENTILE_NUM = 0.75;

const run = async (name: string, url: string, device: string): Promise<any | null> => {
  const results: any[] = [];
  const tableLog = new Table({
    head: ['Perf', 'TTFB', 'FCP', 'TTI'],
  });

  for (let i = 0; i < NUMBER_OF_RUN; i++) {
    const response = await runLH(name, url, device, i);
    if (response) {
      results.push(response);
      // @ts-ignore
      tableLog.push([response.perf, response.ttfb, response.fcp, response.tti]);
    }
  }

  console.log(`\nPerformance Result for ${name} - ${device}`);
  console.log(tableLog.toString());
  console.log(`\n`);

  const report = quantile(results, PERCENTILE_NUM, 'perf');
  updateReport(name, device, report);
};

const readData = () => {
  let isSecretNotFound = false;
  if (process.env.PSI_API_KEY) {
    console.log(`> Found env PSI_API_KEY`);
  } else {
    isSecretNotFound = true;
    console.error(`> env PSI_API_KEY not found`);
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
    });
  }
};

readData();
