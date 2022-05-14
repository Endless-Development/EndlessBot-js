const { MessageEmbed, User } = require("discord.js");
const { canaliSenzaClear } = require("../../index");

module.exports = {
    name: "clear",
    run: async (interaction) => {
        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) {
            interaction.reply({
                content: "Non hai il permesso di usare questo comando!",
                ephemeral: true
            })
            return;
        }

        var numero = interaction.options.getInteger("numero");
        if(isNaN(numero) || numero <= 0) {
            interaction.reply({
                content: "Il numero di messaggi da eliminare deve essere superiore a 0!",
                ephemeral: true
            })
            return;
        }
        if(numero > 100) {
            interaction.reply({
                content: "Il numero di messaggi da eliminare può essere al massimo 100!",
                ephemeral: true
            })
            return;
        }

        function checkCanaleClear(canale) {
            return canale != interaction.channel;
        }

        if(!canaliSenzaClear.every(checkCanaleClear)) {
            interaction.reply({
                content: "Non puoi usare il clear in questo canale!",
                ephemeral: true
            })
            return;
        }
    



        let { size } = await interaction.channel.bulkDelete(numero);

        const embedClear = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Clear")
            .setDescription("**"+size+" messaggi** sono stati eliminati in questo canale.")
            .setFooter(`Comando eseguito da ${interaction.user.tag}`, interaction.member.displayAvatarURL())

        await interaction.reply({ embeds: [embedClear] })
    }
}
