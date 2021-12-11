const { MessageEmbed } = require("discord.js");
const index = require("../../index");

module.exports = {
    name: 'channelDelete',
    run: async(channel) => {
        let embed = new MessageEmbed()
        .setColor("#ff0000")
        .setTitle("Canale eliminato")
        .setFooter(`ID Canale: ${channel.id}`)
        .addField(`Nome del canale:`, `\`\`\`${channel.name}\`\`\``);
    
        if(channel.isVoice()) embed.addField(`Tipologia:`, `\`\`\`Canale vocale\`\`\``);
        if(channel.isText()) embed.addField(`Tipologia:`, `\`\`\`Canale testuale\`\`\``);

        else index.client.channels.cache.find(channel => channel.id == index.channelLogChannel).send({ content: `**${channel}**`, embeds: [embed] });
    }
}
