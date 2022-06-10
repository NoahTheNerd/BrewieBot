const { SlashCommandBuilder } = require('@discordjs/builders');
const private = require("./private.json")
const config = require("./config.json")
const Discord = require('discord.js')
const { REST } = require('@discordjs/rest') 
const { Routes } = require('discord-api-types/v9');
const fs = require('fs')
const rest = new REST({ version: '9' }).setToken(private.token)

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] })

const commandsdir = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = {};
const commands_b = []

for (const file of commandsdir) {
    const command = require(`./commands/${file}`)
    commands[command.name] = command;
    commands_b.push(new SlashCommandBuilder()
    .setName(command.name)
    .setDescription(command.description))
}
commands_b.map(command => command.toJSON());
rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands_b })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return
    let command = commands[interaction.commandName]
    await command.run(interaction)
})

client.once('ready', () => {
    console.log('Bot has booted up')
})

client.login(private.token)