import { Client, Message } from "discord.js";
import pingService from "../services/pingService/PingService";
import MessageService from "../services/messageService/MessageService";

export default {
	name: "ping",
     description: "Donne des informations sur le ping de Discord.",
	async run(bot: Client, message: Message<boolean>) {
		await MessageService.reply(message,`Ping : \`${await pingService.getPing(bot)}\``);
	}
}

	