const { Client, Message } = require("discord.js");
const pingService = require("../services/pingService/PingService");


module.exports = {
	name: "ping",
	/**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
	async run(bot, message) {
		await message.reply(`Ping : \`${pingService.getPing(bot)}\``);
	}
}

	