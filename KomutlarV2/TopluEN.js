const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message) => {


  const grave = new Discord.MessageEmbed()
  .addField('ArYa Bot Vote','[Click to Vote for Arya Bota](https://top.gg/bot/834763013248122910)')
  .addField('ArYa Bot Support Server','[Click to come to ArYa Bots Support Server](https://discord.gg/SNCWVbxpax)')
  .addField('ArYa Bot İnvite','[Click to Invite Arya Bot ](https://discord.com/oauth2/authorize?client_id=834763013248122910&scope=bot&permissions=4228906239)')
message.channel.send(grave)

};

exports.conf = {
  aliases: ['Bots','BOTS','linkler']
};

exports.help = {
  name: 'links',
  description: 'ArYa Sends Bots Invite, Support Server and Vote Link'


};
