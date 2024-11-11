const { Client, Message, PermissionsBitField } = require("discord.js");
const { PermissionException, NoTargetException, BotTargetException, BadIntegerException, TimeoutTooLongException } = require("./MuteExceptions");

/**
 * 
 * @param {Client} bot 
 * @param {Message<boolean>} message 
 * @returns 
 * @throws { PermissionException, NoTargetException, BotTargetException, TimeoutTooLongException }
 */
async function mute(bot, message) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
        throw new PermissionException();
    }

    const timeout = Number(message.content.split(/ +/)[2])
    const target = message.mentions.members.first();
    if (target == null) {
        throw new NoTargetException();
    }

    if (target.id == bot.user.id) {
        throw new BotTargetException();
    }

    if (!Number.isInteger(timeout) || timeout <= 0) {
        throw new BadIntegerException();
    }

    if (timeout >= 100) {
        throw new TimeoutTooLongException();
    }

    const mutedRole = message.guild.roles.cache.find((role) => role.name === 'Muted');
    await target.roles.add(mutedRole);
    setTimeout(() => {
        target.roles.remove(mutedRole); // remove the role
    }, timeout * 60000);
}

module.exports = {
    mute
}