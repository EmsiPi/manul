const { Client, Message } = require("discord.js");
const EntityService = require("../EntityService");

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
    
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async getPing(bot) {
        return bot.ws.ping;
    }

}

module.exports = PingService.getInstance();