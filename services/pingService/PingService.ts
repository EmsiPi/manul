import { Client, Message } from "discord.js";
import EntityService from "../EntityService";
import { CommandManulClient } from "../../Loaders/loadCommands";

class PingService extends EntityService {

    /**
     * @type {PingService}
     */
    static #instance;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new PingService();
        }

        return this.#instance;
    }

    constructor() {
        super();
    }
    
    async getPing(bot: CommandManulClient) {
        return bot.ws.ping;
    }

}

export default PingService.getInstance();