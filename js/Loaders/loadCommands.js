"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require("fs");
const logService = require("../services/logService/LogService");
module.exports = (bot) => __awaiter(void 0, void 0, void 0, function* () {
    // boucle sur tous les fichiers JS contenus dans le dossier Commandes pour en récupérer chaque module, correspondant au nom de la commande et à sa fonction
    fs.readdirSync(__dirname + "/../Commandes").filter(f => f.endsWith(".js")).forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
        const command = require(`../Commandes/${file}`);
        if (!command.name || typeof command.name !== "string")
            throw new TypeError(`La commande pour le fichier ${file.slice(0, file.length - 3)} n'a pas de nom !`);
        bot.commands.set(command.name, command);
        logService.info(`Commande ${command.name} chargée avec succès !`);
    }));
});
