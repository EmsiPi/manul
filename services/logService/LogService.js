const Levels = require("./LogLevel");

/**
 * 
 * @param {Levels} level 
 * @param {} content 
 */
function log(level, content) {
    if(level == Levels.INFO) {
        console.info("LogService | Info : " + content);
        return;
    }

    if(level == Levels.WARNING) {
        console.warn("LogService | Warning : " + content);
        return;
    }

    if(level == Levels.ERROR) {
        console.error("LogService | ERROR : " + content);
        return;
    }
}

/**
 * 
 * @param {String} content 
 */
function info(content) {
    log(Levels.INFO, content);
}

/**
 * 
 * @param {String} content 
 */
function warning(content) {
    log(Levels.WARNING, content);
}

/**
 * 
 * @param {String} content 
 */
function error(content) {
    log(Levels.ERROR, content);
}

module.exports = {
    log,
    info,
    warning,
    error
}