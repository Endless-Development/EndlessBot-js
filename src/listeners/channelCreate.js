const { MessageEmbed } = require("discord.js");
const index = require("../../index");

module.exports = {
    name: 'channelCreate',
    run: async(channel) => {
        let embed = new MessageEmbed()
        .setColor("#005a00")
        .setTitle("Canale creato")
        .setFooter(`ID Canale: ${channel.id}`)
        .addField(`Nome alla creazione:`, `\`\`\`${channel.name}\`\`\``);
    
        if(channel.isVoice()) embed.addField(`Tipologia:`, `\`\`\`Canale vocale\`\`\``);
        if(channel.isText()) embed.addField(`Tipologia:`, `\`\`\`Canale testuale\`\`\``);

        index.client.channels.cache.find(channel => channel.id == index.channelLogChannel).send({ content: `**${channel}**`, embeds: [embed] });
    }
}
