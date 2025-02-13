import { Client, Message, PermissionsBitField } from "discord.js";
import { BotTargeTException, WrongWarnTypeException, NoWarnTypeException, NoTargetException, PermissionException } from "./WarnException";
import messageService from "../messageService/MessageService";
import warnTypeService from "./WarnTypeService";
import EntityService from "../EntityService";
import UserWarn from "./UserWarn";
import { UUID } from "mongodb";
import { CommandManulClient } from "../../Loaders/loadCommands";

const collection = "collectionMembresWarn";

class WarnService extends EntityService {

    /**
     * @type {WarnService}
     */
    static #instance;

    /**
     * 
     * @returns {WarnService}
     */
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new WarnService();
        }

        return this.#instance;
    }

    constructor() {
        super();
    }

    toObject() {
        return object => UserWarn.transformToObject(object);
    }

    /**
     * 
     * @returns {function(UserWarn): Object} 
     */
    toDocument() {
        return entity => entity.transformToDocument();
    }

    getCollection() {
        return collection;
    }
    /**
     * 
     * @param {CommandManulClient} bot 
     * @param {Message<boolean>} message 
     * @returns 
     * @throws {BotTargeTException, WrongWarnTypeException, NoWarnTypeException, NoTargetException, PermissionException}
     */
    async warn(bot: CommandManulClient, message: Message<boolean>) {
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

        const typeDeWarn = await warnTypeService.findWarn(bot,message,NomDuWarn);

        if (typeDeWarn == null && NomDuWarn == ("p")) {
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

            await this.#incrementOrCreateUserWarn(target.user.id, message.guild.id);
            messageService.sendDm(target, messageToSend);
            messageService.sendChannel(message.channel,"le membre a bien été warn ! >:(");
            
            return;
        }

        await this.#incrementOrCreateUserWarn(target.user.id, message.guild.id);
        
        const warnToSend = typeDeWarn.getMessage();
        if (warnToSend != null){
            messageService.sendDm(target,warnToSend);
            messageService.sendChannel(message.channel,"le membre a bien été warn ! >:(");
        } else {
            messageService.sendChannel(message.channel,"je n'ai rien trouvé à lui envoyer... >:(")
        }
    }

    /**
     * Récupère l'objet warn d'un utilisateur sur un serveur spécifique puis incrément son nombre d'avertissement.
     * 
     * Si L'utilisateur n'a pas été trouvé, un nouvel objet est sauvegardé.
     * @param {String} userId 
     * @param {String} serverId 
     */
    async #incrementOrCreateUserWarn(userId: String, serverId: String) {
        let userWarn = await this.findByUserAndServerId(userId, serverId);
        if(userWarn == null) {
            userWarn = new UserWarn(userId, 0, serverId);
        }

        userWarn.incrementWarn();
        return this.store(userWarn);
    }

    async delwarn(bot: CommandManulClient, message: Message<boolean>) {
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
        
        const targetname = await this.findByUserAndServerId(target.user.id, message.guild.id);
        if (targetname != null) { 
            this.deleteByUserAndServerId(target.user.id, message.guild.id);
            messageService.sendChannel(message.channel,"Les warns de ce membre ont été retirés !");
            messageService.sendDm(target,"Tes warns ont été retiré ! Bravo, tu es de nouveau blanc comme neige.");
        } else { 
            messageService.sendChannel(message.channel,"Ce membre n'a aucun warn, il est encore innocent monsieur !");
        }
    }

    async showNumWarn(bot: CommandManulClient, message: Message<boolean>) {
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
        
        const targetname = await this.findByUserAndServerId(target.user.id, message.guild.id);
        if (targetname != null) {
            messageService.sendChannel(message.channel,"Ce membre a été warn " + targetname.getWarnNumber() + " fois");
        } else {
            messageService.sendChannel(message.channel,"Ce membre n'a aucun warn, il est encore innocent monsieur !");
        }

    }

    /**
     * 
     * @param {UUID} userId 
     * @param {UUID} serverId 
     * @returns {Promise<UserWarn> | Promise<null>}
     */
    async findByUserAndServerId(userId: UUID, serverId: UUID) {
        return this.findOne({"targetId": userId, "serverId": serverId});
    }

    /**
     * 
     * @param {UUID} userId 
     * @param {UUID} serverId 
     * @returns {Promise<UserWarn> | Promise<null>}
     */
    async deleteByUserAndServerId(userId: UUID, serverId: UUID) {
        return this.deleteOne({"targetId": userId, "serverId": serverId});
    }

    /**
     * 
     * @param {UUID} serverId 
     * @returns {Promise<UserWarn[]>}
     */
    async findAllByServerId(serverId: UUID) {
        return this.findMany({"serverId": serverId});
    }
}


export default WarnService.getInstance();