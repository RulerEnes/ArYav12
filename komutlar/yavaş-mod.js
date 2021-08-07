const Discord = require('discord.js')
 
exports.run = async (client, message, args) => {
const sayı = args[0]
if (!sayı) return message.channel.send("Komutu yanlış kullandın örnek kullanım ==> a.yavaşmod <süre>.")
if (sayı > 21600) return message.channel.send("Yavaş mod süresi en fazla **21600 saniye (6 saat)** olabilir.")
if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send("Bu komutu kullanabilmek için **Kanalları Yönet** iznine sahip olman gerek.")
message.channel.setRateLimitPerUser(sayı, "Yavaş mod")
message.channel.send(`Kanalın yavaş modu **${sayı}** saniye olarak ayarlandı.`)
};
exports.conf = {
 enabled: true,
 guildOnly: true,
 aliases: ["yavaş-mod", "slowmode", " slow-mode"],
 permLevel: 0
};
 
exports.help = {
 name: 'yavaşmod',
 description: 'Olduğunuz kanala saniye cinsinden girdiğiniz sayıyı yavaş-mod olarak aktifleştirir'
};