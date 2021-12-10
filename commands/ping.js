const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "ping",
    run: async (client, message, args) => {
        if(configValues.generalCommandStyle == "embed") {
            const msg = await message.channel.send(`Caricando il comando...`);

            msg.edit(`Sto calcolando il mio ping...`);
            msg.delete();
    
            const ping = `${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`
    
            const embedPing = new MessageEmbed()
                .setColor(configValues.positiveHexColor)
                .setTitle("Ping del bot")
                .setDescription(ping);
            
            message.channel.send(embedPing);
        } else if(configValues.generalCommandStyle == "default") {
            
        }

    }
}
