const { Client, Message } = require("discord.js");
const warnTypeService = require("../services/warnService/WarnTypeService");

module.exports = {
    name: "addWarn",
    description: "Après le nom de la commande, donner le nom voulu du warn suivit par le message assigné.",
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