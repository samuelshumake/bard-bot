module.exports = {
    name: 'clear',
    description: 'Clear a specified number of messages.',
    async execute(message, args) {

        // If no argument is set, reply and quit
        if (!args[0]) return message.reply("> Please enter amount of messages you want to clear.");
        // If argument isn't an integer, reply and quit
        if (isNaN(args[0]) || !Number.isInteger(args[0])) return message.reply("> Please enter an integer as your argument.");
        // If argument is greater than 100, reply and quit
        if (args[0] > 100) return message.reply("> Please enter a number less than or equal to 25.");
        // If argument is less than one, reply and quit
        if (args[0] < 1) return message.reply("> Please enter a number greater than 0.");

        // Fetches all messages before deleting
        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }
}