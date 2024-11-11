const enumValue = (name) => Object.freeze({toString: () => name});

const Levels = Object.freeze({
    INFO: enumValue("Levels.Info"),
    WARNING: enumValue("Levels.Warning"),
    ERROR: enumValue("Levels.Error")
});

module.exports = Levels;