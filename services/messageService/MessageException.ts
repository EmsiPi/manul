export class NullChannelException extends Error {
    constructor() {
        super("Le channel ne peut être null.");
    }
}

export class NullMemberException extends Error {
    constructor() {
        super("Le membre ne peut être null.");
    }
}

export class EmptyMessageException extends Error {
    constructor() {
        super("Le message ne peut être vide ou null.");
    }
}

export class NullMessageException extends Error {
    constructor() {
        super("Le message ne peut être null.");
    }
}