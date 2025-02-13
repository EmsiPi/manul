import fs from "fs";
import logService from "../services/logService/LogService";
import { Client } from "discord.js";

type BotCommand = (bot: Client, message: string)=>void 
export type CommandManulClient = Client & {
    commands: Map<string, BotCommand>
}

export default async (bot: CommandManulClient) => {
    // boucle sur tous les fichiers JS contenus dans le dossier Commandes pour en récupérer chaque module, correspondant au nom de la commande et à sa fonction
    fs.readdirSync(__dirname+"/../Commandes").filter((f:String) => f.endsWith(".js")).forEach(async (file:String) => {
        const command = require(`../Commandes/${file}`);
        if(!command.name || typeof command.name !== "string") throw new TypeError(`La commande pour le fichier ${file.slice(0, file.length - 3)} n'a pas de nom !`);
        bot.commands.set(command.name, command);
        logService.info(`Commande ${command.name} chargée avec succès !`);
    });
}
