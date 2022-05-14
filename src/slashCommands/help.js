const { MessageEmbed, MessageButton } = require("discord.js");
const paginationEmbed = require('discordjs-button-pagination')

module.exports = {
    name: "help",
    run: async (interaction) => {
        const pagina1 = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Endless Network Bot")
            .setDescription("Questo bot è stato creato da <@530817199632416778>, ha funzioni soprattutto per gli Staff, ma anche alcuni comandi per gli utenti, ha un sistema di log per tutto ciò che succede nel server, comandi slash, comandi di moderazione, e altre funzioni verranno aggiunte in futuro, per sostituire i bot presenti attualmente.")
            .addField("Comandi del bot", "Vai alla pagina successiva per la lista di comandi.");

        const pagina2 = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Endless Network Bot")
            .addField("/help", "Visualizza questa pagina con le info del bot.", true)
            .addField("/ping", "Visualizza il ping del bot con questo server discord.", true)
            .addField("/timeout", "Comando degli staff per mettere in timeout.", true)
            .addField("Il bot è ancora in sviluppo", "Verranno aggiunti molti altri comandi", true)

        const bottone1 = new MessageButton()
            .setCustomId("previousbtn")
            .setLabel("Precedente")
            .setStyle("PRIMARY");

        const bottone2 = new MessageButton()
            .setCustomId("nextbtn")
            .setLabel("Successivo")
            .setStyle("PRIMARY");

        // Impostazioni per l'embed finale
        var pages = [
            pagina1,
            pagina2,
        ];
        var buttons = [
            bottone1,
            bottone2
        ];
        const timeout = 10000

        // Manda l'embed con la pagination
        paginationEmbed(interaction, pages, buttons, timeout);
        //interaction.reply({ embeds: [  ] });
    }
}
