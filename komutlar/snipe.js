const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, args) => {
  if(!database.fetch(message.guild.id) || database.fetch(message.guild.id).length <= 0) return createEmbed('Daha önce hiç mesaj silinmemiş.', '#00f4fd');
  if(!args[0]) return createEmbed('Bir sayı belirtmelisin.', '#00f4fd');
  if(isNaN(args[0])) return createEmbed('Bir sayı belirtmelisin.', '#00f4fd');
  if(args[0] > database.fetch(message.guild.id).length) args[0] = database.fetch(message.guild.id).length;


  var silinenler = database.fetch(message.guild.id).slice(database.fetch(message.guild.id).length-args[0]);

  const embed = new Discord.MessageEmbed()
  .setColor('#00f4fd')
  .setDescription(silinenler.sort((a, b) => a.messageCREATEDAT - b.messageCREATEDAT).reverse().map(x => `**${x.authorTAG}**: ${x.messageCONTENT}`).slice(0, 50).join('\n'))
  .setTitle('İşte sunucunda son silinenler;');
  if(embed.description.length > 1000) return createEmbed('Silinen mesajların arasında çok uzun bir mesaj bulunduğu için bunu gösteremiyorum.', '#00f4fd');

  return message.channel.send(embed);

  function createEmbed(desc, color) {
    return message.channel.send(new Discord.MessageEmbed()
    .setDescription(desc)
    .setColor('#00f4fd')
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, size: 2048 })));
  }

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'snipe'
};