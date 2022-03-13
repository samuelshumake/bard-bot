const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

// Initializes Discord client
const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'] 
});
client.commands = new Discord.Collection();

// Online notification
client.once('ready', () => {
    console.log('Bardbot is online');
});

// Reads through commands directory
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    let command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Reads through secret commands directory
const customCommandFiles = fs.readdirSync('./custom-commands/').filter(file => file.endsWith('.js'));
for (const file of customCommandFiles) {
    let command = require(`./custom-commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('messageCreate', message => {
    // If message doesn't start with prefix or if message is from bot, quit.
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    // Split message by spaces and convert to lowercase
    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (client.commands.get(command)) {
        client.commands.get(command).execute(message, args, Discord, client);
    }
});

client.login(process.env.DISCORD_TOKEN);