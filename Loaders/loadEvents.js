const fs = require("fs")

module.exports = async bot => {
    // boucle sur tous les fichiers JS contenus dans le dossier Events pour en récupérer chaque module, correspondant au nom de la commande et à sa fonction
    fs.readdirSync("./Events").filter(f => f.endsWith(".js")).forEach(async file => {

        let event = require(`../Events/${file}`);
        bot.on(file.split(".js").join(""), event.bind(null, bot));
        console.log(`Evènement ${file} chargée avec succès !`);
    });
}