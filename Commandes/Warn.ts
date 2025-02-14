import { Client, Message } from "discord.js";
import WarnService from "../services/warnService/WarnService";

export default {
    name: "warn",
    description: "Après la commande, pinger le membre à warn puis donner le nom d'un des warn pré-enregistré. Si tu souhaites envoyer un message précis note \"p\" entre le ping et ton message.",
    async run(bot: Client, message: Message<boolean>) {
        await WarnService.warn(bot, message);
    }
}