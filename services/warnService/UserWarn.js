const { UUID } = require("mongodb");
const Entity = require("../Entity");
const ByServerEntity = require("../ByServerEntity");

class UserWarn extends ByServerEntity {

    /**
     * @type {UUID}
     */
    #targetId;

    /**
     * @type {number}
     */
    #warnNumber;

    constructor(targetId, warnNumber, serverId) {
        super(serverId);
        this.#targetId = targetId;
        this.#warnNumber = warnNumber;
    }
    
    /**
     * Transforme un document en objet UserWarn 
     * @param {WithId<Document>} document 
     */
    static transformToObject(document) {
        const userWarn = new UserWarn();
        UserWarn._transformToObjectWithValue(userWarn, document);
    
        return userWarn;
    }

    /**
     * Transforme un document en objet UserWarn 
     * @param {UserWarn} userWarn
     * @param {WithId<Document>} document 
     */
    static _transformToObjectWithValue(userWarn, document) {
        super._transformToObjectWithValue(userWarn, document);

        userWarn.setServerId(document.serverId);
        userWarn.setTargetId(document.targetId);
        userWarn.setWarnNumber(document.warnNumber);
    
        return userWarn;
    }

    /**
     * Transforme un userWarn en document
     */
    transformToDocument() {
        const document = {};
        return this._transformToDocumentWithValue(document, this);
    }

    /**
     * Transforme un userWarn en document
     * @param {UserWarn} userWarn;
     */
    _transformToDocumentWithValue(document, userWarn) {
        super._transformToDocumentWithValue(document, userWarn);

        document.targetId = userWarn.getTargetId();
        document.serverId = userWarn.getServerId();
        document.warnNumber = userWarn.getWarnNumber();

        return document;
    }

    getTargetId() {
        return this.#targetId;
    }

    setTargetId(targetId) {
        this.#targetId = targetId;
    }

    getWarnNumber() {
        return this.#warnNumber;
    }

    setWarnNumber(warnNumber) {
        this.#warnNumber = warnNumber;
    }

    incrementWarn() {
        this.#warnNumber++;
    }
}

module.exports = UserWarn;