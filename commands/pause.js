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
        if (play.player && play.player['_state']['status']) play.player.pause();
        if (playlist.player && playlist.player['_state']['status']) playlist.player.pause();
    }
}