const { MessageEmbed } = require("discord.js");
const index = require("../../index");

module.exports = {
    name: 'messageDelete',
    run: async(message) => {
        if(!index.client.users.cache.has(message.author.id)) {
            console.log(message.author.tag+" | ID: "+message.author.id+" has been added to the user cache")
            index.client.users.cache.set(message.author.id, message.author);
        }
        var user = index.client.users.cache.get(message.author.id);

        let embed = new MessageEmbed()
        .setColor("#ff0000")
        .addField(`Contenuto:`, `\`\`\`${message.content}\`\`\``)
        .setFooter(`ID Autore: ${message.author.id} | ID Messaggio: ${message.id}`);
    
        index.client.channels.cache.find(channel => channel.id == index.messageLogChannel).send({ content: `**Messaggio di ${user} eliminato in ${message.channel}**`, embeds: [embed] });
    }
}
