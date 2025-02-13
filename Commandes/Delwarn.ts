import { Client, Message } from "discord.js";
import warnService from "../services/warnService/WarnService";
import { CommandManulClient } from "../Loaders/loadCommands";

export default {
    name: "delwarn",
    description: "Après la commande, pingez le membre souhaité pour lui retirer __tous__ ses warns.",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot: CommandManulClient, message: Message<boolean>) {
        await warnService.delwarn(bot, message);
    }
}