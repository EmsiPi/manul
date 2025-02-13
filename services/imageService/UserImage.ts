import { UUID, WithId } from "mongodb";
import ByServerEntity from "../ByServerEntity";

class UserImage extends ByServerEntity {

    /**
     * @type {UUID}
     */
    #idAuteur;

    /**
     * @type {number}
     */
    #imageNumber;

    constructor(idAuteur: UUID, imageNumber: number, serverId: String) {
        super(serverId);
        this.#idAuteur = idAuteur;
        this.#imageNumber = imageNumber;
    }
    
    /**
     * Transforme un document en objet UserImage 
     * @param {WithId<Document>} document 
     */
    static transformToObject(document : WithId<Document>) {
        const userImage = new UserImage();
        UserImage._transformToObjectWithValue(userImage, document);
    
        return userImage;
    }

    /**
     * Transforme un document en objet UserImage 
     * @param {UserImage} userImage
     * @param {WithId<Document>} document 
     */
    static _transformToObjectWithValue(userImage: UserImage, document: WithId<Document>) {
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
    _transformToDocumentWithValue(document: WithId<Document>, userImage: UserWarn) {
        super._transformToDocumentWithValue(document, userImage);

        document.targetId = userImage.getTargetId();
        document.serverId = userImage.getServerId();
        document.imageNumber = userImage.getImageNumber();

        return document;
    }
    getImageNumber() {
        return this.#imageNumber;
    }

    setImageNumber(imageNumber: number) {
        this.#imageNumber = imageNumber;
    }

    incrementImage() {
        this.#imageNumber++;
    }

    getIdAuteur() {
        return this.#idAuteur;
    }

    setIdAuteur(idAuteur: UUID) {
        this.#idAuteur = idAuteur;
    }
}

module.exports = UserImage;