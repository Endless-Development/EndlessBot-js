const prefix = "!"

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
console.log("[INFO] Starting bot...");

module.exports = {
    client: client
}

const eventFiles = fs.readdirSync('./listeners').filter(file => file.endsWith('.js'));
console.log("[INFO] Registering events...");

for (const file of eventFiles) {
	const event = require(`./listeners/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.run(...args));
	} else {
		client.on(event.name, (...args) => event.run(...args));
	}
}

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return message.reply("Non puoi usare il bot in una chat privata");
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0) return;
    var command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) {
        command.run(client,message,args);
    }
});

client.login('NjU2OTE4NTQ4NDcxMzQ5MjYw.XfppEg.48mlNQbOxzqp1dodJnmFOip0wU0');
