import { ControlledException } from "../../ControlledException";

export class NullHelpNameException extends ControlledException {
    constructor() {
        super("Il faut préciser le nom de la commande dont tu souhaites les informations.");
    }
}

export class NullHelpDescriptionException extends ControlledException {
    constructor() {
        super("Les informations de cette commande n'ont pas encore été précisées");
    }
}