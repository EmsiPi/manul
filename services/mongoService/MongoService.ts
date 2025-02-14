import { MongoClient, UUID, Db, Filter, OptionalUnlessRequiredId, WithoutId, ReturnDocument } from 'mongodb';
import logService from "../logService/LogService";
import {Entity, EntityDocument} from '../Entity';

const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const MONGO_PORT = process.env.MONGO_PORT;
const DATABASE_NAME = process.env.DATABASE_NAME;

const uri = "mongodb://" + MONGO_USERNAME + ":" + MONGO_PASSWORD + "@localhost:" + MONGO_PORT;

class MongoService {

    private static instance?: MongoService;

    static getInstance() {
        if(this.instance == null) {
            this.instance = new MongoService();
        }

        return this.instance;
    }

    private database: Db

    constructor() {
        const mongoClient = new MongoClient(uri);
        this.database = mongoClient.db(DATABASE_NAME);
        logService.info("Création d'un client MongoDb sur localhost:" + MONGO_PORT);
    }

    private toDocument<T extends Entity, R extends EntityDocument>(entity: T, parseFunction: (entity: T) => R) {
        return parseFunction(entity);
    }

    private toObject<T extends EntityDocument, R extends Entity>(document: T, parseFunction: (document: T) => R) {
        if(document == null) {
            return null;
        }

        return parseFunction(document);
    }

    private toObjectList<T extends EntityDocument, R extends Entity>(documents: T[], parseFunction: (documents: T) => R) {
        if(documents == null) {
            return [];
        }

        return documents.map(document => this.toObject(document, parseFunction));
    }

    async find<T extends EntityDocument, R extends Entity>(object: any, collectionName: string, parseFunction: (documents: T) => R){
        const collection = this.database.collection<T>(collectionName);
        const entityList = await collection.find(object).toArray();
        return this.toObjectList(entityList as T[], parseFunction);
    }

    async findOne<T extends EntityDocument, R extends Entity>(object: any, collectionName: string, parseFunction: (document: T) => R){
        const collection = this.database.collection<T>(collectionName);
        const entity = await collection.findOne(object);
        return this.toObject(entity as T, parseFunction);
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
    async store<E extends Entity, D extends EntityDocument>(entity: E, collectionName: string, toDocument: (entity: E) => D , toObject: (document: D) => E) {
        const collection = this.database.collection<D>(collectionName);

        var id = entity.getId();
        if (id == null) {
            const document = this.toDocument(entity, toDocument);
            await collection.insertOne(document as OptionalUnlessRequiredId<D>);
            return entity;
        }
        
        const document = this.toDocument(entity, toDocument);
        const updateValue = await collection.findOneAndReplace({"_id": id} as Filter<D>, document, { returnDocument: ReturnDocument.AFTER }) as D;
        return this.toObject(updateValue, toObject);
    }  

    async deleteMany(filter: any, collectionName: string){
        const collection = this.database.collection(collectionName);
        return await collection.deleteMany(filter);
    }

    async deleteOne(filter: any, collectionName: string){
        const collection = this.database.collection(collectionName);
        return await collection.deleteOne(filter);
    }

    async updateOne(filter: any, update: EntityDocument, collectionName: string) {
        const collection = this.database.collection(collectionName);
        return await collection.updateOne(filter, update);
    }

}

export default MongoService.getInstance();