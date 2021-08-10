const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message) => {


  const topgg = new Discord.MessageEmbed()
  .addField('ArYa Bot Vote','[Click to vote for Arya bot](https://top.gg/bot/834763013248122910)')
message.channel.send(topgg)

};

exports.conf = {
  aliases: ['VOTE','Topgg','top.gg','Top.gg','vote','Vote'],
  permLevel: 0,
  kategori: "General",
};

exports.help = {
  name: 'topgg',
  description: 'Lets you vote for ArYa bot on top.gg',


};
