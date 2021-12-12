const { MessageEmbed } = require("discord.js");
const index = require("../../index");

module.exports = {
    name: 'guildMemberUpdate',
    run: async(old, member) => {
        if(!index.client.users.cache.has(member.id)) {
            console.log(member.tag+" | ID: "+member.id+" has been added to the user cache")
            index.client.users.cache.set(member.id, member.user);
        }
        var member = index.client.users.cache.get(member.id);

        let embed = new MessageEmbed()
        .setColor("#005a00")
        .setTitle("Membro aggiornato")
        .setFooter(member.tag, member.displayAvatarURL())

        if(old.nickname != member.nickname || (old.nickname == null && member.nickname != null) || (member.nickname == null && old.nickname != null)) {
            var vecchioNick = old.nickname || "Nessuno";
            var nuovoNick = member.nickname || "Nessuno";

            embed.addField(`Nickname prima:`, `\`\`\`${vecchioNick}\`\`\``, true);
            embed.addField(`Nickname dopo:`, `\`\`\`${nuovoNick}\`\`\``, true);
        }
        if(old.displayAvatarURL() != member.displayAvatarURL()) {
            embed.addField(`Icona modificata:`, `\`\`\`Sì\`\`\``);
        }
        if(old.roles != member.roles) {
            embed.addField(`Ruoli modificati:`, `\`\`\`Sì\`\`\``);
        }

        index.client.channels.cache.find(channel => channel.id == index.memberLogChannel).send({ content: `**${member}**`, embeds: [embed] });
    }
}
