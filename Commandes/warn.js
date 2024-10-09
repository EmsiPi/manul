const { PermissionsBitField } = require('discord.js');
const Discord = require("discord.js");

module.exports = {
    name : "warn",

    async run(bot, message){
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)){
            message.channel.send("Tutut ! t'as pas le droit toi !")
            return;
        }
        const listewarn = ['chiant', 'eh']
        const warn = message.content.split(/ +/)[2];
        console.log(warn)
        const target = message.mentions.members.first();
        if (!listewarn.includes(warn)){
            message.channel.send("Ce warn n'est pas dans la liste des warn qui m'a été donnée, envoie un warn personnalisé avec !warn p.[ce que tu veux envoyer] ou check les warn de la liste !");
            return;
        }
        if (target == null){
            message.channel.send("Il faut préciser quel type de warn je dois envoyer");
            return;
        }
        if (target.id == bot.user.id){
            message.channel.send("Je suis gentil j'ai pas besoin de warn moi...");
            return;
        }
        if (warn == "pouêt" ){
            target.send("pouêt")
        }
        if (warn == "chiant"){
            target.send(" /! **WARN** : Un modérateur de la Montagne m'a soufflé que tu n'étais pas sage, attention à tes oreilles ! Au 3ème warn, tu seras kick");
        }
        if (warn == "eh"){
            target.send(" /! **WARN** : EH");
        }


    }
}