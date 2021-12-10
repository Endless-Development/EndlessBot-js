const chalk = require("chalk");

module.exports = {
    name: 'ready',
    once: true,
    run: async(client, message, args) => {
        console.log(chalk.green("[INFO] Bot Successful connected to Discord."));
    }
}
