import {Entity, EntityDocument} from "./Entity";

export type ByServerEntityDocument = EntityDocument & {
    serverId?: string
}

export abstract class ByServerEntity extends Entity {

    private serverId: string | undefined;

    constructor(serverId?: string) {
        super();
        this.serverId = serverId;
    }

    getServerId() {
        return this.serverId;
    }

    setServerId(serverId: string | undefined) {
        this.serverId = serverId;
    }

    protected static transformToObjectWithValue(byServerEntity: ByServerEntity, document: ByServerEntityDocument) {
        super.transformToObjectWithValue(byServerEntity, document);

        byServerEntity.setServerId(document.serverId);
    
        return byServerEntity;
    }

    transformToDocument() {
        const document = {};
        return this.transformToDocumentWithValue(document, this);
    }

    protected transformToDocumentWithValue(document: ByServerEntityDocument, byServerEntity: ByServerEntity) {
        super.transformToDocumentWithValue(document, byServerEntity);

        document.serverId = byServerEntity.getServerId();

        return document;
    }
}