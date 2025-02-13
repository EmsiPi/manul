import { WithId } from "mongodb";

import ByServerEntity from "../ByServerEntity";

class WarnType extends ByServerEntity {

    /**
     * @type {String}
     */
    #name;

    /**
     * @type {String}
     */
    #message;

    constructor(name: String, message: String) {
        super();
        this.#name = name;
        this.#message = message;
    }
    
    /**
     * Transforme un document en objet WarnType 
     * @param {WithId<Document>} document 
     */
    static transformToObject(document: WithId<Document>) {
        const userWarn = new WarnType();
        WarnType._transformToObjectWithValue(userWarn, document);
    
        return userWarn;
    }

    /**
     * Transforme un document en objet WarnType 
     * @param {WarnType} warnType
     * @param {WithId<Document>} document 
     */
    static _transformToObjectWithValue(warnType: WarnType, document: WithId<Document>) {
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
    _transformToDocumentWithValue(document: WithId<Document>, userWarn: WarnType) {
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
    setName(name: String) {
        this.#name = name;
    }

    getMessage() {
        return this.#message;
    }

    /**
     * 
     * @param {String} message 
     */
    setMessage(message: String) {
        this.#message = message;
    }
}

export default WarnType;