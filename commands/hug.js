module.exports = {
    name: "hug",
    description: "Hug another server member",
    options: [
      {
        type: "user",
        name: "member",
        description: "The member to hug",
        required: true
      }
    ],
    run: (interaction) => {
      interaction.reply(`**<:blobheart:984742973076021258> ${interaction.user.username}** hugs **${interaction.options.getUser('user').username}**`)
    }
}