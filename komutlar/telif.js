const  Discord = require("discord.js"); 

exports.run = (client, message, args) => {

  const telif = new Discord.MessageEmbed()
  .setColor("#00F4FD")
  .setTitle("Telif Hakkı")
  .setDescription("ArYa botun herhangi bir açığından yararlanıp bota,kodlara,kullanıcılara veya sunuculara zarar verirseniz <@799012176257482753> dava açma hakkına sahiptir kabul etmiyorsanız lütfen botu kullanmayınız!!")
  message.channel.send(telif)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["telifhakkı"],
  permLevel: 0
};

exports.help = {
  name: 'telif',
  description: '',
  usage: 'telifh'
};