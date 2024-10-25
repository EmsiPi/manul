const Discord = require("discord.js");
const loadCommands = require("./Loaders/loadCommands");

const PREFIX = "!";
const COMMAND_MIN_LENGTH = 1;
// pattern déterminant si l'utilisateur veut utiliser une commande ou non
const REGEX_COMMAND = "^(" + PREFIX + ")" + ".{" + COMMAND_MIN_LENGTH + ",}";

const intents = new Discord.IntentsBitField(53608447);
const bot = new Discord.Client({intents});

const TOKEN = process.env.TOKEN;
const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const MONGO_PORT = process.env.MONGO_PORT;

bot.commands = new Discord.Collection();
bot.login(process.env.TOKEN);
loadCommands(bot);


bot.on("messageCreate", onCreateMessage);

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
	return str.substring(PREFIX.length).split(' ')[0];
}



// partie bdd

const {MongoClient, UUID} = require('mongodb');

const uri = "mongodb://" + MONGO_USERNAME + ":" + MONGO_PASSWORD + "@localhost:" + MONGO_PORT;
const mongoClient = new MongoClient(uri);
const testDb = mongoClient.db("test")
const testCollection = testDb.collection("test")

var object1 = {
	"_id": UUID.createFromHexString("61eb3873-4992-4364-a8c7-c6d38433143f"),
	"test": "manul1"
}
var object2 = {
	"_id": new UUID(),
	"test": "manul2"
}

testCollection.insertMany([object1, object2]).then(async res => {
	const findAll = testCollection.find({}).toArray();
	findAll.then(res => {
		console.log("find all :");
		console.log(res);
	})

	const findOne = await testCollection.findOne({_id: UUID.createFromHexString("61eb3873-4992-4364-a8c7-c6d38433143f")});
	console.log("find one :");
	console.log(findOne);
});

