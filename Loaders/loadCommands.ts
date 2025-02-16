import fs from "fs";
import logService from "../services/logService/LogService";
import { BotCommand } from "./BotCommand";

export default async (): Promise<Map<String, BotCommand>> => {
    // boucle sur tous les fichiers JS contenus dans le dossier Commandes pour en récupérer chaque module, correspondant au nom de la commande et à sa fonction
    return new Map(fs.readdirSync(__dirname+"/../Commandes")
        .filter((f:String) => f.endsWith(".js"))
        .map((file:String) => {
            const command = require(`../Commandes/${file}`).default;
            if(!command.name || typeof command.name !== "string") throw new TypeError(`La commande pour le fichier ${file.slice(0, file.length - 3)} n'a pas de nom !`);
            
            logService.info(`Commande ${command.name} chargée avec succès !`);
            return [command.name as String, new BotCommand(command.name, command.description, command.run)];
        }));
}
