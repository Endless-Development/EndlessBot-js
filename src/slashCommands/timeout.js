const { MessageEmbed, User } = require("discord.js");

module.exports = {
    name: "timeout",
    run: async (interaction) => {
        if(!interaction.member.permissions.has("MODERATE_MEMBERS.")) {
            interaction.reply({
                content: "Non hai il permesso di usare questo comando!",
                ephemeral: true
            })
            return;
        }

        var utente = interaction.options.getUser("utente");
        var membro = interaction.guild.members.cache.get(utente.id);
        var durata = interaction.options.getNumber("durata");
        var tipoDurata = interaction.options.getString("tipologia");
        var motivo = interaction.options.getString("motivo") || "Nessun motivo specificato.";

        if((tipoDurata != "secondi") && (tipoDurata != "minuti") && (tipoDurata != "ore") && (tipoDurata != "giorni")) {
            interaction.reply({
                content: "Hai specificato un tipo di durata non valido! Devi scrivere secondi/minuti/ore/giorni",
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

        if(!membro.moderatable) {
            interaction.reply({
                content: "Non posso mettere questo utente in timeout",
                ephemeral: true
            })
            return;
        }

        const embedPing = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Timeout")
            .setDescription("Un utente è stato messo in timeout.")
            .addField("Utente in timeout", "<@"+utente.id+">", true)
            .addField("Durata del timeout", durata + " " + tipoDurata, true)
            .addField("Motivazione", motivo, true)
            .addField("Messo in timeout da", "<@"+interaction.member.id+">", true)
        
        if(tipoDurata == "secondi") {
            membro.timeout(durata*1000, motivo);
        } else if(tipoDurata == "minuti") {
            membro.timeout(durata*60*1000, motivo);
        } else if(tipoDurata == "ore") {
            membro.timeout(((durata*60)*60)/1000, motivo);
        } else if(tipoDurata == "giorni") {
            membro.timeout((((durata*60)*60)*24)/1000, motivo);
        }

        interaction.reply({ embeds: [embedPing] });
    }
}
