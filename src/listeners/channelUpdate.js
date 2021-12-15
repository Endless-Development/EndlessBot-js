const { MessageEmbed } = require("discord.js");
const index = require("../../index");

module.exports = {
    name: 'channelUpdate',
    run: async(old, channel) => {
        if(channel.partial) return;

        let embed = new MessageEmbed()
        .setTitle("Canale modificato")
        .setFooter(`ID Canale: ${channel.id}`);

        if(old.name != channel.name) {
            embed.addField(`Nome prima:`, `\`\`\`${old.name}\`\`\``, true);
            embed.addField(`Nome dopo:`, `\`\`\`${channel.name}\`\`\``, true);
        } else {
            embed.addField(`Nome del canale:`, `\`\`\`${channel.name}\`\`\``);
        }
        
        if(channel.isVoice()) embed.addField(`Tipologia:`, `\`\`\`Canale vocale\`\`\``);
        if(channel.isText()) embed.addField(`Tipologia:`, `\`\`\`Canale testuale\`\`\``);
        
        if(old.parent != channel.parent && channel.parent != null) {
            embed.addField(`Categoria prima:`, `\`\`\`${old.parent.name}\`\`\``, true);
            embed.addField(`Categoria dopo:`, `\`\`\`${channel.parent.name}\`\`\``, true);
        }

        if((old.permissionOverwrites != channel.permissionOverwrites) || (old.position != role.position)) {
            embed.addField(`Permessi o posizione modificata:`, `\`\`\`Sì\`\`\``);
        }

        if(embed.fields.count <= 1) return;

        index.client.channels.cache.find(channel => channel.id == index.channelLogChannel).send({ content: `**${channel}**`, embeds: [embed] });
    }
}
