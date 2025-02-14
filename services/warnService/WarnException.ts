import {ControlledException} from "../../ControlledException";

export class NoTargetException extends ControlledException {
    constructor() {
        super("t bet");
    }
}

export class NoWarnTypeException extends ControlledException {
    constructor() {
        super("Il faut préciser quel type de warn je dois envoyer.");
    }
}

export class NoWarnNameException extends ControlledException {
    constructor(){
        super("Il manque des infos là ! pour connaître l'existence ou non de ce warn ! Le nom du warn et le contenu du warn s'il te plait.")
    }
}

export class WrongWarnTypeException extends ControlledException {
    constructor() {
        super("Ce warn n'est pas dans la liste des warn qui m'a été donnée, envoie un warn personnalisé avec !warn p.[ce que tu veux envoyer] ou check les warns de la liste !");
    }
}

export class BotTargeTException extends ControlledException {
    constructor() {
        super("Je suis gentil j'ai pas besoin de warn moi...");
    }
}

export class PermissionException extends ControlledException {
    constructor() {
        super("Tutut ! t'as pas le droit toi !");
    }
}