const Discord = require('discord.js')
const data = require('quick.db')

exports.run = async (client, message, args) => {
let prefix = ''// botun prefixi

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`not authorized`)
if(!args[0]) return message.channel.send(`To use the system, ${prefix}uyarı add/delete/info use commands`)


if(args[0] === 'ekle') {
let kullanıcı = message.mentions.users.first()
if(!args[1]) return message.channel.send(`You must tag someone`)
if(!kullanıcı) return message.channel.send(`${args[1]}, I can't find the user on the server.`)
if(kullanıcı.bot) return message.channel.send(`You can't warn bots`)
if(kullanıcı.id === message.author.id) return message.channel.send(`You can't warn yourself.`)
let reason = args.slice(2).join(' ')

data.add(`uyarı.${message.guild.id}.${kullanıcı.id}`, +1)
const syı = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)

if(!reason) {
await message.channel.send(`${kullanıcı}, uyarıldı!\nTotal number of alerts: ${syı}`)
await kullanıcı.send(`${kullanıcı}, Hello! ${message.guild.name} You have been warned on the server for no reason. Be careful!`) 
return}

if(reason) {
await message.channel.send(`${kullanıcı}, warned !\nTotal number of alerts: ${syı}`)
await kullanıcı.send(`${kullanıcı}, Hello! ${message.guild.name} on the server  ${reason} You have been warned for!Dikkatli ol!`) 
return} }

if(args[0] === 'sil') {
let kullanıcı = message.mentions.users.first()
if(!args[1]) return message.channel.send(`You must tag someone`)
if(!kullanıcı) return message.channel.send(`${args[1]}, I can't find the user on the server`)
if(kullanıcı.id === message.author.id) return message.channel.send(`You can't warn yourself`)

let sayı = args[2]
if(!sayı) return message.channel.send(`You did not enter the number of alerts to delete`)
if(isNaN(sayı)) return message.channel.send(`You did not enter the number of alerts to delete`)
if(sayı === '0') return message.channel.send(`head finding man smart use command`)
const syı2 = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
if(syı2 < sayı) return message.channel.send(`${kullanıcı}, user's alert count: ${syı2}! You can only delete this much`)

data.add(`warning.${message.guild.id}.${kullanıcı.id}`, -sayı)
const syı = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
await message.channel.send(`${kullanıcı}, alert cleared!\nTotal number of alerts: ${syı ? syı : '0'}`)
await kullanıcı.send(`${kullanıcı}, Hello! ${message.guild.name} alert on server cleared. be more careful!`) }

if(args[0] === 'info') {
let kullanıcı = message.mentions.users.first()
if(!args[1]) return message.channel.send(`You must tag someone`)
if(!kullanıcı) return message.channel.send(`${args[1]},I couldn't find the user on the server`)

const syı2 = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
if(!syı2) return message.channel.send(`${kullanıcı}, User has no warnings`)
await message.channel.send(`${kullanıcı}:\nTotal number of alerts: ${syı2 ? syı2 : '0'}`) }
};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['Warning'],
permLevel: 0,
kategori: 'Moderasyon'
}

exports.help = {
name: 'warning'
}