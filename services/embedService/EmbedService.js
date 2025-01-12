const fs = require("fs")
const {Client, Message, PermissionsBitField, User } = require("discord.js");
const { sendEmbedChannel } = require("../messageService/MessageService");

class EmbedService { 
    /**
     * @type {EmbedService}
     */
    static #instance;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new EmbedService();
        }

        return this.#instance;
    }
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     */
    async helpEmbed (bot, message) { 
        const content = message.content;
        const contentArray = content.split(/ +/);
        const command = contentArray.shift(); // !help
        const helpName = contentArray.shift();
        const guildChannel = message.channel
        fs.readdirSync("./Commandes").filter(f => f.endsWith(".js")).forEach(async file => {
            const command = require(`../../Commandes/${file}`);

            const nameCommand = command.name
            if (command.name == helpName) {
                const descriptionCommand = command.description;
                const embedContent = {
                    color: 0x0099ff,
                    title: nameCommand,
                    description: descriptionCommand,
                }
                sendEmbedChannel(guildChannel, embedContent);
            }
        })
    }
}

module.exports = EmbedService.getInstance()