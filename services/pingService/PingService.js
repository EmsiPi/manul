const { Client, Message } = require("discord.js");

/**
 * 
 * @param {Client} bot 
 * @param {Message<boolean>} message 
 * @returns 
 */
async function getPing(bot) {
    return bot.ws.ping;
}

module.exports = {
    getPing
}