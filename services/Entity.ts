import { UUID } from "mongodb";

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
    _transformToDocumentWithValue(document: WithId<Document>, entity: Entity) {
        document._id = entity.getId();
        return document;
    }

    /**
     * 
     * @param {WithId<Document>} document 
     */
    static transformToObject(document: WithId<Document>) {
        const entity = new Entity();
        return this._transformToObjectWithValue(entity, document);
    }

    /**
     * 
     * @param {Entity} entity
     * @param {WithId<Document>} document 
     */
    static _transformToObjectWithValue(entity: Entity, document: WithId<Document>) {
        entity.setId(document._id);
        return entity;
    }
}

export default Entity;