const { Client, Message } = require("discord.js");
const pingService = require("../services/pingService/PingService");
const messageService = require("../services/messageService/MessageService")

module.exports = {
	name: "ping",
     description: "pong.",
	/**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
	async run(bot, message) {
		await messageService.reply(message,`Ping : \`${await pingService.getPing(bot)}\``);
	}
}

	