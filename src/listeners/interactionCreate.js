const fs = require("fs");
const pingCommand = require("../slashCommands/ping");

module.exports = {
    name: 'interactionCreate',
    run: async(interaction) => {
        if(!interaction.isCommand()) return;

        if(interaction.commandName == "ping") {
            pingCommand.run(interaction);
        }

    }
}
