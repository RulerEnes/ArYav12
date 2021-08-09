const Discord = require("discord.js");

exports.run = async(client, msg, args) => {

        let animEmotes = [],
            staticEmotes = [];
  var guild = msg.guild

        guild.emojis.cache.forEach((e) => {
            e.animated ? animEmotes.push(`<a:${e.name}:${e.id}>`) : staticEmotes.push(`<:${e.name}:${e.id}>`);
        });
        staticEmotes = staticEmotes.length !== 0 ? `__**[${staticEmotes.length}] Regular Emoji**__\n${staticEmotes.join('')}` : '\n**No Regular Emojis**';
        animEmotes = animEmotes.length !== 0 ? `\n\n__**[${animEmotes.length}] Animated Emoji**__\n${animEmotes.join('')}` : '\n**No Animated Emojis**';
        try {     
  let botembed = new Discord.MessageEmbed()
            .setColor(`#00f4fd`)
            .setDescription(staticEmotes + animEmotes)
            .setAuthor(`${msg.guild.name} Server's Emojis`, msg.guild.iconURL())
    .setFooter('© ArYa Software')           
        return msg.channel.send(botembed)
      } catch (err) {
        const embed = new Discord.MessageEmbed()
            .addField(`Emojis Available on the Server`, 'Im sorry, but your server either has too many emojis or no emojis at all. I cant show them. Discord doesnt allow this ')
            .setColor('#00f4fd')
           .setFooter('© ArYa Software') 
            .setTimestamp()
        msg.channel.send(embed)
                              
    }
}

exports.conf = {
 aliases: ['emoji-list'],
 permLevel: 0,
 kategori: 'Guild'
};

exports.help = {
 name: 'emojis',
 description: 'Shows all emojis on the server',
 usage: 'emojiler'
};
