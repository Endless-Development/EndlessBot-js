const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    run: async (interaction) => {
        const msg = await interaction.channel.send("Sto calcolando il mio ping...");

        const ping = `${Math.floor(msg.createdTimestamp - interaction.createdTimestamp)}ms`

        const embedPing = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Ping del bot")
            .setDescription(ping);
        
        msg.delete();
        interaction.reply({ embeds: [embedPing] });
    }
}
