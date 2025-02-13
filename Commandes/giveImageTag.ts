import { CommandManulClient } from "../Loaders/loadCommands";

import { Client, Message } from "discord.js";
import ImageService from "../services/imageService/ImageStorageService";

export default {
    name: "giveImageTag",
    description: "Après le nom de la commande, précise le tag des images que tu souhaites renvoyer.",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot: CommandManulClient, message: Message<boolean>) {
        await ImageService.giveImageTag(bot,message);
    }
}