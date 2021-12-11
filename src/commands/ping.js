const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    run: async (client, message, args) => {
        message.delete();
        const msg = await message.channel.send("<@"+message.author.id+">, Sto caricando il mio ping...");

        msg.edit("<@"+message.author.id+">, ho calcolato il ping!");

        const ping = `${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`

        const embedPing = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Ping del bot")
            .setDescription(ping);
        
        msg.edit("<@"+message.author.id+">, ho calcolato il ping!");
        msg.edit({ embeds: [embedPing] });

    }
}
