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
        messageService.sendChannel(message.channel,"le membre a bien été warn ! >:(")
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
            "NombredeWarn": 1,
            "serveur": "Solitude"
        }
        mongoService.insert(targetObject,collection);
    }

    if (warn == "pouêt" ) {
        messageService.sendDm(target, "pouêt");
        messageService.sendChannel(message.channel,"le membre a bien été warn ! >:(")
        return;
    }
    if (warn == "chiant") {
        messageService.sendDm(target, "/! **WARN** : Un modérateur de la Montagne m'a soufflé que tu n'étais pas sage, attention à tes oreilles ! Au 3ème warn, tu seras kick");
        messageService.sendChannel(message.channel,"le membre a bien été warn ! >:(")
        return;
    }
    if (warn == "eh") {
        messageService.sendDm(target, "/! **WARN** : EH");
        messageService.sendChannel(message.channel,"le membre a bien été warn ! >:(")
        return;
    }
}

async function delwarn(bot, message) {
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
    const targetIdObject = {
        "targetId": target.user.id
    }
    const targetname = await mongoService.findOne(targetIdObject, collection);
    if (targetname != null) { 
        mongoService.deleteOne(targetname,collection);
        messageService.sendChannel(message.channel,"Les warn de la cible ont été retirés !");
        messageService.sendDm(target,"Tes warn ont été retiré ! Bravo, tu es de nouveau blanc comme neige.");
    } else { 
        messageService.sendChannel(message.channel,"Ce membre n'a aucun warn, il est encore innocent monsieur !");
    }
}

async function showNumWarn(bot, message) {
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
    const targetIdObject = {
        "targetId": target.user.id
    }
    const targetname = await mongoService.findOne(targetIdObject, collection);
    if (targetname != null) { 
        const nombredeWarn = targetname.NombredeWarn
        messageService.sendChannel(message.channel,"Le nombre de warn de ce membre est " + nombredeWarn);
        
    } else {
        messageService.sendChannel(message.channel,"Ce membre n'a aucun warn, il est encore innocent monsieur !");
    }

}

async function showWarn(bot, message) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
        throw new PermissionException();
    }
    const targetServeur = {
        "serveur": "Solitude"
    }
    const listewarns = await mongoService.find(targetServeur, collection);
    if (listewarns != null) { 
        messageService.sendChannel(message.channel,"Voici la liste des warns " + JSON.stringify(listewarns));
        
    } else {
        messageService.sendChannel(message.channel,"Ce serveur n'a aucun warn, c'est une zone de gentils gens !");
    }

}


module.exports = {
    warn,
    delwarn,
    showNumWarn,
    showWarn
}