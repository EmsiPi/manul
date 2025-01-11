const {Client, Message, PermissionsBitField } = require("discord.js");
const { PermissionException } = require("./WarnException");
const messageService = require("../messageService/MessageService");
const mongoService = require("../mongoService/MongoService");
const EntityService = require("../EntityService");
const WarnType = require("./WarnType");

const collection = "collectionWarn"

class WarnTypeService extends EntityService {

    /**
     * @type {WarnTypeService}
     */
    static #instance;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new WarnTypeService();
        }

        return this.#instance;
    }

    constructor() {
        super();
    }

    /**
     * 
     * @returns {function(Object): WarnType} 
     */
    toObject() {
        return object => WarnType.transformToObject(object)
    }
    
    /**
     * 
     * @returns {function(WarnType): Object} 
     */
    toDocument() {
        return object => object.transformToDocument(object)
    }

    
    getCollection() {
        return collection;
    }

    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async addWarn(bot, message) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            throw new PermissionException();
        }
        const content = message.content;
        const contentArray = content.split(/ +/);
        const command = contentArray.shift(); // !addWarn
        const warName = contentArray.shift();
        const warnContent = contentArray.join(" ");
        const warnTypeFound = await this.findWarn(bot, message);
        if (warnTypeFound != null) {
            messageService.sendChannel(message.channel,"Un warn de ce nom est déjà dans la base de données !");
            return;
        }

        if (warName != null && warnContent != null) {
            const warnType = new WarnType();
            warnType.setMessage(warnContent);
            warnType.setName(warName);
            warnType.setServerId(message.guild.id);

            this.store(warnType);
            messageService.sendChannel(message.channel,"Le warn a bien été ajouté à la base de données !");
        } else { 
            messageService.sendChannel(message.channel,"il manque des infos là ! Le nom du warn et le contenu du warn s'il te plait.");
        }
    }
    
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns {WarnType}
     */
    async findWarn(bot, message, nomDuWarn) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            throw new PermissionException();
        }
        if (nomDuWarn == null) {
            messageService.sendChannel(message.channel,"il manque des infos là pour connaître l'existence ou non de ce warn ! Le nom du warn et le contenu du warn s'il te plait.");
            return;
        }
        console.log(nomDuWarn + "3")
        const GuildId = message.guild.id
        console.log(GuildId + "4")

        return this.findByNameAndServerId(nomDuWarn, message.guild.id);
    }

    /**
     * 
     * @param {String} warnName 
     * @param {String} serverId 
     */
    async findByNameAndServerId(warnName, serverId) {
        console.log(warnName + "5")
        console.log(serverId + "6")
        return super.findOne({"name": warnName, "serverId": serverId});
    }

    /**
     * 
     * @param {WarnType} warnType 
     */
    async store(warnType) {
        super.store(warnType);
    }
}


module.exports = WarnTypeService.getInstance();