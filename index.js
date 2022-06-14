const { SlashCommandBuilder } = require('@discordjs/builders');
const private = require("./private.json")
const config = require("./config.json")
const Discord = require('discord.js')
const uv = require('./util')
const { REST } = require('@discordjs/rest') 
const { Routes } = require('discord-api-types/v9');
const fs = require('fs')
const rest = new REST({ version: '9' }).setToken(private.token)
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] })

/*
Command Handler
*/
const commandsdir = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = {};
const commands_b = []
for (const file of commandsdir) {
    const command = require(`./commands/${file}`)
    commands[command.name] = command;
    let slashcmd = new SlashCommandBuilder()
    .setName(command.name)
    .setDescription(command.description)
    command.options.forEach(option => {
        slashcmd[`add${uv.capitalize(option.type)}Option`](x => x.setName(option.name).setDescription(option.description).setRequired(option.required))
        // This line of code is my 13th reason
    })
    commands_b.push(slashcmd)
}
commands_b.map(command => command.toJSON());
rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands_b })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
module.exports = commands
/* 
Event Handler
*/

const eventsdir = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const events = {}
for (const file of eventsdir) {
    const event = require(`./events/${file}`)
    events[event.name] = event;
    if (event.once) {
        client.once(event.name, (...args) => event.run(...args));
    } else {
        client.on(event.name, (...args) => event.run(...args));
    }
}

client.login(private.token)
private.token = ""