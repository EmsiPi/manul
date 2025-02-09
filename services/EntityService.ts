const { UUID } = require("mongodb");
const MongoService = require("./mongoService/MongoService");
const Entity = require("./Entity");

class EntityService {

    /**
     * @type {MongoService}
     */
    _mongoService;

    constructor() {
        this._mongoService = MongoService;
    }

    /**
     * 
     * @param {UUID} id 
     * @param {String} collection
     * @param {function(Entity): Object} parseFunction 
     */
    async findById(id) {
        return this._mongoService.findOne({"_id": id}, this.getCollection(), this.toObject());
    }

    async findOne(filter) {
        return this._mongoService.findOne(filter, this.getCollection(), this.toObject());
    }

    async findMany(filter) {
        return this._mongoService.find(filter, this.getCollection(), this.toObject());
    }

    /**
     * 
     * @param {UUID} id 
     * @param {String} collection
     * @param {function(Entity): Object} parseFunction 
     */
    async deleteById(id) {
        return this._mongoService.deleteOne({"_id": id}, this.getCollection(), this.toObject());
    }

    async deleteOne(filter) {
        return this._mongoService.deleteOne(filter, this.getCollection(), this.toObject());
    }

    async deleteMany(filter) {
        return this._mongoService.deleteMany(filter, this.getCollection(), this.toObject());
    }

    /**
     * 
     * @param {*} object 
     * @param {*} update 
     * @param {*} collectionName 
     * @param {function(Entity): Object} parseFunction 
     * @returns 
     */
    async updateOne(entity, update) {
        return this._mongoService.updateOne(entity, update, this.getCollection(), this.toDocument());
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {String} collection
     * @param {function(Entity): Object} toDocument 
     * @param {function(Object): Json} toObject 
     */
    async store(entity) {
        return this._mongoService.store(entity, this.getCollection(), this.toDocument(), this.toObject());
    }

    /**
     * Convertit un document json en objet de type Entity.
     * @returns {(object: any) => Entity}
     */
    toObject() {
        return object => Entity.transformToObject(object)
    }

    /**
     * Convertit un object en document json.
     * @returns {function(Entity): Object} 
     */
    toDocument() {
        return entity => entity.transformToDocument(object)
    }

    /**
     * Retourne le nom de la collection se référant au service.
     */
    getCollection() {

    }
}

module.exports = EntityService;