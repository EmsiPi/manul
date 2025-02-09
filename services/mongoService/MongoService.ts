const {MongoClient, UUID, Db} = require('mongodb');
const logService = require("../logService/LogService");
const Entity = require('../Entity');

const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const MONGO_PORT = process.env.MONGO_PORT;
const DATABASE_NAME = process.env.DATABASE_NAME;

const uri = "mongodb://" + MONGO_USERNAME + ":" + MONGO_PASSWORD + "@localhost:" + MONGO_PORT;

class MongoService {

    /**
     * @type {MongoService}
     */
    static #instance;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new MongoService();
        }

        return this.#instance;
    }

    /**
     * @type {Db}
     */
    #database

    constructor() {
        const mongoClient = new MongoClient(uri);
        this.#database = mongoClient.db(DATABASE_NAME);
        logService.info("Création d'un client MongoDb sur localhost:" + MONGO_PORT);
    }

    /**
     * 
     * @param {*} entity 
     * @param {function(Entity): Object} parseFunction 
     * @returns 
     */
    toDocument(entity, parseFunction) {
        if(entity == null) {
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
        if(entityList == null) {
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
        if(document == null) {
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
        if(documents == null) {
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
    async find(object, collectionName, parseFunction){
        const collection = this.#database.collection(collectionName);
        const entityList = await collection.find(object).toArray();
        return this.toObjectList(entityList, parseFunction);
    }

    /**
     * 
     * @param {*} object Les paramètres de recherche.
     * @param {String} collectionName Le nom de la collection.
     * @param {function(Entity): Object} parseFunction 
     * @returns 
     */
    async findOne(object, collectionName, parseFunction){
        const collection = this.#database.collection(collectionName);
        const entity = await collection.findOne(object);
        return this.toObject(entity, parseFunction);
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
        const collection = this.#database.collection(collectionName);

        if (entity.getId() == null) {
            entity.setId(new UUID());
            const document = this.toDocument(entity, toDocument);
            const insertValue = collection.insertOne(document);
            return this.toObject(insertValue, toObject);
        }
        
        const document = this.toDocument(entity, toDocument);
        const updateValue = collection.replaceOne({"_id": entity.getId()}, document);
        return this.toObject(updateValue, toObject);
    }

    /**
     * 
     * @param {*} object Les paramètres de recherche.
     * @param {String} collectionName Le nom de la collection.
     * @param {function(Entity): Object} parseFunction 
     * @returns 
     */
    async deleteMany(object, collectionName, parseFunction){
        const collection = this.#database.collection(collectionName);
        const entityList = await collection.deleteMany(object);
        return this.toObjectList(entityList, parseFunction);
    }

    /**
     * 
     * @param {*} object Les paramètres de recherche.
     * @param {String} collectionName Le nom de la collection.
     * @param {function(Entity): Object} parseFunction 
     * @returns 
     */
    async deleteOne(object, collectionName, parseFunction){
        const collection = this.#database.collection(collectionName);
        var entity = await collection.deleteOne(object);
        return this.toObject(entity, parseFunction);
    }

    /**
     * 
     * @param {*} object Les paramètres de recherche.
     * @param {*} update Les modifications de l'objet.
     * @param {String} collectionName Le nom de la collection.
     * @param {function(Entity): Object} parseFunction 
     * @returns 
     */
    async updateOne(object, update, collectionName, parseFunction) {
        const collection = this.#database.collection(collectionName);
        const entity = await collection.updateOne(object, update);
        return this.toObject(entity, parseFunction);
    }

}

module.exports = MongoService.getInstance();