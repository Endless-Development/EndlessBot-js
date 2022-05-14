const fs = require("fs");
const pingCommand = require("../slashCommands/ping");
const helpCommand = require("../slashCommands/help");

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

        //console.log(interaction.id);

    }
}
