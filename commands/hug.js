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
      interaction.reply(`${interaction.member.displayName} hugs ${interaction.getUser('user').displayName}`)
    }
}