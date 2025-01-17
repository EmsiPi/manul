const { UUID } = require("mongodb");
const Entity = require("../Entity");
const ByServerEntity = require("../ByServerEntity");

class UserImage extends ByServerEntity {

    /**
     * @type {UUID}
     */
    #targetId;

    /**
     * @type {number}
     */
    #imageNumber;

    constructor(targetId, imageNumber, serverId) {
        super(serverId);
        this.#targetId = targetId;
        this.#imageNumber = imageNumber;
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
        userImage.setTargetId(document.targetId);
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
     * @param {UserWarn} userImage;
     */
    _transformToDocumentWithValue(document, userImage) {
        super._transformToDocumentWithValue(document, userImage);

        document.targetId = userImage.getTargetId();
        document.serverId = userImage.getServerId();
        document.imageNumber = userImage.getImageNumber();

        return document;
    }

    getTargetId() {
        return this.#targetId;
    }

    setTargetId(targetId) {
        this.#targetId = targetId;
    }

    getImageNumber() {
        return this.#imageNumber;
    }

    setImageNumber(imageNumber) {
        this.#imageNumber = imageNumber;
    }

    incrementImage() {
        this.#imageNumber++;
    }
}

module.exports = UserImage;