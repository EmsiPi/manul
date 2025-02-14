import { UUID, WithId } from "mongodb";
import {ByServerEntity, ByServerEntityDocument} from "../ByServerEntity";
import { UserWarn } from "../warnService/UserWarn";

type UserImageDocument = ByServerEntityDocument & {
    idAuteur?: string,
    imageNumber?: number
}

class UserImage extends ByServerEntity {

    private idAuteur?: string;

    private imageNumber: number = 0;

    constructor(idAuteur?: string, imageNumber?: number, serverId?: string) {
        super(serverId);
        this.idAuteur = idAuteur;
        if(imageNumber != null) {
            this.imageNumber = imageNumber;
        }
    }
    
    static transformToObject(document : UserImageDocument) {
        const userImage = new UserImage();
        UserImage.transformToObjectWithValue(userImage, document);
    
        return userImage;
    }

    protected static transformToObjectWithValue(userImage: UserImage, document: UserImageDocument) {
        super.transformToObjectWithValue(userImage, document);

        userImage.setServerId(document.serverId);
        userImage.setIdAuteur(document.idAuteur);
        userImage.setImageNumber(document.imageNumber);
    
        return userImage;
    }

    transformToDocument() {
        const document = {};
        return this.transformToDocumentWithValue(document, this);
    }

    transformToDocumentWithValue(document: UserImageDocument, userImage: UserImage) {
        super.transformToDocumentWithValue(document, userImage);

        document.idAuteur = userImage.getIdAuteur();
        document.imageNumber = userImage.getImageNumber();

        return document;
    }

    getImageNumber() {
        return this.imageNumber;
    }

    setImageNumber(imageNumber: number | undefined) {
        if(imageNumber == null) {
            imageNumber = 0;
        }
        this.imageNumber = imageNumber;
    }

    incrementImage() {
        this.imageNumber++;
    }

    getIdAuteur() {
        return this.idAuteur;
    }

    setIdAuteur(idAuteur: string | undefined) {
        this.idAuteur = idAuteur;
    }
}

module.exports = UserImage;