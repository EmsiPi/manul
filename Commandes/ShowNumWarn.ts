const { Client, Message } = require("discord.js");
const warnService = require("../services/warnService/WarnService");

module.exports = {
    name: "showNumWarn",
    description: "Après la commande, pinger le membre souhaité. Je te donnerai le nombre de warn à son actif.",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot, message) {
        await warnService.showNumWarn(bot, message);
    }
}