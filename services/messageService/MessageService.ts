import { GuildMember, TextBasedChannel, Message, GuildDefaultMessageNotifications } from "discord.js";
import { NullChannelException, EmptyMessageException, NullMemberException, NullMessageException } from "./MessageException";

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
    async sendDm(guildMember: GuildMember, messageContent: String) {
        if(guildMember == null) {
            throw new NullMemberException();
        }

        if(messageContent == null) {
            throw new EmptyMessageException();
        }

        guildMember.send(messageContent);
    }
    
    /**
     * Envoie un embed dans un channel.
     * @param {TextBasedChannel} guildChannel 
     * @param {Object} embedContent 
     * @throws {NullChannelException, EmptyMessageException}
     */
    async sendEmbedChannel(guildChannel: TextBasedChannel, embedContent: Object) {   
        if(guildChannel == null) {
            throw new NullChannelException();
        }

        if(embedContent == null || embedContent.length == 0) {
            throw new EmptyMessageException();
        }

        guildChannel.send({ embeds: [embedContent] });
    }

    /**
     * Envoie un message dans un channel.
     * @param {TextBasedChannel} guildChannel 
     * @param {String} messageContent 
     * @throws {NullChannelException, EmptyMessageException}
     */
    async sendChannel(guildChannel: TextBasedChannel, messageContent: Object) {
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
    async reply(message: Message, messageContent: String) {
        if(message == null) {
            throw new NullMessageException();
        }

        if(messageContent == null) {
            throw new EmptyMessageException();
        }

        message.reply(messageContent);
    }

    /**
     * Renvoie l'id de l'auteur du message 
     * @param {Message} message 
     */
    giveIdAuteur(message: Message){
        const idAuteur = message.author.id;
        return idAuteur
    }
}

export default MessageService.getInstance();