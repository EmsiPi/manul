const { Client, Message } = require("discord.js");
const warnTypeService = require("../services/warnService/WarnTypeService");

module.exports = {
    name: "showWarnType",
    description: "Donne la liste de tous les warns préenregistrés dans ma base de données.",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot, message) {
        await warnTypeService.showWarnType(bot, message);
    }
}