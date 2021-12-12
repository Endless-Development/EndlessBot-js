const { MessageEmbed } = require("discord.js");
const index = require("../../index");

module.exports = {
    name: 'guildMemberAdd',
    run: async(joined) => {
        if(!index.client.users.cache.has(joined.id)) {
            console.log(joined.tag+" | ID: "+joined.id+" has been added to the user cache")
            index.client.users.cache.set(joined.id, joined.user);
        }
        var member = index.client.users.cache.get(joined.id);

        let embed = new MessageEmbed()
        .setColor("#005a00")
        .setTitle("Membro entrato")
        .setFooter(member.tag, member.displayAvatarURL())

        index.client.channels.cache.find(channel => channel.id == index.memberLogChannel).send({ content: `**${member}**`, embeds: [embed] });
    }
}
