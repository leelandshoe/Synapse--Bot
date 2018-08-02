const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {


let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setDescription(" Here is the bots info! ")
    .setColor("#329FB0")
    .addField("Bot name", ("Speed Bot#6600"))
    .addField("Bot ID", ("454712228025729024"))
    .addField("Bot location", ("US West"))
    .addField("Created by", ("leelandshoe#0247"))
    .addField("My server", ("https://discord.gg/VTmKaNj"))
    .addField("Server Count", bot.guilds.size + ' servers')
    .addField("Bot Users", bot.users.size + ' users')
    .addField("Coded in", ("JavaScript"));
    message.channel.send(embed);

return;
}

module.exports.help = {
	name: "botinfo"
}