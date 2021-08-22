const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix
exports.run = (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
    embed1.setTitle("🔧 **Help Menu** 🔧");
    embed1.setDescription(`${client.commands.map(theartist => `> ➡️ **${prefix}${theartist.help.name}**`).join('\n')}`);
    embed1.setAuthor(`In total the bot ${client.commands.size} has command`);
    message.channel.send(embed1);
};


exports.conf = {
  enabled: true,
  guildOnly:false,
  aliases: ["y","Help","h","Yardım"],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Throws all commands',
  cooldown: '10'
};
