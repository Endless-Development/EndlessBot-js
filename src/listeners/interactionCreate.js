const fs = require("fs");
const pingCommand = require("../slashCommands/ping");
const helpCommand = require("../slashCommands/help");
const timeoutCommand = require("../slashCommands/timeout");
const clearCommand = require("../slashCommands/clear");

module.exports = {
    name: 'interactionCreate',
    run: async(interaction) => {
        if(!interaction.isCommand()) return;

        if(interaction.commandName == "ping") {
            pingCommand.run(interaction);
        }
        if(interaction.commandName == "help") {
            helpCommand.run(interaction);
        }
        if(interaction.commandName == "timeout") {
            timeoutCommand.run(interaction);
        }
        if(interaction.commandName == "clear") {
            clearCommand.run(interaction);
        }

        //console.log(interaction.id);

    }
}
