import { modifyLatestData } from './utils';
import { writeNewReport } from './file';

const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GIST_TOKEN,
});

export const updateGist = async (name: string, device: string, response: any) => {
  const lastData = await octokit.gists.get({
    gist_id: process.env.GIST_ID,
  });
  const FILENAME = 'webperf-ecommerce-id.json';

  if (lastData) {
    console.log(`> [GIST] - get existing data from ${FILENAME}...\n`);
  }

  try {
    // @ts-ignore
    const objectData = JSON.parse(lastData.data.files[FILENAME].content);
    const newValue = modifyLatestData(objectData, response, name, device);

    writeNewReport(newValue);

    await octokit.gists.update({
      gist_id: process.env.GIST_ID,
      files: {
        [FILENAME]: {
          content: JSON.stringify(newValue),
          filename: FILENAME,
        },
      },
    });
  } catch (e) {
    console.error('> Error gist', e);
  }
};
