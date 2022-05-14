const { token, clientId, guildId } = require("../../config/main.json");
const { readdirSync } = require("fs");
const { client, useOldHandler } = require("../../index");
const Logger = require("../util/Logger");
var commands;

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
var slashCommands = [];

function run() {
    if(!useOldHandler) {
        Logger.Error("[HANDLER] Old command handler is disabled!")
        return;
    }
    console.log("[HANDLER] Loading Commands...");
    commands = readdirSync(`./src/commands`).filter(file => file.endsWith(".js"));

    for(let file of commands) {
        pull = require(`../commands/${file}`);

        if(pull.slash) {
            slashCommands.push(pull.data.toJSON());
        }

        if(pull.name) {
            client.commands.set(pull.name, pull);
            Logger.Info("[COMMAND] Loaded Command "+ pull.name);
        } else {
            Logger.Error("[ERROR] Error while loading "+pull+", couldn't find the command name.")
            continue;
        }
        if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
    }

    Logger.Success('[HANDLER] Successfully loaded default commands.');
    

    const rest = new REST({ version: '9' }).setToken(token);
    (async () => {
        try {
            Logger.Info('[HANDLER] Loading Slash commands.');

            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: slashCommands },
            );

            Logger.Success('[HANDLER] Successfully loaded Slash commands.');
        } catch (error) {
            Logger.Error(error);
        }
    })();
}

module.exports = {
    run: run,
    slashCommands: slashCommands
}
