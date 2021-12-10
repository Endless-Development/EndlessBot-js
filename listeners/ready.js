module.exports = {
    name: 'ready',
    once: true,
    run: async(client, message, args) => {
        console.log("[INFO] Bot is now online!");
    }
}
