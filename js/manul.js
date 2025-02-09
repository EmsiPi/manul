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
const Discord = require("discord.js");
const loadCommands = require("./Loaders/loadCommands");
const messageService = require("./services/messageService/MessageService");
const logService = require("./services/logService/LogService");
const ControlledException = require("./ControlledException");
const PREFIX = "!";
const COMMAND_MIN_LENGTH = 1;
// pattern déterminant si l'utilisateur veut utiliser une commande ou non
const REGEX_COMMAND = "^(" + PREFIX + ")" + ".{" + COMMAND_MIN_LENGTH + ",}";
const intents = new Discord.IntentsBitField(53608447);
const bot = new Discord.Client({ intents });
const TOKEN = process.env.TOKEN;
bot.commands = new Discord.Collection();
bot.login(TOKEN);
loadCommands(bot);
bot.on("messageCreate", onCreateMessage);
/**
 * Permet de récupérer et lancer la commande appelée par le message de l'utilisateur
 * dans le cas où celui-ci fait référence à une commande valide et existante.
 * @param {Discord.Message<boolean>} message
 */
function onCreateMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const commandName = getCommandName(message.content);
        if (commandName == null) {
            // le message n'est pas une commande
            return;
        }
        const command = bot.commands.get(commandName);
        if (command == null) {
            // aucune commande trouvée
            return;
        }
        try {
            yield command.run(bot, message);
        }
        catch (error) {
            if (error instanceof ControlledException) {
                messageService.reply(message, error.message);
                return;
            }
            logService.error(error.stack);
            messageService.reply(message, "Une erreur est survenue, veuillez contacter un administrateur si le problème persiste.");
        }
    });
}
/**
 * Retourne la commande de l'utilisateur à partir du message,
 * ou null si le message n'est une commande valide.
 * @param {String} str
 * @returns
 */
function getCommandName(str) {
    if (!str.match(REGEX_COMMAND)) {
        return null;
    }
    return str.substring(PREFIX.length).split(' ')[0];
}
