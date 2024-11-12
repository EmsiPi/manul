const { Client, Message } = require("discord.js");
const warnService = require("../services/warnService/WarnService");

module.exports = {
    name : "addWarn",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot, message) {
        await warnService.addWarn(bot, message);
    }
}