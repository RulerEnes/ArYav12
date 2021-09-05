const Discord = require('discord.js');
require('discord-buttons');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { Client, Util } = require('discord.js');
require('./util/eventLoader.js')(client);

client.cooldowns = new Discord.Collection()
const fs = require('fs');
const db = require('quick.db');
const keep_alive = require('./keep_alive.js')

var prefix = ayarlar.prefix;
const log = message => {
	console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
	if (err) console.error(err);
	log(`${files.length} komut yüklenecek.`);
	files.forEach(f => {
		let props = require(`./komutlar/${f}`);
		log(`Yüklenen komut: ${props.help.name}.`);
		client.commands.set(props.help.name, props);
		props.conf.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	});
});

client.reload = command => {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(`./komutlar/${command}`)];
			let cmd = require(`./komutlar/${command}`);
			client.commands.delete(command);
			client.aliases.forEach((cmd, alias) => {
				if (cmd === command) client.aliases.delete(alias);
			});
			client.commands.set(command, cmd);
			cmd.conf.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.help.name);
			});
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};

client.load = command => {
	return new Promise((resolve, reject) => {
		try {
			let cmd = require(`./komutlar/${command}`);
			client.commands.set(command, cmd);
			cmd.conf.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.help.name);
			});
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};

client.unload = command => {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(`./komutlar/${command}`)];
			let cmd = require(`./komutlar/${command}`);
			client.commands.delete(command);
			client.aliases.forEach((cmd, alias) => {
				if (cmd === command) client.aliases.delete(alias);
			});
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};

client.elevation = message => {
	if (!message.guild) {
		return;
	}
	let permlvl = 0;
	if (message.member.hasPermission('BAN_MEMBERS')) permlvl = 2;
	if (message.member.hasPermission('ADMINISTRATOR')) permlvl = 3;
	if (message.author.id === ayarlar.sahip) permlvl = 4;
	return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
	console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
	console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});
client.login(ayarlar.token);

client.on("guildBanRemove", (guild, user) => {
    const database = require('quick.db')
    const bans = database.get(`acilmayanBan.laura.${guild.id}`) || [];
    if (bans.some(ban => ban.user.id == user.id)) return guild.members.ban(user, { reason: 'Açılmayan Ban Sistemi' });
});
client.on('messageDelete', async message => {
  if(message.author.bot || !message.content) return;
  require('quick.db').push(message.guild.id, {
    author: message.author,
    authorTAG: message.author.tag,
    authorID: message.author.id,
    authorUSERNAME: message.author.username,
    authorDISCRIMINATOR: message.author.discriminator,
    messageID: message.id,
    messageCHANNEL: message.channel,
    messageCHANNELID: message.channel.id,
    messageCONTENT: message.content,
    messageCREATEDAT: message.createdAt
  });
});
client.on("message", async msg => {


  const i = await db.fetch(`saas_${msg.guild.id}`);
    if (i == 'acik') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 's.a' || msg.content.toLowerCase() == 'selamun aleyküm') {
          try {

                  return msg.reply('**Aleyküm Selam, Hoşgeldin :)** ')
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (i == 'kapali') {
    
    }
    if (!i) return;

    });
    client.on('message', async msg => {
  if (msg.content === `<@id>`) return msg.channel.send(`Prefixim ${ayarlar.prefix}`);
});
  client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    await msg.react('🇦');
    await msg.react('🇸');
  }
});
client.cooldown = new Discord.Collection();
client.config = {
cooldown: 1 * 1000
}
client.db = require("quick.db");
client.on("message", async (message) => {
    if (!message.guild || message.author.bot) return;
    // XP
    exp(message);
function exp(message) {
    if (!client.cooldown.has(`${message.author.id}`) || (Date.now() - client.cooldown.get(`${message.author.id}`) > client.config.cooldown)) {
        let exp = client.db.add(`exp_${message.author.id}`, 1);
        let level = Math.floor(0.3 * Math.sqrt(exp));
        let lvl = client.db.get(`level_${message.author.id}`) || client.db.set(`level_${message.author.id}`,1);;
        if (level > lvl) {
            let newLevel = client.db.set(`level_${message.author.id}`,level);
            message.channel.send(`:tada: ${message.author.toString()}, Level atladın yeni levelin ${newLevel}!`);
        }
        client.cooldown.set(`${message.author.id}`, Date.now());
    }
}
});
client.on('guildDelete', guild => {

let arya = new Discord.MessageEmbed()

.setColor("#ff0000")
.setTitle("ArYa Sunucudan Atıldı")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.cache.get('881262966178197534').send(arya);
 
});

