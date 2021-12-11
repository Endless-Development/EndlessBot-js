const { MessageEmbed } = require("discord.js");
const index = require("../../index");

module.exports = {
    name: 'roleDelete',
    run: async(role) => {
        let embed = new MessageEmbed()
        .setColor(role.color)
        .setTitle("Ruolo eliminato")
        .setFooter(`ID Ruolo: ${role.id}`)
        .addField(`Nome del ruolo:`, `\`\`\`${role.name}\`\`\``);

        index.client.channels.cache.find(channel => channel.id == index.roleLogChannel).send({ content: `**@${role.name}**`, embeds: [embed] });
    }
}
