const { Client, Message } = require("discord.js");
const addWarnService = require("../services/warnService/addWarnService");

module.exports = {
    name : "addWarn",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot, message) {
        await addWarnService.addWarn(bot, message);
    }
}