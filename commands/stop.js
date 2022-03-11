const { joinVoiceChannel } = require('@discordjs/voice');
const playFile = require('./play.js');

module.exports = {
    name: 'stop',
    description: 'Removes bot from voice chat.',
    async execute(message, args) {

        const voiceChannel = message.member.voice.channel;

        //  If user not in voice channel, reply and quit
        if (!voiceChannel) {
            return message.channel.send('> You need to be in a voice channel to execute this command.');
        }

        // Leave voice channel
        playFile.connection.destroy();
    }
}