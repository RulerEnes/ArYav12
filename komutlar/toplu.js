const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message) => {


  const bot = new Discord.MessageEmbed()
  .addField('ArYa Bot Oy','[ArYa Bota Oy Vermek İçin Tıkla](https://top.gg/bot/834763013248122910)')
  .addField('ArYa Botun Destek Sunucusu','[Destek Sunucusuna Gelmek İçin Tıkla](https://discord.gg/SNCWVbxpax)')
  .addField('ArYa Botun Davet Linki','[ArYa Botu Davet Et](https://discord.com/oauth2/authorize?client_id=834763013248122910&scope=bot&permissions=4228906239)')
message.channel.send(bot)

};

exports.conf = {
  aliases: ['Bot','BOT','linkler']
};

exports.help = {
  name: 'bot',
  description: 'ArYa botun Davet Linki,Destek Sunucusu Linki ve Top.gg Oy linkini atar',


};