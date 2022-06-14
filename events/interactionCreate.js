const commands = require('../index.js')

module.exports = {
    name: "interactionCreate",
    once: false,
    run: async (interaction) => {


        switch (true) {
            
            case interaction.isCommand():
                let command = commands[interaction.commandName]
                await command.run(interaction)
            break;

        }


    }
}