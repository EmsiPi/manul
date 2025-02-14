import { ByServerEntity, ByServerEntityDocument } from "../ByServerEntity";

export type ImageTypeDocument = ByServerEntityDocument & {
    urls?: string[],
    image?: string,
    tag?: string,
    idAuteur?: string
}

export class ImageType extends ByServerEntity {

    private urls: string[] = [];

    private image?: string;

    private tag?: string;

    private idAuteur?: string;

    constructor(urls?: string[], image?: string, tag?: string, idAuteur?: string) {
        super();
        if(urls != null) {
            this.urls = urls;
        }
        this.image = image;
        this.tag = tag;
        this.idAuteur = idAuteur;
    }

    static transformToObject(document: ImageTypeDocument) {
        const userImage = new ImageType();
        ImageType.transformToObjectWithValue(userImage, document);
    
        return userImage;
    }

    protected static transformToObjectWithValue(imageType: ImageType, document: ImageTypeDocument) {
        super.transformToObjectWithValue(imageType, document);
        imageType.setUrls(document.urls);
        imageType.setTag(document.tag);
        imageType.setIdAuteur(document.idAuteur);
    
        return imageType;
    }

    transformToDocument() {
        const document = {};
        return this.transformToDocumentWithValue(document, this);
    }

    protected transformToDocumentWithValue(document: ImageTypeDocument, imageType: ImageType) {
        super.transformToDocumentWithValue(document, imageType);

        document.urls = imageType.getUrl();
        document.tag = imageType.getTag();
        document.idAuteur = imageType.getIdAuteur();
        return document;
    }

    getUrl() {
        return this.urls;
    }

    setUrls(urls: string[] | undefined) {
        if(urls == null) {
            urls = [];
        }
        this.urls = urls;
    }

    getImage() {
        return this.image;
    }

    setTag(tag: string | undefined){
        this.tag = tag; 
    }

    getTag(){
        return this.tag;
    }

    setIdAuteur(idAuteur: string |undefined) {
        this.idAuteur = idAuteur;
    }
    getIdAuteur() {
        return this.idAuteur;
    }
}