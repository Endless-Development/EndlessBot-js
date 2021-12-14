const Logger = require("../util/Logger");

module.exports = {
    name: 'ready',
    once: true,
    run: function() {
        Logger.Success("[INFO] Bot is now online!");
    }
}
