import { UUID, WithId } from "mongodb";
import MongoService from "./mongoService/MongoService";
import { Entity, EntityDocument } from "./Entity";

abstract class EntityService<E extends Entity, D extends EntityDocument> {

    private mongoService;

    constructor() {
        this.mongoService = MongoService;
    }

    async findById(id: UUID) {
        return this.mongoService.findOne({"_id": id}, this.getCollection(), this.toObject());
    }

    async findOne(filter: any) {
        return this.mongoService.findOne(filter, this.getCollection(), this.toObject());
    }

    async findMany(filter: any) {
        return this.mongoService.find(filter, this.getCollection(), this.toObject()).then(element => element.filter(e => e != null));
    }

    async deleteById(id: UUID) {
        return this.mongoService.deleteOne({"_id": id}, this.getCollection());
    }

    async deleteOne(filter: any) {
        return this.mongoService.deleteOne(filter, this.getCollection());
    }

    async deleteMany(filter: any) {
        return this.mongoService.deleteMany(filter, this.getCollection());
    }

    async updateOne(filter: any, update: D) {
        return this.mongoService.updateOne(filter, update, this.getCollection());
    }

    async store(entity: E) {
        return this.mongoService.store(entity, this.getCollection(), this.toDocument(), this.toObject());
    }

    abstract toObject(): (document: D) => E;

    abstract toDocument(): (entity: E) => D;

    /**
     * Retourne le nom de la collection se référant au service.
     */
    abstract getCollection(): string;
}

export default EntityService;