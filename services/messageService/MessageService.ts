import { GuildMember, TextBasedChannel, Message, GuildDefaultMessageNotifications } from "discord.js";
import { NullChannelException, EmptyMessageException, NullMemberException, NullMessageException } from "./MessageException";

class MessageService {

    private static instance: MessageService;

    static getInstance() {
        if(this.instance == null) {
            this.instance = new MessageService();
        }

        return this.instance;
    }

    async sendDm(guildMember: GuildMember, messageContent: string) {
        if(guildMember == null) {
            throw new NullMemberException();
        }

        if(messageContent == null) {
            throw new EmptyMessageException();
        }

        guildMember.send(messageContent);
    }

    async sendEmbedChannel(guildChannel: TextBasedChannel, embedContent: any) {   
        if(guildChannel == null) {
            throw new NullChannelException();
        }

        if(embedContent == null || embedContent.length == 0) {
            throw new EmptyMessageException();
        }

        guildChannel.send({ embeds: [embedContent] });
    }

    async sendChannel(guildChannel: TextBasedChannel, messageContent: string) {
        if(guildChannel == null) {
            throw new NullChannelException();
        }

        if(messageContent == null || messageContent.length == 0) {
            throw new EmptyMessageException();
        }

        guildChannel.send(messageContent);
    }

    async reply(message: Message, messageContent: string) {
        if(message == null) {
            throw new NullMessageException();
        }

        if(messageContent == null) {
            throw new EmptyMessageException();
        }

        message.reply(messageContent);
    }

    giveIdAuteur(message: Message){
        const idAuteur = message.author.id;
        return idAuteur
    }
}

export default MessageService.getInstance();