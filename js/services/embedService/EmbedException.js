"use strict";
const ControlledException = require("../../ControlledException");
class NullHelpNameException extends ControlledException {
    constructor() {
        super("Il faut préciser le nom de la commande dont tu souhaites les informations.");
    }
}
class NullHelpDescriptionException extends ControlledException {
    constructor() {
        super("Les informations de cette commande n'ont pas encore été précisées");
    }
}
module.exports = {
    NullHelpNameException,
    NullHelpDescriptionException
};
