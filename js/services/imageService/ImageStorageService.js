"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _ImageService_instance;
const { Message, PermissionsBitField } = require("discord.js");
const EntityService = require("../EntityService");
const messageService = require("../messageService/MessageService");
const { PermissionException, NoLienException, NoTagException } = require("./ImageException");
const UserImage = require("./UserImage");
const ImageType = require("./ImageStorage");
const { _transformToObjectWithValue, transformToObject } = require("../Entity");
const collection = "collectionImage";
class ImageService extends EntityService {
    /**
     *
     * @returns {ImageService}
     */
    static getInstance() {
        if (__classPrivateFieldGet(this, _a, "f", _ImageService_instance) == null) {
            __classPrivateFieldSet(this, _a, new ImageService(), "f", _ImageService_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _ImageService_instance);
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
    stock(bot, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                throw new PermissionException();
            }
            const messageAttachments = Array.from(message.attachments.values());
            const urlImage = messageAttachments.map(function (messageAttachment) { return messageAttachment.url; });
            const findImage = yield this.findImage(message.guild.id, urlImage);
            if (findImage != null) {
                messageService.sendChannel(message.channel, "Cette image est déjà dans la base de données !");
                return;
            }
            const content = message.content;
            const contentArray = content.split(/ +/);
            const command = contentArray.shift(); // !stock)
            const tag = contentArray.shift();
            if (tag == null) {
                throw new NoTagException();
            }
            const imageType = new ImageType();
            imageType.setUrl(urlImage);
            imageType.setServerId(message.guild.id);
            const idAuteur = messageService.giveIdAuteur(message);
            imageType.setIdAuteur(idAuteur);
            imageType.setTag(tag);
            yield this.store(imageType);
            messageService.sendChannel(message.channel, "L'image a bien été ajouté à la base de données !");
        });
    }
    /**
     *
     * @param {String} guildId
     * @param {String} imageUrl
     * @returns {Promise<ImageType | null>}
     * @throws {NoLienException}
     */
    findImage(guildId, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (imageUrl == null) {
                throw new NoLienException();
            }
            return this.findByImageAndServerId(imageUrl, guildId);
        });
    }
    /**
     *
     * @param {String} imageUrl
     * @param {String} serverId
     * @returns {Promise<ImageType | null>}
     */
    findByImageAndServerId(imageUrl, serverId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne({ "url": imageUrl, "serverId": serverId });
        });
    }
    findByTag(tag) {
        const _super = Object.create(null, {
            findMany: { get: () => super.findMany }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.findMany.call(this, { "tag": tag });
        });
    }
    giveImageTag(bot, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = message.content;
            const guildChannel = message.channel;
            const contentArray = content.split(/ +/);
            const command = contentArray.shift(); // !stock
            const tag = contentArray.shift();
            if (tag == null) {
                throw new NoTagException();
            }
            const tableauDesImagesInEnglishPlease = yield this.findByTag(tag);
            const urlImage = tableauDesImagesInEnglishPlease.flatMap(function (ImageInEnglishPlease) { return ImageInEnglishPlease.getUrl(); });
            urlImage.forEach(url => {
                const embedContent = {
                    color: 0x0099ff,
                    title: tag,
                    image: {
                        url
                    },
                };
                messageService.sendEmbedChannel(guildChannel, embedContent);
            });
        });
    }
}
_a = ImageService;
/**
 * @type {ImageService}
 */
_ImageService_instance = { value: void 0 };
module.exports = ImageService.getInstance();
