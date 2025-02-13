import { Client, Message } from "discord.js";
import ImageService from "../services/imageService/ImageStorageService";
import { CommandManulClient } from "../Loaders/loadCommands";

export default {
    name: "stockImage",
    description: "Après le nom de la commande, envoyer l'image souhaitant être enregistrée. Preciser le tag de l'image pour la retrouver facilement.",

    async run(bot: CommandManulClient, message: Message<boolean>) {
        await ImageService.stock(bot, message);
    }
}