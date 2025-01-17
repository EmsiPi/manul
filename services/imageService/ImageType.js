const { UUID } = require("mongodb");

class ImageType extends ByServerEntity {

    /**
     * @type {String}
     */
    #name;

    /**
     * @type {String}
     */
    #image;

    /**
     * @type {UUID}
     */
    #targetId;

    constructor(name, image, targetId) {
        super();
        this.#name = name;
        this.#image = image;
        this.#targetId = targetId;
    }
    
    /**
     * Transforme un document en objet ImageType 
     * @param {WithId<Document>} document 
     */
    static transformToObject(document) {
        const userWarn = new ImageType();
        ImageType._transformToObjectWithValue(userImage, document);
    
        return userImage;
    }

    /**
     * Transforme un document en objet ImageType
     * @param {ImageType} ImageType
     * @param {WithId<Document>} document 
     */
    static _transformToObjectWithValue(imageType, document) {
        super._transformToObjectWithValue(imageType, document);

        imageType.setMessage(document.message);
        imageType.setName(document.name);
    
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
     * Transforme un WarnType en document
     * @param {ImageType} userImage;
     */
    _transformToDocumentWithValue(document, userImage) {
        super._transformToDocumentWithValue(document, userImage);

        document.message = userImage.getMessage();
        document.name = userImage.getName();

        return document;
    }

    getName() {
        return this.#name;
    }

    /**
     * 
     * @param {String} name 
     */
    setName(name) {
        this.#name = name;
    }

    getMessage() {
        return this.#image;
    }

    /**
     * 
     * @param {String} message 
     */
    setMessage(message) {
        this.#image = message;
    }
}

module.exports = ImageType;