const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GIST_TOKEN,
});

const FILENAME = 'webperf-ecommerce-id.json';
export const updateGist = async (newValue: any) => {
  try {
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
    console.error('> [GIST] - failed update gist', e);
  }
};
