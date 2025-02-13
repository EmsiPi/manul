import { CommandManulClient } from "../Loaders/loadCommands";

import { Client, Message } from "discord.js";
import warnService from "../services/warnService/WarnService";

export default {
    name: "warn",
    description: "Après la commande, pinger le membre à warn puis donner le nom d'un des warn pré-enregistré. Si tu souhaites envoyer un message précis note \"p\" entre le ping et ton message.",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async run(bot: CommandManulClient, message: Message<boolean>) {
        await warnService.warn(bot, message);
    }
}