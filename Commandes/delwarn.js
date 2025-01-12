const { Client, Message } = require("discord.js");
const warnService = require("../services/warnService/WarnService");

module.exports = {
    name : "delwarn",
    description : "Après la commande, pingez le membre souhaité pour lui retirer __tous__ ses warns"
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot, message) {
        await warnService.delwarn(bot, message);
    }
}