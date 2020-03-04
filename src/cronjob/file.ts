import fs from 'fs';
import path from 'path';
import appRootDir from 'app-root-dir';
import { cleanStr } from './utils'

export const REPORT_DIR = path.join(path.resolve(appRootDir.get()), `/reports`);
export const REPORT_FILE = path.join(REPORT_DIR, `/output.json`);
export const getFileByNameAndDevice = (name: string, device: string, index: number) => {
	const date = new Date();
	const todayDate = date.toISOString().substring(0, 10);
	return path.join(REPORT_DIR, `/${cleanStr(name)}/${device}/${todayDate}-${index}.json`);
}

export const writeFile = (filename, content): Promise<any> => {
  return new Promise(function(resolve, reject) {
    fs.writeFile(filename, content, 'utf-8', function(err) {
      if (err) reject(err);
      else resolve(content);
    });
  });
};

export const writeNewReport = (content: any): void => {
  writeFile(REPORT_FILE, JSON.stringify(content));
};

export const readFileReport = (onSuccess): void => {
	fs.readFile(REPORT_FILE, (err, data) => {
		if (err) throw err;
		onSuccess(data);
	});
}
