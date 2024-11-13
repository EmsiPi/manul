const {Client, Message, PermissionsBitField } = require("discord.js");
const { BotTargeTException, WrongWarnTypeException, NoWarnTypeException, NoTargetException, PermissionException } = require("./WarnException");
const messageService = require("../messageService/MessageService");
const mongoService = require("../mongoService/MongoService");

const collection = "collectionWarn"

async function addWarn(bot,message) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        throw new PermissionException();
    }
    const content = message.content;
    const contentArray = content.split(/ +/);
    const command = contentArray.shift(); // !addWarn
    const nomDuWarn = contentArray.shift();
    const contenuDuWarn = contentArray.join(" ");
    const WarnVerif = findWarn(bot,message)
    if (WarnVerif != null) {
        messageService.sendChannel(message.channel,"Un warn de ce nom est déjà dans la base de données !");
        return;
    }
    if (nomDuWarn != null && contenuDuWarn != null) {  
        const newWarn = {
            "nomDuWarn": nomDuWarn,
            "contenuDuWarn": contenuDuWarn
        }
        mongoService.insert(newWarn,collection);
        messageService.sendChannel(message.channel,"Le warn a bien été ajouté à la base de données !");
    } else { 
        messageService.sendChannel(message.channel,"il manque des infos là ! Le nom du warn et le contenu du warn s'il te plait.");
    }
}

async function findWarn (bot,message) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        throw new PermissionException();
    }
    const content = message.content;
    const contentArray = content.split(/ +/);
    const command = contentArray.shift(); // !addWarn
    const nomDuWarn = contentArray.shift();
    const FindWarn = {
        "nomDuWarn": nomDuWarn,
    }
    if (nomDuWarn == null) {
        messageService.sendChannel(message.channel,"il manque des infos là pour connaître l'existence ou non de ce warn ! Le nom du warn et le contenu du warn s'il te plait.");
        return;
    }
    mongoService.findOne(FindWarn,collection);
}

module.exports = {
    addWarn, 
    findWarn // vérifier si le warn existe : p ou dans la collection.
}