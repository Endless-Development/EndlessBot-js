const { token, prefix } = require("./config/main.json");

const messageLogChannel = "919238263171063878";
const channelLogChannel = "919261939035688960";
const roleLogChannel = "919262133722685531";
const memberLogChannel = "919261911688831006";
const staffLogChannel = "885130939682918431";

const logFilePath = "./logs/latest"

const Logger = require("./src/util/Logger");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_BANS,
    ],
    partials: ["CHANNEL"]
});
client.commands = new Discord.Collection();
client.commands.normal = new Discord.Collection();
client.events = new Discord.Collection();
client.commands.normal.aliases = new Discord.Collection();
client.commands.buttons = new Discord.Collection();
client.commands.menus = new Discord.Collection();
client.commands.slash = new Discord.Collection();
try {
    if (fs.existsSync(logFilePath)) {
        try {
            fs.unlinkSync(logFilePath);
        } catch(err) { Logger.Error(err) }
    }
} catch(err) { Logger.Error(err) }

Logger.Info("Starting bot...");

module.exports = {
    client: client,
    messageLogChannel: messageLogChannel,
    channelLogChannel: channelLogChannel,
    roleLogChannel: roleLogChannel,
    memberLogChannel: memberLogChannel,
    staffLogChannel: staffLogChannel,
}
// Load handlers and commands
const handlers = fs.readdirSync('./src/handlers').filter(file => file.endsWith('.js'));
for (const file of handlers) {
	const handler = require(`./src/handlers/${file}`);
    Logger.Info("[HANDLER] Loading handler "+file);
	handler.run();
}

// Load events
const eventFiles = fs.readdirSync('./src/listeners').filter(file => file.endsWith('.js'));
Logger.Info("[EVENTS] Registering events...");

for (const file of eventFiles) {
	const event = require(`./src/listeners/${file}`);
    Logger.Info("[EVENTS] Loading event listener "+file);
	if (event.once) {
		client.once(event.name, (...args) => event.run(...args));
	} else {
		client.on(event.name, (...args) => event.run(...args));
	}
}

client.on("messageCreate", async message => {
    if(message.author.bot) return;
    if(!message.guild || message.guild.id != "885121885346623498") return message.reply("Non stai usando il bot in un server o il server non è **Endless Network**!");
    if(message.mentions.has(client.user)) return message.reply("Il mio prefisso è **`!`**, usa **`!help`** per la lista dei comandi");
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0) return;
    var command = client.commands.get(cmd);
    if(command) {
        command.run(client,message,args);
    }
});

client.login(token);
