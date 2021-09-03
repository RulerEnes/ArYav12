const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message) => {


  const bot = new Discord.MessageEmbed()
  .addField('ArYa Bot Oy','[ArYa Bota Oy Vermek İçin Tıkla](https://top.gg/bot/834763013248122910)')
  .addField('ArYa Botun Destek Sunucusu','[Destek Sunucusuna Gelmek İçin Tıkla](https://discord.gg/vekyBAZ8QW)')
  .addField('ArYa Botun Davet Linki','[ArYa Botu Davet Et](https://discord.com/oauth2/authorize?client_id=834763013248122910&scope=bot&permissions=4228906239)')
  .addField('ArYa Botun YouTube Kanalı','[ArYa Botun Youtube Kanalı](https://youtube.com/channel/UCGFHvBFK1mJTgH9bJq6SpAQ)')
  .addField('ArYa Botun Twitter Hesabı','[ArYa Botun Twitter Hesabı](https://twitter.com/SoftwareArya?s=09)')
  .setColor("#00f4fd")
message.channel.send(bot)

};

exports.conf = {
  aliases: ['Bot','BOT','linkler','link']
};

exports.help = {
  name: 'bot',
  description: 'ArYa botun Davet Linki,Destek Sunucusu Linki ve Top.gg Oy linkini atar',


};