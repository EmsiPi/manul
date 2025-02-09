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
const { Client, Message } = require("discord.js");
const warnTypeService = require("../services/warnService/WarnTypeService");
module.exports = {
    name: "addWarn",
    description: "Après le nom de la commande, donner le nom voulu du warn suivit par le message assigné.",
    /**
     *
     * @param {Client} bot
     * @param {Message<boolean>} message
     * @returns
     */
    run(bot, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield warnTypeService.addWarn(bot, message);
        });
    }
};
