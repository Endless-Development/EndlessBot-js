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
        },
        {
            name: "timeout",
            description: "Mette un utente in timeout per il tempo specificato",
            options: [
                {
                    name: "utente",
                    description: "Chi stai mettendo in timeout?",
                    type: "USER",
                    required: true
                },
                {
                    name: "durata",
                    description: "Per quanto tempo starà in timeout? (Esempio: 1d, 1h, ecc)",
                    type: "STRING",
                    required: true
                },
                {
                    name: "motivo",
                    description: "Perchè lo metti in timeout?",
                    type: "STRING",
                    required: false
                }
            ]
        },
        {
            name: "clear",
            description: "Elimina il numero di messaggi specificato",
            options: [
                {
                    name: "numero",
                    description: "Quanti messaggi vuoi eliminare",
                    type: "INTEGER",
                    required: true
                }
            ]
        },
        {
            name: "stats",
            description: "Mostra le statistiche in questo server di un utente",
            options: [
                {
                    name: "utente",
                    description: "L'utente di cui mostrare le statistiche, in caso non fossi tu.",
                    type: "USER",
                    required: false
                }
            ]
        }
    ], guildId)

    Logger.Success("[UTIL] Created slash commands!")
}

module.exports = {
     createSlashCommands: createSlashCommands
}
