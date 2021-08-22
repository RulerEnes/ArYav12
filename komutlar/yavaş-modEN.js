const Discord = require('discord.js')
 
exports.run = async (client, message, args) => {
const sayı = args[0]
if (!sayı) return message.channel.send("You used the command wrong example usage =>a.slowmode 10")
if (sayı > 21600) return message.channel.send("Slow mode time max **21600 second (6 hour)** it could be")
if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send("To use this command **Manage Channels** you need to have authorization ")
message.channel.setRateLimitPerUser(sayı, "slowmode")
message.channel.send(`channel slow mode  **${sayı}** set to seconds`)
};
exports.conf = {
 enabled: true,
 guildOnly: true,
 aliases: ["Slowmode", "slowmode", " slow-mode"],
 permLevel: 0
};
 
exports.help = {
 name: 'slowmode',
 description: 'Turns on the slow mode as long as you enter the channel you are in in seconds'
};