const fs = require("fs");
const path = require("path");
const Logger = require("../util/Logger");

module.exports = {
    name: 'messageCreate',
    run: async(message) => {

        // Salva in un file JSON il numero di messaggi scritti da ogni utente
        var name = "./database/user-stats.json";
        var json = JSON.parse(fs.readFileSync(name).toString());
        var userId = message.author.id;

        if(userId) {
            if(json.messages[userId]) {
                json.messages[userId]++;
            } else {
                json.messages[userId] = 1;
            }
        }

        fs.writeFileSync(name, JSON.stringify(json));

    }
}
