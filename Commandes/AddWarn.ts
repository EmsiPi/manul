import { Client, Message } from "discord.js";
import WarnTypeService from "../services/warnService/WarnTypeService";

export default {
    name: "addWarn",
    description: "Après le nom de la commande, donner le nom voulu du warn suivit par le message assigné.",
    async run(bot: Client, message: Message<boolean>) {
        await WarnTypeService.addWarn(bot, message);
    }
}