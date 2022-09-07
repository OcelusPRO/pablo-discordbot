const { Client } = require("discord.js");
const {ICmd} = require("./core/commands/ICmd");
const glob = require("glob");
const Main = require("./Main");


const main = new Main(process.env.PABLO_BOT_TOKEN)
main.login()


