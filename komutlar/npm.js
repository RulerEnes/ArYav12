const Discord = require('discord.js');
const npm = require('npm-searcher')

exports.run = async (client, message, args) => {

  var packagename = args.slice(0).join(' ')

  npm.search(packagename).then(res => {
    if (res) {
      const results = new Discord.MessageEmbed()
        .setColor('#00f4fd')
        .setTitle(res.name)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({
          dynamic: true,
          size: 4096,
          format: 'png'
        }))
        .setDescription(res.description)
        .setThumbnail('https://i.imgur.com/dVChkDU.png')
        .addFields({
          name: 'Maintainers',
          value: res.maintainers[0].name,
          inline: true
        }, {
            name: 'Keywords',
            value: res.keywords.join(', '),
            inline: true
          }, {
            name: 'Homepage',
            value: res.homepage,
            inline: true
          })
        .setTimestamp()

      message.channel.send(results);
    } else {
      console.log('bir hata var')
    }
  }).catch(err => message.channel.send(errr));

  const errr = new Discord.MessageEmbed()
    .setColor('#00f4fd')
    .setTitle(packagename)
    .setDescription('Lütfen bir modül belirt!')

}

exports.conf = {
  aliases: ['npm'],
  permLevel: 0,
  kategori: "Moderasyon",
};

exports.help = {
  name: 'Npm',
  description: 'Npm paketi aramanıza yardımcı olur.',
  usage: 'npm <paket adı>',
};