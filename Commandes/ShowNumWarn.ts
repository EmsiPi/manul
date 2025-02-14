import { Client, Message } from "discord.js";
import WarnService from "../services/warnService/WarnService";

export default {
    name: "showNumWarn",
    description: "Après la commande, pinger le membre souhaité. Je te donnerai le nombre de warn à son actif.",
    async run(bot: Client, message: Message<boolean>) {
        await WarnService.showNumWarn(bot, message);
    }
}