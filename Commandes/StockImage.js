const { Client, Message } = require("discord.js");
const ImageService = require("../services/imageService/ImageService");

module.exports = {
    name: "stockImage",
    description: "Après le nom de la commande, envoyer l'image souhaitant être enregistrée.",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot, message) {
        await ImageService.stock(bot, message);
    }
}