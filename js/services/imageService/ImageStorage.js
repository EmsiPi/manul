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
var _ImageType_url, _ImageType_image, _ImageType_tag, _ImageType_idAuteur;
const { UUID } = require("mongodb");
const ByServerEntity = require("../ByServerEntity");
class ImageType extends ByServerEntity {
    constructor(url, image, tag, idAuteur) {
        super();
        /**
         * @type {String}
         */
        _ImageType_url.set(this, void 0);
        /**
         * @type {String}
         */
        _ImageType_image.set(this, void 0);
        /**
         * @type {String}
         */
        _ImageType_tag.set(this, void 0);
        /**
         * @type {String}
         */
        _ImageType_idAuteur.set(this, void 0);
        __classPrivateFieldSet(this, _ImageType_url, url, "f");
        __classPrivateFieldSet(this, _ImageType_image, image, "f");
        __classPrivateFieldSet(this, _ImageType_tag, tag, "f");
        __classPrivateFieldSet(this, _ImageType_idAuteur, idAuteur, "f");
    }
    /**
     * Transforme un document en objet ImageType
     * @param {WithId<Document>} document
     */
    static transformToObject(document) {
        const userImage = new ImageType();
        ImageType._transformToObjectWithValue(userImage, document);
        return userImage;
    }
    /**
     * Transforme un document en objet
     * @param {ImageType} imageType
     * @param {WithId<Document>} document
     */
    static _transformToObjectWithValue(imageType, document) {
        super._transformToObjectWithValue(imageType, document);
        imageType.setUrl(document.url);
        imageType.setTag(document.tag);
        imageType.setIdAuteur(document.idAuteur);
        return imageType;
    }
    /**
     * Transforme un ImageType en document
     */
    transformToDocument() {
        const document = {};
        return this._transformToDocumentWithValue(document, this);
    }
    /**
     * Transforme un ImageType en document
     * @param {ImageType} ImageType;
     */
    _transformToDocumentWithValue(document, imageType) {
        super._transformToDocumentWithValue(document, imageType);
        document.url = imageType.getUrl();
        document.tag = imageType.getTag();
        document.idAuteur = imageType.getIdAuteur();
        return document;
    }
    getUrl() {
        return __classPrivateFieldGet(this, _ImageType_url, "f");
    }
    setUrl(url) {
        __classPrivateFieldSet(this, _ImageType_url, url, "f");
    }
    getImage() {
        return __classPrivateFieldGet(this, _ImageType_image, "f");
    }
    setTag(tag) {
        __classPrivateFieldSet(this, _ImageType_tag, tag, "f");
    }
    getTag() {
        return __classPrivateFieldGet(this, _ImageType_tag, "f");
    }
    setIdAuteur(idAuteur) {
        __classPrivateFieldSet(this, _ImageType_idAuteur, idAuteur, "f");
    }
    getIdAuteur() {
        return __classPrivateFieldGet(this, _ImageType_idAuteur, "f");
    }
}
_ImageType_url = new WeakMap(), _ImageType_image = new WeakMap(), _ImageType_tag = new WeakMap(), _ImageType_idAuteur = new WeakMap();
module.exports = ImageType;
