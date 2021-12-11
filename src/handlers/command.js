const { readdirSync } = require("fs");
const { client } = require("../../index");
var commands;
function run() {
    console.log("[HANDLER] Loading Commands...");
    commands = readdirSync(`./src/commands`).filter(file => file.endsWith(".js"));

    for(let file of commands) {
        pull = require(`../commands/${file}`);
        if(pull.name) {
            client.commands.set(pull.name, pull);
            console.log("[COMMAND] Loaded Command "+ pull.name);
        } else {
            console.log("[ERROR] Error while loading "+pull+", couldn't find the command name.")
            continue;
        }
        if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
    }
}

module.exports = {
    run: run
}
