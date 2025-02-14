import { ControlledException } from "../../ControlledException";

export class BotTargetException extends ControlledException {
    constructor() {
        super("Eh, pas touche !");
    }
}

export class NoTargetException extends ControlledException {
    constructor() {
        super("t bet");
    }
}

export class PermissionException extends ControlledException {
    constructor() {
        super("Tutut ! t'as pas le droit toi !");
    }
}

export class BadIntegerException extends ControlledException {
    constructor() {
        super("c'est pas un entier positif enculé.");
    }
}

export class TimeoutTooLongException extends ControlledException {
    constructor() {
        super("On a pas l'éternité ici, bannez moi ce fripon !");
    }
}