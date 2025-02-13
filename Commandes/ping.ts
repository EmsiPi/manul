import { Client, Message } from "discord.js";
import pingService from "../services/pingService/PingService";
import messageService from "../services/messageService/MessageService";
import { CommandManulClient } from "../Loaders/loadCommands";

export default {
	name: "ping",
	/**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
	async run(bot: CommandManulClient, message: Message<boolean>) {
		await messageService.reply(message,`Ping : \`${await pingService.getPing(bot)}\``);
	}
}

	