const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('You used the command wrong example usage =>a.yaz Tryout');
  message.delete();
  message.channel.send(mesaj);
};

exports.conf = {
  aliases: ['say', 'söyle'],
  permLevel: 0,
  kategori: 'Genel'
};

exports.help = {
  name: 'summer',
  description: 'It looks like a bot wrote everything you typed',
  usage: 'yaz [yazdırmak istediğiniz şey]'
};
