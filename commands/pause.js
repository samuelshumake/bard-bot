const play = require('./play.js');
const playlist = require('./playlist.js');

module.exports = {
    name: 'pause',
    description: 'Pauses bot audio on voice chat.',
    async execute(message, args) {

        const voiceChannel = message.member.voice.channel;

        //  If user not in voice channel, reply and quit
        if (!voiceChannel) return message.reply('> You need to be in a voice channel to execute this command.');

        // Pause audio player
        if (play.player && play.player['_state']['status'] == 'playing') {
            play.player.pause();
        } else if (playlist.player && playlist.player['_state']['status'] == 'playing') {
            playlist.player.pause();
        } else if ((play.player && play.player['state']['status'] == 'paused') || (playlist.player && playlist.player['state']['status'] == 'paused')) {
            return message.reply('> This audio is already paused.');
        } else {
            return message.reply('> There is no audio playing to pause.');
        }
    }
}