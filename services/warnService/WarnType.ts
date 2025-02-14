import { WithId } from "mongodb";

import {ByServerEntity, ByServerEntityDocument} from "../ByServerEntity";

export type WarnTypeDocument = ByServerEntityDocument & {
    name?: string,
    message?: string
}

class WarnType extends ByServerEntity {

    private name?: string;

    private message?: string;

    constructor(name?: string, message?: string) {
        super();
        this.name = name;
        this.message = message;
    }
 
    static transformToObject(document: ByServerEntityDocument) {
        const userWarn = new WarnType();
        WarnType.transformToObjectWithValue(userWarn, document);
    
        return userWarn;
    }

    protected static transformToObjectWithValue(warnType: WarnType, document: WarnTypeDocument) {
        super.transformToObjectWithValue(warnType, document);

        warnType.setMessage(document.message);
        warnType.setName(document.name);
    
        return warnType;
    }

    transformToDocument() {
        const document = {};
        return this.transformToDocumentWithValue(document, this);
    }

    transformToDocumentWithValue(document: WarnTypeDocument, userWarn: WarnType) {
        super.transformToDocumentWithValue(document, userWarn);

        document.message = userWarn.getMessage();
        document.name = userWarn.getName();

        return document;
    }

    getName() {
        return this.name;
    }

    setName(name: string | undefined) {
        this.name = name;
    }

    getMessage() {
        return this.message;
    }

    setMessage(message: string | undefined) {
        this.message = message;
    }
}

export default WarnType;