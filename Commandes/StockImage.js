const { Client, Message } = require("discord.js");
const ImageService = require("../services/imageService/ImageTypeService");

module.exports = {
    name: "stockImage",
    description: "Après le nom de la commande, envoyer l'image souhaitant être enregistrée. Preciser le tag de l'image pour la retrouver facilement.",
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