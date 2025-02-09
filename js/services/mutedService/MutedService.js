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
var _a, _MuteService_instance;
const { Client, Message, PermissionsBitField } = require("discord.js");
const { PermissionException, NoTargetException, BotTargetException, BadIntegerException, TimeoutTooLongException } = require("./MuteExceptions");
const Entity = require("../Entity");
const EntityService = require("../EntityService");
class MuteService extends EntityService {
    static getInstance() {
        if (__classPrivateFieldGet(this, _a, "f", _MuteService_instance) == null) {
            __classPrivateFieldSet(this, _a, new _a(), "f", _MuteService_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _MuteService_instance);
    }
    constructor() {
        super();
    }
    /**
     *
     * @param {Client} bot
     * @param {Message<boolean>} message
     * @returns
     * @throws { PermissionException, NoTargetException, BotTargetException, TimeoutTooLongException }
     */
    mute(bot, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
                throw new PermissionException();
            }
            const timeout = Number(message.content.split(/ +/)[2]);
            const target = message.mentions.members.first();
            if (target == null) {
                throw new NoTargetException();
            }
            if (target.id == bot.user.id) {
                throw new BotTargetException();
            }
            if (!Number.isInteger(timeout) || timeout <= 0) {
                throw new BadIntegerException();
            }
            if (timeout >= 100) {
                throw new TimeoutTooLongException();
            }
            const mutedRole = message.guild.roles.cache.find((role) => role.name === 'Muted');
            yield target.roles.add(mutedRole);
            setTimeout(() => {
                target.roles.remove(mutedRole); // remove the role
            }, timeout * 60000);
        });
    }
}
_a = MuteService;
/**
 * @type {MuteService}
 */
_MuteService_instance = { value: void 0 };
module.exports = MuteService.getInstance();
