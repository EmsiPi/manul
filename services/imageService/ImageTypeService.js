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
        return object => ImageType.transformToObject(object);
    }

    /**
     * 
     * @returns {function(ImageType): Object} 
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
        const findImage = await this.findImage(message.guild.id, urlImage); 
        if (findImage != null) {
            messageService.sendChannel(message.channel, "Cette image est déjà dans la base de données !");
            return;
        }
        const content = message.content;
        const contentArray = content.split(/ +/);
        const command = contentArray.shift(); // !stock)
        const tag = contentArray.shift();

        const imageType = new ImageType();

        imageType.setUrl(urlImage);
        imageType.setServerId(message.guild.id);
        const idAuteur = messageService.giveIdAuteur(message);
        imageType.setIdAuteur(idAuteur);
        imageType.setTag(tag);

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
        return this.findOne({"url": imageUrl, "serverId": serverId});
    }
    
    async findByTag(tag) {

        return super.findMany({"tag" : tag });
    }

    async giveImageTag(bot, message){
        const content = message.content;
        const contentArray = content.split(/ +/);
        const command = contentArray.shift(); // !stock
        const tag = contentArray.shift();

        const truc = await this.findByTag(tag);
        console.log(truc)
    }

}

module.exports = ImageService.getInstance();