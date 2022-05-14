const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "timeout",
    run: async (interaction) => {
        if(!interaction.member.permissions.has("MODERATE_MEMBERS")) {
            interaction.reply({
                content: "Non hai il permesso di usare questo comando!",
                ephemeral: true
            })
            return;
        }

        var utente = interaction.options.getUser("utente");
        var membro = interaction.guild.members.cache.get(utente.id);

        if(!membro) {
            interaction.reply({
                content: "Non hai specificato un utente valido!",
                ephemeral: true
            })
            return;
        }

        var durata = interaction.options.getString("durata");
        var motivo = interaction.options.getString("motivo") || "Nessun motivo specificato.";

        var durataMS = ms(durata);

        if(durataMS <= 0) {
            interaction.reply({
                content: "La durata del timeout deve essere superiore a 0 millisecondi!",
                ephemeral: true
            })
            return;
        }

        if(membro.roles.resolve("885121885371793428") && !interaction.member.roles.resolve("918903787320672357")) {
            interaction.reply({
                content: "Non puoi mettere in timeout uno staffer",
                ephemeral: true
            })
            return;
        }

        if(membro.roles.resolve("918903787320672357")) {
            interaction.reply({
                content: "Non puoi mettere in timeout un membro del Consiglio Federale",
                ephemeral: true
            })
            return;
        }

        /*if(!membro.moderatable) {
            interaction.reply({
                content: "Non posso mettere questo utente in timeout",
                ephemeral: true
            })
            return;
        }*/

        const embedPing = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Timeout")
            .setDescription("Un utente è stato messo in timeout.")
            .addField("Utente in timeout", "<@"+utente.id+">", true)
            .addField("Durata del timeout", durata, true)
            .addField("Motivazione", motivo, true)
            .addField("Messo in timeout da", "<@"+interaction.member.id+">", true)

        membro.timeout(durataMS, motivo);

        await interaction.reply({ embeds: [embedPing] });
    }
}
