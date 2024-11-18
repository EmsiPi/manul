const { Client, Message } = require("discord.js");
const warnTypeService = require("../services/warnService/WarnTypeService");

module.exports = {
    name : "addWarn",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot, message) {
        await warnTypeService.addWarn(bot, message);
    }
}