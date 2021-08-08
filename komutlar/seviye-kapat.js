const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => {

 let hm = await db.fetch(`seviyeacik_${message.guild.id}`)
  let kanal = await db.fetch(`svlog_${message.guild.id}`)
  
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` <a:dikkat:632947931808268290> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  if(!hm) return message.channel.send('Seviye sistemi aktif değil \n Bunu mu arıyorsun? `a.seviye-aç`')                
  
  message.reply('Seviye sistemi devre dışı durumuna getiriliyor..').then(seyit => {
    
 db.delete(`seviyeacik_${message.guild.id}`)
    
 db.delete(`svlog_${message.guild.id}`)

  seyit.edit('Sistem devre dışı bırakıldı')  
    
  }, 5000)
  

  
  };
exports.conf = {
  enabled: true,  
  guildOnly: false,
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'seviye-kapat',
  description: '',            
  usage: 'seviye-kapat'
};        