const Discord = require('discord.js');
require('discord-buttons');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { Client, Util } = require('discord.js');
require('./util/eventLoader.js')(client);
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
    if (bans.some(ban => ban.user.id == user.id)) return guild.members.ban(user, { reason: 'Açılmayan Ban Sistemi, laura' });
});
client.on('messageDelete', async message => {// can#0002
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
////DATABASE
const qdb = require('quick.db');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const sunucuadapter = new FileSync('./database/systems.json')

const sdb = low(sunucuadapter)

  sdb.defaults({mute: [], ban: [], kufurEngel: [], autorole: [], reklamEngel: [], security: [], counter: []})
  .write()

  sdb.read()

/*
client.on("message", async msg => {
  if(!msg.guild) return;
  
  db.add(`mesajsayi_${msg.author.id}`, 1);
});
*/
setInterval(function(){  
  sdb.read()
 },1000);


 client.on('ready', async () => {
  client.guilds.cache.forEach(async guild => {
  guild.members.cache.forEach(async member => {
  
    sdb.read()
    var muteverisi = sdb.get('mute').find({guild: guild.id, user: member.id}).value()
  
    if(muteverisi) {
      var mutebitiszamani = muteverisi.finishtime
      var mutekanali = muteverisi.channel
    } else {
      var mutebitiszamani = null;
      var mutekanali = null;
    }
  const ainterval = setInterval(async function(){
    sdb.read()
  if(mutebitiszamani && mutebitiszamani !== null && mutebitiszamani !== "INFINITY") {
    if(mutebitiszamani <= Date.now()) {
      clearInterval(ainterval)
      var muterole1 = qdb.fetch(`muteroluid_${guild.id}`);
      var muterole2 = guild.roles.cache.find(r => r.id === muterole1);
      if(member.roles.cache.has(muterole2.id)) await member.roles.remove(muterole2.id);
      var mutekanali2 = guild.channels.cache.find(c => c.id === mutekanali);
      if(mutekanali2) mutekanali2.send(`${member} Susturulması Açıldı!`)
      sdb.get('mute').remove(sdb.get('mute').find({guild: guild.id, user: member.id}).value()).write()   
    }
  }
  }, 6000)
      })
    })
  });