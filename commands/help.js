module.exports = {
    name: 'help',
    description: 'Lists out available commands and their given arguments.',
    execute(message, args) {

        // Audio Player Commands
        var helpMessage = '> **Audio Player Commands**\n';
        helpMessage += '`.play {url | keywords}` - Plays audio from a Youtube video over voice chat.\n';
        helpMessage += '`.playlist {url}` - Prints out videos from Youtube playlist and allows user to click reactions to play over voice chat.\n';
        helpMessage += '`.stop` - Quits audio player and removes bot from voice chat.\n\u200b\n';

        // General Commands
        helpMessage += '> **General Commands**\n';
        helpMessage += '`.clear {int}` - Deletes a specified number of chat messages.';

        message.channel.send(helpMessage);
    }
}