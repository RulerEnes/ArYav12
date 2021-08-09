const Discord = require('discord.js');
const burc = require('burc.js');

exports.run = async (client, message, args, db) => {

  const deniz = args.slice(0).join(' ')
  if(!deniz) return message.channel.send("Example usage: =>a.horoscope-comment Başak ")

  let yorum = await burc.gunluk(deniz)

  let embed = new Discord.MessageEmbed()
  .setColor("#00f4fd")
  .addField('Daily Horoscope Interpretation ', yorum)
  .setImage('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/91d2ba9b-6733-449e-835e-a414d0d9e728/dddd7s8-16bb1cc2-9420-4ab4-a1f4-85d765c42df3.png/v1/fill/w_1377,h_580,q_70,strp/arya_game_logo_by_flexiarts_dddd7s8-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Njc1IiwicGF0aCI6IlwvZlwvOTFkMmJhOWItNjczMy00NDllLTgzNWUtYTQxNGQwZDllNzI4XC9kZGRkN3M4LTE2YmIxY2MyLTk0MjAtNGFiNC1hMWY0LTg1ZDc2NWM0MmRmMy5wbmciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.cQlErWpkQh9ZBVD2uBS7U58gW659lZ8-laFCGVjlPzY')
  .setFooter('© ArYa Software')
  message.channel.send(embed)


}
exports.conf = { 
  enabled: true,
  guildOnly: true,
  aliases: ["horoscope","Horoscope",'burç-yorum', 'burçyorum'],
  permLevel: 0,
  kategori: "Eğlence"
};

exports.help = {
  name: 'horoscope-comment',
  description: "Throws daily changing horoscope comments",
  usage: 'burc-yorumu '
}
