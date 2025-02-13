import { Message, PermissionsBitField } from "discord.js";
import EntityService from "../EntityService";
import messageService from "../messageService/MessageService";
import { PermissionException, NoLienException, NoTagException } from "./ImageException";
import UserImage from "./UserImage";
import ImageType from "./ImageStorage";
import { _transformToObjectWithValue, transformToObject } from "../Entity";
import { CommandManulClient } from "../../Loaders/loadCommands";

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

    // à faire in english please : permettre aux membres de stock des images seulement sous un certain tag 
    // à faire : commande delImage 
    async stock(bot: CommandManulClient, message: Message<boolean> ) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            throw new PermissionException();
        } 
        const messageAttachments = Array.from(message.attachments.values());
        const urlImage = messageAttachments.map(function(messageAttachment) {return messageAttachment.url});
        const findImage = await this.findImage(message.guild.id, urlImage); 
        if (findImage != null) {
            messageService.sendChannel(message.channel, "Cette image est déjà dans la base de données !");
            return;
        }
        const content = message.content;
        const contentArray = content.split(/ +/);
        const command = contentArray.shift(); // !stock)
        const tag = contentArray.shift();

        if (tag == null){
            throw new NoTagException();
        }

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

    async giveImageTag(bot: CommandManulClient, message){
        const content = message.content;
        const guildChannel = message.channel;
        const contentArray = content.split(/ +/);
        const command = contentArray.shift(); // !stock
        const tag = contentArray.shift();

        if (tag == null){
            throw new NoTagException();
        }

        const tableauDesImagesInEnglishPlease = await this.findByTag(tag);
        const urlImage = tableauDesImagesInEnglishPlease.flatMap(function(ImageInEnglishPlease) {return ImageInEnglishPlease.getUrl()})
        urlImage.forEach(url => {
            const embedContent = {
                color: 0x0099ff,
                title: tag,
                image: {
                    url
                },
            }
            messageService.sendEmbedChannel(guildChannel, embedContent);

        })
    }


}

export default ImageService.getInstance();