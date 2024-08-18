const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(53608447)
const bot = new Discord.Client({intents})
const config = require("./config")
const loadCommands = require("./Loaders/loadCommands")

bot.commands = new Discord.Collection()

bot.login(config.token)
loadCommands(bot)

bot.on("messageCreate", async message => {
	
	if(message.content === "!ping") return bot.commands.get("ping").run(bot,message)

})

bot.on("ready", async() => {

	console.log(`${bot.user.tag} est bien en ligne ! OWOWA `)
})