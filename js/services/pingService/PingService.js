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
var _a, _PingService_instance;
const { Client, Message } = require("discord.js");
const EntityService = require("../EntityService");
class PingService extends EntityService {
    static getInstance() {
        if (__classPrivateFieldGet(this, _a, "f", _PingService_instance) == null) {
            __classPrivateFieldSet(this, _a, new _a(), "f", _PingService_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _PingService_instance);
    }
    constructor() {
        super();
    }
    /**
     *
     * @param {Client} bot
     * @param {Message<boolean>} message
     * @returns
     */
    getPing(bot) {
        return __awaiter(this, void 0, void 0, function* () {
            return bot.ws.ping;
        });
    }
}
_a = PingService;
/**
 * @type {PingService}
 */
_PingService_instance = { value: void 0 };
module.exports = PingService.getInstance();
