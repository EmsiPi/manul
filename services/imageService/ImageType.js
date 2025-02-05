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
     * @type {String}
     */
    #tag

    /**
     * @type {String}
     */
    #idAuteur;

    constructor(url, image, tag, idAuteur) {
        super();
        this.#url = url;
        this.#image = image;
        this.#tag = tag;
        this.#idAuteur = idAuteur;
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
        return this.#url;
    }

    setUrl(url) {
        this.#url = url;
    }

    getImage() {
        return this.#image;
    }

    setTag(tag){
        this.#tag = tag; 
    }

    getTag(){
        return this.#tag;
    }

    setIdAuteur(idAuteur) {
        this.#idAuteur = idAuteur;
    }
    getIdAuteur() {
        return this.#idAuteur;
    }
}

module.exports = ImageType;