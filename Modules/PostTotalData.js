const { tokens } = require("../Configurations/auth.js");
const snekfetch = require("snekfetch");

module.exports = async client => {
	const totalAmount = await client.guilds.totalCount;
	if (tokens.discordList) {
		let res;
		try {
			res = await snekfetch.post(`https://bots.discordlist.net/api`).set("Content-Type", "application/x-www-form-urlencoded").send({
				token: tokens.discordList,
				servers: totalAmount,
			});
		} catch (err) {
			winston.warn(`Failed to post to Discordlist.net >~<`, err);
		}
		if (res && res.statusCode === 200) {
			winston.info(`Succesfully POSTed to Discordlist.net`);
		} else {
			winston.warn(`Failed to POST to Discordlist.net`, { statusCode: res.statusCode });
		}
	}
};
