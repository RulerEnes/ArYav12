const Discord = require("discord.js");
const moment = require("moment")
require('moment-duration-format');

exports.run = async(client, message, args) => {

  if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;

  var user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.client.users.cache.find(m => m.username === args.slice(0).join(" ")) || message.author; message.author;
  const member = message.guild.member(user)
  let kisi = client.users.cache.get(member.id);

moment.locale('tr-TR');
      var userRoles
        if (member.roles.size > 1) {
            userRoles = `${member.roles.array().sort((a, b) => a.comparePositionTo(b)).slice(1).reverse().map(role => `**\`${role.name}\`**`)}`
          } else {
            userRoles = '`Bulunmuyor`'
              }
              
  function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " gün" : " gün") + " önce";
        };

  if (!member) return message.reply('Komutu yanlış kullandınız örnek kullanım ==> a.kullanıcı-bilgi <@Bilgilerine bakmak istediğiniz kullanıcı>')

        let serverSize = message.guild.memberCount;

  const embed = new Discord.MessageEmbed()
      .setAuthor(user.tag, user.avatarURL() || user.defaultavatarURL())
      .setThumbnail("https://is.gd/bfhLNF")
      .setColor('#00f4fd')
      .addField('Üye bilgisi:',`**Kullanıcı İsmi:** ${member.displayName}\n**Katılım Tarihi:** ${moment.utc(member.joinedAt).format('Do MMMM YYYY')} - ${checkDays(member.joinedAt)} \n**Rolleri:** ${member.roles.cache.sort((b, a) => { return a.position - b.position }).map(role => `${role}`).join(" | ")}`, false)        .addField('Kullanıcı bilgisi:',  `\n**Tag**: ${member.user.tag}\n**ID:** ${member.user.id}\n**Kuruluş Tarihi**: ${moment.utc(user.createdAt).format('Do MMMM YYYY')} - ${checkDays(user.createdAt)}`, false)
      .setFooter("© SyntaxSoftware.Net")      
     return message.channel.send(embed)
                                
        }

exports.conf = {
  aliases: ['profilim','kullanıcıbilgi','profil','kullanıcı bilgi','kb','bilgi'],
  permLevel: 0,
  kategori: 'Genel'
};

exports.help = {
  name: 'kullanıcı-bilgi',
  description: 'Etiketlediğiniz kullanıcı hakkında bilgi verir',
  usage: 'kullanıcı-bilgi @Kullanıcı',

};