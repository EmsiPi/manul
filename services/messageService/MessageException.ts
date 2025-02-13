class NullChannelException extends Error {
    constructor() {
        super("Le channel ne peut être null.");
    }
}

class NullMemberException extends Error {
    constructor() {
        super("Le membre ne peut être null.");
    }
}

class EmptyMessageException extends Error {
    constructor() {
        super("Le message ne peut être vide ou null.");
    }
}

class NullMessageException extends Error {
    constructor() {
        super("Le message ne peut être null.");
    }
}

export default {
    NullChannelException,
    NullMemberException,
    EmptyMessageException,
    NullMessageException
}