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
.setTitle("ArYa Atıldı")
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
.setTitle("ArYa Eklendi")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.cache.get('881262966178197534').send(eklendi);

});
const küfür = ["abaza", "abazan", "ag", "a\u011fz\u0131na s\u0131\u00e7ay\u0131m", "ahmak", "allah", "allahs\u0131z", "am", "amar\u0131m", "ambiti", "am biti", "amc\u0131\u011f\u0131", "amc\u0131\u011f\u0131n", "amc\u0131\u011f\u0131n\u0131", "amc\u0131\u011f\u0131n\u0131z\u0131", "amc\u0131k", "amc\u0131k ho\u015faf\u0131", "amc\u0131klama", "amc\u0131kland\u0131", "amcik", "amck", "amckl", "amcklama", "amcklaryla", "amckta", "amcktan", "amcuk", "am\u0131k", "am\u0131na", "am\u0131nako", "am\u0131na koy", "am\u0131na koyar\u0131m", "am\u0131na koyay\u0131m", "am\u0131nakoyim", "am\u0131na koyyim", "am\u0131na s", "am\u0131na sikem", "am\u0131na sokam", "am\u0131n feryad\u0131", "am\u0131n\u0131", "am\u0131n\u0131 s", "am\u0131n oglu", "am\u0131no\u011flu", "am\u0131n o\u011flu", "am\u0131s\u0131na", "am\u0131s\u0131n\u0131", "amina", "amina g", "amina k", "aminako", "aminakoyarim", "amina koyarim", "amina koyay\u0131m", "amina koyayim", "aminakoyim", "aminda", "amindan", "amindayken", "amini", "aminiyarraaniskiim", "aminoglu", "amin oglu", "amiyum", "amk", "amkafa", "amk \u00e7ocu\u011fu", "amlarnzn", "aml\u0131", "amm", "ammak", "ammna", "amn", "amna", "amnda", "amndaki", "amngtn", "amnn", "amona", "amq", "ams\u0131z", "amsiz", "amsz", "amteri", "amugaa", "amu\u011fa", "amuna", "ana", "anaaann", "anal", "analarn", "anam", "anamla", "anan", "anana", "anandan", "anan\u0131", "anan\u0131", "anan\u0131n", "anan\u0131n am", "anan\u0131n am\u0131", "anan\u0131n d\u00f6l\u00fc", "anan\u0131nki", "anan\u0131sikerim", "anan\u0131 sikerim", "anan\u0131sikeyim", "anan\u0131 sikeyim", "anan\u0131z\u0131n", "anan\u0131z\u0131n am", "anani", "ananin", "ananisikerim", "anani sikerim", "ananisikeyim", "anani sikeyim", "anann", "ananz", "anas", "anas\u0131n\u0131", "anas\u0131n\u0131n am", "anas\u0131 orospu", "anasi", "anasinin", "anay", "anayin", "angut", "anneni", "annenin", "annesiz", "anuna", "aptal", "aq", "a.q", "a.q.", "aq.", "ass", "atkafas\u0131", "atm\u0131k", "att\u0131rd\u0131\u011f\u0131m", "attrrm", "auzlu", "avrat", "ayklarmalrmsikerim", "azd\u0131m", "azd\u0131r", "azd\u0131r\u0131c\u0131", "babaannesi ka\u015far", "baban\u0131", "baban\u0131n", "babani", "babas\u0131 pezevenk", "baca\u011f\u0131na s\u0131\u00e7ay\u0131m", "bac\u0131na", "bac\u0131n\u0131", "bac\u0131n\u0131n", "bacini", "bacn", "bacndan", "bacy", "bastard", "basur", "beyinsiz", "b\u0131z\u0131r", "bitch", "biting", "bok", "boka", "bokbok", "bok\u00e7a", "bokhu", "bokkkumu", "boklar", "boktan", "boku", "bokubokuna", "bokum", "bombok", "boner", "bosalmak", "bo\u015falmak", "cenabet", "cibiliyetsiz", "cibilliyetini", "cibilliyetsiz", "cif", "cikar", "cim", "\u00e7\u00fck", "dalaks\u0131z", "dallama", "daltassak", "dalyarak", "dalyarrak", "dangalak", "dassagi", "diktim", "dildo", "dingil", "dingilini", "dinsiz", "dkerim", "domal", "domalan", "domald\u0131", "domald\u0131n", "domal\u0131k", "domal\u0131yor", "domalmak", "domalm\u0131\u015f", "domals\u0131n", "domalt", "domaltarak", "domalt\u0131p", "domalt\u0131r", "domalt\u0131r\u0131m", "domaltip", "domaltmak", "d\u00f6l\u00fc", "d\u00f6nek", "d\u00fcd\u00fck", "eben", "ebeni", "ebenin", "ebeninki", "ebleh", "ecdad\u0131n\u0131", "ecdadini", "embesil", "emi", "fahise", "fahi\u015fe", "feri\u015ftah", "ferre", "fuck", "fucker", "fuckin", "fucking", "gavad", "gavat", "geber", "geberik", "gebermek", "gebermi\u015f", "gebertir", "ger\u0131zekal\u0131", "gerizekal\u0131", "gerizekali", "gerzek", "giberim", "giberler", "gibis", "gibi\u015f", "gibmek", "gibtiler", "goddamn", "godo\u015f", "godumun", "gotelek", "gotlalesi", "gotlu", "gotten", "gotundeki", "gotunden", "gotune", "gotunu", "gotveren", "goyiim", "goyum", "goyuyim", "goyyim", "g\u00f6t", "g\u00f6t deli\u011fi", "g\u00f6telek", "g\u00f6t herif", "g\u00f6tlalesi", "g\u00f6tlek", "g\u00f6to\u011flan\u0131", "g\u00f6t o\u011flan\u0131", "g\u00f6to\u015f", "g\u00f6tten", "g\u00f6t\u00fc", "g\u00f6t\u00fcn", "g\u00f6t\u00fcne", "g\u00f6t\u00fcnekoyim", "g\u00f6t\u00fcne koyim", "g\u00f6t\u00fcn\u00fc", "g\u00f6tveren", "g\u00f6t veren", "g\u00f6t verir", "gtelek", "gtn", "gtnde", "gtnden", "gtne", "gtten", "gtveren", "hasiktir", "hassikome", "hassiktir", "has siktir", "hassittir", "haysiyetsiz", "hayvan herif", "ho\u015faf\u0131", "h\u00f6d\u00fck", "hsktr", "huur", "\u0131bnel\u0131k", "ibina", "ibine", "ibinenin", "ibne", "ibnedir", "ibneleri", "ibnelik", "ibnelri", "ibneni", "ibnenin", "ibnerator", "ibnesi", "idiot", "idiyot", "imansz", "ipne", "iserim", "i\u015ferim", "ito\u011flu it", "kafam girsin", "kafas\u0131z", "kafasiz", "kahpe", "kahpenin", "kahpenin feryad\u0131", "kaka", "kaltak", "kanc\u0131k", "kancik", "kappe", "karhane", "ka\u015far", "kavat", "kavatn", "kaypak", "kayyum", "kerane", "kerhane", "kerhanelerde", "kevase", "keva\u015fe", "kevvase", "koca g\u00f6t", "kodu\u011fmun", "kodu\u011fmunun", "kodumun", "kodumunun", "koduumun", "koyarm", "koyay\u0131m", "koyiim", "koyiiym", "koyim", "koyum", "koyyim", "krar", "kukudaym", "laciye boyad\u0131m", "lavuk", "libo\u015f", "madafaka", "mal", "malafat", "malak", "manyak", "mcik", "meme", "memelerini", "mezveleli", "minaamc\u0131k", "mincikliyim", "mna", "monakkoluyum", "motherfucker", "mudik", "oc", "ocuu", "ocuun", "O\u00c7", "o\u00e7", "o. \u00e7ocu\u011fu", "o\u011flan", "o\u011flanc\u0131", "o\u011flu it", "orosbucocuu", "orospu", "orospucocugu", "orospu cocugu", "orospu \u00e7oc", "orospu\u00e7ocu\u011fu", "orospu \u00e7ocu\u011fu", "orospu \u00e7ocu\u011fudur", "orospu \u00e7ocuklar\u0131", "orospudur", "orospular", "orospunun", "orospunun evlad\u0131", "orospuydu", "orospuyuz", "orostoban", "orostopol", "orrospu", "oruspu", "oruspu\u00e7ocu\u011fu", "oruspu \u00e7ocu\u011fu", "osbir", "ossurduum", "ossurmak", "ossuruk", "osur", "osurduu", "osuruk", "osururum", "otuzbir", "\u00f6k\u00fcz", "\u00f6\u015fex", "patlak zar", "penis", "pezevek", "pezeven", "pezeveng", "pezevengi", "pezevengin evlad\u0131", "pezevenk", "pezo", "pic", "pici", "picler", "pi\u00e7", "pi\u00e7in o\u011flu", "pi\u00e7 kurusu", "pi\u00e7ler", "pipi", "pipi\u015f", "pisliktir", "porno", "pussy", "pu\u015ft", "pu\u015fttur", "rahminde", "revizyonist", "s1kerim", "s1kerm", "s1krm", "sakso", "saksofon", "salaak", "salak", "saxo", "sekis", "serefsiz", "sevgi koyar\u0131m", "sevi\u015felim", "sexs", "s\u0131\u00e7ar\u0131m", "s\u0131\u00e7t\u0131\u011f\u0131m", "s\u0131ecem", "sicarsin", "sie", "sik", "sikdi", "sikdi\u011fim", "sike", "sikecem", "sikem", "siken", "sikenin", "siker", "sikerim", "sikerler", "sikersin", "sikertir", "sikertmek", "sikesen", "sikesicenin", "sikey", "sikeydim", "sikeyim", "sikeym", "siki", "sikicem", "sikici", "sikien", "sikienler", "sikiiim", "sikiiimmm", "sikiim", "sikiir", "sikiirken", "sikik", "sikil", "sikildiini", "sikilesice", "sikilmi", "sikilmie", "sikilmis", "sikilmi\u015f", "sikilsin", "sikim", "sikimde", "sikimden", "sikime", "sikimi", "sikimiin", "sikimin", "sikimle", "sikimsonik", "sikimtrak", "sikin", "sikinde", "sikinden", "sikine", "sikini", "sikip", "sikis", "sikisek", "sikisen", "sikish", "sikismis", "siki\u015f", "siki\u015fen", "siki\u015fme", "sikitiin", "sikiyim", "sikiym", "sikiyorum", "sikkim", "sikko", "sikleri", "sikleriii", "sikli", "sikm", "sikmek", "sikmem", "sikmiler", "sikmisligim", "siksem", "sikseydin", "sikseyidin", "siksin", "siksinbaya", "siksinler", "siksiz", "siksok", "siksz", "sikt", "sikti", "siktigimin", "siktigiminin", "sikti\u011fim", "sikti\u011fimin", "sikti\u011fiminin", "siktii", "siktiim", "siktiimin", "siktiiminin", "siktiler", "siktim", "siktim", "siktimin", "siktiminin", "siktir", "siktir et", "siktirgit", "siktir git", "siktirir", "siktiririm", "siktiriyor", "siktir lan", "siktirolgit", "siktir ol git", "sittimin", "sittir", "skcem", "skecem", "skem", "sker", "skerim", "skerm", "skeyim", "skiim", "skik", "skim", "skime", "skmek", "sksin", "sksn", "sksz", "sktiimin", "sktrr", "skyim", "slaleni", "sokam", "sokar\u0131m", "sokarim", "sokarm", "sokarmkoduumun", "sokay\u0131m", "sokaym", "sokiim", "soktu\u011fumunun", "sokuk", "sokum", "soku\u015f", "sokuyum", "soxum", "sulaleni", "s\u00fclaleni", "s\u00fclalenizi", "s\u00fcrt\u00fck", "\u015ferefsiz", "\u015f\u0131ll\u0131k", "taaklarn", "taaklarna", "tarrakimin", "tasak", "tassak", "ta\u015fak", "ta\u015f\u015fak", "tipini s.k", "tipinizi s.keyim", "tiyniyat", "toplarm", "topsun", "toto\u015f", "vajina", "vajinan\u0131", "veled", "veledizina", "veled i zina", "verdiimin", "weled", "weledizina", "whore", "xikeyim", "yaaraaa", "yalama", "yalar\u0131m", "yalarun", "yaraaam", "yarak", "yaraks\u0131z", "yaraktr", "yaram", "yaraminbasi", "yaramn", "yararmorospunun", "yarra", "yarraaaa", "yarraak", "yarraam", "yarraam\u0131", "yarragi", "yarragimi", "yarragina", "yarragindan", "yarragm", "yarra\u011f", "yarra\u011f\u0131m", "yarra\u011f\u0131m\u0131", "yarraimin", "yarrak", "yarram", "yarramin", "yarraminba\u015f\u0131", "yarramn", "yarran", "yarrana", "yarrrak", "yavak", "yav\u015f", "yav\u015fak", "yav\u015fakt\u0131r", "yavu\u015fak", "y\u0131l\u0131\u015f\u0131k", "yilisik", "yogurtlayam", "yo\u011furtlayam", "yrrak", "z\u0131kk\u0131m\u0131m", "zibidi", "zigsin", "zikeyim", "zikiiim", "zikiim", "zikik", "zikim", "ziksiiin", "ziksiin", "zulliyetini", "zviyetini"];

client.on("messageUpdate", async (old, nev) => {

    if (old.content != nev.content) {
        let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
        let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
        if (i) {

            if (küfür.some(word => nev.content.includes(word))) {
                if (nev.member.hasPermission("BAN_MEMBERS")) return;
                //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
                const embed = new Discord.MessageEmbed().setColor("#00f4fd").setDescription(`${nev.author} , **Ben varken küfürmü emteye çalıştın?**`)
                    .addField("Küfür:", nev)

                nev.delete();
                const embeds = new Discord.MessageEmbed().setColor("#00f4fd").setDescription(`${nev.author} , **Mesajı editle küfür etmekmi?**`)
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
                    const embeds = new Discord.MessageEmbed().setColor("#00f4fd").setDescription(`<@${msg.author.id}> , **Küfür etmeye çalıştı ama ben varken asla!**`)
                    msg.channel.send(embeds).then(msg => msg.delete({
                        timeout: 5000
                    }));
                    const embed = new Discord.MessageEmbed().setColor("#00f4fd").setDescription(`${msg.author} , **Küfür etmeye çalıştı ama ben varken asla!**`).addField("Mesajı:", msg)
                    client.channels.cache.get(y).send(embed)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    if (!i) return;
});