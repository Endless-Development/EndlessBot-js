
const { MessageEmbed } = require("discord.js");
const index = require("../../index");

module.exports = {
    name: 'messageDelete',
    run: async(message) => {
        let embed = new MessageEmbed()
        .setTitle(`**Messaggio di ${message.member} eliminato in ${message.channel}**`)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor("#ff0000")
        .addField(`Contenuto:`, `\`\`\`${message.content}\`\`\``)
        .setFooter(`ID Autore: ${message.author.id} | ID Messaggio: ${message.id}`);
    
        index.client.channels.cache.find(channel => channel.id == index.messageLogChannel).send({ embeds: [embed] });
    }
}
