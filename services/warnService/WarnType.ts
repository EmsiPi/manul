const ByServerEntity = require("../ByServerEntity");

class WarnType extends ByServerEntity {

    /**
     * @type {String}
     */
    #name;

    /**
     * @type {String}
     */
    #message;

    constructor(name, message) {
        super();
        this.#name = name;
        this.#message = message;
    }
    
    /**
     * Transforme un document en objet WarnType 
     * @param {WithId<Document>} document 
     */
    static transformToObject(document) {
        const userWarn = new WarnType();
        WarnType._transformToObjectWithValue(userWarn, document);
    
        return userWarn;
    }

    /**
     * Transforme un document en objet WarnType 
     * @param {WarnType} warnType
     * @param {WithId<Document>} document 
     */
    static _transformToObjectWithValue(warnType, document) {
        super._transformToObjectWithValue(warnType, document);

        warnType.setMessage(document.message);
        warnType.setName(document.name);
    
        return warnType;
    }

    /**
     * Transforme un WarnType en document
     */
    transformToDocument() {
        const document = {};
        return this._transformToDocumentWithValue(document, this);
    }

    /**
     * Transforme un WarnType en document
     * @param {WithId<Document>} document 
     * @param {WarnType} userWarn;
     */
    _transformToDocumentWithValue(document, userWarn) {
        super._transformToDocumentWithValue(document, userWarn);

        document.message = userWarn.getMessage();
        document.name = userWarn.getName();

        return document;
    }

    getName() {
        return this.#name;
    }

    /**
     * 
     * @param {String} name 
     */
    setName(name) {
        this.#name = name;
    }

    getMessage() {
        return this.#message;
    }

    /**
     * 
     * @param {String} message 
     */
    setMessage(message) {
        this.#message = message;
    }
}

module.exports = WarnType;