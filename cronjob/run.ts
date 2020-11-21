import Table from 'cli-table3';
import ora from 'ora';
import chalk from 'chalk';

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
    const spinner = ora('Getting performance score').start();
    const response = await runLH(name, url, device);
    if (response) {
      results.push(response);
      tableLog.push([
        (response.perf * 100).toFixed(0),
        response.fid.toFixed(0),
        response.cls.toFixed(2),
        (response.lcp / 1000).toFixed(2),
        (response.tti / 1000).toFixed(2),
      ]);
      spinner.succeed(`${i} Success get performance score`);
    } else {
      spinner.fail(`${i} Failed get performance score`);
    }
  }

  console.log(chalk.greenBright(`\nPerformance Result for ${name} - ${device}`));
  console.log(tableLog.toString());

  const report = quantile(results, PERCENTILE_NUM, 'perf');
  updateReport(name, device, report);
};

// Main function, will invoked immediatelly
(() => {
  let isSecretNotFound = false;
  if (process.env.PSI_API_KEY) {
    console.log(chalk.bold.red(`> Found env PSI_API_KEY`));
  } else {
    isSecretNotFound = true;
    console.error(chalk.bold.red(`> env PSI_API_KEY not found`));
  }

  if (!isSecretNotFound) {
    data.map(async (item: EcommerceItem) => {
      await runJob(item.name, item.urlMobile, 'mobile');
      await runJob(item.name, item.urlDesktop, 'desktop');
    });
  }
})();
