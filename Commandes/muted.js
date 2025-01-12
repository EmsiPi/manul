const { Client, Message } = require("discord.js");
const muteService = require("../services/mutedService/MutedService");

module.exports = {
    name: "muted",
    description: "bah ça mute lol",
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
