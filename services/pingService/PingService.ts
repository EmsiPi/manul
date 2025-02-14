import { Client } from "discord.js";

class PingService {

    private static instance: PingService;

    static getInstance() {
        if(this.instance == null) {
            this.instance = new PingService();
        }

        return this.instance;
    }
    
    async getPing(bot: Client) {
        return bot.ws.ping;
    }

}

export default PingService.getInstance();