const Discord = require("discord.js");
const loadCommands = require("./Loaders/loadCommands");
const loadEvents = require("./Loaders/loadEvents");

const PREFIX = "!";
const COMMAND_MIN_LENGTH = 1;
// pattern déterminant si l'utilisateur veut utiliser une commande ou non
const REGEX_COMMAND = "^(" + PREFIX + ")" + ".{" + COMMAND_MIN_LENGTH + ",}";

const intents = new Discord.IntentsBitField(53608447);
const bot = new Discord.Client({intents});

bot.commands = new Discord.Collection();
bot.login(process.env.TOKEN);
loadCommands(bot);
loadEvents(bot);

bot.on("messageCreate", onCreateMessage);
bot.on("ready", onReady);

async function onReady() {
	console.log(`${bot.user.tag} est bien en ligne ! OWOWA `)
}

/**
 * Permet de récupérer et lancer la commande appelée par le message de l'utilisateur
 * dans le cas où celui-ci fait référence à une commande valide et existante.
 * @param {Discord.Message<boolean>} message 
 */
async function onCreateMessage(message) {
	const commandName = getCommandName(message.content);
	if(commandName == null) {
		// le message n'est pas une commande
		return;
	}

	const command = bot.commands.get(commandName);
	if(command == null) {
		// aucune commande trouvée
		return;
	}

	command.run(bot, message);
}

/**
 * Retourne la commande de l'utilisateur à partir du message,
 * ou null si le message n'est une commande valide.
 * @param {String} str 
 * @returns 
 */
function getCommandName(str) {
	if(!str.match(REGEX_COMMAND)) {
		return null;
	}

	return str.substring(PREFIX.length);
}