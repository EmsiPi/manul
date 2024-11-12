const {Client, Message, PermissionsBitField } = require("discord.js");
const { BotTargeTException, WrongWarnTypeException, NoWarnTypeException, NoTargetException, PermissionException } = require("./WarnException");
const messageService = require("../messageService/MessageService");
const mongoService = require("../mongoService/MongoService");

const collectionA = "collectionMembresWarn";
const collectionB = "collectionWarn"

async function updateTarget(targetObject) { 
    const update = {$set: {NombredeWarn: ++targetObject.NombredeWarn}};
    const targetIdObject = {
        "targetId": targetObject.targetId
    };
    mongoService.updateOne(targetIdObject, update, collectionA);
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
    const warn = message.content.split(/ +/)[2];
    const target = message.mentions.members.first();
    if (target == null) {
        throw new NoTargetException();
    }

    if (warn == null) {
        throw new NoWarnTypeException();
    }
    const nomDuWarn = {
        "nomDuWarn": warn
    }
    console.log("ok0")
    const typeDeWarn = await mongoService.findOne(nomDuWarn, collectionB);
    console.log("ok1")
    if (typeDeWarn != null && warn != ("p")) {
        throw new WrongWarnTypeException();
    }
    console.log("ok2")

    if (target.id == bot.user.id) {
        throw new BotTargeTException();
    }
    console.log("ok3")
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
    console.log("ok4")
    const warnToSend = typeDeWarn.contenuDuWarn
    console.log(warnToSend)
    if (warnToSend != null){  
        messageService.sendDm(target,warnToSend);
        messageService.sendChannel(message.channel,"le membre a bien été warn ! >:(");
    } else {
        messageService.sendChannel(message.channel,"je n'ai rien trouvé à lui envoyer... >:(")
    }

    const targetIdObject = {
        "targetId": target.user.id
    }
    const targetname = await mongoService.findOne(targetIdObject, collectionA);
    if (targetname != null) { 
        updateTarget(targetname);
    } else {
        const targetObject = {
            "targetId": target.user.id,
            "NombredeWarn": 1,
            "serveur": "Solitude"
        }
        mongoService.insert(targetObject,collectionA);
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
    const targetname = await mongoService.findOne(targetIdObject, collectionA);
    if (targetname != null) { 
        mongoService.deleteOne(targetname,collectionA);
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
    const targetname = await mongoService.findOne(targetIdObject, collectionA);
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
    const listewarns = await mongoService.find(targetServeur, collectionA);
    if (listewarns != null) { 
        messageService.sendChannel(message.channel,"Voici la liste des warns " + JSON.stringify(listewarns));
        
    } else {
        messageService.sendChannel(message.channel,"Ce serveur n'a aucun warn, c'est une zone de gentils gens !");
    }

}

async function addWarn(bot,message) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        throw new PermissionException();
    }
    const content = message.content;
        const contentArray = content.split(/ +/);
        const command = contentArray.shift(); // !addWarn
        const nomDuWarn = contentArray.shift();
        const contenuDuWarn = contentArray.join(" ");
    const newWarn = {
        "nomDuWarn": nomDuWarn,
        "contenuDuWarn": contenuDuWarn
    }
    mongoService.insert(newWarn,collectionB);
}

module.exports = {
    warn,
    delwarn,
    showNumWarn,
    showWarn,
    addWarn
}