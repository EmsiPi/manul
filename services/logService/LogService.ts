import {Levels} from "./LogLevels";

class LogService {

    private static instance: LogService;

    static getInstance() {
        if(this.instance == null) {
            this.instance = new LogService();
        }

        return this.instance;
    }

    private log(level: Levels, content: String) {
        const fullContent = "LogService | " + level + " : " + content;
        switch (level) {
            case Levels.INFO:
                console.info(fullContent);
                break;
            case Levels.WARNING:
                console.warn(fullContent);
                break;
            case Levels.ERROR:
                console.error(fullContent);
                break;
            case Levels.CRITICAL:
                console.error(fullContent);
                break;
            default:
                console.error("LEVEL " + level + " NON RECUNNU : " + fullContent)
                break;
        }
    }

    info(content: string) {
        this.log(Levels.INFO, content);
    }

    warning(content: string) {
        this.log(Levels.WARNING, content);
    }

    error(content: string) {
        this.log(Levels.ERROR, content);
    }
    critical(content: string) {
        this.log(Levels.CRITICAL, content);
    }
}

export default LogService.getInstance();