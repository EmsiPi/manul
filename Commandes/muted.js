const { Client, Message } = require("discord.js");
const muteService = require("../services/muteService/MutedService");

module.exports = {
	name: "muted",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
	async run(bot, message) {
        await muteService.mute(bot, message);
	}
}
