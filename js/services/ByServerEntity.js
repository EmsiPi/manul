"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ByServerEntity_serverId;
const Entity = require("./Entity");
class ByServerEntity extends Entity {
    /**
     *
     * @param {String} serverId
     */
    constructor(serverId) {
        super();
        _ByServerEntity_serverId.set(this, void 0);
        __classPrivateFieldSet(this, _ByServerEntity_serverId, serverId, "f");
    }
    getServerId() {
        return __classPrivateFieldGet(this, _ByServerEntity_serverId, "f");
    }
    setServerId(serverId) {
        __classPrivateFieldSet(this, _ByServerEntity_serverId, serverId, "f");
    }
    /**
     * Transforme un document en objet ByServerEntity
     * @param {WithId<Document>} document
     */
    static transformToObject(document) {
        const byServerEntity = new ByServerEntity();
        WarnType._transformToObjectWithValue(byServerEntity, document);
        return byServerEntity;
    }
    /**
     * Transforme un document en objet ByServerEntity
     * @param {ByServerEntity} byServerEntity
     * @param {WithId<Document>} document
     */
    static _transformToObjectWithValue(byServerEntity, document) {
        super._transformToObjectWithValue(byServerEntity, document);
        byServerEntity.setServerId(document.serverId);
        return byServerEntity;
    }
    /**
     * Transforme un ByServerEntity en document
     */
    transformToDocument() {
        const document = {};
        return this._transformToDocumentWithValue(document, this);
    }
    /**
     * Transforme un ByServerEntity en document
     * @param {ByServerEntity} byServerEntity
     * @param {WithId<Document>} document
     */
    _transformToDocumentWithValue(document, byServerEntity) {
        super._transformToDocumentWithValue(document, byServerEntity);
        document.serverId = byServerEntity.getServerId();
        return document;
    }
}
_ByServerEntity_serverId = new WeakMap();
module.exports = ByServerEntity;
