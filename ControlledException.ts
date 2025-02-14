/**
 * Classe mère permettant de regrouper les exceptions internes à l'application.
 */
export class ControlledException extends Error {
    constructor(message: string) {
        super(message);
    }
}