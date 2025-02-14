import { UUID } from "mongodb";

export type EntityDocument = {
    _id?: UUID
};

export abstract class Entity {
    
    private id?: UUID;

    constructor() {
    } 

    public getId() {
        return this.id;
    }

    public setId(id: UUID | undefined) {
        this.id = id;
    }

    public transformToDocument() {
        const document: EntityDocument = {
            _id: undefined
        };
        return this.transformToDocumentWithValue(document, this);
    }

    protected transformToDocumentWithValue(document: EntityDocument, entity: Entity) {
        document._id = entity.getId();
        return document;
    }

    protected static transformToObjectWithValue(entity: Entity, document: EntityDocument) {
        entity.setId(document._id);
        return entity;
    }
}