import { Client, Message } from "discord.js";
import ImageService from "../services/imageService/ImageStorageService";

export default {
    name: "stockImage",
    description: "Après le nom de la commande, envoyer l'image souhaitant être enregistrée. Preciser le tag de l'image pour la retrouver facilement.",
    async run(bot: Client, message: Message<boolean>) {
        await ImageService.stock(bot, message);
    }
}