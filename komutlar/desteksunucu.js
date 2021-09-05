const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message) => {


  const desteksunucu = new Discord.MessageEmbed()
  .addField('ArYa Botun Destek Sunucusu','[ArYa Botun Destek Sunucusuna Gelmek İçinTıkla](https://discord.gg/vekyBAZ8QW)')
message.channel.send(desteksunucu)

};

exports.conf = {
  aliases: ['dsunucu','Desteksunucu','destek','çağır','sahip'],
  permLevel: 0,
  kategori: "Genel",
};

exports.help = {
  name: 'dsunucu',
  description: 'ArYa botun Destek Sunucusuna gelmeniz için davet atar',
  cooldown: '5'

};