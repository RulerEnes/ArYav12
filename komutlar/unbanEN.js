const Discord = require('discord.js');

exports.run = async(client, message, args) => {

 var guild = message.guild;
 var banlayan = message.author.tag;
 var kisi = message.mentions.users.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);
 if(!kisi) return message.reply("You need to specify the person to ban`ID / @user / username`")
 //var gun = args.slice(1).join(' ') ? `${args.slice(1).join(' ')}` :"";
 var neden = args.slice(1).join(' ') 
 let banxx = await message.guild.fetchBans();

if (!banxx.get(kisi.id)) return message.reply(":x: User not banned ")

if(neden) {
  try {
  await message.channel.send(`${kisi.tag} Ban opened by  \nReason: **${neden}**`)
  await guild.members.unban(kisi.id, neden);
} catch (error) {
  message.reply("There was a problem please contact the owner Owner:<@799012176257482753>")
  console.log(error)
}
} else {
  try {
    await message.channel.send(`${kisi.tag} Ban opened by`)
    await guild.members.unban(kisi.id, neden);
  } catch (error) {
    message.reply("Something went wrong please contact the owner OWNER:<@799012176257482753>")
    console.log(error)
  }

}




};


exports.conf = {
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unban',
  description: 'Unbans the banned user',
  usage: 'unban'
};