const { PermissionsBitField } = require('discord.js');
const Discord = require("discord.js");

module.exports = {
    name : "warn",

    async run(bot, message){
        const warn = message.content.split(/ +/)[2];
        console.log(warn)
        const target = message.mentions.members.first();
        if (target == null){
            message.channel.send("il faut préciser quel type de warn je dois envoyer");
            return;
        }
        if (target.id == bot.user.id){
            message.channel.send("Je suis gentil j'ai pas besoin de warn moi...");
            return;
        }
        if (warn == "pouêt" ){
            target.send("pouêt")
        }


    }
}