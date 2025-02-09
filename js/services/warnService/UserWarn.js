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
var _UserWarn_targetId, _UserWarn_warnNumber;
const { UUID } = require("mongodb");
const ByServerEntity = require("../ByServerEntity");
class UserWarn extends ByServerEntity {
    constructor(targetId, warnNumber, serverId) {
        super(serverId);
        /**
         * @type {UUID}
         */
        _UserWarn_targetId.set(this, void 0);
        /**
         * @type {number}
         */
        _UserWarn_warnNumber.set(this, void 0);
        __classPrivateFieldSet(this, _UserWarn_targetId, targetId, "f");
        __classPrivateFieldSet(this, _UserWarn_warnNumber, warnNumber, "f");
    }
    /**
     * Transforme un document en objet UserWarn
     * @param {WithId<Document>} document
     */
    static transformToObject(document) {
        const userWarn = new UserWarn();
        UserWarn._transformToObjectWithValue(userWarn, document);
        return userWarn;
    }
    /**
     * Transforme un document en objet UserWarn
     * @param {UserWarn} userWarn
     * @param {WithId<Document>} document
     */
    static _transformToObjectWithValue(userWarn, document) {
        super._transformToObjectWithValue(userWarn, document);
        userWarn.setServerId(document.serverId);
        userWarn.setTargetId(document.targetId);
        userWarn.setWarnNumber(document.warnNumber);
        return userWarn;
    }
    /**
     * Transforme un userWarn en document
     */
    transformToDocument() {
        const document = {};
        return this._transformToDocumentWithValue(document, this);
    }
    /**
     * Transforme un userWarn en document
     * @param {WithId<Document>} document
     * @param {UserWarn} userWarn;
     */
    _transformToDocumentWithValue(document, userWarn) {
        super._transformToDocumentWithValue(document, userWarn);
        document.targetId = userWarn.getTargetId();
        document.serverId = userWarn.getServerId();
        document.warnNumber = userWarn.getWarnNumber();
        return document;
    }
    getTargetId() {
        return __classPrivateFieldGet(this, _UserWarn_targetId, "f");
    }
    setTargetId(targetId) {
        __classPrivateFieldSet(this, _UserWarn_targetId, targetId, "f");
    }
    getWarnNumber() {
        return __classPrivateFieldGet(this, _UserWarn_warnNumber, "f");
    }
    setWarnNumber(warnNumber) {
        __classPrivateFieldSet(this, _UserWarn_warnNumber, warnNumber, "f");
    }
    incrementWarn() {
        var _a;
        __classPrivateFieldSet(this, _UserWarn_warnNumber, (_a = __classPrivateFieldGet(this, _UserWarn_warnNumber, "f"), _a++, _a), "f");
    }
}
_UserWarn_targetId = new WeakMap(), _UserWarn_warnNumber = new WeakMap();
module.exports = UserWarn;
