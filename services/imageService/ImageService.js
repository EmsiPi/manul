const { GuildMember, TextBasedChannel, Message, PermissionsBitField } = require("discord.js");
const { NullChannelException, EmptyMessageException, NullMemberException, NullMessageException } = require("../messageService/MessageException");
const EntityService = require("../EntityService");
const messageService = require("../messageService/MessageService");
const { PermissionException, NoLienException } = require("./ImageException");
const UserImage = require("./UserImage");
const ImageType = require("./ImageType");
const { UUID } = require("mongodb");

const collection = "collectionImage";


class ImageService extends EntityService {

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
        return object => UserImage.transformToObject(object);
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
        const messageAttachments = Array.from(message.attachments.values());
        const urlImage = messageAttachments.map(function(messageAttachments) {return messageAttachments.url});
        const findImage = await this.findImage(bot, message, urlImage); 
        if (findImage != null) {
            messageService.sendChannel(message.channel, "Cette image est déjà dans la base de données !");
            return;
        }
        const imageType = new ImageType();
        imageType.setUrl(urlImage);
        imageType.setServerId(message.guild.id);

        await this.store(imageType);
        messageService.sendChannel(message.channel, "L'image a bien été ajouté à la base de données !");
    }

    async findImage(bot, message, urlImage) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            throw new PermissionException();
        }
        if (urlImage == null) {
            throw new NoLienException(); 
        }
        return this.findByImageAndServerId(urlImage, message.guild.id);
    }

    async findByImageAndServerId(urlImage, serverId) {

        return super.findOne({"url": urlImage, "serverId": serverId});
    }

}

module.exports = ImageService.getInstance();