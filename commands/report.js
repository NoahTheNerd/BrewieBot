const { WebhookClient, MessageEmbed } = require('discord.js')
const { webhookToken } = require('../private.json')
const webhookClient = new WebhookClient({ id: "984747760748208168", token: webhookToken})

module.exports = {
    name: "report",
    description: "Report a user to the staff team. Misusing this command will result in punishment.",
    options: [
      {
        type: "user",
        name: "member",
        description: "The member to report",
        required: true
      },
      {
        type: "string",
        name: "reason",
        description: "The reason you are reporting them",
        required: true
      },
      {
        type: "string",
        name: "proof",
        description: "Evidence to prove your report",
        required: false
      }
    ],
    run: (interaction) => {
        let embed = new MessageEmbed().setTitle(`Report from: ${interaction.user.tag}`).setColor('RED').addField('User',`<@${interaction.options.getUser('member').id}>`).addField('Reason',interaction.options.getString('reason')).addField('Evidence',typeof interaction.options.getString('proof') !== undefined ? interaction.options.getString('proof') : 'None')
        console.log(embed)
        webhookClient.send({
            embeds: [embed]
        })
        interaction.reply({ content: "🚩 Thank you for reporting this user. We will look into it.", ephemeral: true })
    }
}