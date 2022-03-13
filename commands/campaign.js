module.exports = {
    name: 'campaign',
    description: 'Print out embed that links to our current campaign.',
    execute(message, args, Discord) {

        var embed = new Discord.MessageEmbed()
            .setColor('#E40712')
            .setTitle('Curse of Strahd')
            .setURL('https://www.dndbeyond.com/campaigns/2761842')
            .setDescription('A harrowing journey into the depths of dark Barovia.\n\u200b')
            .addFields(
                { name: 'Eryl', value: 'Fairy Druid', inline: true },
                { name: 'Vasilii', value: 'Human Fighter', inline: true },
                { name: 'Xarpus', value: 'Genasi Blood Hunter', inline: true },
                { name: 'Bingus', value: 'Tabaxi Warlock', inline: true }
            )
            .setImage('https://cdn.mos.cms.futurecdn.net/CGVBwNdaKj7XxWKg57ASCL-1200-80.jpg')
            .setTimestamp()
            .setFooter({ text: 'He is the Ancient. He is the Land', iconURL: 'http://i.imgur.com/9Roczty.png' });

        message.channel.send({ embeds: [embed] });
    }
}