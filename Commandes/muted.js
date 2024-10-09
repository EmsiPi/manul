const { PermissionsBitField } = require('discord.js');
const Discord = require("discord.js");
module.exports = {
	name: "muted",
    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message<boolean>} message 
     * @returns 
     */
	async run(bot,message) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)){
            message.channel.send("Tutut ! t'as pas le droit toi !")
            return;
        }
        const timeout = Number(message.content.split(/ +/)[2])
        const target = message.mentions.members.first();
        if (target == null){
            message.channel.send("t bet");
            return;
        }
        if (target.id == bot.user.id){
            message.channel.send("Eh, pas touche !");
            return;
        }
        if (!Number.isInteger(timeout)||timeout <= 0 ){
            message.channel.send("c'est pas un entier positif enculé");
            return;
        }
        if (timeout>=100){
            message.channel.send("On a pas l'éternité ici, bannez moi ce fripon !");
                return;
        }
        const mutedRole = message.guild.roles.cache.find(
            (role) => role.name === 'Muted'
            );
        await target.roles.add(mutedRole);
        setTimeout(() => {
                arget.roles.remove(mutedRole); // remove the role
        }, timeout * 60000);            
	}
}
