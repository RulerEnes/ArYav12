const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message) => {


  const davet = new Discord.MessageEmbed()
  .addField('ArYas invite link','[Click to Invite the Bot](https://discord.com/oauth2/authorize?client_id=834763013248122910&scope=bot&permissions=4228906239)')
message.channel.send(davet)

};

exports.conf = {
  aliases: ['inviteurl],
  permLevel: 0,
  kategori: "General",
};

exports.help = {
  name:'invite'
  description: 'ArYa Bot sends a link to invite you to your server',
  cooldown: '5'


};
