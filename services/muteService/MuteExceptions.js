const ControlledException = require("../ControlledException");

class BotTargetException extends ControlledException {
    constructor() {
        super("Eh, pas touche !");
    }
}

class NoTargetException extends ControlledException {
    constructor() {
        super("t bet");
    }
}

class PermissionException extends ControlledException {
    constructor() {
        super("Tutut ! t'as pas le droit toi !");
    }
}

class BadIntegerException extends ControlledException {
    constructor() {
        super("c'est pas un entier positif enculé.");
    }
}

class TimeoutTooLongException extends ControlledException {
    constructor() {
        super("On a pas l'éternité ici, bannez moi ce fripon !");
    }
}

module.exports = {
    BotTargetException,
    NoTargetException,
    PermissionException,
    BadIntegerException,
    TimeoutTooLongException
}