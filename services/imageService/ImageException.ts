import { ControlledException } from "../../ControlledException"

export class NoTargetException extends ControlledException {
    constructor() {
        super("t bet");
    }
}

export class NoLienException extends ControlledException {
    constructor(){
        super("Il faut envoyer une image après la commande !")
    }
}

export class NoTagException extends ControlledException {
    constructor(){
        super("Il faut envoyer un tag après la commande !")
    }
}

export class PermissionException extends ControlledException {
    constructor() {
        super("Tutut ! t'as pas le droit toi !");
    }
}

export class NoImageException extends ControlledException {
    constructor() {
        super("Aucune image n'a été donnée.");
    }
}

export class MultipleImagesException extends ControlledException {
    constructor() {
        super("Veuillez ne donner qu'une seule image.");
    }
}