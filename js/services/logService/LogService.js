"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _LogService_instance;
const Levels = require("./LogLevels");
class LogService {
    static getInstance() {
        if (__classPrivateFieldGet(this, _a, "f", _LogService_instance) == null) {
            __classPrivateFieldSet(this, _a, new _a(), "f", _LogService_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _LogService_instance);
    }
    /**
     *
     * @param {Levels} level
     * @param {} content
     */
    log(level, content) {
        const fullContent = "LogService | " + level.toString() + " : " + content;
        if (level == Levels.INFO) {
            console.info(fullContent);
            return;
        }
        if (level == Levels.WARNING) {
            console.warn(fullContent);
            return;
        }
        if (level == Levels.ERROR) {
            console.error(fullContent);
            return;
        }
    }
    /**
     *
     * @param {String} content
     */
    info(content) {
        this.log(Levels.INFO, content);
    }
    /**
     *
     * @param {String} content
     */
    warning(content) {
        this.log(Levels.WARNING, content);
    }
    /**
     *
     * @param {String} content
     */
    error(content) {
        this.log(Levels.ERROR, content);
    }
}
_a = LogService;
_LogService_instance = { value: void 0 };
module.exports = LogService.getInstance();
