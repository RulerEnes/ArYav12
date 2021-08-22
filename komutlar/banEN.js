const Discord = require('discord.js');


exports.run = async(client, message, args) => {


  var guild = message.guild;
  var banlayan = message.author.tag;
  let banxx = await message.guild.fetchBans();
  if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply('I cant ban the user because `Ban Members` I do not have authority');
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(":no_entry: To use this command `Ban Members`you need your authority");
 
  var kisi = message.mentions.users.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);
  if(!kisi) return message.reply("You need to specify the person to ban `ID / @user / username`")
 var sebeb = args.slice(1).join(" ");


    if(message.author == kisi) return message.reply("You can't ban yourself")
    if (banxx.get(kisi.id)) return message.reply(":x:The person has already been banned")

 var now = new Date()
 if (!sebeb) {
         try {
          kisi.send(`${kisi} **${guild}** You have been banned from server named`)
          message.channel.send(`**${kisi} banlandı.**`)
          guild.members.ban(kisi, { reason: sebeb/*, days: gun*/});
        } catch (error) {
          message.reply("There was a problem please contact the owner OWNER: <@799012176257482753>")
          console.log(error)
        }
 } else {
 try {
   kisi.send(`${kisi} **${guild}** You have been banned from server named\nReason: **${sebeb}**`)
   message.channel.send(`**${kisi} banned. \nReason: ${sebeb}**`)
   guild.members.ban(kisi, { reason: sebeb/*, days: gun*/});
 } catch (error) {
   message.reply("There was an error please contact the owner OWNER: <@799012176257482753>")
   console.log(error)
 }

 }
};


exports.conf = {
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'banEN',
  description: 'Ban the person you tagged from the server'
};