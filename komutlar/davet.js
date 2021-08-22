const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message) => {


  const davet = new Discord.MessageEmbed()
  .addField('Botun Davet Linki','[Botu Davet Etmek İçin Tıkla](https://discord.com/oauth2/authorize?client_id=834763013248122910&scope=bot&permissions=4228906239)')
message.channel.send(davet)

};

exports.conf = {
  aliases: ['davetlinki'],
  permLevel: 0,
  kategori: "Genel",
};

exports.help = {
  name: 'davet',
  description: 'ArYa botu sunucunuza davet etmek için bir link atar.',
  cooldown: '5'


};