import { Client, Message } from "discord.js";
import warnService from "../services/warnService/WarnService";
import { CommandManulClient } from "../Loaders/loadCommands";

export default {
    name: "showNumWarn",
    description: "Après la commande, pinger le membre souhaité. Je te donnerai le nombre de warn à son actif.",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot: CommandManulClient, message: Message<boolean>) {
        await warnService.showNumWarn(bot, message);
    }
}