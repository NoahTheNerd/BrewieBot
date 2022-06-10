module.exports = {
    name: "hug",
    description: "Hug another server member",
    options: [
      {
        type: "user",
        name: "user",
        description: "The user you would like to hug",
        required: true
      }
    ],
    run: (interaction) => {
      interaction.reply(`**<:blobheart:984742973076021258> ${interaction.user.username}** hugs **${interaction.options.getUser('user').username}**`)
    }
}