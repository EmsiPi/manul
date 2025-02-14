import Discord from "discord.js";
import loadCommands from "./Loaders/loadCommands";
import messageService from "./services/messageService/MessageService";
import logService from "./services/logService/LogService";
import { ControlledException } from "./ControlledException";
import { BotCommand } from "./Loaders/BotCommand";

const PREFIX = "!";
const COMMAND_MIN_LENGTH = 1;
// pattern déterminant si l'utilisateur veut utiliser une commande ou non
const REGEX_COMMAND = "^(" + PREFIX + ")" + ".{" + COMMAND_MIN_LENGTH + ",}";

const intents = new Discord.IntentsBitField(53608447);
const bot = new Discord.Client({intents});
const commandContainer = new Map<string, BotCommand>();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);
loadCommands(commandContainer);
bot.on("messageCreate", onCreateMessage);

/**
 * Permet de récupérer et lancer la commande appelée par le message de l'utilisateur
 * dans le cas où celui-ci fait référence à une commande valide et existante.
 * @param {Discord.Message<boolean>} message 
 */
async function onCreateMessage(message: Discord.Message<boolean>) {
	const commandName = getCommandName(message.content);
	if(commandName == null) {
		// le message n'est pas une commande
		return;
	}

	const command = commandContainer.get(commandName);
	if(command == null) {
		// aucune commande trouvée
		return;
	}

	try {
		await command.run(bot, message);
	} catch(error: any) {
		if(error instanceof ControlledException) {
			messageService.reply(message, error.message);
			return;
		}

		if (!(error instanceof Error)) {
			logService.error("Type d'erreur non reconnue : \n" + error.stack);
		}		

		logService.error(error.stack);
		messageService.reply(message, "Une erreur est survenue, veuillez contacter un administrateur si le problème persiste.");
	}
}

/**
 * Retourne la commande de l'utilisateur à partir du message,
 * ou null si le message n'est une commande valide.
 * @param {String} str 
 * @returns 
 */
function getCommandName(str: String) {
	if(!str.match(REGEX_COMMAND)) {
		return null;
	} 
	return str.substring(PREFIX.length).split(' ')[0];
}




