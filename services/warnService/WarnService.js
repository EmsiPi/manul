const {Client, Message, PermissionsBitField } = require("discord.js");
const { BotTargeTException, WrongWarnTypeException, NoWarnTypeException, NoTargetException, PermissionException } = require("./WarnException");
const messageService = require("../messageService/MessageService");
const mongoService = require("../mongoService/MongoService");

const collection = "collectionwarn";

async function updateTarget(targetObject) { 
    const update = {$set: {NombredeWarn: ++targetObject.NombredeWarn}};
    const targetIdObject = {
        "targetId": targetObject.targetId
    };
    mongoService.updateOne(targetIdObject, update, collection);
}

/**
 * 
 * @param {Client} bot 
 * @param {Message<boolean>} message 
 * @returns 
 * @throws {BotTargeTException, WrongWarnTypeException, NoWarnTypeException, NoTargetException, PermissionException}
 */
async function warn(bot, message) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
        throw new PermissionException();
    }

    const listewarn = ['chiant', 'eh'];
    const warn = message.content.split(/ +/)[2];
    const target = message.mentions.members.first();
    if (target == null) {
        throw new NoTargetException();
    }

    if (warn == null) {
        throw new NoWarnTypeException();
    }

    if (!listewarn.includes(warn) && warn != ("p")) {
        throw new WrongWarnTypeException();
    }

    if (target.id == bot.user.id) {
        throw new BotTargeTException();
    }

    if(warn == "p") {
        const PREFIX = "!"
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

        messageService.sendDm(target, messageToSend);
    }

    const targetIdObject = {
        "targetId": target.user.id
    }
    const targetname = await mongoService.findOne(targetIdObject, collection);
    if (targetname != null) { 
        updateTarget(targetname);
    } else {
        const targetObject = {
            "targetId": target.user.id,
            "NombredeWarn": 1
        }
        mongoService.insert(targetObject,collection);
    }

    if (warn == "pouêt" ) {
        messageService.sendDm(target, "pouêt");
        return;
    }
    if (warn == "chiant") {
        messageService.sendDm(target, "/! **WARN** : Un modérateur de la Montagne m'a soufflé que tu n'étais pas sage, attention à tes oreilles ! Au 3ème warn, tu seras kick");
        return;
    }
    if (warn == "eh") {
        messageService.sendDm(target, "/! **WARN** : EH");
        return;
    }
}

module.exports = {
    warn
}