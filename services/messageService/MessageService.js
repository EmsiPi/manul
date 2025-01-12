const { GuildMember, TextBasedChannel, Message } = require("discord.js");
const { NullChannelException, EmptyMessageException, NullMemberException, NullMessageException } = require("./MessageException");

class MessageService {

    /**
     * @type {MessageService}
     */
    static #instance;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new MessageService();
        }

        return this.#instance;
    }

    constructor() { // chill un max lui

    }

    /**
     * Envoie un message privé à un utilisateur.
     * @param {GuildMember} guildMember 
     * @param {String} messageContent
     * @throws {NullMemberException, EmptyMessageException} 
     */
    async sendDm(guildMember, messageContent) {
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
    async sendChannel(guildChannel, messageContent) {
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
    async reply(message, messageContent) {
        if(message == null) {
            throw new NullMessageException();
        }

        if(messageContent == null) {
            throw new EmptyMessageException();
        }

        message.reply(messageContent);
    }
}

module.exports = MessageService.getInstance();