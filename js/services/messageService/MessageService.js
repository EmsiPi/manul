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
var _a, _MessageService_instance;
const { GuildMember, TextBasedChannel, Message } = require("discord.js");
const { NullChannelException, EmptyMessageException, NullMemberException, NullMessageException } = require("./MessageException");
class MessageService {
    static getInstance() {
        if (__classPrivateFieldGet(this, _a, "f", _MessageService_instance) == null) {
            __classPrivateFieldSet(this, _a, new _a(), "f", _MessageService_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _MessageService_instance);
    }
    constructor() {
    }
    /**
     * Envoie un message privé à un utilisateur.
     * @param {GuildMember} guildMember
     * @param {String} messageContent
     * @throws {NullMemberException, EmptyMessageException}
     */
    sendDm(guildMember, messageContent) {
        return __awaiter(this, void 0, void 0, function* () {
            if (guildMember == null) {
                throw new NullMemberException();
            }
            if (messageContent == null) {
                throw new EmptyMessageException();
            }
            guildMember.send(messageContent);
        });
    }
    /**
     * Envoie un embed dans un channel.
     * @param {TextBasedChannel} guildChannel
     * @param {Object} embedContent
     * @throws {NullChannelException, EmptyMessageException}
     */
    sendEmbedChannel(guildChannel, embedContent) {
        return __awaiter(this, void 0, void 0, function* () {
            if (guildChannel == null) {
                throw new NullChannelException();
            }
            if (embedContent == null || embedContent.length == 0) {
                throw new EmptyMessageException();
            }
            guildChannel.send({ embeds: [embedContent] });
        });
    }
    /**
     * Envoie un message dans un channel.
     * @param {TextBasedChannel} guildChannel
     * @param {String} messageContent
     * @throws {NullChannelException, EmptyMessageException}
     */
    sendChannel(guildChannel, messageContent) {
        return __awaiter(this, void 0, void 0, function* () {
            if (guildChannel == null) {
                throw new NullChannelException();
            }
            if (messageContent == null || messageContent.length == 0) {
                throw new EmptyMessageException();
            }
            guildChannel.send(messageContent);
        });
    }
    /**
     * Répond à un message.
     * @param {Message} message
     * @param {String} messageContent
     */
    reply(message, messageContent) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message == null) {
                throw new NullMessageException();
            }
            if (messageContent == null) {
                throw new EmptyMessageException();
            }
            message.reply(messageContent);
        });
    }
    /**
     * Renvoie l'id de l'auteur du message
     * @param {Message} message
     */
    giveIdAuteur(message) {
        const idAuteur = message.author.id;
        return idAuteur;
    }
}
_a = MessageService;
/**
 * @type {MessageService}
 */
_MessageService_instance = { value: void 0 };
module.exports = MessageService.getInstance();
