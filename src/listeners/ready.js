const Logger = require("../util/Logger");
const slashCommands = require("../util/slashCommandsUtils")
const { client } = require("../../index");

module.exports = {
    name: 'ready',
    once: true,
    run: function() {
        Logger.Success("[INFO] Bot is now online!");

        slashCommands.createSlashCommands('885121885346623498', client);
    }
}
