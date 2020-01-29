const Octokit = require("@octokit/rest");

const octokit = new Octokit({
	auth: process.env.GIST_TOKEN
});

export const updateGist = async (name: string, device: string, response: any) => {
	const todayDate = new Date().toISOString().substring(0, 10);

	const lastData = await octokit.gists.get({
		gist_id: process.env.GIST_ID,
	});

	if (lastData) {
		console.log('> [GIST] - get existing data...', lastData.data.files['webperf-ecommerce-id.json'].content);
	}

	try {
		const objectData = JSON.parse(lastData.data.files['webperf-ecommerce-id.json'].content);
		let newData = objectData[todayDate];

		if (!newData) {
			newData = [
				{
					name: name.toLowerCase(),
					[device]: {
						response,
					}
				}
			]
		} else if (newData) {
			const existing = newData.find(i => i.name.toLowerCase() === name.toLowerCase());
			if (existing) {
				const woExisting = newData.filter(i => i.name.toLowerCase() !== name.toLowerCase());
				newData = [
					...woExisting,
					{
						name: name.toLowerCase(),
						...existing,
						[device]: {
							response,
						}
					}
				];
			} else {
				newData = [
					...newData,
					{
						name: name.toLowerCase(),
						[device]: {
							response,
						}
					}
				];
			}
		}

		console.log('> [GIST] - updating value...');
		await octokit.gists.update({
			gist_id: process.env.GIST_ID,
			files: {
				content: { ...objectData, ...{ [todayDate]: newData } }
			}
		})

	} catch (e) {
		console.error('> Error gist', e);
	}
}
