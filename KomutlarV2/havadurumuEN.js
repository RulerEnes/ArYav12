const Discord = require("discord.js");
const weather = require("weather-js");

exports.run = (client, message, args) => {
  weather.find({ search: args.join(" "), degreeType: "C" }, function(
    err,
    result
  ) {
    if (err) message.channel.send(err);
    if (result === undefined || result.length === 0) {
      message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("Please enter a location")
          .setColor("#00f4fd")
      );
      return;
    }
    var current = result[0].current;
    var tahminler = result[0].forecast;
    var location = result[0].location;
    const embed = new Discord.MessageEmbed()
      .setDescription(`**${current.skytext}**`)
      .setTitle(current.skytext
      .replace(`Sunny`, `Sunny`)
      .replace(`Partly`, `Partl`)
      .replace(`Mostly`, `Mostly`)
      .replace(`Rain`, `Rainy`)
      .replace(`Light`, `Light`)
      .replace(`Cloudy`, `Cloudy`)
      .replace(`Clear`, `Open`))
      .setAuthor(`${current.observationpoint} weather for`)
      .setThumbnail('https://is.gd/bfhLNF')
      .setColor('#00f4fd')
      .addField("Time period", `UTC${location.timezone}`, true)
      .addField("Degree type", location.degreetype, true)
      .addField("Heat", `${current.temperature} Derece`, true)
      .addField("Weather", `${current.feelslike}`, true)
      .addField("Wind", current.winddisplay
      .replace(`West`, `Batı`)
      .replace(`North`, `Kuzey`)
      .replace(`East`, `Doğu`)
      .replace(`South`, `Güney`)
      .replace(`west`, `Batı`)
      .replace(`north`, `Kuzey`)
      .replace(`east`, `Doğu`)
      .replace(`south`, `Güney`), true)
      .addField("Moisture", `${current.humidity}%`, true)
      .addField("Highest temperature", tahminler[0].high, true)
      .addField("Lowest temperature", tahminler[0].low, true)
      .addField("Moisture", `${current.humidity}%`, true)
      .setFooter('© ArYa Software');
    message.channel.send({ embed });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["hava-durumu", "Weather"],
  permLevel: 0
};

exports.help = {
  name: "weather-forecast",
  description: "Assigns the weather for the location you typed in"
};
