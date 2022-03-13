const play = require('./play.js');
const playlist = require('./playlist.js');

module.exports = {
    name: 'resume',
    description: 'Resumes bot audio on voice chat.',
    async execute(message, args) {

        const voiceChannel = message.member.voice.channel;

        //  If user not in voice channel, reply and quit
        if (!voiceChannel) return message.reply('> You need to be in a voice channel to execute this command.');

        // Resume audio player
        if (play.player && play.player['_state']['status'] == 'paused') {
            play.player.unpause();
        } else if (playlist.player && playlist.player['_state']['status'] == 'paused') {
            playlist.player.unpause();
        } else if ((play.player && play.player['_state']['status'] == 'playing') || (playlist.player && playlist.player['_state']['status'] == 'paused')) {
            return message.reply('> The audio is not paused.');
        } else {
            return message.reply('> There is no paused audio to resume.')
        }
    }
}