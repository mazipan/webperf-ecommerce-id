import fs from 'fs';
import path from 'path';
import appRootDir from 'app-root-dir';

export const writeFile = (filename, content): Promise<any> => {
  return new Promise(function(resolve, reject) {
    fs.writeFile(filename, content, 'utf-8', function(err) {
      if (err) reject(err);
      else resolve(content);
    });
  });
};

export const writeNewReport = (content: any): void => {
  const reportFileDir = path.join(path.resolve(appRootDir.get()), `/reports/output.json`);
  writeFile(reportFileDir, JSON.stringify(content));
};
