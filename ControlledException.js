/**
 * Classe mère permettant de regrouper les exceptions internes à l'application.
 */
class ControlledException extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = ControlledException;