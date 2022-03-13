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
    async execute(message, args, client) {
        // Remove embed from message
        message.suppressEmbeds(true);

        // Get voice chat that user is currently in
        const voiceChannel = message.member.voice.channel;

        // If user not in correct text channel, reply and quit
        if (message.channel.id == '951226482636771351' || message.channel.id == '951966549760155759') {
            return message.reply('> You are not in the correct text channel to execute this command. Please switch to the #bard-bot channel.');
        }

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
        var playlistId = await ytpl.getPlaylistID(args[0]);
        var ytPlaylist = await ytpl(playlistId);

        // If playlist is too large, reply and quit
        if (ytPlaylist.items.length > 20) return message.reply('> Please enter a playlist with 20 videos or less.');

        // Export playlist length to stop.js for deleting song titles after quitting
        module.exports.playlistLength = ytPlaylist.items.length;

        // For each item in playlist, print out the title, add a reaction, then add it to a dict
        var playlist = [];
        message.channel.send('> Printing video titles, this can take some time.\n\u200B');
        ytPlaylist.items.forEach(async vid => {
            playlist[vid['title']] = vid['url']; 
            let vidMessage = await message.channel.send('> ' + vid['title']);
            await vidMessage.react("▶️");
        });
        message.channel.send('\u200B\n> All video titles have been printed!');

        var stream;

         // When user clicks play reaction
         client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            // ONLY check this specific channel, otherwise bot will crawl all channels
            if (reaction.message.channel.id == '951226482636771351' || reaction.message.channel.id == '951966549760155759') {
                if (reaction.emoji.name === "▶️") {
                    await reaction.users.remove(user);

                    // Get video url from playlist dict
                    let playlistKey = reaction.message.content.slice(2);
            
                    stream = ytdl(playlist[playlistKey], {filter: 'audioonly'});

                    // Create audio player and audio resource
                    const player = createAudioPlayer();
                    const resource = createAudioResource(stream);

                    // Subscribe audio player to voice connection
                    connection.subscribe(player);

                    // Play audio
                    player.play(resource);
                }
            } else {
                // If not specified channel, quit
                return;
            }
        });

        

    }
}