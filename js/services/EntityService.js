"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { UUID } = require("mongodb");
const MongoService = require("./mongoService/MongoService");
const Entity = require("./Entity");
class EntityService {
    constructor() {
        this._mongoService = MongoService;
    }
    /**
     *
     * @param {UUID} id
     * @param {String} collection
     * @param {function(Entity): Object} parseFunction
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._mongoService.findOne({ "_id": id }, this.getCollection(), this.toObject());
        });
    }
    findOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._mongoService.findOne(filter, this.getCollection(), this.toObject());
        });
    }
    findMany(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._mongoService.find(filter, this.getCollection(), this.toObject());
        });
    }
    /**
     *
     * @param {UUID} id
     * @param {String} collection
     * @param {function(Entity): Object} parseFunction
     */
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._mongoService.deleteOne({ "_id": id }, this.getCollection(), this.toObject());
        });
    }
    deleteOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._mongoService.deleteOne(filter, this.getCollection(), this.toObject());
        });
    }
    deleteMany(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._mongoService.deleteMany(filter, this.getCollection(), this.toObject());
        });
    }
    /**
     *
     * @param {*} object
     * @param {*} update
     * @param {*} collectionName
     * @param {function(Entity): Object} parseFunction
     * @returns
     */
    updateOne(entity, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._mongoService.updateOne(entity, update, this.getCollection(), this.toDocument());
        });
    }
    /**
     *
     * @param {Entity} entity
     * @param {String} collection
     * @param {function(Entity): Object} toDocument
     * @param {function(Object): Json} toObject
     */
    store(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._mongoService.store(entity, this.getCollection(), this.toDocument(), this.toObject());
        });
    }
    /**
     * Convertit un document json en objet de type Entity.
     * @returns {(object: any) => Entity}
     */
    toObject() {
        return object => Entity.transformToObject(object);
    }
    /**
     * Convertit un object en document json.
     * @returns {function(Entity): Object}
     */
    toDocument() {
        return entity => entity.transformToDocument(object);
    }
    /**
     * Retourne le nom de la collection se référant au service.
     */
    getCollection() {
    }
}
module.exports = EntityService;
