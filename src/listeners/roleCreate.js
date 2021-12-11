const { MessageEmbed } = require("discord.js");
const index = require("../../index");

module.exports = {
    name: 'roleCreate',
    run: async(role) => {
        let embed = new MessageEmbed()
        .setColor("#005a00")
        .setTitle("Ruolo creato")
        .setFooter(`ID Ruolo: ${role.id}`)
        .addField(`Nome alla creazione:`, `\`\`\`${role.name}\`\`\``);

        index.client.channels.cache.find(channel => channel.id == index.roleLogChannel).send({ content: `**${role}**`, embeds: [embed] });
    }
}
