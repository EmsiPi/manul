const ControlledException = require("../../ControlledException")

class NoTargetException extends ControlledException {
    constructor() {
        super("t bet");
    }
}

class NoLienException extends ControlledException {
    constructor(){
        super("Il faut envoyer une image après la commande !")
    }
}

class NoTagException extends ControlledException {
    constructor(){
        super("Il faut envoyer un tag après la commande !")
    }
}

class PermissionException extends ControlledException {
    constructor() {
        super("Tutut ! t'as pas le droit toi !");
    }
}

module.exports = {
    NoTargetException,
    PermissionException,
    NoLienException,
    NoTagException
}