// partie bdd

const {MongoClient, UUID} = require('mongodb');
const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const MONGO_PORT = process.env.MONGO_PORT;

const uri = "mongodb://" + MONGO_USERNAME + ":" + MONGO_PASSWORD + "@localhost:" + MONGO_PORT;
const mongoClient = new MongoClient(uri);
const testDb = mongoClient.db("test")


module.exports = {
    /**
     * 
     * @param {*} object Les paramètres de recherche.
     * @param {String} collectionName Le nom de la collection.
     * @returns 
     */
    find(object, collectionName){
        const collection = testDb.collection(collectionName);
        return collection.find(object).toArray();
    },
    /**
     * 
     * @param {*} object Les paramètres de recherche.
     * @param {String} collectionName Le nom de la collection.
     * @returns 
     */
    findOne(object, collectionName){
        const collection = testDb.collection(collectionName);
        return collection.findOne(object);
    },
    /**
     * Insère un objet dans la collection de nom donné en paramètre.
     * Un id sera généré automatiquement si l'objet n'en possède pas.
     * @param {*} object L'objet à sauvegarder.
     * @param {String} collectionName Le nom de la collection.
     * @returns 
     */
    insert(object, collectionName) {
        if (object._id == null) {
            object._id = new UUID();
        }
        const collection = testDb.collection(collectionName);
        return collection.insertOne(object);
    },
    /**
     * 
     * @param {*} object Les paramètres de recherche.
     * @param {String} collectionName Le nom de la collection.
     * @returns 
     */
    deleteMany(object, collectionName){
        const collection = testDb.collection(collectionName);
        return collection.deleteMany(object);
    },
    /**
     * 
     * @param {*} object Les paramètres de recherche.
     * @param {String} collectionName Le nom de la collection.
     * @returns 
     */
    deleteOne(object, collectionName){
        const collection = testDb.collection(collectionName);
        return collection.deleteOne(object);
    },
    /**
     * 
     * @param {*} object Les paramètres de recherche.
     * @param {*} update Les modifications de l'objet.
     * @param {String} collectionName Le nom de la collection.
     * @returns 
     */
    updateOne(object, update, collectionName){
        const collection = testDb.collection(collectionName);
        return collection.updateOne(object,update);
    }
}

