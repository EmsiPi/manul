const { UUID } = require("mongodb");

class Entity {
    
    /**
     * @type {UUID}
     */
    #id;

    constructor() {
    } 

    getId() {
        return this.#id;
    }

    /**
     * 
     * @param {UUID} id 
     */
    setId(id) {
        this.#id = id;
    }

    /**
     * 
     * @param {Entity} entity 
     */
    transformToDocument() {
        const document = {};
        return this._transformToDocumentWithValue(document, this);
    }

    /**
     * 
     * @param {WithId<Document>} document 
     * @param {Entity} entity 
     */
    _transformToDocumentWithValue(document, entity) {
        document._id = entity.getId();
        return document;
    }

    /**
     * 
     * @param {WithId<Document>} document 
     */
    static transformToObject(document) {
        const entity = new Entity();
        return this._transformToObjectWithValue(entity, document);
    }

    /**
     * 
     * @param {Entity} entity
     * @param {WithId<Document>} document 
     */
    static _transformToObjectWithValue(entity, document) {
        entity.setId(document._id);
        return entity;
    }
}

module.exports = Entity;