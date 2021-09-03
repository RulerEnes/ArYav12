const Discord = require('discord.js');
const prettyMilliseconds = require("pretty-ms"); //npm i pretty-ms

exports.run = (client, message, args) => {
    const info = new Discord.MessageEmbed()
      .setColor('#00f4fd')
      .setTitle('ArYa Bot')
      .setDescription('Stats of the bot! If you want to donate to me, you can reach me on Discord.')
      .setThumbnail('https://is.gd/bfhLNF') //Thumbnail fotoğrafı
      .addFields(
        { name: ':crown: Owners', value: '<@!799012176257482753>', inline: true }, // İdnizi girin
        { name: ':timer: Uptime', value: prettyMilliseconds(client.uptime), inline: true }, // Uptime Süresi
        { name: ':ping_pong: Ping', value: Math.round(client.ws.ping) + 'ms', inline: true }, // Ping
        { name: ':keyboard: Memory', value: (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + ' MB RSS', inline: true }, // Rss
        { name: ':shield: Guild Count', value: client.guilds.cache.size, inline: true }, // Olduğu sunucu sayısı
        { name: ':police_officer: Users', value: client.users.cache.size + ' People!', inline: true }, // Kullanıcı sayısı
      )
      .setFooter('© SyntaxSoftware.Net',); // Alttaki footer fotoğrafo

    message.channel.send(info); //Mesajı gönderir.
};

exports.conf = {
  aliases: ['info', 'bilgi'],
  permLevel: 0,
  kategori: 'Genel'
};

exports.help = {
  name: 'info',
  description: 'Botun bilgilerini English olarak verir',
  cooldown: '6'
};