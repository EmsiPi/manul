import { Client, GuildMember, Message, ChannelType, Guild, Poll, Embed, PollLayoutType } from "discord.js";
import messageService from "../messageService/MessageService";


class PollService {

    private static instance: PollService
    
    static getInstance() {
        if(this.instance == null) {
            this.instance = new PollService();
        }

        return this.instance;
    }

    async buildPoll(message: Message) {
        const poll = {
            question: {
                text: "question",
            },
            answers: {
                a: "oui",
                b: "non",
            },
            allowMultiselect: false,
            duration: 2,
            layoutType: PollLayoutType.Default,
        }

        this.sendPoll
    }

    async sendPoll (message: Message, poll: String) {
        messageService.sendEmbedChannel(message.channel, poll)
    }

}

export default PollService.getInstance();