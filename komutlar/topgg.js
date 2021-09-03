const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message) => {


  const topgg = new Discord.MessageEmbed()
  .addField('ArYa Bot Oy ','[ArYa Bota Oy Vermek İçin Tıkla](https://top.gg/bot/834763013248122910)')
  .setColor("#00f4fd")
message.channel.send(topgg)

};

exports.conf = {
  aliases: ['topgg','Topgg','top.gg','Top.gg','oy','Oy'],
  permLevel: 0,
  kategori: "Genel",
};

exports.help = {
  name: 'topgg',
  description: 'ArYa bota top.gg üzerinden oy vermenizi sağlar',


};