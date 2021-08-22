const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix
exports.run = (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
    embed1.setTitle("🔧 **Yardım Menüsü** 🔧");
    embed1.setDescription(`${client.commands.map(theartist => `> ➡️ **${prefix}${theartist.help.name}**`).join('\n')}`);
    embed1.setAuthor(`Botun toplamda ${client.commands.size} komutu bulunuyor.`);
    message.channel.send(embed1);
};


exports.conf = {
  enabled: true,
  guildOnly:false,
  aliases: ["y","help","h","Yardım"],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Yardım komutu',
  usage: 'yardım'
};
