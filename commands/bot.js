const { MessageEmbed } = require('discord.js')
const uv = require('../util')
module.exports = {
    name: "bot",
    description: "View helpful information on current bot status & more",
    options: [],
    run: (interaction) => {
      var embed = new MessageEmbed().setTitle('Bot Information').setColor('BLURPLE').addField('Uptime', uv.timestamp(interaction.client.uptime), true)
      interaction.reply({embeds: [embed]})
    }
}