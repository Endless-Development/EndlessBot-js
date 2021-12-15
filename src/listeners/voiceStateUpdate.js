const { MessageEmbed, Permissions } = require("discord.js");
const index = require("../../index");

module.exports = {
    name: 'voiceStateUpdate',
    run: async(old, member) => {
        // If the user joins a channel and it's the "join to create" channel it will create some custom channels for him
        if(member.voice && member.voice.channel && member.voice.channel.id == index.joinToCreateChannel) {
            let embed = new MessageEmbed()
            .setColor(role.hexColor)
            .setTitle("Canale personalizzato")
            .setDescription("Hai creato un canale personalizzato, questa è la chat e ti ho spostato nel vocale apposito.\n**Se tutti quelli nel vocale usciranno questi canali verranno eliminati!**")
            .setFooter(member.tag, member.displayAvatarURL());

            if(member.voice.guild.id == index.endlessNetworkID) {
                member.voice.guild.channels.create("「👥」"+member.displayName, {
                    type: "GUILD_VOICE",
                    permissionOverwrites: [
                        {
                            id: member.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: member.voice.guild.everyone,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                })
            }


            //index.client.channels.cache.find(channel => channel.id == index.roleLogChannel).send({ content: `**${member}**`, embeds: [embed] });
        }

        // Check if the channel the user was in was a custom channel
        if(old.voice && old.voice.channel) {
            console.log("old channel ID:"+old.voice.channel.id);
            if(index.customChannels.filter(c => c == old.voice.channel.id).length > 0) {
                console.log("user was in a custom channel, ID:"+old.voice.channel.id);

                if(old.voice.channel.members.size <= 0) {
                    console.log("deleting channel, ID:"+old.voice.channel.id);
                }
            }
        }
    }
}
