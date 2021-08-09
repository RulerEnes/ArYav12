const Discord = require('discord.js');
const githubUser = require('github-api-user');

exports.run = async (bot, message, args) => {
  var ghName = args.slice(0).join(' ')

  if (ghName.length < 2) {
    const lengtherr = new Discord.MessageEmbed()
      .setColor('Red')
      .setTitle('Error!')
      .setDescription('Username is too short!')

    return message.channel.send(lengtherr)
  }

  const usernameerr = new Discord.MessageEmbed()
    .setColor('Red')
    .setTitle('Error!')
    .setDescription('User was not found, try another username!')

  githubUser(`${ghName}`).then(user => {
    console.log(`Searched Github Profile | ${ghName} | ${user.name}`)
    if (user.name == null) {
      var ghnamee = 'No Name!'
    } else {
      var ghnamee = user.name
    }
    if (user.company == null) {
      var ghcompany = 'No Company!'
    } else {
      var ghcompany = user.company
    }
    if (user.location == null) {
      var ghlocation = 'No Location!'
    } else {
      var ghlocation = user.location
    }
    if (user.mail == null) {
      var ghmail = 'No Mail!'
    } else {
      var ghmail = user.mail
    }
    if (user.bio == null) {
      var ghbio = 'No Bio!'
    } else {
      var ghbio = user.bio
    }
    const profile = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Github Profile`) // rexulec
      .setURL(`https://github.com/${ghName}`)
      .setAuthor(`${ghName}'s`, user.avatar_url, `https://github.com/${ghName}`)
      .setThumbnail(user.avatar_url)
      .addFields({
        name: 'Name',
        value: ghnamee,
        inline: true
      }, {
        name: 'Company',
        value: ghcompany,
        inline: true
      }, {
        name: 'Location',
        value: ghlocation,
        inline: true
      }, {
        name: 'Email',
        value: ghmail,
        inline: true
      }, {
        name: 'Biography',
        value: ghbio,
        inline: true
      }, )
      .setTimestamp()
      .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true,
        size: 4096,
        format: 'png'
      }));

    message.channel.send(profile)

  }).catch(err => message.channel.send(usernameerr));; // codare <3

};

exports.conf = {
  aliases: ['github'],
  permLevel: 0,
  kategori: "Moderasyon",
};

exports.help = {
  name: 'Github',
  description: 'Belirttiğiniz kişinin Github bilgilerini atar.',
  usage: 'github <Kullanıcı Adı>',

};