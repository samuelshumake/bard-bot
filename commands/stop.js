const play = require('./play.js');
const playlist = require('./playlist.js');

module.exports = {
    name: 'stop',
    description: 'Removes bot from voice chat.',
    async execute(message, args) {

        const voiceChannel = message.member.voice.channel;

        //  If user not in voice channel, reply and quit
        if (!voiceChannel) return message.reply('> You need to be in a voice channel to execute this command.');

        // Destroy voice connection
        if (play.connection && play.connection['_state']['status'] == 'ready') return play.connection.destroy();
        if (playlist.connection && playlist.connection['_state']['status'] == 'ready') {
            // Deletes all playlist video titles
            await message.channel.messages.fetch({limit: playlist.playlistLength + 3}).then(messages => {
                message.channel.bulkDelete(messages);
            });
            return playlist.connection.destroy();
        }
    }
}