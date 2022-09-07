const {Client} = require("discord.js");
const glob = require("glob");
const {ICmd} = require("./core/commands/ICmd");

class Main {
    client = new Client({ intents: 32767 });
    #token;

    listeners = new Map();
    commands = new Map();

    constructor(token) {
        this.#token = token;
    }

    #loadEventListeners() {

    }
    #loadCommands() {
        let findFiles = []
        glob("src/core/commands/**/*.js", {}, (er, files) => {
            findFiles = files
        })
        return findFiles.map(it => {
            return {path: `./src/core/commands/${it}`}
        })
    }

    reloadCommands() {
        this.dropCommands(...this.commands)
        this.registerCommands(this.#loadCommands())
    }
    reloadEventListeners() {
        this.dropEventListeners(...this.listeners)
        this.registerEventListener(this.#loadEventListeners())
    }

    registerEventListener(...listeners) {
        listeners.forEach(it => {
            const listener = require(it.path)(this.client)
            this.listeners.set(it.path, listener)
        })
    }
    registerCommands(...commands){
        commands.forEach(it => {
            const command = require(it.path)
            if (command instanceof ICmd) {
                this.commands.set(it.path, command)
                console.log(`Registered command ${command.name}`)
            }
            else console.log(`Command ${it.path} is not an instance of ICmd`)
        })
    }

    dropCommands(...commands) {
        commands.forEach(it => {
            this.commands.delete(it)
            delete require.cache[require.resolve(it.key)]
        })
    }
    dropEventListeners(...listeners) {
        listeners.forEach(it => {
            this.listeners.delete(it)
            delete require.cache[require.resolve(it.key)]
        })
    }

    #postDiscordCommands() {

    }


    login() {
        console.log("Starting bot...")
        this.client.login(this.#token).then(() => {
            this.client.on("ready", () => {
                console.log("Bot is ready!")
                //this.registerEventListener(this.#loadEventListeners())
                //this.registerCommands(this.#loadCommands())
                //this.#postDiscordCommands()
            })
        });
    }
}

module.exports = Main