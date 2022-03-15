const play = require('./play.js');
const playlist = require('./playlist.js');
const ytdl = require('ytdl-core');
const { createAudioResource } = require('@discordjs/voice');

module.exports = {
    name: 'loop',
    description: 'Sets the current song to loop endlessly.',
    async execute(message, args) {

        const voiceChannel = message.member.voice.channel;

        //  If user not in voice channel, reply and quit
        if (!voiceChannel) return message.reply('> You need to be in a voice channel to execute this command.');

        var stream;
        var resource;

        if (play.player && play.video && play.player['_state']['status'] == 'playing') {
            return play.player.on('idle', () => {
                stream = ytdl(play.video, {filter: 'audioonly'});
                resource = createAudioResource(stream);
                play.player.play(resource);
            });
        }
        if (playlist.player && playlist.video && playlist.player['_state']['status'] == 'playing') {
            return playlist.player.on('idle', () => {
                stream = ytdl(playlist.video, {filter: 'audioonly'});
                resource = createAudioResource(stream);
                playlist.player.play(resource);
            });
        }
    }
}