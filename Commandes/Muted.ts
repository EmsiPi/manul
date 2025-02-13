import { CommandManulClient } from "../Loaders/loadCommands";

import { Client, Message } from "discord.js";
import muteService from "../services/mutedService/MutedService";

export default {
    name: "muted",
    description: "bah ça mute lol",
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
	async run(bot: CommandManulClient, message: Message<boolean>) {
        await muteService.mute(bot, message);
    }
}
