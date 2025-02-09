const { Client, Message } = require("discord.js");
const embedService = require("../services/embedService/EmbedService")

module.exports = {
    name: "help",
    description: "AAAAAH CEST LES AIDES QUAND FAUT AIDER ON M4APPELLE",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot, message) {
        await embedService.helpEmbed(bot, message);
    }
}