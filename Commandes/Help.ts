import { Client, Message } from "discord.js";
import embedService from "../services/embedService/EmbedService";
import { CommandManulClient } from "../Loaders/loadCommands";

export default {
    name: "help",
    description: "AAAAAH CEST LES AIDES QUAND FAUT AIDER ON M4APPELLE",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot: CommandManulClient, message: Message<boolean>) {
        await embedService.helpEmbed(bot, message);
    }
}