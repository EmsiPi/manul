const fs = require("fs")
const logService = require("../services/logService/LogService")

module.exports = async bot => {
    // boucle sur tous les fichiers JS contenus dans le dossier Commandes pour en récupérer chaque module, correspondant au nom de la commande et à sa fonction
    fs.readdirSync("./Commandes").filter(f => f.endsWith(".js")).forEach(async file => {
        const command = require(`../Commandes/${file}`);
        if(!command.name || typeof command.name !== "string") throw new TypeError(`La commande pour le fichier ${file.slice(0, file.length - 3)} n'a pas de nom !`);
        bot.commands.set(command.name, command);
        logService.info(`Commande ${command.name} chargée avec succès !`);
    });
}
