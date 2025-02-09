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
var _WarnType_name, _WarnType_message;
const ByServerEntity = require("../ByServerEntity");
class WarnType extends ByServerEntity {
    constructor(name, message) {
        super();
        /**
         * @type {String}
         */
        _WarnType_name.set(this, void 0);
        /**
         * @type {String}
         */
        _WarnType_message.set(this, void 0);
        __classPrivateFieldSet(this, _WarnType_name, name, "f");
        __classPrivateFieldSet(this, _WarnType_message, message, "f");
    }
    /**
     * Transforme un document en objet WarnType
     * @param {WithId<Document>} document
     */
    static transformToObject(document) {
        const userWarn = new WarnType();
        WarnType._transformToObjectWithValue(userWarn, document);
        return userWarn;
    }
    /**
     * Transforme un document en objet WarnType
     * @param {WarnType} warnType
     * @param {WithId<Document>} document
     */
    static _transformToObjectWithValue(warnType, document) {
        super._transformToObjectWithValue(warnType, document);
        warnType.setMessage(document.message);
        warnType.setName(document.name);
        return warnType;
    }
    /**
     * Transforme un WarnType en document
     */
    transformToDocument() {
        const document = {};
        return this._transformToDocumentWithValue(document, this);
    }
    /**
     * Transforme un WarnType en document
     * @param {WithId<Document>} document
     * @param {WarnType} userWarn;
     */
    _transformToDocumentWithValue(document, userWarn) {
        super._transformToDocumentWithValue(document, userWarn);
        document.message = userWarn.getMessage();
        document.name = userWarn.getName();
        return document;
    }
    getName() {
        return __classPrivateFieldGet(this, _WarnType_name, "f");
    }
    /**
     *
     * @param {String} name
     */
    setName(name) {
        __classPrivateFieldSet(this, _WarnType_name, name, "f");
    }
    getMessage() {
        return __classPrivateFieldGet(this, _WarnType_message, "f");
    }
    /**
     *
     * @param {String} message
     */
    setMessage(message) {
        __classPrivateFieldSet(this, _WarnType_message, message, "f");
    }
}
_WarnType_name = new WeakMap(), _WarnType_message = new WeakMap();
module.exports = WarnType;
