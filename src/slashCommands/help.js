const { MessageEmbed, MessageButton } = require("discord.js");
const { Pagination } = require("djs-pagination-buttons");

module.exports = {
    name: "help",
    run: async (interaction) => {
        if(!interaction) return;

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

        // Impostazioni per l'embed finale
        var pages = [
            pagina1,
            pagina2,
        ];
        const timeout = 10000

        //paginationEmbed(interaction, pages, buttons, timeout);
        //interaction.reply({ embeds: [  ] });

        const pagination = new Pagination(interaction.client);
        pagination.setPages(pages);
        pagination.setAuthorizedUsers([interaction.user.id]);
        pagination.send(null, interaction);
        interaction.reply("a");
    }
}
