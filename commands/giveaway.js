
const Discord = require('discord.js') 
module.exports = {
    name: "giveaway",
    description: "Roll a giveaway prize",
    options: [
        {
            type: "string",
            name: "emote",
            description: "The reaction emote to roll for",
            required: true
        },
        {
            type: "string",
            name: "message_url",
            description: "A link to the message to target",
            required: true
        },
        {
            type: "integer",
            name: "winners",
            description: "Amount of winners",
            required: false
        }
    ],
    run: async interaction => {
       let urlsplit = interaction.options.getString('message_url').split('/')
       let provId = {
            server: urlsplit[4],
            channel: urlsplit[5],
            message: urlsplit[6]
       }

        let channel = await interaction.client.channels.fetch(provId.channel)
        let message = await channel.messages.fetch(provId.message) 
        let flflf = await message.reactions.cache.get(interaction.options.getString('emote')).users.fetch()
        flflf = Array.from(flflf)
        let ids = []
       flflf.forEach(x => {ids.push(x[0])})
       flflf.filter(function( x ) {
        return x !== undefined;
       })
       let winner = await ids[Math.floor(Math.random() * ids.length)]
       let embed = new Discord.MessageEmbed().setTitle('Giveaway Results').setColor('#2f3136').setDescription(`:tada: <@${winner}> has won the giveaway!`)
       await interaction.reply({content: `<@${winner}>`, embeds: [embed], ephemeral: false})
    }
}