import { Client, Message } from "discord.js";
import MuteService from "../services/mutedService/MutedService";

export default {
    name: "muted",
    description: "bah ça mute lol",
	async run(bot: Client, message: Message<boolean>) {
        await MuteService.mute(bot, message);
    }
}
