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
var _a, _WarnTypeService_instance;
const { Client, Message, PermissionsBitField } = require("discord.js");
const { PermissionException, NoWarnNameException } = require("./WarnException");
const messageService = require("../messageService/MessageService");
const EntityService = require("../EntityService");
const WarnType = require("./WarnType");
const { description } = require("../../Commandes/addWarn");
const collection = "collectionWarn";
class WarnTypeService extends EntityService {
    static getInstance() {
        if (__classPrivateFieldGet(this, _a, "f", _WarnTypeService_instance) == null) {
            __classPrivateFieldSet(this, _a, new _a(), "f", _WarnTypeService_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _WarnTypeService_instance);
    }
    constructor() {
        super();
    }
    /**
     *
     * @returns {function(Object): WarnType}
     */
    toObject() {
        return object => WarnType.transformToObject(object);
    }
    /**
     *
     * @returns {function(WarnType): Object}
     */
    toDocument() {
        return object => object.transformToDocument(object);
    }
    getCollection() {
        return collection;
    }
    /**
     *
     * @param {Client} bot
     * @param {Message<boolean>} message
     * @returns
     */
    addWarn(bot, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                throw new PermissionException();
            }
            const content = message.content;
            const contentArray = content.split(/ +/);
            const command = contentArray.shift(); // !addWarn
            const warnName = contentArray.shift();
            const warnContent = contentArray.join(" ");
            const warnTypeFound = yield this.findWarn(bot, message, warnName);
            if (warnTypeFound != null) {
                messageService.sendChannel(message.channel, "Un warn de ce nom est déjà dans la base de données !");
                return;
            }
            if (warnName != null && warnContent != null) {
                const warnType = new WarnType();
                warnType.setMessage(warnContent);
                warnType.setName(warnName);
                warnType.setServerId(message.guild.id);
                this.store(warnType);
                messageService.sendChannel(message.channel, "Le warn a bien été ajouté à la base de données !");
            }
            else {
                messageService.sendChannel(message.channel, "il manque des infos là ! Le nom du warn et le contenu du warn s'il te plait.");
            }
        });
    }
    /**
     *
     * @param {Client} bot
     * @param {Message<boolean>} message
     * @returns {WarnType}
     */
    findWarn(bot, message, warnName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                throw new PermissionException();
            }
            if (warnName == null) {
                throw new NoWarnNameException();
            }
            return this.findByNameAndServerId(warnName, message.guild.id);
        });
    }
    /**
     *
     * @param {Client} bot
     * @param {Message<boolean>} message
     */
    showWarnType(bot, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
                throw new PermissionException();
            }
            const listeWarns = yield this.findAllByServerId(message.guild.id);
            if (listeWarns != null) {
                const listeWarnsMap = listeWarns.map((listeWarns) => {
                    return { "name": "Nom du warn : " + listeWarns.getName(), "value": "Description : " + listeWarns.getMessage() };
                });
                console.log(listeWarnsMap);
                const embedContent = {
                    color: 0x0099ff,
                    description: "Voici la liste des warns sur ce serveur :",
                    fields: listeWarnsMap
                };
                messageService.sendEmbedChannel(message.channel, embedContent);
            }
            else {
                messageService.sendChannel(message.channel, "Ce serveur n'a aucun warn, c'est une zone de gentils gens !");
            }
        });
    }
    /**
     *
     * @param {WarnType} warnType
     */
    returnMessageAndNameWarn(warnType) {
        const warnName = warnType.getName();
        const warnMessage = warnType.getMessage();
        const warnNameMessage = {};
        warnNameMessage.warnName = warnName;
        warnNameMessage.warnMessage = warnMessage;
        return warnNameMessage;
    }
    /**
     *
     * @param {String} warnName
     * @param {String} serverId
     */
    findByNameAndServerId(warnName, serverId) {
        const _super = Object.create(null, {
            findOne: { get: () => super.findOne }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.findOne.call(this, { "name": warnName, "serverId": serverId });
        });
    }
    /**
     *
     * @param {UUID} serverId
     * @returns {Promise<WarnType[]>}
     */
    findAllByServerId(serverId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findMany({ "serverId": serverId });
        });
    }
}
_a = WarnTypeService;
/**
 * @type {WarnTypeService}
 */
_WarnTypeService_instance = { value: void 0 };
module.exports = WarnTypeService.getInstance();
