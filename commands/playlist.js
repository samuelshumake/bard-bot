const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const ytpl = require('ytpl');

module.exports = {
    name: 'playlist',
    description: 'Lists out videos from a youtube playlist for playing over audio.',
    async execute(message, args, Discord) {
        // Remove embed from message
        message.suppressEmbeds(true);

        // Get voice chat that user is currently in
        const voiceChannel = message.member.voice.channel;

        //  If user not in voice channel, reply and quit
        if (!voiceChannel) return message.reply('> You must be in a voice channel to execute this command.');

        // If user doesn't include arguments, reply and quit
        if (!args.length) return message.reply('> Please enter a youtube playlist URL.');

        // If playlist URL is valid
        if (await !ytpl.validateID(args[0])) return message.reply('> Please enter a valid youtube playlist URL.');


        // Bot joins voice channel
        const connection = await joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })

        // Add connection to module.exports for use in stop.js file
        module.exports.connection = connection;

        // Get playlist ID from url then download playlist
        var playlist_id = await ytpl.getPlaylistID(args[0]);
        var yt_playlist = await ytpl(playlist_id);

        // If playlist is too large, reply and quit
        if (yt_playlist.items.length > 20) return message.reply('> Please enter a playlist with 20 videos or less.');

        // For each item in playlist, print out the title, add a reaction, then add it to a dict
        yt_playlist.items.forEach(async vid => {
            let vidMessage = await message.channel.send('> ' + vid['title']);
            // vidMessage.react("▶️");
        });

        // Create audio player and audio resource
        // const player = createAudioPlayer();
        // const resource = createAudioResource(stream);

        // Subscribe audio player to voice connection
        // connection.subscribe(player);

        // Play audio
        // player.play(resource);

    }
}