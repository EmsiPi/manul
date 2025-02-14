import fs from "fs";
import logService from "../services/logService/LogService";
import { BotCommand } from "./BotCommand";

export default async (container: Map<string, BotCommand>) => {
    // boucle sur tous les fichiers JS contenus dans le dossier Commandes pour en récupérer chaque module, correspondant au nom de la commande et à sa fonction
    fs.readdirSync(__dirname+"/../Commandes").filter((f:String) => f.endsWith(".js")).forEach(async (file:String) => {
        const command = require(`../Commandes/${file}`).default;
        if(!command.name || typeof command.name !== "string") throw new TypeError(`La commande pour le fichier ${file.slice(0, file.length - 3)} n'a pas de nom !`);
        
        container.set(command.name, new BotCommand(command.name, command.description, command.run));
        logService.info(`Commande ${command.name} chargée avec succès !`);
    });
}
