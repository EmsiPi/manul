import { Client, Message, PermissionsBitField } from "discord.js";
import { PermissionException, NoWarnNameException } from "./WarnException";
import messageService from "../messageService/MessageService";
import EntityService from "../EntityService";
import WarnType from "./WarnType";
import { description } from "../../Commandes/AddWarn";
import { CommandManulClient } from "../../Loaders/loadCommands";

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
     * @param {CommandManulClient} bot 
     * @param {Message<boolean>} message 
     * @returns 
     */
    async addWarn(bot: CommandManulClient, message: Message<boolean>) {
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
    async findWarn (message: Message<boolean>, warnName: WarnType) {
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
    async showWarnType(message) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            throw new PermissionException();
        }

        const listeWarns = await this.findAllByServerId(message.guild.id);
        if (listeWarns != null) { 
            const listeWarnsMap = listeWarns.map((listeWarns) => {
                return {"name": "Nom du warn : "+ listeWarns.getName(), "value": "Description : "+ listeWarns.getMessage() };
              });
            console.log(listeWarnsMap)
    
                const embedContent = {
                    color: 0x0099ff,
                    description: "Voici la liste des warns sur ce serveur :",
                    fields: listeWarnsMap
                }
                messageService.sendEmbedChannel(message.channel, embedContent);
        } else {
            messageService.sendChannel(message.channel,"Ce serveur n'a aucun warn, c'est une zone de gentils gens !");
        }
    }

    /**
     * 
     * @param {WarnType} warnType
     */
    returnMessageAndNameWarn(warnType: WarnType){
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
    async findByNameAndServerId(warnName: String, serverId: String) {
        return super.findOne({"name": warnName, "serverId": serverId});
    }

    /**
     * 
     * @param {UUID} serverId 
     * @returns {Promise<WarnType[]>}
     */
    async findAllByServerId(serverId: UUID) {
        return this.findMany({"serverId": serverId});
    }
}


export default WarnTypeService.getInstance();