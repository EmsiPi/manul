import { Client, Message } from "discord.js";
import WarnTypeService from "../services/warnService/WarnTypeService";

export default  {
    name: "showWarnType",
    description: "Donne la liste de tous les warns préenregistrés dans ma base de données, utile si tu ne sais pas avec quoi warn !.",
    async run(bot: Client, message: Message<boolean>) {
        await WarnTypeService.showWarnType(bot, message);
    }
}