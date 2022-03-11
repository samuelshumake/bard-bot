const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
require('dotenv').config();

// Initializes Discord client
const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'] 
});
client.commands = new Discord.Collection();

client.once('ready', () => {
    console.log('Bardbot is online');
});

client.login(process.env.DISCORD_TOKEN);