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
var _UserImage_idAuteur, _UserImage_imageNumber;
const { UUID } = require("mongodb");
const ByServerEntity = require("../ByServerEntity");
class UserImage extends ByServerEntity {
    constructor(idAuteur, imageNumber, serverId) {
        super(serverId);
        /**
         * @type {UUID}
         */
        _UserImage_idAuteur.set(this, void 0);
        /**
         * @type {number}
         */
        _UserImage_imageNumber.set(this, void 0);
        __classPrivateFieldSet(this, _UserImage_idAuteur, idAuteur, "f");
        __classPrivateFieldSet(this, _UserImage_imageNumber, imageNumber, "f");
    }
    /**
     * Transforme un document en objet UserImage
     * @param {WithId<Document>} document
     */
    static transformToObject(document) {
        const userImage = new UserImage();
        UserImage._transformToObjectWithValue(userImage, document);
        return userImage;
    }
    /**
     * Transforme un document en objet UserImage
     * @param {UserImage} userImage
     * @param {WithId<Document>} document
     */
    static _transformToObjectWithValue(userImage, document) {
        super._transformToObjectWithValue(userImage, document);
        userImage.setServerId(document.serverId);
        userImage.setIdAuteur(document.idAuteurd);
        userImage.setImageNumber(document.imageNumber);
        return userImage;
    }
    /**
     * Transforme un userImage en document
     */
    transformToDocument() {
        const document = {};
        return this._transformToDocumentWithValue(document, this);
    }
    /**
     * Transforme un userWarn en document
     * @param {WithId<Document>} document
     * @param {UserWarn} userImage;
     */
    _transformToDocumentWithValue(document, userImage) {
        super._transformToDocumentWithValue(document, userImage);
        document.targetId = userImage.getTargetId();
        document.serverId = userImage.getServerId();
        document.imageNumber = userImage.getImageNumber();
        return document;
    }
    getImageNumber() {
        return __classPrivateFieldGet(this, _UserImage_imageNumber, "f");
    }
    setImageNumber(imageNumber) {
        __classPrivateFieldSet(this, _UserImage_imageNumber, imageNumber, "f");
    }
    incrementImage() {
        var _a;
        __classPrivateFieldSet(this, _UserImage_imageNumber, (_a = __classPrivateFieldGet(this, _UserImage_imageNumber, "f"), _a++, _a), "f");
    }
    getIdAuteur() {
        return __classPrivateFieldGet(this, _UserImage_idAuteur, "f");
    }
    setIdAuteur(idAuteur) {
        __classPrivateFieldSet(this, _UserImage_idAuteur, idAuteur, "f");
    }
}
_UserImage_idAuteur = new WeakMap(), _UserImage_imageNumber = new WeakMap();
module.exports = UserImage;
