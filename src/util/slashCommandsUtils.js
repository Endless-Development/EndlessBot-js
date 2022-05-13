const Discord = require("discord.js");

function createSlashCommands(guildId, client) {
    var guild = client.guilds.cache.get(guildId);
    guild.commands.create({
        name: "ping",
        description: "Visualizza il ping del bot"
    })
}

module.exports = {
     createSlashCommands: createSlashCommands
}
