import Levels from "./LogLevels";

class LogService {

    static #instance;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new LogService();
        }

        return this.#instance;
    }

    /**
     * 
     * @param {Levels} level 
     * @param {} content 
     */
    log(level: Levels, content: String) {
        const fullContent = "LogService | " + level.toString() + " : " + content;
        if(level == Levels.INFO) {
            console.info(fullContent);
            return;
        }

        if(level == Levels.WARNING) {
            console.warn(fullContent);
            return;
        }

        if(level == Levels.ERROR) {
            console.error(fullContent);
            return;
        }
    }

    /**
     * 
     * @param {String} content 
     */
    info(content: String) {
        this.log(Levels.INFO, content);
    }

    /**
     * 
     * @param {String} content 
     */
    warning(content: String) {
        this.log(Levels.WARNING, content);
    }

    /**
     * 
     * @param {String} content 
     */
    error(content: String) {
        this.log(Levels.ERROR, content);
    }
}

module.exports = LogService.getInstance();