import { GuildMember, TextBasedChannel, Message, ChannelType } from "discord.js";
import { NullChannelException, EmptyMessageException, NullMemberException, NullMessageException } from "./MessageException";
import LogService from "../logService/LogService";

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
        this.send(guildChannel, { embeds: [embedContent] });
    }

    async sendChannel(guildChannel: TextBasedChannel, messageContent: string) {
        this.send(guildChannel, messageContent);
    }

    private async send(guildChannel: TextBasedChannel, message: string | any) {
        if(guildChannel == null) {
            throw new NullChannelException();
        }

        if(guildChannel.type != ChannelType.GuildText) {
            LogService.info("Chanel " + guildChannel.id + " is not a text chanel.");
            return;
        }

        if(message == null || message.length == 0) {
            throw new EmptyMessageException();
        }

        guildChannel.send(message);
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