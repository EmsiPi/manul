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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _MongoService_instance, _MongoService_database;
const { MongoClient, UUID, Db } = require('mongodb');
const logService = require("../logService/LogService");
const Entity = require('../Entity');
const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const MONGO_PORT = process.env.MONGO_PORT;
const DATABASE_NAME = process.env.DATABASE_NAME;
const uri = "mongodb://" + MONGO_USERNAME + ":" + MONGO_PASSWORD + "@localhost:" + MONGO_PORT;
class MongoService {
    static getInstance() {
        if (__classPrivateFieldGet(this, _a, "f", _MongoService_instance) == null) {
            __classPrivateFieldSet(this, _a, new MongoService(), "f", _MongoService_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _MongoService_instance);
    }
    constructor() {
        /**
         * @type {Db}
         */
        _MongoService_database.set(this, void 0);
        const mongoClient = new MongoClient(uri);
        __classPrivateFieldSet(this, _MongoService_database, mongoClient.db(DATABASE_NAME), "f");
        logService.info("Création d'un client MongoDb sur localhost:" + MONGO_PORT);
    }
    /**
     *
     * @param {*} entity
     * @param {function(Entity): Object} parseFunction
     * @returns
     */
    toDocument(entity, parseFunction) {
        if (entity == null) {
            return null;
        }
        return parseFunction(entity);
    }
    /**
     *
     * @param {Entity[]} entityList
     * @param {function(Entity): Object} parseFunction
     */
    toJsonList(entityList) {
        if (entityList == null) {
            return [];
        }
        return entityList.map(entity => JSON.parse(JSON.stringify(entity)));
    }
    /**
     *
     * @param {*} document
     * @param {function(Object): Entity} parseFunction
     * @returns
     */
    toObject(document, parseFunction) {
        if (document == null) {
            return null;
        }
        return parseFunction(document);
    }
    /**
     *
     * @param {Object[]} documents
     * @param {function(Object): Entity} parseFunction
     * @returns
     */
    toObjectList(documents, parseFunction) {
        if (documents == null) {
            return [];
        }
        return documents.map(document => this.toObject(document, parseFunction));
    }
    /**
     *
     * @param {*} object Les paramètres de recherche.
     * @param {String} collectionName Le nom de la collection.
     * @param {function(Entity): Object} parseFunction
     * @returns
     */
    find(object, collectionName, parseFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = __classPrivateFieldGet(this, _MongoService_database, "f").collection(collectionName);
            const entityList = yield collection.find(object).toArray();
            return this.toObjectList(entityList, parseFunction);
        });
    }
    /**
     *
     * @param {*} object Les paramètres de recherche.
     * @param {String} collectionName Le nom de la collection.
     * @param {function(Entity): Object} parseFunction
     * @returns
     */
    findOne(object, collectionName, parseFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = __classPrivateFieldGet(this, _MongoService_database, "f").collection(collectionName);
            const entity = yield collection.findOne(object);
            return this.toObject(entity, parseFunction);
        });
    }
    /**
     * Insère un objet dans la collection de nom donné en paramètre.
     * Un id sera généré automatiquement si l'objet n'en possède pas.
     *
     * Si l'objet possède déjà un id, une requête de modification par id sera lancée dans mongo pour remplacer l'objet existant en base.
     * @param {Entity} entity L'objet à sauvegarder.
     * @param {String} collectionName Le nom de la collection.
     * @param {function(Entity): Object} toDocument
     * @param {function(Object): Entity} toObject
     * @returns
     */
    store(entity, collectionName, toDocument, toObject) {
        const collection = __classPrivateFieldGet(this, _MongoService_database, "f").collection(collectionName);
        if (entity.getId() == null) {
            entity.setId(new UUID());
            const document = this.toDocument(entity, toDocument);
            const insertValue = collection.insertOne(document);
            return this.toObject(insertValue, toObject);
        }
        const document = this.toDocument(entity, toDocument);
        const updateValue = collection.replaceOne({ "_id": entity.getId() }, document);
        return this.toObject(updateValue, toObject);
    }
    /**
     *
     * @param {*} object Les paramètres de recherche.
     * @param {String} collectionName Le nom de la collection.
     * @param {function(Entity): Object} parseFunction
     * @returns
     */
    deleteMany(object, collectionName, parseFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = __classPrivateFieldGet(this, _MongoService_database, "f").collection(collectionName);
            const entityList = yield collection.deleteMany(object);
            return this.toObjectList(entityList, parseFunction);
        });
    }
    /**
     *
     * @param {*} object Les paramètres de recherche.
     * @param {String} collectionName Le nom de la collection.
     * @param {function(Entity): Object} parseFunction
     * @returns
     */
    deleteOne(object, collectionName, parseFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = __classPrivateFieldGet(this, _MongoService_database, "f").collection(collectionName);
            var entity = yield collection.deleteOne(object);
            return this.toObject(entity, parseFunction);
        });
    }
    /**
     *
     * @param {*} object Les paramètres de recherche.
     * @param {*} update Les modifications de l'objet.
     * @param {String} collectionName Le nom de la collection.
     * @param {function(Entity): Object} parseFunction
     * @returns
     */
    updateOne(object, update, collectionName, parseFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = __classPrivateFieldGet(this, _MongoService_database, "f").collection(collectionName);
            const entity = yield collection.updateOne(object, update);
            return this.toObject(entity, parseFunction);
        });
    }
}
_a = MongoService, _MongoService_database = new WeakMap();
/**
 * @type {MongoService}
 */
_MongoService_instance = { value: void 0 };
module.exports = MongoService.getInstance();
