const { UUID } = require("mongodb");
const ByServerEntity = require("../ByServerEntity");

class ImageType extends ByServerEntity {

    /**
     * @type {String}
     */
    #url;

    /**
     * @type {String}
     */
    #image;

    /**
     * @type {UUID}
     */
    #targetId;

    constructor(url, image, targetId) {
        super();
        this.#url = url;
        this.#image = image;
        this.#targetId = targetId;
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
     * @param {WithId<Document>} document 
     * @param {ImageType} userImage;
     */
    _transformToDocumentWithValue(document, userImage) {
        super._transformToDocumentWithValue(document, userImage);

        document.url = userImage.getUrl();

        return document;
    }

    getUrl() {
        return this.#url;
    }

    /**
     * 
     * @param {String} url 
     */
    setUrl(url) {
        this.#url = url;
    }

    getImage() {
        return this.#image;
    }
}

module.exports = ImageType;