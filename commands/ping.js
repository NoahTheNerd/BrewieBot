const responses = require('../resources/pools/ping.json')

module.exports = {
    name: "ping",
    description: "Check the bot's current ping",
    options: [],
    run: async interaction => {
       let reply = await interaction.reply({ content: `Pinging...`, fetchReply: true })
       await interaction.editReply({ content: `${responses[Math.floor(Math.random() * responses.length)]} (${reply.createdTimestamp - interaction.createdTimestamp}ms)` })
    }
}