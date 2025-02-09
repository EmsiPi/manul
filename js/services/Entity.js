"use strict";
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
var _Entity_id;
const { UUID } = require("mongodb");
class Entity {
    constructor() {
        /**
         * @type {UUID}
         */
        _Entity_id.set(this, void 0);
    }
    getId() {
        return __classPrivateFieldGet(this, _Entity_id, "f");
    }
    /**
     *
     * @param {UUID} id
     */
    setId(id) {
        __classPrivateFieldSet(this, _Entity_id, id, "f");
    }
    /**
     *
     * @param {Entity} entity
     */
    transformToDocument() {
        const document = {};
        return this._transformToDocumentWithValue(document, this);
    }
    /**
     *
     * @param {WithId<Document>} document
     * @param {Entity} entity
     */
    _transformToDocumentWithValue(document, entity) {
        document._id = entity.getId();
        return document;
    }
    /**
     *
     * @param {WithId<Document>} document
     */
    static transformToObject(document) {
        const entity = new Entity();
        return this._transformToObjectWithValue(entity, document);
    }
    /**
     *
     * @param {Entity} entity
     * @param {WithId<Document>} document
     */
    static _transformToObjectWithValue(entity, document) {
        entity.setId(document._id);
        return entity;
    }
}
_Entity_id = new WeakMap();
module.exports = Entity;
