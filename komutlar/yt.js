const discord = require('discord.js')
const yts = require('yt-search')

exports.run = async (client, message, args) => { 
  
  const video = args.slice(0).join(' ')
  if(!video) return message.channel.send("Youtube'de aramam için bir video adı girmelisin.")
  
  const r = await yts(video)
  const videos = r.videos.slice( 0, 1 )
  videos.forEach( function ( v ) {
    const views = String( v.views ).padStart( 10, ' ' )
    const yte = new discord.MessageEmbed()
 .setTitle(`ArYa ${video} Videosu İstatistikleri`)
 .addField('İsim', `[${ v.title }](${ v.url })`)
 .addField('Kanal', `${ v.author.name }`)
 .addField('Görüntülenme', `${ views }`)
 .addField('Süre', `${ v. timestamp }`)
 .setTimestamp()
 .setColor('#00f4fd')
 .setThumbnail(v.thumbnail)
    message.channel.send(yte)
  } )
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yt", "ytb"], 
  permLevel: 0
};

exports.help = {
  name: 'youtube'
};
