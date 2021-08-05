const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('Komutu yanlış kullandınız örnek kullanım ==>a.yaz <botun yazmasını  istediğiniz cümle>');
  message.delete();
  message.channel.send(mesaj);
};

exports.conf = {
  aliases: ['say', 'söyle'],
  permLevel: 0,
  kategori: 'Genel'
};

exports.help = {
  name: 'yaz',
  description: 'İstediğiniz şeyi bota yazdırır.',
  usage: 'yaz [yazdırmak istediğiniz şey]'
};