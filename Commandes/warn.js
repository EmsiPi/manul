const Discord = require("discord.js");
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name : "warn",

    async run(bot, message){
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)){
            message.channel.send("Tutut ! t'as pas le droit toi !")
            return;
        }
        const listewarn = ['chiant', 'eh'];
        const warn = message.content.split(/ +/)[2];
        const target = message.mentions.members.first();
        if (target == null){
            message.channel.send("t bet");
            return;
        }
        if (warn == null){
            message.channel.send("Il faut préciser quel type de warn je dois envoyer");
            return;
        }
        if (!listewarn.includes(warn) && warn != ("p")){
            message.channel.send("Ce warn n'est pas dans la liste des warn qui m'a été donnée, envoie un warn personnalisé avec !warn p.[ce que tu veux envoyer] ou check les warn de la liste !");
            return;
        }
        if (target.id == bot.user.id){
            message.channel.send("Je suis gentil j'ai pas besoin de warn moi...");
            return;
        }
        if(warn == "p") {
            const PREFIX = "!"
            const content = message.content;
            const contentArray = content.split(/ +/);
            const command = contentArray.shift(); // !warn
            const mention = contentArray.shift(); // @ronan3290
            const p = contentArray.shift(); // p
            const verificationPREFIX = contentArray[0];
            const messageToSend = contentArray.join(" ");
            if (verificationPREFIX.split('')[0] == PREFIX) {
                message.channel.send("le ! me dérange dans ton warn pour l'envoyer");
                return;
            } 
            target.send(messageToSend);
            return;
          }
        if (warn == "pouêt" ){
            target.send("pouêt");
            return;
        }
        if (warn == "chiant"){
            target.send(" /! **WARN** : Un modérateur de la Montagne m'a soufflé que tu n'étais pas sage, attention à tes oreilles ! Au 3ème warn, tu seras kick");
            return;
        }
        if (warn == "eh"){
            target.send(" /! **WARN** : EH");
            return;
        }


    }
}