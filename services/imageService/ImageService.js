const { Message, PermissionsBitField } = require("discord.js");
const EntityService = require("../EntityService");
const messageService = require("../messageService/MessageService");
const { PermissionException, NoLienException } = require("./ImageException");
const UserImage = require("./UserImage");
const ImageType = require("./ImageType");

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
     * @throws {PermissionException, NoLienException}
     */
    async stock(bot, message) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            throw new PermissionException();
        }

        const messageAttachments = Array.from(message.attachments.values());
        const urlImage = messageAttachments.map(function(messageAttachments) {return messageAttachments.url});
        const findImage = await this.findImage(bot, message.guild.id, urlImage); 
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

    /**
     * 
     * @param {String} guildId 
     * @param {String} imageUrl 
     * @returns {Promise<ImageType | null>}
     * @throws {NoLienException}
     */
    async findImage(guildId, imageUrl) {
        if (imageUrl == null) {
            throw new NoLienException(); 
        }

        return this.findByImageAndServerId(imageUrl, guildId);
    }

    /**
     * 
     * @param {String} imageUrl 
     * @param {String} serverId 
     * @returns {Promise<ImageType | null>}
     */
    async findByImageAndServerId(imageUrl, serverId) {
        return super.findOne({"url": imageUrl, "serverId": serverId});
    }

}

module.exports = ImageService.getInstance();