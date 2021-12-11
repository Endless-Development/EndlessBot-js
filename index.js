const { token, prefix } = require("./config.json");

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
console.log("Starting bot...");

module.exports = {
    client: client
}
// Load handlers and commands
const handlers = fs.readdirSync('./handlers').filter(file => file.endsWith('.js'));
for (const file of handlers) {
	const handler = require(`./handlers/${file}`);
    console.log("[HANDLER] Loading handler "+file);
	handler.run();
}

// Load events
const eventFiles = fs.readdirSync('./listeners').filter(file => file.endsWith('.js'));
console.log("[EVENTS] Registering events...");

for (const file of eventFiles) {
	const event = require(`./listeners/${file}`);
    console.log("[EVENTS] Loading event listener "+file);
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
