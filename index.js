Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@Kheeto 
Kheeto
/
EndlessBot-js-version
Public
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
EndlessBot-js-version
/
index.js
in
main
 

Tabs

8

No wrap
1
const { token, prefix } = require("./config/main.json");
2
​
3
const messageLogChannel = "919238263171063878";
4
​
5
const fs = require("fs");
6
const Discord = require("discord.js");
7
const client = new Discord.Client({
8
    intents: [
9
        Discord.Intents.FLAGS.GUILDS,
10
        Discord.Intents.FLAGS.GUILD_MESSAGES,
11
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
12
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
13
        Discord.Intents.FLAGS.GUILD_MEMBERS,
14
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
15
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
16
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
17
        Discord.Intents.FLAGS.GUILD_INVITES,
18
        Discord.Intents.FLAGS.GUILD_BANS,
19
    ],
20
    partials: ["CHANNEL"]
21
});
22
client.commands = new Discord.Collection();
23
client.commands.normal = new Discord.Collection();
24
client.events = new Discord.Collection();
25
client.commands.normal.aliases = new Discord.Collection();
26
client.commands.buttons = new Discord.Collection();
27
client.commands.menus = new Discord.Collection();
28
client.commands.slash = new Discord.Collection();
29
console.log("Starting bot...");
30
​
31
module.exports = {
32
    client: client,
33
    messageLogChannel: messageLogChannel
34
}
35
// Load handlers and commands
36
const handlers = fs.readdirSync('./src/handlers').filter(file => file.endsWith('.js'));
37
for (const file of handlers) {
38
        const handler = require(`./src/handlers/${file}`);
39
    console.log("[HANDLER] Loading handler "+file);
40
        handler.run();
41
}
42
​
43
// Load events
44
const eventFiles = fs.readdirSync('./src/listeners').filter(file => file.endsWith('.js'));
45
console.log("[EVENTS] Registering events...");
@Kheeto
Commit changes
Commit summary
Create index.js
Optional extended description
Add an optional extended description…
 Commit directly to the main branch.
 Create a new branch for this commit and start a pull request. Learn more about pull requests.
 
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
