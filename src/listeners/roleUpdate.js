const { MessageEmbed } = require("discord.js");
const index = require("../../index");

module.exports = {
    name: 'roleUpdate',
    run: async(old, role) => {
        let embed = new MessageEmbed()
        .setColor(role.hexColor || "#7289da")
        .setTitle("Ruolo modificato")
        .setFooter(`ID Ruolo: ${role.id}`);

        if(old.name != role.name) {
            embed.addField(`Nome prima:`, `\`\`\`${old.name}\`\`\``, true);
            embed.addField(`Nome dopo:`, `\`\`\`${role.name}\`\`\``, true);
        }
        if(old.hexColor != role.hexColor) {
            embed.addField(`Colore prima:`, `\`\`\`${old.hexColor}\`\`\``, true);
            embed.addField(`Colore dopo:`, `\`\`\`${role.hexColor}\`\`\``, true);
        }
        if(old.mentionable != role.mentionable) {
            embed.addField(`Menzionabile prima:`, `\`\`\`${old.mentionable}\`\`\``, true);
            embed.addField(`Menzionabile dopo:`, `\`\`\`${role.mentionable}\`\`\``, true);
        }
        if(old.managed != role.managed) {
            embed.addField(`Integrato prima:`, `\`\`\`${role.managed}\`\`\``, true);
            embed.addField(`Integrato dopo:`, `\`\`\`${role.managed}\`\`\``, true);
        }
        if((old.permissions != role.permissions) || (old.position != role.position)) {
            embed.addField(`Permessi o posizione modificata:`, `\`\`\`Sì\`\`\``);
        }

        index.client.channels.cache.find(channel => channel.id == index.roleLogChannel).send({ content: `**${role}**`, embeds: [embed] });
    }
}
