const {InteractionType, ICmd} = require("../../ICmd");
const {PermissionsBitField} = require("discord.js");


class Ping extends ICmd {
    name = "ping"
    description = "Pong!"
    type = InteractionType.SLASH_COMMANDS
    permissions = [
        PermissionsBitField.Flags.SendMessages,
        PermissionsBitField.Flags.BanMembers
    ]

    execute(interaction) {
        return interaction.reply("Pong!")
    }
}

module.exports = Ping