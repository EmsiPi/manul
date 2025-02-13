import { Client, Message } from "discord.js";
import warnTypeService from "../services/warnService/WarnTypeService";
import { CommandManulClient } from "../Loaders/loadCommands";

export default  {
    name: "showWarnType",
    description: "Donne la liste de tous les warns préenregistrés dans ma base de données, utile si tu ne sais pas avec quoi warn !.",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot: CommandManulClient, message: Message<boolean>) {
        await warnTypeService.showWarnType(bot, message);
    }
}