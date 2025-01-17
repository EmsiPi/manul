const { GuildMember, TextBasedChannel, Message } = require("discord.js");
const { NullChannelException, EmptyMessageException, NullMemberException, NullMessageException } = require("../messageService/MessageException");
const EntityService = require("../EntityService");
const messageService = require("../messageService/MessageService");
const UserWarn = require("./UserWarn");
const { UUID } = require("mongodb");

const collection = "collectionImage";


class ImageService {

    /**
     * @type {ImageService}
     */
    static #instance;

    /**
     * 
     * @returns {ImageService}
     */
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ImageService();
        }

        return this.#instance;
    }

    constructor() {
        super();
    }

    toObject() {
        return object => UserWarn.transformToObject(object);
    }

    /**
     * 
     * @returns {function(UserImage): Object} 
     */
    toDocument() {
        return entity => entity.transformToDocument();
    }

    getCollection() {
        return collection;
    }

    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     */
    async stock (bot, message) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            throw new PermissionException();
        }
        const content = message.content;
        const contentArray = content.split(/ +/);
        const command = contentArray.shift(); 
        const lien = contentArray.shift();
        const imageTypeFound = await this.findImage(bot, message, lien); //findImage à faire
        if (imageTypeFound != null) {
            messageService.sendChannel(message.channel, "Cette image est déjà dans la base de données !");
            return;
        }
    }

}

module.exports = ImageService.getInstance();