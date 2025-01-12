const { Client, Message } = require("discord.js");
const warnService = require("../services/warnService/WarnService");

module.exports = {
    name: "warn",
    description: "après la commande, pinger le membre à warn puis donner le nom d'un des warn pré-enregistré. Si tu souhaites envoyer un message précis note \"p\" entre le ping et ton message",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot, message) {
        await warnService.warn(bot, message);
    }
}