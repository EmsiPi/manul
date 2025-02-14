import { Client, Message } from "discord.js";
import EmbedService from "../services/embedService/EmbedService";

export default {
    name: "help",
    description: "AAAAAH CEST LES AIDES QUAND FAUT AIDER ON M4APPELLE",
    async run(bot: Client, message: Message<boolean>) {
        await EmbedService.helpEmbed(bot, message);
    }
}