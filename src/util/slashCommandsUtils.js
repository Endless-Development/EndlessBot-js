const Discord = require("discord.js");
const Logger = require("./Logger");

function createSlashCommands(guildId, client) {
    var guild = client.guilds.cache.get(guildId);
    guild.commands.set(
    [
        {
            name: "ping",
            description: "Visualizza il ping del bot"
        },
        {
            name: "help",
            description: "Visualizza le informazioni del bot, e la lista dei comandi"
        }
    ], guildId)

    Logger.Success("[UTIL] Created slash commands!")
}

module.exports = {
     createSlashCommands: createSlashCommands
}
