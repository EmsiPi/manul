const {Client, Message, PermissionsBitField, User } = require("discord.js");

class EmbedService { 
    
    async helpEmbed () { 
        fs.readdirSync("./Commandes").filter(f => f.endsWith(".js")).forEach(async file => {
            const command = require(`../Commandes/${file}`);
            const descriptionCommand = command.description;



        })
    }
}