//-------------------------eklendi-------------------------------//

client.on('guildCreate', guild => {

let eklendi = new Discord.MessageEmbed()

.setColor("#00f4fd")
.setTitle("ArYa Yeni Sunucuya Eklendi")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.cache.get('881262966178197534').send(eklendi);

});
const küfür = ["yavsak","it","oç","İt","Anan","anan","sikerim","pezevenk","kahpe","kahpelik","Oç","sikik","Sikik","SIKIK","31","Yavşak","yavşak","aq","Aq","AQ","orospu","orospucocugu","orospucocuğu","orospuçocuğu","Orospuçocuğu","sikiklik","Sikiklik","Amınakorum","amınakorum","amınakoyduğum","amınakoydugum","Bot sikerim seni","botsikerimseni","kuranısikim","Allahı sikim","Allahınısikim","Allahını sikim","orospuluk","Orospuluk","Kahpe","KAHPE","OROSPU","OROSPUCOCUĞU","siktir","Siktir","SIKTIR","SİKTIR","SİKTİR","sokuk","Sokuk","SOKUK","Sokulmus","Sokulmuş","sokulmus","sokulmuş","69"]

client.on("messageUpdate", async (old, nev) => {

    if (old.content != nev.content) {
        let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
        let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
        if (i) {

            if (küfür.some(word => nev.content.includes(word))) {
                if (nev.member.hasPermission("BAN_MEMBERS")) return;
                //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
                const embed = new Discord.MessageEmbed().setColor("#00f4fd").setDescription(`${nev.author} , **Küfür etti ama ben engelledim**`)
                    .addField("Küfür:", nev)

                nev.delete();
                const embeds = new Discord.MessageEmbed().setColor("#00f4fd").setDescription(`${nev.author} , **Mesajı editlesen bile engellerim 🙂  küfürün log kanalına gönderildi KÜFÜR YASAK!!**`)
                client.channels.cache.get(y).send(embed)
                nev.channel.send(embeds).then(msg => msg.delete({
                    timeout: 5000
                }));

            }
        } else {}
        if (!i) return;
    }
});

client.on("message", async msg => {


    if (msg.author.bot) return;
    if (msg.channel.type === "dm") return;
    let y = await db.fetch(`küfür.${msg.member.guild.id}.kanal`);

    let i = await db.fetch(`küfür.${msg.member.guild.id}.durum`);
    if (i) {
        if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
            try {
                if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
                    msg.delete({
                        timeout: 750
                    });
                    const embeds = new Discord.MessageEmbed().setColor("#00f4fd").setDescription(`<@${msg.author.id}> , **KÜFÜR YASAK!! Küfürün log kanalına gönderildi yetkililer gerekeni yapar**`)
                    msg.channel.send(embeds).then(msg => msg.delete({
                        timeout: 5000
                    }));
                    const embed = new Discord.MessageEmbed().setColor("#00f4fd").setDescription(`${msg.author} , **Küfür etmeye çalıştı ama ben engelledim*`).addField("Mesajı:", msg)
                    client.channels.cache.get(y).send(embed)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    if (!i) return;
});
client.on("message", msg => {
 if(!db.has(`reklam_${msg.guild.id}`)) return;
        const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.reply('Bu Sunucuda **Reklam Engelleme Sistemi** Aktif').then(msg => msg.delete(3000));
   
 
  msg.delete(3000);                              
 
            }              
          } catch(err) {
            console.log(err);
          }
        }
    });