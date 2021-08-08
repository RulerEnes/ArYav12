const Discord = require('discord.js');
const abc = require('isgd');

exports.run = async (client, message, args) => {
	if (!args[0]) return message.channel.send('Komutu yanlış kullandınız örnek kullanım ==> a.link-kısalt <link>.');

	if (!args[1]) {
		abc.shorten(args[0], function(snc) {
			if (snc.startsWith('Error:'))
				return message.channel.send(`Bir hata oluştu. \`${snc}\``)
			message.channel.send(
				new Discord.MessageEmbed()
					.setAuthor(
						message.author.tag,
						message.author.avatarURL({ dynamic: true })
					)
					.setThumbnail(message.author.avatarURL({ dynamic: true }))
					.setColor('#00f4fd')
					.addField('Bağlantı', args[0])
					.addField('Sonuç', snc)
					.setFooter('© ArYa Software')
			);
		});
	} else {
		abc.custom(args[0], args[1], function(snc) {
			if (snc.startsWith('Error:'))
				return message.channel.send(`Bir hata oluştu. \`${snc}\``)
			message.channel.send(
				new Discord.MessageEmbed()
					.setAuthor(
						message.author.tag,
						message.author.avatarURL({ dynamic: true })
					)
					.setThumbnail(message.author.avatarURL({ dynamic: true }))
					.setColor('#00f4fd')
					.addField('Bağlantı', args[0])
					.addField('Sonuç', snc)
					.setFooter('© ArYa Software,')
			);
		});
	}
};
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['linkkısalt', 'bağlantıkısalt', 'bağlantı-kısalt'],
	permLevel: 0
	kategori: 'Genel'
}; 

exports.help = {
	name: 'link-kısalt'
};