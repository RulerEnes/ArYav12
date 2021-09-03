const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
exports.run = async (client, message, args) => {
  const arya = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
  const istatistikler = new Discord.MessageEmbed()
    .setTitle("ArYa Botun İstatistikleri")
    
    .setThumbnail("https://images.app.goo.gl/p54QzHcbFhoBeHsk6")
    .setColor("#00f4fd")
    .setFooter("© SyntaxSoftware.Net",)
    .addField("» **Botun Sahibi - Geliştirici**", "<@799012176257482753>")
    .addField("» **Gecikme süreleri**","Mesaj Gecikmesi: {ping1} ms \nBot Gecikmesi: {ping2} ms"
        .replace("{ping1}", new Date().getTime() - message.createdTimestamp)
        .replace("{ping2}", client.ws.ping),true)
    .addField("» **Bellek kullanımı**",(process.memoryUsage().heapUsed / 1024 / 512).toFixed(2) + " MB",true)
    .addField("» **Çalışma süresi**", arya, true)
    .addField("» **Kullanıcılar**",client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
    .addField("» **Sunucular**", client.guilds.cache.size.toLocaleString(), true)
    .addField("» **Kanallar**", client.channels.cache.size.toLocaleString(), true)
    .addField("» **Discord.JS sürüm**", "v" + Discord.version, true)
    .addField("» **Node.JS sürüm**", `${process.version}`, true)
    .addField("» **CPU**",`\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``,true)
    .addField("» **Bit**", `\`${os.arch()}\``, true)
    .addField("» **İşletim Sistemi**", `\`\`${os.platform()}\`\``, true)
    .addField("» Linkler", `[Davet Et](https://discord.com/oauth2/authorize?client_id=834763013248122910&scope=bot&permissions=4228906239)` + "** | **" + `[Destek Sunucusu](https://discord.gg/vekyBAZ8QW)` + "** | **" + `[Top.gg Oy](https://top.gg/bot/834763013248122910/vote)`, false)
  return message.channel.send(istatistikler);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i"],
  permLevel: 0
};

exports.help = {
  "name": "istatistik",
  "description": "Botun istatistiklerini gösterir",
  "cooldown": 5,
};