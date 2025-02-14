import {ByServerEntity, ByServerEntityDocument} from "../ByServerEntity";

export type UserWarnDocument = ByServerEntityDocument & {
    targetId?: string,
    warnNumber?: number
}

export class UserWarn extends ByServerEntity {

    private targetId?: string;

    private warnNumber: number = 0;

    constructor(targetId?: string, warnNumber?: number, serverId?: string) {
        super(serverId);
        this.targetId = targetId;
        if(warnNumber != null) {
            this.warnNumber = warnNumber;
        }
    }
    
    static transformToObject(document: UserWarnDocument) {
        const userWarn = new UserWarn();
        UserWarn.transformToObjectWithValue(userWarn, document);
    
        return userWarn;
    }

    protected static transformToObjectWithValue(userWarn: UserWarn, document:UserWarnDocument) {
        super.transformToObjectWithValue(userWarn, document);

        userWarn.setServerId(document.serverId);
        userWarn.setTargetId(document.targetId);
        userWarn.setWarnNumber(document.warnNumber);
    
        return userWarn;
    }

    transformToDocument() {
        const document = {};
        return this.transformToDocumentWithValue(document, this);
    }

    transformToDocumentWithValue(document: UserWarnDocument, userWarn: UserWarn) {
        super.transformToDocumentWithValue(document, userWarn);

        document.targetId = userWarn.getTargetId();
        document.serverId = userWarn.getServerId();
        document.warnNumber = userWarn.getWarnNumber();

        return document;
    }

    getTargetId() {
        return this.targetId;
    }

    setTargetId(targetId: string | undefined) {
        this.targetId = targetId;
    }

    getWarnNumber() {
        return this.warnNumber;
    }

    setWarnNumber(warnNumber: number | undefined) {
        if(warnNumber == null) {
            warnNumber = 0;
        }
        this.warnNumber = warnNumber;
    }

    incrementWarn() {
        this.warnNumber++;
    }
}