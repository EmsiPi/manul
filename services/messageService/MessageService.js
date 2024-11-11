const { GuildMember, TextBasedChannel, Message } = require("discord.js");
const { NullChannelException, EmptyMessageException, NullMemberException, NullMessageException } = require("./MessageException");

/**
 * Envoie un message privé à un utilisateur.
 * @param {GuildMember} guildMember 
 * @param {String} messageContent
 * @throws {NullMemberException, EmptyMessageException} 
 */
async function sendDm(guildMember, messageContent) {
    if(guildMember == null) {
        throw new NullMemberException();
    }

    if(messageContent == null) {
        throw new EmptyMessageException();
    }

    guildMember.send(messageContent);
}

/**
 * Envoie un message dans un channel.
 * @param {TextBasedChannel} guildChannel 
 * @param {String} messageContent 
 * @throws {NullChannelException, EmptyMessageException}
 */
async function sendChannel(guildChannel, messageContent) {
    if(guildChannel == null) {
        throw new NullChannelException();
    }

    if(messageContent == null || messageContent.length == 0) {
        throw new EmptyMessageException();
    }

    guildChannel.send(messageContent);
}

/**
 * Répond à un message.
 * @param {Message} message 
 * @param {String} messageContent 
 */
async function reply(message, messageContent) {
    if(message == null) {
        throw new NullMessageException();
    }

    if(messageContent == null) {
        throw new EmptyMessageException();
    }

    message.reply(messageContent);
}

module.exports = {
    sendDm,
    sendChannel,
    reply
}