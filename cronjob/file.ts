import fs from 'fs';
import path from 'path';
import appRootDir from 'app-root-dir';

export const REPORT_DIR = path.join(path.resolve(appRootDir.get()), `/reports`);
export const REPORT_JSON_FILE = path.join(REPORT_DIR, `/output.json`);
export const REPORT_TS_FILE = path.join(REPORT_DIR, `/output.ts`);

export const writeFile = (filename: string, content: string): Promise<any> => {
  return new Promise(function (resolve, reject) {
    fs.writeFile(filename, content, 'utf-8', function (err) {
      if (err) reject(err);
      else resolve(content);
    });
  });
};

export const writeNewReport = (content: any): void => {
  writeFile(REPORT_JSON_FILE, JSON.stringify(content));
  writeFile(REPORT_TS_FILE, `export default ${JSON.stringify(content)}`);
};

export const readFileReport = (onSuccess): void => {
  fs.readFile(REPORT_JSON_FILE, (err, data) => {
    if (err) throw err;
    onSuccess(data);
  });
};
