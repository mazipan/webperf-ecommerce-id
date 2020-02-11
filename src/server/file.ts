import fs from 'fs';

export const writeFile = (filename, content) => {
	return new Promise(function (resolve, reject) {
		fs.writeFile(filename, content, 'utf-8', function (err) {
			if (err) reject(err);
			else resolve(content);
		});
	});
}
