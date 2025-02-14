import { Client, Message } from "discord.js";
import WarnService from "../services/warnService/WarnService";

export default {
    name: "delwarn",
    description: "Après la commande, pingez le membre souhaité pour lui retirer __tous__ ses warns.",
    async run(bot: Client, message: Message<boolean>) {
        await WarnService.delwarn(bot, message);
    }
}