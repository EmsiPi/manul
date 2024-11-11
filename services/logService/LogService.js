const Levels = require("./LogLevels");

/**
 * 
 * @param {Levels} level 
 * @param {} content 
 */
function log(level, content) {
    var fullContent = "LogService | " + level.toString() + " : " + content;
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