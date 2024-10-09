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
        if (warn == "p"){
            const str = message.content
            console.log(str)
            const stri = str.replace(str.split(/ +/)[0]," ");
            console.log(stri)
            const strin = stri.replace(stri.split(/ +/)[1]," ")
            console.log(strin)
            const newwarn= strin.replace(strin.split(/ +/)[1]," ");
            console.log (newwarn)
            target.send(newwarn);
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