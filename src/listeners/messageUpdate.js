const { MessageEmbed } = require("discord.js");
const index = require("../../index");

module.exports = {
    name: 'messageUpdate',
    run: async(old, message) => {
        if(!index.client.users.cache.has(message.author.id)) {
            console.log(message.author.tag+" | ID: "+message.author.id+" has been added to the user cache")
            index.client.users.cache.set(message.author.id, message.author);
        }
        var user = index.client.users.cache.get(message.author.id);

        let embed = new MessageEmbed()
        .addField(`Contenuto prima:`, `\`\`\`${old.content}\`\`\``)
        .addField(`Contenuto dopo:`, `\`\`\`${message.content}\`\`\``)
        .setFooter(`ID Autore: ${message.author.id} | ID Messaggio: ${message.id}`, message.author.displayAvatarURL());
    
        index.client.channels.cache.find(channel => channel.id == index.messageLogChannel).send({ content: `**Messaggio di ${user} modificato su ${message.channel}**`, embeds: [embed] });
    }
}
