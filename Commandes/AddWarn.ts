import { Client, Message } from "discord.js";
import warnTypeService from "../services/warnService/WarnTypeService";
import { CommandManulClient } from "../Loaders/loadCommands";

export default {
    name: "addWarn",
    description: "Après le nom de la commande, donner le nom voulu du warn suivit par le message assigné.",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot: CommandManulClient, message: Message<boolean>) {
        await warnTypeService.addWarn(bot, message);
    }
}