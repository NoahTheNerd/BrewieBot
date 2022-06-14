module.exports = {
    name: "ready",
    once: true,
    run(client) {
        console.log('Bot has booted up')

        client.user.setPresence({ activities: [{ name: `from The Space Café`, type: 'STREAMING', url: 'https://twitch.tv/ixnoahlive' }] })
    }
}