const Discord = require('discord.js')
const szlk = require('trsozluk')

exports.run = async (client, message, args) => {
if (!args[0]) return message.channel.send("TDK'de aratmam için bir kelime girmelisin.")
try {
const bizimcocuklar = await szlk(args[0])
const smsj = new Discord.MessageEmbed()
.setTitle("TDK ARAMA SONUCU")
.setDescription(`
**Kelime:** ${args[0]}
**Anlam:** ${bizimcocuklar.anlam}
**İkinci anlam:** ${bizimcocuklar.anlam2}
**Üçüncü anlam:** ${bizimcocuklar.anlam3}
**Kullanım örneği:** ${bizimcocuklar.ornek}
**Örnek deyim/atasözü:** ${bizimcocuklar.atasozu}
**Çoğul mu:** ${bizimcocuklar.cogul}
**Özel mi:** ${bizimcocuklar.ozel}
**Telaffuz:** ${bizimcocuklar.telaffuz}`)
.setColor('#00f4fd')
.setThumbnail(message.author.avatarURL())
message.channel.send(smsj)
} catch(e){
message.channel.send("Sözlükte böyle bir kelime bulamadım.")
}
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["tdk"], 
 permLevel: 0
};

exports.help = {
  name: "sözlük"
};
