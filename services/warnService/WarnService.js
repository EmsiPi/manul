const {Client, Message, PermissionsBitField } = require("discord.js");
const { BotTargeTException, WrongWarnTypeException, NoWarnTypeException, NoTargetException, PermissionException } = require("./WarnException");
const messageService = require("../messageService/MessageService");
const mongoService = require("../mongoService/MongoService");
const addWarnService = require("../warnService/addWarnService");

const collection = "collectionMembresWarn";

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
async function NomDuWarn(bot, message) {
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
    const typeDeWarn = await addWarnService.findWarn(bot,message,NomDuWarn);
    if (typeDeWarn != null && NomDuWarn != ("p")) {
        throw new WrongWarnTypeException();
    }

    if (target.id == bot.user.id) {
        throw new BotTargeTException();
    }
    if(NomDuWarn == "p") {
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
    
    const warnToSend = typeDeWarn.contenuDuWarn
    if (warnToSend != null){  
        messageService.sendDm(target,warnToSend);
        messageService.sendChannel(message.channel,"le membre a bien été warn ! >:(");
    } else {
        messageService.sendChannel(message.channel,"je n'ai rien trouvé à lui envoyer... >:(")
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
        messageService.sendChannel(message.channel,"Les warns de ce membre ont été retirés !");
        messageService.sendDm(target,"Tes warns ont été retiré ! Bravo, tu es de nouveau blanc comme neige.");
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
        messageService.sendChannel(message.channel,"Ce membre a été warn " + nombredeWarn + " fois");
        
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
    warn: NomDuWarn,
    delwarn,
    showNumWarn,
    showWarn,
}