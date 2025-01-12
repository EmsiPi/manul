const {Client, Message, PermissionsBitField } = require("discord.js");
const { PermissionException, NoWarnTypeException, NoWarnNameException } = require("./WarnException");
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
        const warnName = contentArray.shift();
        const warnContent = contentArray.join(" ");
        const warnTypeFound = await this.findWarn(bot, message, warnName);
        if (warnTypeFound != null) {
            messageService.sendChannel(message.channel, "Un warn de ce nom est déjà dans la base de données !");
            return;
        }

        if (warnName != null && warnContent != null) {
            const warnType = new WarnType();
            warnType.setMessage(warnContent);
            warnType.setName(warnName);
            warnType.setServerId(message.guild.id);

            this.store(warnType);
            messageService.sendChannel(message.channel, "Le warn a bien été ajouté à la base de données !");
        } else { 
            messageService.sendChannel(message.channel, "il manque des infos là ! Le nom du warn et le contenu du warn s'il te plait.");
        }
    }
    
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     * @returns {WarnType}
     */
    async findWarn(bot, message, warnName) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            throw new PermissionException();
        }
        if (warnName == null) {
            throw new NoWarnNameException(); 
        }
        return this.findByNameAndServerId(warnName, message.guild.id);
    }
    
    /**
     * 
     * @param {Client} bot 
     * @param {Message<boolean>} message 
     */
    async showWarnType(bot, message) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            throw new PermissionException();
        }

        const listeWarns = await this.findAllByServerId(message.guild.id);
        if (listeWarns != null) { 
            messageService.sendChannel(message.channel,"Voici la liste des warns " + JSON.stringify(listeWarns.map(this.returnMessageAndNameWarn)));
            
        } else {
            messageService.sendChannel(message.channel,"Ce serveur n'a aucun warn, c'est une zone de gentils gens !");
        }
    }

    /**
     * 
     * @param {WarnType} warnType
     */
    returnMessageAndNameWarn(warnType){
        const warnName = warnType.getName();
        const warnMessage = warnType.getMessage();
        const warnNameMessage = {};
        warnNameMessage.warnName = warnName;
        warnNameMessage.warnMessage = warnMessage;
        return warnNameMessage;
    }



    /**
     * 
     * @param {String} warnName 
     * @param {String} serverId 
     */
    async findByNameAndServerId(warnName, serverId) {

        return super.findOne({"name": warnName, "serverId": serverId});
    }

    /**
     * 
     * @param {UUID} serverId 
     * @returns {Promise<WarnType[]>}
     */
    async findAllByServerId(serverId) {
        return this.findMany({"serverId": serverId});
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