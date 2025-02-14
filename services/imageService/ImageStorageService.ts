import { Client, Message, PermissionsBitField } from "discord.js";
import EntityService from "../EntityService";
import messageService from "../messageService/MessageService";
import { PermissionException, NoLienException, NoTagException, NoImageException, MultipleImagesException } from "./ImageException";
import { ImageType, ImageTypeDocument } from "./ImageType";

const collection = "collectionImage";

class ImageService extends EntityService<ImageType, ImageTypeDocument> {

    private static instance: ImageService;

    static getInstance() {
        if(this.instance == null) {
            this.instance = new ImageService();
        }

        return this.instance;
    }

    toObject() {
        return (document: ImageTypeDocument) => ImageType.transformToObject(document);
    }

    toDocument() {
        return (entity: ImageType) => entity.transformToDocument();
    }

    getCollection() {
        return collection;
    }

    // TODO permettre aux membres de stock des images seulement sous un certain tag 
    // TODO commande delImage 
    async stock(bot: Client, message: Message<boolean> ) {
        if (!message.member?.permissions.has(PermissionsBitField.Flags.Administrator)) {
            throw new PermissionException();
        } 
        const messageAttachments = Array.from(message.attachments.values());
        const urlImages = messageAttachments.map(attachment => attachment.url);
        if(urlImages.length == 0) {
            throw new NoImageException();
        }
        if(urlImages.length > 1) {
            throw new MultipleImagesException();
        }
        const urlImage = urlImages[0];
        const findImage = await this.findImage(message.guild?.id!, urlImage); 
        if (findImage != null) {
            messageService.sendChannel(message.channel, "Cette image est déjà dans la base de données !");
            return;
        }
        const content = message.content;
        const contentArray = content.split(/ +/);
        const command = contentArray.shift(); // !stock)
        const tag = contentArray.shift();

        if (tag == null){
            throw new NoTagException();
        }

        const imageType = new ImageType();

        imageType.getUrl().push(urlImage);
        imageType.setServerId(message.guild?.id);
        const idAuteur = messageService.giveIdAuteur(message);
        imageType.setIdAuteur(idAuteur);
        imageType.setTag(tag);

        await this.store(imageType);
        messageService.sendChannel(message.channel, "L'image a bien été ajouté à la base de données !");
    }

    async findImage(guildId: string, imageUrl: string) {
        if (imageUrl == null) {
            throw new NoLienException(); 
        }

        return this.findByImageAndServerId(imageUrl, guildId);
    }

    async findByImageAndServerId(imageUrl: string, serverId: string) {
        return this.findOne({"url": imageUrl, "serverId": serverId});
    }
    
    async findByTag(tag: string) {
        return super.findMany({"tag" : tag });
    }

    async giveImageTag(bot: Client, message: Message<boolean>){
        const content = message.content;
        const guildChannel = message.channel;
        const contentArray = content.split(/ +/);
        const command = contentArray.shift(); // !stock
        const tag = contentArray.shift();

        if (tag == null){
            throw new NoTagException();
        }

        const imageArray = await this.findByTag(tag);
        const urlImages = imageArray.flatMap(image => image.getUrl())
        urlImages.forEach(url => {
            const embedContent = {
                color: 0x0099ff,
                title: tag,
                image: {
                    url
                },
            }
            messageService.sendEmbedChannel(guildChannel, embedContent);

        })
    }

}

export default ImageService.getInstance();