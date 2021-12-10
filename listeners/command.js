const { readdirSync } = require("fs");
const chalk = require('chalk');
console.log(chalk.yellow("[INFO] Inizializing Commands..."));

var commands;
module.exports = (client) => {
    readdirSync("./commands").forEach(dir => {
        commands = readdirSync(`./commands/`).filter(file => file.endsWith(".js"));

        for(let file of commands) {
            pull = require(`../commands/${file}`);
            if(pull.name) {
                client.commands.set(pull.name, pull);
                console.log("Successful Loaded Command "+ chalk.cyan(pull.name));
            } else {
                console.log(chalk.red("[ERROR] Error while loading "+pull+", couldn't find the command name."))
                continue;
            }
            if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }

        
    }), commands;
}
