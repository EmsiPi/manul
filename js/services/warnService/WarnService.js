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
var _WarnService_instances, _a, _WarnService_instance, _WarnService_incrementOrCreateUserWarn;
const { Client, Message, PermissionsBitField } = require("discord.js");
const { BotTargeTException, WrongWarnTypeException, NoWarnTypeException, NoTargetException, PermissionException } = require("./WarnException");
const messageService = require("../messageService/MessageService");
const warnTypeService = require("./WarnTypeService");
const EntityService = require("../EntityService");
const UserWarn = require("./UserWarn");
const { UUID } = require("mongodb");
const collection = "collectionMembresWarn";
class WarnService extends EntityService {
    /**
     *
     * @returns {WarnService}
     */
    static getInstance() {
        if (__classPrivateFieldGet(this, _a, "f", _WarnService_instance) == null) {
            __classPrivateFieldSet(this, _a, new _a(), "f", _WarnService_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _WarnService_instance);
    }
    constructor() {
        super();
        _WarnService_instances.add(this);
    }
    toObject() {
        return object => UserWarn.transformToObject(object);
    }
    /**
     *
     * @returns {function(UserWarn): Object}
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
     * @returns
     * @throws {BotTargeTException, WrongWarnTypeException, NoWarnTypeException, NoTargetException, PermissionException}
     */
    warn(bot, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
                throw new PermissionException();
            }
            const NomDuWarn = message.content.split(/ +/)[2];
            const target = message.mentions.members.first();
            if (target == null) {
                throw new NoTargetException();
            }
            if (NomDuWarn == null) {
                throw new NoWarnTypeException();
            }
            const typeDeWarn = yield warnTypeService.findWarn(bot, message, NomDuWarn);
            if (typeDeWarn == null && NomDuWarn == ("p")) {
                throw new WrongWarnTypeException();
            }
            if (target.id == bot.user.id) {
                throw new BotTargeTException();
            }
            if (NomDuWarn == "p") {
                const PREFIX = "!";
                const content = message.content;
                const contentArray = content.split(/ +/);
                const command = contentArray.shift(); // !warn
                const mention = contentArray.shift(); // @ronan3290
                const p = contentArray.shift(); // p
                const verificationPREFIX = contentArray[0];
                const messageToSend = contentArray.join(" ");
                if (verificationPREFIX.split('')[0] == PREFIX) {
                    messageService.sendChannel(message.channel, "le ! me dérange dans ton warn pour l'envoyer");
                    return;
                }
                yield __classPrivateFieldGet(this, _WarnService_instances, "m", _WarnService_incrementOrCreateUserWarn).call(this, target.user.id, message.guild.id);
                messageService.sendDm(target, messageToSend);
                messageService.sendChannel(message.channel, "le membre a bien été warn ! >:(");
                return;
            }
            yield __classPrivateFieldGet(this, _WarnService_instances, "m", _WarnService_incrementOrCreateUserWarn).call(this, target.user.id, message.guild.id);
            const warnToSend = typeDeWarn.getMessage();
            if (warnToSend != null) {
                messageService.sendDm(target, warnToSend);
                messageService.sendChannel(message.channel, "le membre a bien été warn ! >:(");
            }
            else {
                messageService.sendChannel(message.channel, "je n'ai rien trouvé à lui envoyer... >:(");
            }
        });
    }
    delwarn(bot, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
                throw new PermissionException();
            }
            const target = message.mentions.members.first();
            if (target == null) {
                throw new NoTargetException();
            }
            if (target.id == bot.user.id) {
                throw new BotTargeTException();
            }
            const targetname = yield this.findByUserAndServerId(target.user.id, message.guild.id);
            if (targetname != null) {
                this.deleteByUserAndServerId(target.user.id, message.guild.id);
                messageService.sendChannel(message.channel, "Les warns de ce membre ont été retirés !");
                messageService.sendDm(target, "Tes warns ont été retiré ! Bravo, tu es de nouveau blanc comme neige.");
            }
            else {
                messageService.sendChannel(message.channel, "Ce membre n'a aucun warn, il est encore innocent monsieur !");
            }
        });
    }
    /**
     *
     * @param {Client} bot
     * @param {Message<boolean>} message
     */
    showNumWarn(bot, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
                throw new PermissionException();
            }
            const target = message.mentions.members.first();
            if (target == null) {
                throw new NoTargetException();
            }
            if (target.id == bot.user.id) {
                throw new BotTargeTException();
            }
            const targetname = yield this.findByUserAndServerId(target.user.id, message.guild.id);
            if (targetname != null) {
                messageService.sendChannel(message.channel, "Ce membre a été warn " + targetname.getWarnNumber() + " fois");
            }
            else {
                messageService.sendChannel(message.channel, "Ce membre n'a aucun warn, il est encore innocent monsieur !");
            }
        });
    }
    /**
     *
     * @param {UUID} userId
     * @param {UUID} serverId
     * @returns {Promise<UserWarn> | Promise<null>}
     */
    findByUserAndServerId(userId, serverId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne({ "targetId": userId, "serverId": serverId });
        });
    }
    /**
     *
     * @param {UUID} userId
     * @param {UUID} serverId
     * @returns {Promise<UserWarn> | Promise<null>}
     */
    deleteByUserAndServerId(userId, serverId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.deleteOne({ "targetId": userId, "serverId": serverId });
        });
    }
    /**
     *
     * @param {UUID} serverId
     * @returns {Promise<UserWarn[]>}
     */
    findAllByServerId(serverId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findMany({ "serverId": serverId });
        });
    }
}
_a = WarnService, _WarnService_instances = new WeakSet(), _WarnService_incrementOrCreateUserWarn = function _WarnService_incrementOrCreateUserWarn(userId, serverId) {
    return __awaiter(this, void 0, void 0, function* () {
        let userWarn = yield this.findByUserAndServerId(userId, serverId);
        if (userWarn == null) {
            userWarn = new UserWarn(userId, 0, serverId);
        }
        userWarn.incrementWarn();
        return this.store(userWarn);
    });
};
/**
 * @type {WarnService}
 */
_WarnService_instance = { value: void 0 };
module.exports = WarnService.getInstance();
