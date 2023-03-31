const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const yts = require('yt-search');

module.exports = {
    name: 'play',
    description: 'Plays audio from a youtube video over voice chat.',
    async execute(message, args) {
        // Remove embed from message
        message.suppressEmbeds(true);

        // Get voice chat that user is currently in
        const voiceChannel = message.member.voice.channel;

        //  If user not in voice channel, reply and quit
        if (!voiceChannel) return message.reply('> You must be in a voice channel to execute this command.');

        // If user doesn't include arguments, reply and quit
        if (!args.length) return message.reply('> Please enter a youtube link or keywords to search for.');

        // Bot joins voice channel
        const connection = await joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });

        var stream;
        if (ytdl.validateURL(args[0])) {
            // If a valid youtube url is entered
            stream = ytdl(args[0], {filter: 'audioonly'});

            // Adds video url to module.exports for use in loop.js file
            module.exports.video = args[0];
        } else {
            // If keywords are entered

            // Function that searches youtube using keywords
            const videoFinder = async (query) => {
                const videoResult = await yts(query);
                // If videos are found, return first one. Else, return null
                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }

            // Join all the arguments with spaces and search
            const video = await videoFinder(args.join(' '));

            if (video) {
                stream = ytdl(video.url, {filter: 'audioonly'});
                // Adds video url to module.exports for use in loop.js file
                module.exports.video = video.url;
            } else {
                // If no videos are found
                message.reply('> No video results found.');
            }
        }

        // Create audio player and audio resource
        const player = createAudioPlayer();
        var resource = createAudioResource(stream);

        // Subscribe audio player to voice connection
        connection.subscribe(player);

        // Play audio
        player.play(resource);

        // Add connection to module.exports for use in stop.js file
        module.exports.connection = connection;

        //  Add player to module.exports for use in pause.js/resume.js file
        module.exports.player = player;
    }
}