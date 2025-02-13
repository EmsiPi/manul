import Entity from "./Entity";

class ByServerEntity extends Entity {

    #serverId;

    /**
     * 
     * @param {String} serverId 
     */
    constructor(serverId: String) {
        super();
        this.#serverId = serverId;
    }

    getServerId() {
        return this.#serverId;
    }

    setServerId(serverId: String) {
        this.#serverId = serverId;
    }
        
    /**
     * Transforme un document en objet ByServerEntity 
     * @param {WithId<Document>} document 
     */
    static transformToObject(document: WithId<Document>) {
        const byServerEntity = new ByServerEntity();
        WarnType._transformToObjectWithValue(byServerEntity, document);
    
        return byServerEntity;
    }

    /**
     * Transforme un document en objet ByServerEntity 
     * @param {ByServerEntity} byServerEntity
     * @param {WithId<Document>} document 
     */
    static _transformToObjectWithValue(byServerEntity: ByServerEntity, document: WithId<Document>) {
        super._transformToObjectWithValue(byServerEntity, document);

        byServerEntity.setServerId(document.serverId);
    
        return byServerEntity;
    }

    /**
     * Transforme un ByServerEntity en document
     */
    transformToDocument() {
        const document = {};
        return this._transformToDocumentWithValue(document, this);
    }

    /**
     * Transforme un ByServerEntity en document
     * @param {ByServerEntity} byServerEntity
     * @param {WithId<Document>} document 
     */
    _transformToDocumentWithValue(document: WithId<Document>, byServerEntity: ByServerEntity) {
        super._transformToDocumentWithValue(document, byServerEntity);

        document.serverId = byServerEntity.getServerId();

        return document;
    }
}

export default ByServerEntity;