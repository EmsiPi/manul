const { Client, Message } = require("discord.js");
const ImageService = require("../services/imageService/ImageStorageService");

module.exports = {
    name: "giveImageTag",
    description: "Après le nom de la commande, précise le tag des images que tu souhaites renvoyer.",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot, message) {
        await ImageService.giveImageTag(bot,message);
    }
}