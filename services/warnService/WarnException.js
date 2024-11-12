const ControlledException = require("../../ControlledException");

class NoTargetException extends ControlledException {
    constructor() {
        super("t bet");
    }
}

class NoWarnTypeException extends ControlledException {
    constructor() {
        super("Il faut préciser quel type de warn je dois envoyer.");
    }
}

class WrongWarnTypeException extends ControlledException {
    constructor() {
        super("Ce warn n'est pas dans la liste des warn qui m'a été donnée, envoie un warn personnalisé avec !warn p.[ce que tu veux envoyer] ou check les warns de la liste !");
    }
}

class BotTargeTException extends ControlledException {
    constructor() {
        super("Je suis gentil j'ai pas besoin de warn moi...");
    }
}

class PermissionException extends ControlledException {
    constructor() {
        super("Tutut ! t'as pas le droit toi !");
    }
}

module.exports = {
    NoTargetException,
    NoWarnTypeException,
    WrongWarnTypeException,
    BotTargeTException,
    PermissionException
}