class ICmd {

    name
    description
    type = InteractionType.SLASH_COMMANDS
    permissions = []

    execute(interaction) {

    }

}

class InteractionType {
    static SLASH_COMMANDS     = new InteractionType(1)
    static BUTTONS            = new InteractionType(2)
    static SELECT_MENUS       = new InteractionType(3)
    static CONTEXT_MESSAGES   = new InteractionType(4)
    static CONTEXT_USERS      = new InteractionType(5)
    static MODALS             = new InteractionType(6)

    constructor(type) {this.type = type}
}

module.exports = {ICmd, InteractionType}