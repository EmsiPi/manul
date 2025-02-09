const enumValue = (name) => Object.freeze({toString: () => name});

const Levels = Object.freeze({
    INFO: enumValue("Info"),
    WARNING: enumValue("Warning"),
    ERROR: enumValue("Error")
});

module.exports = Levels;