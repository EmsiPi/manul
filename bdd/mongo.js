// partie bdd

const {MongoClient, UUID} = require('mongodb');
const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const MONGO_PORT = process.env.MONGO_PORT;

const uri = "mongodb://" + MONGO_USERNAME + ":" + MONGO_PASSWORD + "@localhost:" + MONGO_PORT;
const mongoClient = new MongoClient(uri);
const testDb = mongoClient.db("test")


module.exports = {
    find(object,collectionName){
        const collection = testDb.collection(collectionName);
        return collection.find(object).toArray();
    },
    findOne(object,collectionName){
        const collection = testDb.collection(collectionName);
        return collection.findOne(object);
    },
    insert(object,collectionName) {
        if (object._id == null) {
            object._id = new UUID();
        }
        const collection = testDb.collection(collectionName);
        return collection.insertOne(object);
    },
    deleteMany(object,collectionName){
        const collection = testDb.collection(collectionName);
        return collection.deleteMany(object);
    },
    deleteOne(object,collectionName){
        const collection = testDb.collection(collectionName);
        return collection.deleteOne(object);
    },
    updateOne(object,update,collectionName){
        const collection = testDb.collection(collectionName);
        return collection.updateOne(object,update);
    }
}

